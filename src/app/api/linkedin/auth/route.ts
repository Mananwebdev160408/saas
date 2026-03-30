import { NextResponse } from "next/server";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const playwright = await import("playwright").catch(() => null);

    if (!playwright?.chromium) {
      return NextResponse.json(
        {
          error: "Playwright is not installed. Run: npm install playwright",
        },
        { status: 500 }
      );
    }

    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.linkedin.com/login", {
      waitUntil: "domcontentloaded",
    });

    // Manual login window for the user.
    await page.waitForTimeout(30000);

    const authFilePath = path.join(process.cwd(), "auth.json");
    const authJson = await context.storageState({ path: authFilePath });

    await browser.close();

    return NextResponse.json({
      message: "LinkedIn login captured successfully.",
      authJson,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error while capturing LinkedIn auth session.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
