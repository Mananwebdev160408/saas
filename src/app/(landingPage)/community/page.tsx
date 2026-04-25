"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, MessageSquare, Briefcase, Star } from "lucide-react";

export default function CommunityPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO at GrowthScale",
      content: "HeyReach&apos;s consulting team helped us triple our outbound volume while maintaining a 25% acceptance rate. Unbelievable results.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      name: "Marcus Thorne",
      role: "VP of Sales, TechFlow",
      content: "The end-to-end outreach service is a game changer. We just sit back and watch the meetings roll in.",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
    }
  ];

  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      <Navbar />
      
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <section className="pt-40 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest mb-8 text-blue-400"
            >
              <Users size={14} /> Our Community & Consulting
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold mb-8 metallic-text"
            >
              Scale Your Outreach <br /> with the Experts
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-dim-grey max-w-3xl mx-auto leading-relaxed"
            >
              Whether you want to master our tools or have us handle your entire outbound engine, our community and consulting services are here to drive your growth.
            </motion.p>
          </div>

          {/* Consulting Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              {
                title: "Expert Consulting",
                description: "Book a strategic session with our GTM experts to optimize your LinkedIn presence and outreach scripts.",
                icon: Briefcase,
                color: "text-blue-400"
              },
              {
                title: "End-to-End Outreach",
                description: "Don&apos;t want to lift a finger? Our team handles everything from lead sourcing to closing meetings.",
                icon: Star,
                color: "text-purple-400"
              },
              {
                title: "Community Support",
                description: "Join thousands of experts in our private community sharing the latest outbound strategies.",
                icon: MessageSquare,
                color: "text-green-400"
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/20 transition-all group"
              >
                <div className={`p-4 w-fit rounded-2xl bg-white/5 mb-6 ${service.color} group-hover:scale-110 transition-transform`}>
                  <service.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-dim-grey leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mb-32">
            <h2 className="text-4xl font-display font-bold text-center mb-16">What Our Partners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-black/40 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Star size={80} fill="currentColor" />
                  </div>
                  <p className="text-lg italic text-gray-300 mb-8 relative z-10">&quot;{t.content}&quot;</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/10" />
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-xs text-dim-grey uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-12 rounded-[3rem] border border-blue-500/20 bg-blue-500/5 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-b from-blue-500/10 to-transparent pointer-events-none" />
            <h2 className="text-4xl font-display font-bold mb-6">Ready to Scale Your Outreach?</h2>
            <p className="text-dim-grey mb-10 max-w-2xl mx-auto">Get in touch with our team today and let&apos;s build your outbound engine together.</p>
            <button className="bg-white text-black font-black px-10 py-4 rounded-full text-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
              Talk to an Expert
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
