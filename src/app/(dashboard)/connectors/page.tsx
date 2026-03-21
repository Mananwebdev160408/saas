"use client";

import { motion } from "framer-motion";
import { Zap, Plus } from "lucide-react";

export default function ConnectorsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Connectors</h1>
          <p className="text-dim-grey">Manage your integrations and data sources</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all">
          <Plus size={20} />
          Add Connector
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["LinkedIn", "Email", "CRM"].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-4xl border border-white/5 bg-white/2 hover:border-white/10 transition-all"
          >
            <div className="p-3 w-fit rounded-xl bg-white/5 mb-4 text-blue-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">{item}</h3>
            <p className="text-sm text-dim-grey mb-4">Connect your {item} account to scale your outreach.</p>
            <button className="text-sm font-bold text-white/60 hover:text-white transition-colors">Configure →</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
