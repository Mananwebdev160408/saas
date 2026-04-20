"use client";

import { motion } from "framer-motion";
import { User, Mail, Shield, Settings, Bell, CreditCard, ChevronRight } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Profile Header */}
      <div className="relative pt-12">
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-r from-blue-500/20 via-purple-500/20 to-transparent blur-[80px] -z-10" />
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
                <div className="w-32 h-32 rounded-full bg-linear-to-br from-white/10 to-transparent border border-white/20 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-black/40">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full" />
                    </div>
                </div>
                <button className="absolute bottom-1 right-1 p-2 bg-white text-black rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Settings size={14} />
                </button>
            </div>
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-display font-bold mb-2">Alex Johnson</h1>
                <p className="text-dim-grey flex items-center justify-center md:justify-start gap-2">
                    <Mail size={14} /> alex.johnson@example.com
                </p>
                <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest">Pro Plan</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-widest">Active</span>
                </div>
            </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account Details */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40 h-fit"
        >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-400" /> Account Details
            </h2>
            <div className="space-y-6">
                <div>
                    <label className="text-[10px] text-dim-grey uppercase font-bold tracking-widest block mb-2">Full Name</label>
                    <div className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm">Alex Johnson</div>
                </div>
                <div>
                    <label className="text-[10px] text-dim-grey uppercase font-bold tracking-widest block mb-2">Email Address</label>
                    <div className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm">alex.johnson@example.com</div>
                </div>
                <div>
                    <label className="text-[10px] text-dim-grey uppercase font-bold tracking-widest block mb-2">Timezone</label>
                    <div className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm">GMT-07:00 (Pacific Time)</div>
                </div>
            </div>
        </motion.div>

        {/* Security & Preferences */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
        >
            {/* Quick Actions */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-purple-400" /> Security
                </h2>
                <div className="space-y-4">
                    {[
                        { label: "Change Password", icon: ChevronRight },
                        { label: "Two-Factor Auth", icon: ChevronRight, status: "Off" },
                        { label: "Login History", icon: ChevronRight }
                    ].map((item) => (
                        <button key={item.label} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/2 hover:bg-white/5 transition-all text-sm group">
                            <span>{item.label}</span>
                            <div className="flex items-center gap-3">
                                {item.status && <span className="text-xs text-dim-grey">{item.status}</span>}
                                <item.icon size={16} className="text-dim-grey group-hover:text-white transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Bell size={20} className="text-green-400" /> Notifications
                </h2>
                <div className="space-y-4">
                    {[
                        { label: "Email Alerts", active: true },
                        { label: "Campaign Updates", active: true },
                        { label: "New Lead Alerts", active: false }
                    ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between p-4 rounded-xl bg-white/2">
                            <span className="text-sm">{item.label}</span>
                            <div className={`w-10 h-5 rounded-full transition-all relative cursor-pointer ${item.active ? 'bg-blue-500' : 'bg-white/10'}`}>
                                <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
      </div>

      {/* Subscription Summary */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 sm:p-8 rounded-[2.5rem] sm:rounded-[3rem] border border-blue-500/20 bg-blue-500/5 flex flex-col lg:flex-row items-center justify-between gap-8"
      >
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
                <CreditCard size={32} />
            </div>
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-1">Professional Plan</h3>
                <p className="text-dim-grey text-sm">Scale your outreach with our most popular plan.</p>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold hover:scale-105 transition-all text-sm">Manage Billing</button>
            <button className="w-full sm:w-auto text-sm font-bold text-dim-grey hover:text-white transition-colors px-4 py-3">View History</button>
        </div>
      </motion.div>
    </div>
  );
}
