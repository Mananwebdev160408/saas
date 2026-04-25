"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Check, ArrowRight, Loader2 } from "lucide-react";

// Google icon SVG (lucide's Chrome icon isn't the Google logo)
function GoogleIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.auth.login(data),
    onSuccess: () => {
      // Handle session storage if not using next-auth properly or 
      // just redirect if the Go backend handles cookies.
      router.push("/campaigns");
    },
    onError: (err: Error) => {
      setError(err.message);
    }
  });

  const loading = loginMutation.isPending;

  // Redirect if already signed in
  if (status === "authenticated") {
    router.replace("/campaigns");
    return null;
  }

  // ── Google sign-in ──
  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/campaigns" });
    } catch {
      setError("Google sign-in failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields."); return; }
    loginMutation.mutate({ email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-4xl p-8 sm:p-10 border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Interior glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Welcome back</h1>
          <p className="text-dim-grey text-sm">Enter your credentials to access your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center relative z-10">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-5 relative z-10">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-dim-grey ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dim-grey group-focus-within:text-white transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-bold uppercase tracking-widest text-dim-grey">Password</label>
              <Link href="#" className="text-xs font-bold text-white/40 hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dim-grey group-focus-within:text-white transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2 ml-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="peer appearance-none w-5 h-5 bg-white/5 border border-white/10 rounded-lg checked:bg-white transition-all cursor-pointer"
              />
              <Check className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity left-0.5" size={16} />
            </div>
            <label htmlFor="remember" className="text-sm text-dim-grey cursor-pointer select-none">
              Remember me for 30 days
            </label>
          </div>

          {/* Sign in button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-white text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Sign In <ArrowRight size={18} /></>}
            </span>
          </button>

          {/* Divider */}
          <div className="relative py-2 flex items-center">
            <div className="grow border-t border-white/5" />
            <span className="shrink mx-4 text-xs font-bold text-white/20 uppercase tracking-widest">or sign in with</span>
            <div className="grow border-t border-white/5" />
          </div>

          {/* Google sign-in */}
          <button
            type="button"
            id="google-signin-btn"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <GoogleIcon size={20} />
            )}
            {googleLoading ? "Redirecting to Google…" : "Sign in with Google"}
          </button>
        </form>
      </div>

      <p className="text-center mt-8 text-dim-grey">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-white font-bold hover:underline underline-offset-4">
          Sign up for free
        </Link>
      </p>
    </motion.div>
  );
}
