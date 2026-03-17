"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Lock, Check, Chrome, ArrowRight, User } from "lucide-react";

export default function SignupPage() {
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

        <div className="space-y-5 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-dim-grey ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-dim-grey group-focus-within:text-white transition-colors">
                <User size={18} />
              </div>
              <input 
                type="text" 
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
                className="peer appearance-none w-5 h-5 bg-white/5 border border-white/10 rounded-lg checked:bg-white transition-all cursor-pointer"
              />
              <Check className="absolute text-black opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity left-0.5" size={16} />
            </div>
            <label htmlFor="terms" className="text-xs text-dim-grey leading-relaxed">
              I agree to the <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
            </label>
          </div>

          <button className="group relative w-full bg-white text-black font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] overflow-hidden">
            <Link href="/campaigns" className="absolute inset-0 z-20"></Link>
            <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Create Account <ArrowRight size={18} />
            </span>
          </button>

          <div className="relative py-4 flex items-center">
            <div className="grow border-t border-white/5"></div>
            <span className="shrink mx-4 text-xs font-bold text-white/20 uppercase tracking-widest">or sign up with</span>
            <div className="grow border-t border-white/5"></div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 py-4 rounded-2xl font-semibold transition-all group">
            <Chrome size={20} className="group-hover:rotate-12 transition-transform" />
            Continue with Google
          </button>
        </div>
      </div>

      <p className="text-center mt-8 text-dim-grey">
        Already have an account? <Link href="/login" className="text-white font-bold hover:underline underline-offset-4">Sign in</Link>
      </p>
    </motion.div>
  );
}
