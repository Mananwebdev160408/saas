"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Check, ArrowRight, User, Loader2 } from "lucide-react";

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
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signupMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => api.auth.signup(data),
    onSuccess: () => {
      router.push("/login");
    },
    onError: (err: Error) => {
      setError(err.message);
    }
  });

  const loading = signupMutation.isPending;

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/campaigns" });
  };

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    signupMutation.mutate({ name, email, password });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-4xl p-8 sm:p-10 border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        {/* Subtle interior glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Create account</h1>
          <p className="text-dim-grey text-sm">Join 4,000+ companies scaling with HeyReach</p>
        </div>

        <form onSubmit={handleEmailSignUp} className="space-y-5 relative z-10">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-dim-grey ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dim-grey group-focus-within:text-white transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-dim-grey ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dim-grey group-focus-within:text-white transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-dim-grey ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dim-grey group-focus-within:text-white transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all"
              />
            </div>
            <p className="text-[10px] text-dim-grey ml-1 font-medium italic">Minimum 8 characters with one number</p>
          </div>

          <div className="flex items-start gap-2 ml-1 pt-2">
            <div className="relative flex items-center mt-0.5">
              <input 
                type="checkbox" 
                id="terms"
                required
                className="peer appearance-none w-5 h-5 bg-white/5 border border-white/10 rounded-lg checked:bg-white transition-all cursor-pointer"
              />
              <Check className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity left-0.5" size={16} />
            </div>
            <label htmlFor="terms" className="text-xs text-dim-grey leading-relaxed">
              I agree to the <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full bg-white text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <>Create Account <ArrowRight size={18} /></>}
            </span>
          </button>
        </form>

          <div className="relative py-4 flex items-center">
            <div className="grow border-t border-white/5"></div>
            <span className="shrink mx-4 text-xs font-bold text-white/20 uppercase tracking-widest">or sign up with</span>
            <div className="grow border-t border-white/5"></div>
          </div>

          <button
            type="button"
            id="google-signup-btn"
            onClick={handleGoogleSignUp}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all disabled:opacity-60"
          >
            {googleLoading ? <Loader2 size={20} className="animate-spin" /> : <GoogleIcon size={20} />}
            {googleLoading ? "Redirecting to Google…" : "Continue with Google"}
          </button>
        </div>

      <p className="text-center mt-8 text-dim-grey">
        Already have an account? <Link href="/login" className="text-white font-bold hover:underline underline-offset-4">Sign in</Link>
      </p>
    </motion.div>
  );
}
