import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const AUTH_FILE_PATH = path.join(process.cwd(), "auth.json");

function getStore() {
  if (!fs.existsSync(AUTH_FILE_PATH)) {
    return { version: 2, agents: [] };
  }
  try {
    const raw = fs.readFileSync(AUTH_FILE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read auth.json", err);
    return { version: 2, agents: [] };
  }
}

export async function GET() {
  const store = getStore();
  
  // Map internal store to public Agent type
  const agents = store.agents.map((agent: any) => ({
    id: agent.id,
    addedAt: agent.addedAt,
    provider: agent.provider,
    expiresAt: agent.expiresAt,
    isExpired: agent.expiresAt ? new Date(agent.expiresAt) < new Date() : false,
    profile: agent.profile || { name: "Unknown Agent" },
  }));

  return NextResponse.json({
    agents,
    isProduction: process.env.NODE_ENV === "production",
    playwrightDisabled: process.env.DISABLE_PLAYWRIGHT === "true"
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const agentId = searchParams.get("agentId");

  if (!agentId) {
    return NextResponse.json({ error: "Missing agentId" }, { status: 400 });
  }

  const store = getStore();
  const initialCount = store.agents.length;
  store.agents = store.agents.filter((a: any) => a.id !== agentId);

  if (store.agents.length === initialCount) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(store, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
