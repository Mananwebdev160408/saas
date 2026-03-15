"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative">
      <Navbar />
      
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-12 metallic-text text-center"
          >
            Terms of Service
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using HeyReach, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">2. Use of Services</h2>
              <p>
                You are responsible for your use of HeyReach and any content you provide. You must comply with all applicable laws and regulations, including LinkedIn's terms of service.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">3. Account Safety</h2>
              <p>
                While we implement safety measures, you acknowledge that using automation tools on LinkedIn carries inherent risks. HeyReach is not liable for any account restrictions or bans.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">4. Termination</h2>
              <p>
                We may terminate or suspend your access to HeyReach at any time, with or without cause, and with or without notice.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
