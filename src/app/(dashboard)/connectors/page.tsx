"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  User,
  ShieldCheck,
  Info,
  ArrowRight,
  Zap,
  Monitor,
  WifiOff,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Agent = {
  id: string;
  addedAt: string;
  provider: "linkedin_oauth" | "playwright";
  expiresAt?: string | null;
  isExpired?: boolean;
  profile: { id: string; name: string; email: string; picture: string };
};

type CaptureStatus =
  | "idle"
  | "pending"
  | "browser_launched"
  | "waiting_login"
  | "verification_required"
  | "login_detected"
  | "fetching_profile"
  | "capturing"
  | "success"
  | "error"
  | "browser_closed"
  | "timeout"
  | "invalid_session";

const STEP_ORDER: CaptureStatus[] = [
  "pending",
  "browser_launched",
  "waiting_login",
  "login_detected",
  "fetching_profile",
  "capturing",
  "success",
];

const STEP_LABELS: Partial<Record<CaptureStatus, string>> = {
  pending: "Starting Playwright…",
  browser_launched: "Browser launched",
  waiting_login: "Waiting for you to sign in",
  verification_required: "Complete verification (2FA / CAPTCHA)",
  login_detected: "Login confirmed!",
  fetching_profile: "Fetching your LinkedIn profile…",
  capturing: "Saving session cookies…",
  success: "Agent connected!",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConnectorsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProduction, setIsProduction] = useState(false);
  const [playwrightDisabled, setPlaywrightDisabled] = useState(false);

  // Capture flow
  const [capturing, setCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState<CaptureStatus>("idle");
  const [captureMsg, setCaptureMsg] = useState("");
  const [captureError, setCaptureError] = useState("");
  const [captureProfile, setCaptureProfile] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Removal
  const [removingId, setRemovingId] = useState<string | null>(null);

  // ── Fetch agents ──
  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/linkedin/auth");
      if (res.ok) {
        const data = await res.json();
        setAgents(data.agents ?? []);
        setIsProduction(data.isProduction ?? false);
        setPlaywrightDisabled(data.playwrightDisabled ?? false);
      }
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  // ── Stop polling ──
  const stopPolling = useCallback(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  }, []);

  useEffect(() => () => stopPolling(), [stopPolling]);

  // ── Poll job status ──
  const startPolling = useCallback((id: string) => {
    stopPolling();
    const TERMINAL: CaptureStatus[] = ["success", "error", "browser_closed", "timeout"];

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/linkedin/capture?jobId=${id}`);
        if (!res.ok) { stopPolling(); setCaptureStatus("error"); setCaptureMsg("Job lost."); return; }

        const data = await res.json();
        setCaptureStatus(data.status);
        setCaptureMsg(data.message || "");
        setCaptureError(data.error || "");
        if (data.profileName) setCaptureProfile(data.profileName);

        if (TERMINAL.includes(data.status)) {
          stopPolling();
          setCapturing(false);
          if (data.status === "success") fetchAgents();
        }
      } catch {}
    }, 1500);
  }, [stopPolling, fetchAgents]);

  // ── Start Playwright capture ──
  const handleAddAgent = async () => {
    if (isProduction) return;
    setCapturing(true);
    setCaptureStatus("pending");
    setCaptureMsg("Starting…");
    setCaptureError("");

    try {
      const res = await fetch("/api/linkedin/capture", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setCapturing(false);
        setCaptureStatus("error");
        setCaptureMsg(data.error || "Failed to start capture.");
        setCaptureError(data.suggestion || "");
        return;
      }

      startPolling(data.jobId);
    } catch (err: any) {
      setCapturing(false);
      setCaptureStatus("error");
      setCaptureMsg(err.message || "Network error.");
    }
  };

  const handleReset = () => {
    stopPolling();
    setCapturing(false);
    setCaptureStatus("idle");
    setCaptureMsg("");
    setCaptureError("");
    setCaptureProfile("");
  };

  // ── Remove agent ──
  const handleRemove = async (agentId: string, name: string) => {
    if (!confirm(`Remove agent "${name}"?`)) return;
    setRemovingId(agentId);
    try {
      await fetch(`/api/linkedin/auth?agentId=${agentId}`, { method: "DELETE" });
      fetchAgents();
    } finally { setRemovingId(null); }
  };

  // ── Step index helper ──
  const currentStep = STEP_ORDER.indexOf(
    captureStatus === "verification_required" ? "waiting_login" : captureStatus
  );
  const isTerminalError = ["error", "browser_closed", "timeout", "invalid_session"].includes(captureStatus);

  // ─────────────────────────────────────────────────────────────────────────────

  function AgentCard({ agent, index }: { agent: Agent; index: number }) {
    const expired = agent.isExpired;
    const isRemoving = removingId === agent.id;
    const expiresDate = agent.expiresAt ? new Date(agent.expiresAt).toLocaleDateString() : null;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, y: -8 }}
        transition={{ delay: index * 0.05 }}
        className="glass-card rounded-[2rem] border border-white/10 bg-black/40 overflow-hidden"
      >
        <div className={`h-0.5 ${expired ? "bg-amber-500/40" : "bg-green-500/40"}`} />
        <div className="p-5 flex items-start gap-4">
          <div className="relative shrink-0">
            {agent.profile.picture ? (
              <img src={agent.profile.picture} alt={agent.profile.name}
                className="w-12 h-12 rounded-xl border border-white/15 object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-[#0077B5]/20 border border-[#0077B5]/30 flex items-center justify-center">
                <User size={20} className="text-[#0077B5]" />
              </div>
            )}
            <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-black/60 ${expired ? "bg-amber-500" : "bg-green-500"}`} />
          </div>

          <div className="grow min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white truncate max-w-[160px]">
                {agent.profile.name || `Agent ${agent.id.slice(-5)}`}
              </span>
              {expired ? (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Clock size={9} /> Expired
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                  <ShieldCheck size={9} /> Active
                </span>
              )}
            </div>
            {agent.profile.email && (
              <div className="text-xs text-dim-grey mt-0.5 truncate">{agent.profile.email}</div>
            )}
            <div className="flex items-center gap-3 mt-2 text-[10px] text-white/30 font-medium">
              <span className="flex items-center gap-1">
                <Monitor size={9} />
                {agent.provider === "playwright" ? "Session capture" : "OAuth"}
              </span>
              {expiresDate && <span>· Exp {expiresDate}</span>}
            </div>
          </div>

          <button
            onClick={() => handleRemove(agent.id, agent.profile.name || "Agent")}
            disabled={isRemoving || isProduction}
            title={isProduction ? "Cannot remove on production" : "Remove agent"}
            className="shrink-0 p-2 rounded-xl bg-red-500/10 border border-red-500/15 text-red-400 hover:bg-red-500/20 active:scale-95 disabled:opacity-30 transition-all"
          >
            {isRemoving ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
          </button>
        </div>
      </motion.div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8 pb-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">LinkedIn Agents</h1>
          <p className="text-dim-grey text-sm sm:text-base">
            Connect multiple LinkedIn accounts to power your outbound campaigns.
          </p>
        </div>
        <button onClick={fetchAgents} disabled={loading}
          className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-5 py-3 rounded-2xl hover:bg-white/10 disabled:opacity-50 transition-all text-sm">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Playwright disabled warning */}
      {playwrightDisabled && (
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-amber-300/80 text-sm">
          <WifiOff size={18} className="shrink-0 mt-0.5 text-amber-400" />
          <div>
            <div className="font-bold text-amber-300 mb-1">Playwright is disabled on this server</div>
            <div className="text-xs text-amber-400/70 leading-relaxed">
              Set <code className="font-mono bg-white/5 px-1 rounded">DISABLE_PLAYWRIGHT=false</code> in your server environment to enable the LinkedIn browser capture. On Linux servers without a display, also set <code className="font-mono bg-white/5 px-1 rounded">PLAYWRIGHT_HEADLESS=true</code> and install Xvfb.
            </div>
          </div>
        </div>
      )}

      {/* Count + Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5">
            <Zap size={14} className="text-[#0077B5]" />
            <span className="text-sm font-bold">{agents.length}</span>
            <span className="text-sm text-dim-grey">{agents.length === 1 ? "Agent" : "Agents"} Connected</span>
          </div>
          {agents.length > 0 && (
            <div className="text-xs text-dim-grey">
              {agents.filter(a => !a.isExpired).length} active · {agents.filter(a => a.isExpired).length} expired
            </div>
          )}
        </div>

        {!playwrightDisabled && (
          <button
            onClick={capturing ? undefined : handleAddAgent}
            disabled={capturing}
            className="flex items-center justify-center gap-2.5 bg-[#0077B5] hover:bg-[#005f9e] active:scale-[0.98] disabled:opacity-60 text-white font-bold px-6 py-3.5 rounded-2xl transition-all text-sm shadow-[0_6px_24px_rgba(0,119,181,0.3)]"
          >
            {capturing ? <Loader2 size={16} className="animate-spin" /> : <Plus size={17} />}
            {capturing ? "Connecting…" : "Add LinkedIn Agent"}
          </button>
        )}
      </div>

      {/* ── Capture progress panel ── */}
      <AnimatePresence>
        {captureStatus !== "idle" && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-card rounded-[2rem] border border-white/10 bg-black/40 p-6 space-y-5"
          >
            {/* Error state */}
            {isTerminalError ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                  <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-bold text-red-300">{captureMsg}</div>
                    {captureError && <div className="text-xs text-red-400/70 mt-1">{captureError}</div>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleAddAgent}
                    className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#005f9e] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
                    <RefreshCw size={13} /> Try Again
                  </button>
                  <button onClick={handleReset}
                    className="text-xs text-dim-grey hover:text-white transition-colors px-3">
                    Cancel
                  </button>
                </div>
              </div>
            ) : captureStatus === "success" ? (
              /* Success state */
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-green-300">
                      {captureProfile ? `"${captureProfile}" connected!` : "Agent connected successfully!"}
                    </div>
                    <div className="text-xs text-green-400/60 mt-0.5">Ready to use in campaigns.</div>
                  </div>
                </div>
                <button onClick={handleReset}
                  className="text-xs text-dim-grey hover:text-white transition-colors">
                  Done
                </button>
              </div>
            ) : (
              /* Progress steps */
              <div className="space-y-5">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0077B5]/10 border border-[#0077B5]/25">
                  <div className="w-8 h-8 rounded-full bg-[#0077B5]/20 flex items-center justify-center shrink-0">
                    <Loader2 size={16} className="animate-spin text-[#0077B5]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold">{captureMsg}</div>
                {captureStatus === "verification_required" && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    <span className="text-base leading-none">🔐</span>
                    <span>Complete the verification in the browser (2FA code, phone confirmation, or CAPTCHA). The capture will continue automatically once done.</span>
                  </div>
                )}
                {captureStatus !== "verification_required" && captureStatus === "waiting_login" && (
                  <div className="text-xs text-dim-grey">
                    Sign in normally — the window will close automatically after login.
                  </div>
                )}
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-2.5 pl-1">
                  {STEP_ORDER.map((step) => {
                    const stepIdx = STEP_ORDER.indexOf(step as CaptureStatus);
                    const done = stepIdx < currentStep;
                    const active = stepIdx === currentStep;
                    const label = STEP_LABELS[step as CaptureStatus];
                    if (!label) return null;
                    return (
                      <div key={step} className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          done ? "bg-green-500 border-green-500"
                          : active ? "border-[#0077B5] bg-[#0077B5]/10"
                          : "border-white/10"
                        }`}>
                          {done
                            ? <CheckCircle2 size={9} className="text-white" />
                            : active
                            ? <Loader2 size={8} className="animate-spin text-[#0077B5]" />
                            : null}
                        </div>
                        <span className={`text-xs transition-colors ${
                          done ? "text-green-400"
                          : active ? "text-white font-medium"
                          : "text-white/25"
                        }`}>{label}</span>
                      </div>
                    );
                  })}
                </div>

                <button onClick={handleReset} className="text-xs text-dim-grey hover:text-white transition-colors">
                  Cancel
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Agent grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-28 rounded-[2rem] bg-white/3 border border-white/5 animate-pulse" />
          ))}
        </div>
      ) : agents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[2.5rem] border border-white/5 bg-white/2 p-12 flex flex-col items-center text-center gap-5"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0077B5]/10 border border-[#0077B5]/20 flex items-center justify-center">
            <Linkedin size={32} className="text-[#0077B5]/60" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">No agents connected yet</h3>
            <p className="text-dim-grey text-sm max-w-sm">
              Add your LinkedIn accounts to start running automated outbound campaigns at scale.
            </p>
          </div>
          {!playwrightDisabled && (
            <button onClick={handleAddAgent}
              className="flex items-center gap-2.5 bg-[#0077B5] hover:bg-[#005f9e] active:scale-[0.98] text-white font-bold px-7 py-4 rounded-2xl transition-all shadow-[0_8px_30px_rgba(0,119,181,0.3)]">
              <Linkedin size={18} />
              Connect your first LinkedIn account
              <ArrowRight size={16} />
            </button>
          )}
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {agents.map((agent, i) => (
              <AgentCard key={agent.id} agent={agent} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Production remove note */}
      {isProduction && agents.length > 0 && (
        <div className="flex items-start gap-2.5 text-xs text-dim-grey">
          <Info size={12} className="shrink-0 mt-0.5" />
          To remove agents on production, update the <code className="font-mono bg-white/5 px-1 rounded">LINKEDIN_AUTH_JSON</code> env variable in Vercel and redeploy.
        </div>
      )}
    </div>
  );
}
