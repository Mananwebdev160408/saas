"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Shield, 
  ShieldCheck, 
  MoreVertical,
  Search,
  Settings2,
  ExternalLink
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function AgentsPage() {
  const { data: agentsData, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => api.agents.list(""), // Global list
  });

  const agents = agentsData?.agents || [];

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Automation Agents</h1>
          <p className="text-dim-grey text-sm sm:text-base">Manage your LinkedIn identities and monitor account health.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-white text-black font-bold px-6 py-3.5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl text-sm sm:text-base">
          <Plus size={18} />
          Add New Agent
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dim-grey group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search agents by name or email..." 
            className="w-full bg-white/2 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:bg-white/5 focus:border-white/20 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/2 hover:bg-white/5 transition-all text-sm font-bold">
            <Settings2 size={18} /> Filters
        </button>
      </div>

      {/* Agents List */}
      <div className="grid grid-cols-1 gap-4">
        {agents.map((sessionPath: string, i: number) => {
          const agentName = sessionPath.split('/').pop() || `Agent ${i + 1}`;
          return (
            <motion.div
              key={sessionPath}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-[2rem] border border-white/10 bg-black/40 hover:bg-white/2 hover:border-white/20 transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-white/10 to-transparent border border-white/20 p-0.5 relative">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-black/40">
                      <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agentName}`} alt="Avatar" width={56} height={56} className="w-full h-full" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black bg-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      {agentName}
                      <ExternalLink size={14} className="text-dim-grey opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" />
                    </h3>
                    <p className="text-xs text-dim-grey">Connected via Cloud</p>
                  </div>
                </div>
  
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 lg:px-8 lg:border-l lg:border-white/5">
                  <div className="space-y-1 text-center lg:text-left">
                    <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Status</div>
                    <div className="text-sm font-bold text-green-400">Active</div>
                  </div>
                  <div className="space-y-1 text-center lg:text-left">
                    <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Health</div>
                    <div className="flex items-center justify-center lg:justify-start gap-1.5">
                      <ShieldCheck size={14} className="text-green-400" />
                      <span className="text-sm font-bold">Healthy</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-center lg:text-left">
                    <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Limit</div>
                    <div className="text-sm font-bold">100/100</div>
                  </div>
                  <div className="space-y-1 text-center lg:text-left">
                    <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Last Seen</div>
                    <div className="text-sm font-bold whitespace-nowrap">Active now</div>
                  </div>
                </div>
  
                <div className="flex items-center justify-end gap-3">
                  <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-bold transition-all text-dim-grey hover:text-white">
                      Logs
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-dim-grey hover:text-white transition-all">
                      <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-6 sm:p-8 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
                <Shield size={32} />
            </div>
            <div>
                <h3 className="text-xl font-bold mb-1">Safety First Architecture</h3>
                <p className="text-dim-grey text-sm">We automatically rotate IPs and handle session security to keep your accounts safe.</p>
            </div>
        </div>
        <Link href="#" className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap">
            View Docs →
        </Link>
      </motion.div>
    </div>
  );
}

