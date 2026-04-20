"use client";

import { motion } from "framer-motion";
import { 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  Users, 
  Globe, 
  Zap,
  ChevronRight,
  Database
} from "lucide-react";

export default function SettingsPage() {
  const sections = [
    {
      title: "Workspace Settings",
      icon: Settings,
      items: [
        { label: "General Information", desc: "Workspace name, logo, and time zone", icon: Globe },
        { label: "Team Management", desc: "Invite members and manage permissions", icon: Users },
        { label: "Data Retention", desc: "Configure how long we store lead data", icon: Database },
      ]
    },
    {
      title: "Integrations & API",
      icon: Zap,
      items: [
        { label: "CRM Connections", desc: "Sync with HubSpot, Salesforce, Pipedrive", icon: Zap },
        { label: "API Access Tokens", desc: "Manage API keys for external integrations", icon: Shield },
        { label: "Webhooks", desc: "Receive real-time updates for events", icon: Bell },
      ]
    },
    {
      title: "Billing & Security",
      icon: Shield,
      items: [
        { label: "Subscription Plan", desc: "Currently on the Professional Plan", icon: CreditCard },
        { label: "Payment Methods", desc: "Manage credit cards and billing address", icon: CreditCard },
        { label: "Security & MFA", desc: "Two-factor authentication and login history", icon: Shield },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Workspace Settings</h1>
        <p className="text-dim-grey text-sm sm:text-base">Configure your environment, team, and security preferences.</p>
      </div>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 px-4">
                <section.icon size={20} className="text-dim-grey" />
                <h2 className="text-lg font-bold font-display uppercase tracking-widest text-white/80">{section.title}</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {section.items.map((item) => (
                <button 
                  key={item.label}
                  className="glass-card p-6 rounded-[2rem] border border-white/5 bg-black/40 hover:bg-white/2 hover:border-white/20 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-dim-grey group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-white group-hover:text-white transition-colors">{item.label}</h4>
                      <p className="text-[11px] text-dim-grey mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-dim-grey group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Danger Zone */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-8 rounded-[2.5rem] border border-red-500/10 bg-red-500/5 mt-20"
      >
        <h3 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h3>
        <p className="text-red-400/60 text-sm mb-6">Irreversible actions that affect your entire workspace.</p>
        <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-xl border border-red-500/20 text-red-500 text-sm font-bold hover:bg-red-500/10 transition-all">Archive Workspace</button>
            <button className="px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all">Delete Forever</button>
        </div>
      </motion.div>
    </div>
  );
}
