"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative">
      <Navbar />
      
      {/* Randomized Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute top-[-5%] left-[-10%] w-[500px] opacity-[0.18] mix-blend-screen"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
        <motion.img 
          src="/blob.png"
          alt=""
          className="absolute bottom-[20%] right-[-15%] w-[600px] opacity-[0.15] mix-blend-screen scale-x-[-1]"
          animate={{ scale: [1, 1.1, 1], x: [0, -40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-12 metallic-text text-center"
          >
            Privacy Policy
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="prose prose-invert max-w-none text-gray-400 text-sm leading-relaxed space-y-8"
          >
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">1. Data Collection</h2>
              <p>
                We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, company information, and LinkedIn account details necessary for automation.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect HeyReach and our users. This includes facilitating LinkedIn automation as requested by you.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">3. Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h2 className="text-white font-bold text-xl mb-4">4. Your Choices</h2>
              <p>
                You may update, correct or delete information about you at any time by logging into your online account or emailing us.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
