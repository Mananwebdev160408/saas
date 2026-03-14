"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Pricing() {

  const tiers = [
    {
      id: "starter",
      name: "TIER 01 // STARTER",
      price: "49",
      description: "Essential automation for individual consultants and founders.",
      buttonText: "INITIALIZE PLAN",
      features: [
        { text: "05 Dedicated Senders", included: true },
        { text: "Unified Global Inbox", included: true },
        { text: "Basic AI Generation", included: false },
        { text: "Standard Analytics", included: false },
      ],
      popular: false
    },
    {
      id: "pro",
      name: "TIER 02 // PRO",
      price: "129",
      description: "Advanced sequencing for high-performance sales departments.",
      buttonText: "DEPLOY PROFESSIONAL",
      features: [
        { text: "25 Dedicated Senders", included: true },
        { text: "Full API Infrastructure", included: true },
        { text: "GPT-4 Turbo Integration", included: true },
        { text: "Smart Sequence Delay", included: true },
      ],
      popular: true
    },
    {
      id: "agency",
      name: "TIER 03 // AGENCY",
      price: "499",
      description: "White-label solutions for lead generation agencies.",
      buttonText: "SCALE AGENCY",
      features: [
        { text: "Unlimited Senders", included: true },
        { text: "Custom Branding & Domain", included: true },
        { text: "Dedicated Nodes", included: true },
        { text: "24/7 Priority Ops", included: true },
      ],
      popular: false
    }
  ];

  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
      {/* Grid Background Overlay */}
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none"></div>

      <Navbar />

      {/* Pricing Content */}
      <section className="relative pt-48 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8"
          >
            <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Industrial Scale Outreach</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-8 uppercase italic tracking-tighter leading-tight"
          >
            Simple, <br />
            <span className="metallic-text border-t-2 border-b-2 border-white/20 py-2 sm:py-4 inline-block my-2">Transparent</span> Pricing
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-dim-grey text-xl max-w-2xl mx-auto"
          >
            Precision-engineered LinkedIn automation for high-velocity teams. Scale your outbound without the friction of hidden costs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass-card rounded-2xl p-6 sm:p-10 border-white/10 flex flex-col h-full bg-linear-to-br from-white/5 via-transparent to-white/2 group hover:border-white/20 transition-all duration-700 ${tier.popular ? 'border-2 border-white/20 md:scale-105 z-20 shadow-2xl shadow-white/5' : 'border'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 overflow-hidden w-24 h-24 pointer-events-none">
                  <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-bold py-1 px-10 transform rotate-45 translate-x-8 translate-y-3 uppercase tracking-tighter">
                    Popular
                  </div>
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-6">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-6xl font-display font-bold metallic-text">${tier.price}</span>
                  <span className="text-dim-grey text-xs font-bold uppercase tracking-[0.2em] ml-1">/ mo</span>
                </div>
                <p className="text-sm text-dim-grey leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-12 grow">
                <div className="h-px bg-white/10 w-full mb-8"></div>
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${feature.included ? 'border-white/40 text-white' : 'border-white/10 text-white/10'}`}>
                      <span className="material-icons text-xs">{feature.included ? 'check' : 'radio_button_unchecked'}</span>
                    </div>
                    <span className={`text-xs font-medium tracking-wide ${feature.included ? 'text-white/90' : 'text-white/20'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 px-6 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 ${tier.popular ? 'bg-white text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                {tier.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
