import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── Job store (module-level, persists within Node.js process) ────────────────
// In production with a real DB, replace this with DB rows keyed by jobId.

export type JobStatus =
  | "pending"
  | "browser_launched"
  | "waiting_login"
  | "verification_required"   // 2FA / phone / CAPTCHA screen detected
  | "login_detected"
  | "fetching_profile"
  | "capturing"
  | "success"
  | "error"
  | "browser_closed"
  | "timeout"
  | "invalid_session";        // li_at not found after capture

export type CaptureJob = {
  status: JobStatus;
  message: string;
  agentId?: string;
  profileName?: string;
  error?: string;
  startedAt: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __linkedinCaptureJobs: Map<string, CaptureJob> | undefined;
}
if (!global.__linkedinCaptureJobs) {
  global.__linkedinCaptureJobs = new Map();
}
const jobs: Map<string, CaptureJob> = global.__linkedinCaptureJobs;

function createJob(): string {
  const id = `cap_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  jobs.set(id, { status: "pending", message: "Starting…", startedAt: Date.now() });
  // Auto-cleanup after 20 min (accounts for slow 2FA flows)
  setTimeout(() => jobs.delete(id), 20 * 60 * 1000);
  return id;
}

function updateJob(id: string, update: Partial<CaptureJob>) {
  const job = jobs.get(id);
  if (job) jobs.set(id, { ...job, ...update });
}

// ─── URL matchers ─────────────────────────────────────────────────────────────

function isSuccessUrl(url: string): boolean {
  return (
    url.includes("linkedin.com/feed") ||
    url.includes("linkedin.com/mynetwork") ||
    url.includes("linkedin.com/home") ||
    url.includes("linkedin.com/in/") // sometimes redirects to own profile
  );
}

function isVerificationUrl(url: string): boolean {
  return (
    url.includes("linkedin.com/checkpoint") ||
    url.includes("linkedin.com/uas/login-submit") ||
    url.includes("linkedin.com/login-submit") ||
    url.includes("security/captcha") ||
    url.includes("verify") ||
    url.includes("challenge")
  );
}

// ─── Full Playwright capture runner ───────────────────────────────────────────

async function runCapture(jobId: string) {
  const AUTH_FILE_PATH = path.join(process.cwd(), "auth.json");

  const playwright = await import("playwright").catch(() => null);
  if (!playwright?.chromium) {
    updateJob(jobId, {
      status: "error",
      message: "Playwright not installed.",
      error: "Run: npx playwright install chromium",
    });
    return;
  }

  // headless=true for Linux servers without a display (PLAYWRIGHT_HEADLESS=true)
  // headless=false (default) for local dev / Windows / GUI servers
  const headless = process.env.PLAYWRIGHT_HEADLESS === "true";

  // Session capture timeout — 10 minutes to handle slow 2FA or CAPTCHA flows
  const CAPTURE_TIMEOUT_MS = 10 * 60 * 1000;

  let browser: any;
  try {
    updateJob(jobId, {
      status: "browser_launched",
      message: headless
        ? "Headless browser launched (PLAYWRIGHT_HEADLESS=true). Opening LinkedIn…"
        : "Browser launched. Opening LinkedIn login…",
    });

    browser = await playwright.chromium.launch({
      headless,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled", // avoid bot detection
        "--disable-infobars",
      ],
    });

    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      viewport: { width: 1280, height: 800 },
      // Mimic a real browser more closely
      extraHTTPHeaders: {
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // Remove webdriver property to avoid bot detection
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });

    const page = await context.newPage();

    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    updateJob(jobId, {
      status: "waiting_login",
      message: "LinkedIn login page is open. Enter your email and password.",
    });

    let resolved = false;
    let verificationShown = false;

    // Watch for URL changes to give real-time feedback
    page.on("framenavigated", async (frame: any) => {
      if (frame !== page.mainFrame()) return;
      const url = frame.url();

      if (!resolved && !verificationShown && isVerificationUrl(url)) {
        verificationShown = true;
        updateJob(jobId, {
          status: "verification_required",
          message:
            "Verification required. Complete the security check in the browser (2FA code, phone verification, or CAPTCHA), then you will be logged in automatically.",
        });
      }
    });

    await Promise.race([
      // ── Success: redirected to LinkedIn main pages ──
      (async () => {
        await page.waitForURL((url: URL) => isSuccessUrl(url.href), {
          timeout: CAPTURE_TIMEOUT_MS,
        });
        resolved = true;
      })(),

      // ── Browser manually closed by user ──
      new Promise<void>((_, reject) =>
        page.on("close", () => {
          if (!resolved) reject(new Error("BROWSER_CLOSED"));
        })
      ),

      // ── Overall timeout ──
      new Promise<void>((_, reject) =>
        setTimeout(() => {
          if (!resolved) reject(new Error("TIMEOUT"));
        }, CAPTURE_TIMEOUT_MS)
      ),
    ]);

    updateJob(jobId, {
      status: "login_detected",
      message: "Login confirmed! Waiting for cookies to settle…",
    });

    // Wait for LinkedIn to fully set all session cookies
    await page.waitForTimeout(3000);

    // ── Try to get the user's name from the page ──
    updateJob(jobId, { status: "fetching_profile", message: "Fetching your LinkedIn profile…" });

    let profileName = "LinkedIn Agent";
    let profilePicture = "";

    try {
      // Navigate to LinkedIn's "me" page to get profile info
      await page.goto("https://www.linkedin.com/in/me/", {
        waitUntil: "domcontentloaded",
        timeout: 15000,
      });

      // Try extracting from page metadata or profile h1
      const title = await page.title().catch(() => "");
      if (title && !title.toLowerCase().includes("linkedin")) {
        // Title is usually "Name | LinkedIn"
        profileName = title.split("|")[0].trim() || profileName;
      }

      // Try h1 on profile page
      const h1 = await page.$eval("h1", (el: Element) => el.textContent?.trim()).catch(() => null);
      if (h1) profileName = h1;

      // Try profile picture
      const img = await page.$eval(
        'img[class*="profile-photo"], img[class*="pv-top-card"], .profile-photo-edit img',
        (el: Element) => (el as HTMLImageElement).src
      ).catch(() => "");
      if (img && !img.includes("data:")) profilePicture = img;
    } catch {
      // Profile fetch is best-effort — don't fail the whole capture
    }

    updateJob(jobId, { status: "capturing", message: "Saving session cookies…" });

    // Navigate back to feed before capturing state (ensures all cookies are set)
    await page.goto("https://www.linkedin.com/feed/", {
      waitUntil: "domcontentloaded",
      timeout: 15000,
    }).catch(() => {});

    await page.waitForTimeout(1500);

    const storageState = await context.storageState();
    await browser.close();

    // ── Validate li_at cookie exists ──
    const liAt = storageState.cookies?.find(
      (c: any) => c.name === "li_at" && c.domain.includes("linkedin.com")
    );

    if (!liAt) {
      updateJob(jobId, {
        status: "invalid_session",
        message: "Session capture failed — li_at cookie not found.",
        error:
          "LinkedIn did not set the session cookie. This may happen if you used a passwordless login or if LinkedIn blocked the session. Try again with email + password.",
      });
      return;
    }

    const expiresAt =
      liAt.expires && liAt.expires > 0
        ? new Date(liAt.expires * 1000).toISOString()
        : null;

    // ── Build agent ──
    const agentId = `agent_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const newAgent = {
      id: agentId,
      addedAt: new Date().toISOString(),
      provider: "playwright" as const,
      expiresAt,
      profile: {
        id: "",            // LinkedIn internal ID — populate via API if needed
        name: profileName,
        email: "",         // Not available via cookie capture — populate via form if needed
        picture: profilePicture,
      },
      // ── Cookies stored as-is for now ──
      // TODO (prod): encrypt before storing in DB
      // Use AES-256-GCM with a server-side ENCRYPTION_KEY env var
      cookies: storageState.cookies,
      origins: storageState.origins,
    };

    // ── Persist: file-based (dev) ──
    // TODO (prod): replace with DB insert — see LINKEDIN_PLAYWRIGHT_GUIDE.txt
    let store: any = { version: 2, agents: [] };
    try {
      if (fs.existsSync(AUTH_FILE_PATH)) {
        const raw = fs.readFileSync(AUTH_FILE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        store = parsed.version === 2 ? parsed : { version: 2, agents: [] };
      }
    } catch {}

    store.agents.push(newAgent);
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");

    updateJob(jobId, {
      status: "success",
      message: `Agent "${profileName}" connected successfully!`,
      agentId,
      profileName,
    });

    console.log(`[Capture][${jobId}] ✅ Done — Agent: ${agentId} | Name: ${profileName}`);
  } catch (err: any) {
    try { await browser?.close(); } catch {}

    if (err.message === "BROWSER_CLOSED") {
      updateJob(jobId, {
        status: "browser_closed",
        message: "Browser was closed before login completed.",
        error:
          "Keep the browser window open until you are redirected to your LinkedIn feed. If you have 2FA, complete the verification first.",
      });
      return;
    }

    if (err.message === "TIMEOUT") {
      updateJob(jobId, {
        status: "timeout",
        message: "Session capture timed out after 10 minutes.",
        error:
          "The login or verification took too long. Try again — if you have a slow connection or complex 2FA, increase CAPTURE_TIMEOUT_MS in the capture route.",
      });
      return;
    }

    const msg = err instanceof Error ? err.message : "Unknown error";
    updateJob(jobId, { status: "error", message: "Capture failed.", error: msg });
    console.error(`[Capture][${jobId}] ❌ Error:`, msg);
  }
}

// ─── POST — Start a new capture job ──────────────────────────────────────────

export async function POST() {
  if (process.env.DISABLE_PLAYWRIGHT === "true") {
    return NextResponse.json(
      {
        error: "Playwright capture is disabled on this server.",
        suggestion:
          "Remove DISABLE_PLAYWRIGHT from env or set it to false. On Linux, also install Xvfb for headed mode or set PLAYWRIGHT_HEADLESS=true.",
      },
      { status: 403 }
    );
  }

  const playwright = await import("playwright").catch(() => null);
  if (!playwright?.chromium) {
    return NextResponse.json(
      {
        error: "Playwright browsers not installed.",
        suggestion: "Run: npx playwright install chromium",
      },
      { status: 500 }
    );
  }

  const jobId = createJob();
  runCapture(jobId); // fire-and-forget — client polls for status

  return NextResponse.json({
    jobId,
    status: "pending",
    message: "Browser is launching…",
  });
}

// ─── GET — Poll job status ────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId." }, { status: 400 });
  }

  const job = jobs.get(jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found or expired." }, { status: 404 });
  }

  return NextResponse.json({ jobId, ...job });
}
