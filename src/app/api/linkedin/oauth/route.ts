import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/linkedin/oauth
 * Returns the LinkedIn OAuth authorization URL.
 * The frontend opens this in a popup window.
 */
export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!clientId) {
    return NextResponse.json(
      {
        error: "LINKEDIN_CLIENT_ID is not set.",
        setup: true,
        instructions: [
          "1. Go to https://www.linkedin.com/developers/apps and create an app.",
          "2. Under 'Auth', add the redirect URL: " + appUrl + "/api/linkedin/callback",
          "3. Request the scopes: openid, profile, email, w_member_social",
          "4. Copy your Client ID and Client Secret.",
          "5. Add to your .env.local: LINKEDIN_CLIENT_ID=... and LINKEDIN_CLIENT_SECRET=...",
          "6. Restart the dev server.",
        ],
      },
      { status: 400 }
    );
  }

  const redirectUri = `${appUrl}/api/linkedin/callback`;

  // LinkedIn OpenID Connect / OAuth 2.0 scopes
  // openid + profile + email = standard identity
  // w_member_social = write social actions (optional, for automation)
  const scopes = ["openid", "profile", "email"].join(" ");

  const state = `csrf_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
    state,
  });

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;

  return NextResponse.json({ authUrl, redirectUri });
}
