"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Plus, 
  MoreVertical, 
  Play, 
  Pause, 
  MoreHorizontal,
  ArrowUpRight,
  Target,
  Send,
  UserCheck,
  Timer
} from "lucide-react";

export default function CampaignsPage() {
  const campaigns = [
    { 
        id: "1", 
        name: "Q1 Outreach - Fintech", 
        status: "Running", 
        agents: 5, 
        leads: 1250, 
        sent: 450, 
        accepted: 82, 
        progress: 36,
        lastActive: "2 mins ago"
    },
    { 
        id: "2", 
        name: "Outbound Lead Gen - SaaS", 
        status: "Paused", 
        agents: 3, 
        leads: 800, 
        sent: 210, 
        accepted: 45, 
        progress: 26,
        lastActive: "5 hours ago"
    },
    { 
        id: "3", 
        name: "Series B Founders List", 
        status: "Queued", 
        agents: 2, 
        leads: 500, 
        sent: 0, 
        accepted: 0, 
        progress: 0,
        lastActive: "Pending"
    },
    { 
        id: "4", 
        name: "Tech Talent Hunt", 
        status: "Running", 
        agents: 8, 
        leads: 2400, 
        sent: 1800, 
        accepted: 320, 
        progress: 75,
        lastActive: "Active now"
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
            <h1 className="text-4xl font-display font-bold mb-2">My Campaigns</h1>
            <p className="text-dim-grey">Manage and monitor your LinkedIn automation workflows</p>
        </div>
        <Link 
            href="/campaigns/create"
            className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
        >
            <Plus size={20} />
            Create New Campaign
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { label: "Total Active", value: "2", icon: Play, color: "text-green-400" },
            { label: "Total Leads", value: "4,950", icon: Target, color: "text-blue-400" },
            { label: "Total Sent", value: "2,460", icon: Send, color: "text-purple-400" },
            { label: "Accepted Rate", value: "18.5%", icon: UserCheck, color: "text-amber-400" },
        ].map((stat, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-white/5 bg-white/2 relative group overflow-hidden"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${stat.color}`}>
                        <stat.icon size={20} />
                    </div>
                    <div className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                        <ArrowUpRight size={12} />
                        +12%
                    </div>
                </div>
                <div className="text-2xl font-bold font-display">{stat.value}</div>
                <div className="text-xs text-dim-grey uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
        ))}
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {campaigns.map((campaign, i) => (
            <motion.div 
                key={campaign.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40 hover:bg-white/2 hover:border-white/20 transition-all group relative overflow-hidden"
            >
                <div className="flex items-start justify-between mb-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold">{campaign.name}</h3>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                                campaign.status === "Running" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                                campaign.status === "Paused" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            }`}>
                                {campaign.status}
                            </span>
                        </div>
                        <p className="text-xs text-dim-grey flex items-center gap-2">
                             <Timer size={12} /> Last active: {campaign.lastActive}
                        </p>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-dim-grey">
                        <MoreVertical size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="space-y-1">
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Agents</div>
                        <div className="text-lg font-bold">{campaign.agents}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Leads</div>
                        <div className="text-lg font-bold">{campaign.leads}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Sent</div>
                        <div className="text-lg font-bold">{campaign.sent}</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-tighter">Accepted</div>
                        <div className="text-lg font-bold">{campaign.accepted}</div>
                    </div>
                </div>

                <div className="space-y-2 mb-8">
                    <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-dim-grey uppercase">Overall Progress</span>
                        <span>{campaign.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${campaign.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-linear-to-r ${
                                campaign.status === "Running" ? "from-green-400 to-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]" :
                                campaign.status === "Paused" ? "from-amber-400 to-orange-500" :
                                "from-blue-400 to-indigo-500"
                            }`}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link 
                        href={`/campaigns/${campaign.id}`}
                        className="grow flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-2xl font-bold transition-all text-sm"
                    >
                        View Stats <ArrowUpRight size={16} />
                    </Link>
                    <button className={`p-3 rounded-2xl border transition-all ${
                        campaign.status === "Running" 
                        ? "bg-amber-500/5 border-amber-500/20 text-amber-400 hover:bg-amber-500/10" 
                        : "bg-green-500/5 border-green-500/20 text-green-400 hover:bg-green-500/10"
                    }`}>
                        {campaign.status === "Running" ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-dim-grey hover:text-white transition-all">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
                
                {/* Decorative Pattern */}
                <svg className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none" viewBox="0 0 100 100">
                    <path d="M0,0 Q50,100 100,0" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            </motion.div>
        ))}

        {/* Create Card Placeholder */}
        <Link 
            href="/campaigns/create"
            className="glass-card p-8 rounded-[2.5rem] border border-dashed border-white/10 hover:border-white/40 hover:bg-white/2 transition-all group flex flex-col items-center justify-center min-h-[350px] space-y-4"
        >
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <Plus size={32} />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold text-white/60 group-hover:text-white transition-colors">Start New Campaign</h3>
                <p className="text-sm text-dim-grey mt-1">Scale your outreach today</p>
            </div>
        </Link>
      </div>
    </div>
  );
}
