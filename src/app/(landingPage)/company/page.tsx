"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Globe, Heart, Shield, Cpu } from "lucide-react";

export default function CompanyPage() {
  const team = [
    { name: "Alex Rivet", role: "Co-Founder & CEO", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
    { name: "Elena Volkov", role: "Head of Engineering", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" },
    { name: "Jordan Smith", role: "Head of Product", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" }
  ];

  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />
      
      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] border border-white/5 rounded-full" />
        <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] border border-white/5 rounded-full" />
      </div>

      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-32">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-8xl font-display font-bold mb-12 metallic-text tracking-tighter"
            >
              The HeyReach Story
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left items-center"
            >
              <div className="space-y-6 text-lg text-dim-grey leading-relaxed">
                <p>
                  Born out of the frustration of manual LinkedIn outreach, HeyReach was founded with a single mission: to make high-volume B2B outreach safe, scalable, and effective.
                </p>
                <p>
                  We started in a small apartment in Berlin, and today, we're a global team of 50+ experts dedicated to building the most advanced automation engine on the planet.
                </p>
                <p>
                  Our technology isn't just about sending messages; it's about creating meaningful connections at scale.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                        alt="Team working" 
                        className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    />
                </div>
                <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-3xl hidden md:block">
                    <div className="text-4xl font-bold font-display text-white">2023</div>
                    <div className="text-xs uppercase tracking-[0.2em] font-bold text-dim-grey mt-1">Foundation Year</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
            {[
              { label: "Global Reach", icon: Globe, val: "150+ Countries" },
              { label: "Stability", icon: Shield, val: "99.9% Uptime" },
              { label: "Innovation", icon: Cpu, val: "AI-Driven" },
              { label: "Customer Love", icon: Heart, val: "5000+ Users" }
            ].map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="mx-auto w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-blue-400">
                    <v.icon size={32} />
                </div>
                <div>
                    <div className="text-2xl font-bold">{v.val}</div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-dim-grey">{v.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <div className="mb-32">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold mb-4">Meet the Visionaries</h2>
                <p className="text-dim-grey">The talented people behind the technology.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {team.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/5 p-2 group-hover:border-blue-500/50 transition-all duration-500">
                    <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full bg-white/5" />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-sm text-dim-grey uppercase tracking-widest mt-1 font-bold">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
