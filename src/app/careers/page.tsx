"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative">
      <Navbar />
      
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 metallic-text"
          >
            Join Our Team
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed space-y-6"
          >
            <p className="text-xl text-white font-medium">
              We're looking for outliers to help us build the future of outbound.
            </p>
            <p>
              At HeyReach, we value curiosity, autonomy, and high-impact work. We're a remote-first team of engineers, designers, and growth experts passionate about building tools that people love.
            </p>
            
            <div className="mt-16 space-y-4">
              <h2 className="text-3xl font-display font-bold text-white mb-8">Open Roles</h2>
              <div className="glass-card p-8 rounded-2xl border border-white/10 text-left hover:border-blue-500/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400">Senior Full-Stack Engineer</h3>
                    <p className="text-sm">Remote • Engineering</p>
                  </div>
                  <span className="material-icons text-dim-grey group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
              <div className="glass-card p-8 rounded-2xl border border-white/10 text-left hover:border-purple-500/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400">Growth Marketing Manager</h3>
                    <p className="text-sm">Remote • Marketing</p>
                  </div>
                  <span className="material-icons text-dim-grey group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
              <div className="glass-card p-8 rounded-2xl border border-white/10 text-left hover:border-emerald-500/50 transition-all cursor-pointer group">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400">Customer Success Lead</h3>
                    <p className="text-sm">Remote • Success</p>
                  </div>
                  <span className="material-icons text-dim-grey group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
