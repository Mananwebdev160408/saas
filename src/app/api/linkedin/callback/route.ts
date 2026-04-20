import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUTH_FILE_PATH = path.join(process.cwd(), "auth.json");

/**
 * GET /api/linkedin/callback
 * LinkedIn OAuth callback. Exchanges `code` for an access token,
 * saves auth data, then sends a postMessage to the opener window and closes.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri = `${appUrl}/api/linkedin/callback`;

  // ── Helper: return an HTML page that sends postMessage and closes the popup ──
  function popupResponse(payload: object) {
    const dataJson = JSON.stringify(payload).replace(/</g, "\\u003c");
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>LinkedIn Auth</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #0a0a0f;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .card {
      text-align: center;
      padding: 48px 32px;
      max-width: 360px;
      width: 100%;
    }
    .icon { font-size: 3rem; margin-bottom: 20px; }
    h2 { font-size: 1.25rem; margin-bottom: 8px; font-weight: 700; }
    p { color: #888; font-size: 0.875rem; line-height: 1.5; }
    .name { color: white; font-weight: 600; margin-top: 4px; font-size: 0.95rem; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon" id="icon">⏳</div>
    <h2 id="title">Connecting…</h2>
    <p id="desc">Please wait.</p>
    <div class="name" id="name"></div>
  </div>
  <script>
    const payload = ${dataJson};
    const success = payload.success === true;
    const profile = payload.agentData && payload.agentData.profile;

    document.getElementById('icon').textContent = success ? '✅' : '❌';
    document.getElementById('title').textContent = success ? 'Agent Connected!' : 'Connection Failed';
    document.getElementById('desc').textContent = success
      ? 'This window will close automatically.'
      : (payload.error || 'Please try again.');
    if (success && profile && profile.name) {
      document.getElementById('name').textContent = 'Signed in as ' + profile.name;
    }

    if (window.opener) {
      window.opener.postMessage(
        { type: 'LINKEDIN_AGENT_RESULT', ...payload },
        '${appUrl}'
      );
    }

    setTimeout(() => window.close(), 2500);
  </script>
</body>
</html>`;
    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  }

  // ── LinkedIn returned an error ──
  if (error) {
    return popupResponse({
      success: false,
      error: errorDesc || error,
    });
  }

  if (!code) {
    return popupResponse({ success: false, error: "No authorization code received from LinkedIn." });
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return popupResponse({
      success: false,
      error: "Server is missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET.",
    });
  }

  // ── Exchange code for access token ──
  let tokenData: any;
  try {
    const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
    tokenData = await tokenRes.json();
  } catch (err: any) {
    return popupResponse({ success: false, error: "Failed to exchange code: " + err.message });
  }

  if (tokenData.error || !tokenData.access_token) {
    return popupResponse({
      success: false,
      error: tokenData.error_description || tokenData.error || "Token exchange failed.",
    });
  }

  // ── Fetch LinkedIn user profile (OpenID Connect userinfo) ──
  let profile: any = {};
  try {
    const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (profileRes.ok) {
      profile = await profileRes.json();
    }
  } catch {}

  // ── Build Agent data ──
  const agentData = {
    provider: "linkedin_oauth" as const,
    accessToken: tokenData.access_token,
    tokenType: tokenData.token_type || "Bearer",
    expiresAt: new Date(Date.now() + (tokenData.expires_in || 5184000) * 1000).toISOString(),
    scope: tokenData.scope || "",
    profile: {
      id: profile.sub || profile.id || "",
      name: profile.name || [profile.given_name, profile.family_name].filter(Boolean).join(" "),
      email: profile.email || "",
      picture: profile.picture || "",
    },
  };

  return popupResponse({
    success: true,
    agentData,
    message: `Agent connected as ${agentData.profile.name || agentData.profile.email || "LinkedIn User"}`,
  });
}
