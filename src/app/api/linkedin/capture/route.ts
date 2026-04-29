import { NextResponse } from "next/server";
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const AUTH_FILE_PATH = path.join(process.cwd(), "auth.json");

// In-memory job store for polling
type CaptureJob = {
  id: string;
  status: string;
  message: string;
  error?: string;
  profileName?: string;
};

const jobs = new Map<string, CaptureJob>();

export async function POST() {
  if (process.env.DISABLE_PLAYWRIGHT === "true") {
    return NextResponse.json({ 
      error: "Playwright is disabled on this server.",
      suggestion: "Enable it in your environment variables."
    }, { status: 403 });
  }

  const jobId = crypto.randomUUID();
  const job: CaptureJob = {
    id: jobId,
    status: "pending",
    message: "Starting Playwright..."
  };
  jobs.set(jobId, job);

  // Run Playwright in the background
  startCapture(jobId).catch(err => {
    console.error(`Capture job ${jobId} failed:`, err);
    jobs.set(jobId, { 
      ...job, 
      status: "error", 
      message: "An unexpected error occurred.",
      error: err.message 
    });
  });

  return NextResponse.json({ jobId });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Missing jobId" }, { status: 400 });
  }

  const job = jobs.get(jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  return NextResponse.json(job);
}

async function startCapture(jobId: string) {
  const job = jobs.get(jobId)!;
  
  let browser;
  try {
    job.status = "browser_launched";
    job.message = "Launching browser...";
    
    // Launch non-headless so user can log in
    browser = await chromium.launch({ 
      headless: process.env.PLAYWRIGHT_HEADLESS === "true",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext();
    const page = await context.newPage();

    job.status = "waiting_login";
    job.message = "Please log in to LinkedIn in the browser window.";
    
    await page.goto("https://www.linkedin.com/login");

    // Wait for the user to reach the feed (success) or a checkpoint (2FA)
    // We'll wait up to 2 minutes for the user to log in
    try {
      await page.waitForURL("**/linkedin.com/feed/**", { timeout: 120000 });
    } catch (err) {
      if (page.url().includes("checkpoint")) {
        job.status = "verification_required";
        job.message = "Please complete the verification (2FA/CAPTCHA).";
        await page.waitForURL("**/linkedin.com/feed/**", { timeout: 120000 });
      } else {
        throw new Error("Login timed out or failed.");
      }
    }

    job.status = "fetching_profile";
    job.message = "Fetching your profile details...";

    // Try to get the user's name from the page
    let profileName = "LinkedIn User";
    try {
      // Small delay to let the page load
      await page.waitForTimeout(2000);
      const nameElement = await page.$(".t-16.t-black.t-bold");
      if (nameElement) {
        profileName = (await nameElement.innerText()).trim();
      }
      job.profileName = profileName;
    } catch (e) {
      console.warn("Could not fetch profile name", e);
    }

    job.status = "capturing";
    job.message = "Saving session cookies...";

    const storageState = await context.storageState();
    
    // Check if li_at cookie exists
    const liAtCookie = storageState.cookies.find(c => c.name === "li_at");
    if (!liAtCookie) {
      throw new Error("Login successful but li_at cookie was not found.");
    }

    // Save to auth.json
    saveAgent(storageState, profileName);

    job.status = "success";
    job.message = "Agent connected successfully!";

  } catch (err: any) {
    job.status = "error";
    job.message = err.message || "Capture failed.";
    job.error = err.toString();
  } finally {
    if (browser) {
      // Small delay before closing so the user sees the success or error
      await new Promise(r => setTimeout(r, 2000));
      await browser.close();
    }
  }
}

function saveAgent(storageState: any, profileName: string) {
  if (!fs.existsSync(AUTH_FILE_PATH)) {
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify({ version: 2, agents: [] }, null, 2));
  }

  const raw = fs.readFileSync(AUTH_FILE_PATH, "utf-8");
  const store = JSON.parse(raw);

  const newAgent = {
    id: `agent_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    addedAt: new Date().toISOString(),
    provider: "playwright",
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
    profile: {
      name: profileName,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileName}`,
    },
    ...storageState
  };

  store.agents.push(newAgent);
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");
}
