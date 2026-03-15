"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative">
      <Navbar />
      
      {/* Randomized Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute top-[10%] -right-20 w-[600px] opacity-[0.05] mix-blend-screen"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute bottom-[-10%] -left-40 w-[500px] opacity-[0.03] mix-blend-screen"
          animate={{ scale: [1, 1.2, 1], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 metallic-text"
          >
            About HeyReach
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed space-y-6"
          >
            <p>
              HeyReach is the ultimate LinkedIn automation tool designed for agencies, sales teams, and GTM operators who need to scale their outreach without compromising on quality or safety.
            </p>
            <p>
              Our mission is to empower businesses with the most advanced, human-like automation technology available. We believe that outreach should be efficient, personalized, and effective.
            </p>
            <div className="py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="text-white font-bold mb-2">Innovation</h3>
                  <p className="text-sm">Constantly pushing the boundaries of what's possible in automation.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="text-white font-bold mb-2">Safety</h3>
                  <p className="text-sm">Built-in protections to keep your professional reputation intact.</p>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-white/10">
                  <h3 className="text-white font-bold mb-2">Success</h3>
                  <p className="text-sm">Dedicated to helping our customers achieve their growth goals.</p>
                </div>
              </div>
            </div>
            <p>
              Join thousands of companies who trust HeyReach to drive their outbound engine.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
