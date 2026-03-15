"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function LinkedInPage() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />
      
      {/* Randomized Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute top-[40%] -left-32 w-[700px] opacity-[0.2] mix-blend-screen"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-8 metallic-text"
          >
            LinkedIn Mastery
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none text-gray-400 text-lg leading-relaxed space-y-6"
          >
            <p className="text-xl text-white font-medium">
              Connect with us where the magic happens.
            </p>
            <p>
              We share daily insights on LinkedIn about scaling outbound, improving reply rates, and staying ahead of the algorithm. Our community is built of thousands of GTM experts exchanging real-world tactics.
            </p>
            
            <div className="py-12">
              <div className="glass-card p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20">
                    <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Official HeyReach Company Page</h3>
                  <p className="mb-8">Follow us for product updates, expert case studies, and outbound strategy.</p>
                  <button className="bg-white text-black px-10 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    View Profile
                  </button>
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
