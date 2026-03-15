"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />
      
      {/* Randomized Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute top-[-10%] left-[-20%] w-[600px] opacity-[0.18] mix-blend-screen"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute bottom-[20%] right-[-10%] w-[500px] opacity-[0.15] mix-blend-screen scale-x-[-1]"
          animate={{ scale: [1, 1.2, 1], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 metallic-text"
          >
            Integrations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-xl mb-16 max-w-2xl mx-auto"
          >
            Connect HeyReach with your entire tech stack for a seamless GTM motion.
          </motion.p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "HubSpot", icon: "hub", color: "text-orange-500" },
              { name: "Salesforce", icon: "cloud", color: "text-blue-500" },
              { name: "Clay", icon: "texture", color: "text-white" },
              { name: "Apollo", icon: "rocket", color: "text-blue-400" },
              { name: "Pipedrive", icon: "reorder", color: "text-green-500" },
              { name: "Zapier", icon: "bolt", color: "text-orange-400" },
              { name: "Slack", icon: "forum", color: "text-purple-400" },
              { name: "Make", icon: "settings_suggest", color: "text-indigo-400" }
            ].map((tool, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
                className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col items-center gap-4 hover:border-white/30 transition-all cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <span className={`material-icons text-3xl ${tool.color}`}>{tool.icon}</span>
                </div>
                <h3 className="font-bold text-white text-lg">{tool.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-dim-grey font-bold">Connect ↗</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
