import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AUTH_FILE_PATH = path.join(process.cwd(), "auth.json");
const ENV_VAR_NAME = "LINKEDIN_AUTH_JSON";

// ─── Agent type ───────────────────────────────────────────────────────────────

export type Agent = {
  id: string;
  addedAt: string;
  provider: "linkedin_oauth" | "playwright";
  accessToken?: string;
  tokenType?: string;
  expiresAt?: string | null;
  scope?: string;
  profile: {
    id: string;
    name: string;
    email: string;
    picture: string;
  };
  // Playwright sessions store raw cookies
  cookies?: any[];
  origins?: any[];
};

export type AgentsStore = {
  version: 2;
  agents: Agent[];
};

// ─── Storage helpers ──────────────────────────────────────────────────────────

function readStore(): AgentsStore {
  const isVercel = process.env.VERCEL === "1";

  const raw = isVercel
    ? process.env[ENV_VAR_NAME]
    : (() => {
        try {
          if (fs.existsSync(AUTH_FILE_PATH)) return fs.readFileSync(AUTH_FILE_PATH, "utf-8");
        } catch {}
        return null;
      })();

  if (!raw) return { version: 2, agents: [] };

  try {
    const parsed = JSON.parse(raw);

    // ── Migrate v1 single-agent format → v2 multi-agent ──
    if (parsed.version !== 2) {
      const agent = migrateV1(parsed);
      return { version: 2, agents: agent ? [agent] : [] };
    }

    return parsed as AgentsStore;
  } catch {
    return { version: 2, agents: [] };
  }
}

function writeStore(store: AgentsStore): void {
  const isVercel = process.env.VERCEL === "1";
  if (isVercel) return; // Can't write files on Vercel — env var only
  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

/** Convert old single auth.json format to a v2 Agent */
function migrateV1(old: any): Agent | null {
  // OAuth v1 format
  if (old.provider === "linkedin_oauth" && old.accessToken) {
    return {
      id: `agent_migrated_${Date.now()}`,
      addedAt: old.obtainedAt || new Date().toISOString(),
      provider: "linkedin_oauth",
      accessToken: old.accessToken,
      tokenType: old.tokenType,
      expiresAt: old.expiresAt ?? null,
      scope: old.scope,
      profile: old.profile ?? { id: "", name: "Migrated Agent", email: "", picture: "" },
    };
  }
  // Playwright cookie format
  if (old.cookies && Array.isArray(old.cookies)) {
    const liAt = old.cookies.find((c: any) => c.name === "li_at");
    if (!liAt) return null;
    const expiresMs = liAt.expires * 1000;
    return {
      id: `agent_migrated_${Date.now()}`,
      addedAt: new Date().toISOString(),
      provider: "playwright",
      expiresAt: expiresMs > 0 ? new Date(expiresMs).toISOString() : null,
      profile: { id: "", name: "Playwright Agent", email: "", picture: "" },
      cookies: old.cookies,
      origins: old.origins ?? [],
    };
  }
  return null;
}

function agentSummary(agent: Agent) {
  const expiresAt = agent.expiresAt ? new Date(agent.expiresAt).getTime() : null;
  const isExpired = expiresAt ? expiresAt < Date.now() : false;
  return { ...agent, isExpired };
}

// ─── GET — List all agents ────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const isVercel = process.env.VERCEL === "1";
  const agentId = req.nextUrl.searchParams.get("agentId");

  const store = readStore();

  if (agentId) {
    const agent = store.agents.find((a) => a.id === agentId);
    if (!agent) return NextResponse.json({ error: "Agent not found." }, { status: 404 });
    return NextResponse.json(agentSummary(agent));
  }

  return NextResponse.json({
    agents: store.agents.map(agentSummary),
    count: store.agents.length,
    isProduction: isVercel,
  });
}

// ─── POST — Add a new agent ───────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const isVercel = process.env.VERCEL === "1";
  const body = await req.json().catch(() => ({}));

  if (!body.agent) {
    return NextResponse.json({ error: "Missing 'agent' in request body." }, { status: 400 });
  }

  const incoming = body.agent as Partial<Agent>;

  // Basic validation
  if (!incoming.accessToken && !incoming.cookies) {
    return NextResponse.json(
      { error: "Agent must have an accessToken (OAuth) or cookies (Playwright)." },
      { status: 400 }
    );
  }

  // Prevent duplicate LinkedIn accounts
  const store = readStore();
  const linkedInId = incoming.profile?.id;
  if (linkedInId) {
    const existing = store.agents.find((a) => a.profile?.id === linkedInId);
    if (existing) {
      // Update existing agent (re-auth)
      const idx = store.agents.indexOf(existing);
      store.agents[idx] = {
        ...existing,
        ...incoming,
        id: existing.id,
        addedAt: existing.addedAt,
      };
      if (!isVercel) writeStore(store);
      return NextResponse.json({
        success: true,
        message: "Agent re-authenticated successfully.",
        agent: agentSummary(store.agents[idx]),
      });
    }
  }

  const newAgent: Agent = {
    id: `agent_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    addedAt: new Date().toISOString(),
    provider: incoming.provider ?? "linkedin_oauth",
    accessToken: incoming.accessToken,
    tokenType: incoming.tokenType ?? "Bearer",
    expiresAt: incoming.expiresAt ?? null,
    scope: incoming.scope ?? "",
    profile: incoming.profile ?? { id: "", name: "LinkedIn Agent", email: "", picture: "" },
    cookies: incoming.cookies,
    origins: incoming.origins,
  };

  store.agents.push(newAgent);
  if (!isVercel) writeStore(store);

  return NextResponse.json({
    success: true,
    message: `Agent "${newAgent.profile.name || "LinkedIn Agent"}" added successfully.`,
    agent: agentSummary(newAgent),
    totalAgents: store.agents.length,
  });
}

// ─── DELETE — Remove a specific agent ────────────────────────────────────────

export async function DELETE(req: NextRequest) {
  const isVercel = process.env.VERCEL === "1";

  if (isVercel) {
    return NextResponse.json(
      {
        error: "Cannot delete agents on production via API.",
        suggestion: "Update the LINKEDIN_AUTH_JSON environment variable in Vercel and redeploy.",
      },
      { status: 403 }
    );
  }

  const agentId = req.nextUrl.searchParams.get("agentId");

  const store = readStore();

  if (!agentId) {
    // Clear ALL agents
    store.agents = [];
    writeStore(store);
    return NextResponse.json({ success: true, message: "All agents removed." });
  }

  const before = store.agents.length;
  store.agents = store.agents.filter((a) => a.id !== agentId);

  if (store.agents.length === before) {
    return NextResponse.json({ error: "Agent not found." }, { status: 404 });
  }

  writeStore(store);
  return NextResponse.json({ success: true, message: "Agent removed.", remaining: store.agents.length });
}
