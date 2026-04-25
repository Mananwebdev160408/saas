"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ChevronDown, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Users,
  Target,
  UserCheck,
  Zap,
  MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CampaignChart from "@/components/CampaignChart";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useParams } from "next/navigation";
import { Campaign, Stats } from "@/lib/types";

export default function CampaignDetailPage() {
  const { id } = useParams() as { id: string };
  const [showCampaigns, setShowCampaigns] = useState(false);
  const queryClient = useQueryClient();

  const { data: campaign, isLoading: isLoadingCampaign } = useQuery<Campaign>({
    queryKey: ["campaign", id],
    queryFn: () => api.campaigns.get(id),
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery<Stats>({
    queryKey: ["stats", id],
    queryFn: () => api.stats.get(id),
  });

  const { data: agents, isLoading: isLoadingAgents } = useQuery<{ agents: string[] }>({
    queryKey: ["agents", id],
    queryFn: () => api.agents.list(id),
  });

  const statusMutation = useMutation({
    mutationFn: (status: string) => api.campaigns.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaign", id] });
    },
  });

  const isRunning = campaign?.status === "active";

  const toggleStatus = () => {
    const nextStatus = isRunning ? "paused" : "active";
    statusMutation.mutate(nextStatus);
  };

  const chartData = [
    { day: "Mon", sent: 45, accepted: 12 },
    { day: "Tue", sent: 82, accepted: 18 },
    { day: "Wed", sent: 68, accepted: 24 },
    { day: "Thu", sent: 94, accepted: 32 },
    { day: "Fri", sent: 110, accepted: 45 },
    { day: "Sat", sent: 55, accepted: 28 },
    { day: "Sun", sent: 40, accepted: 15 },
  ];

  if (isLoadingCampaign || isLoadingStats || isLoadingAgents) {
    return <div className="p-8 text-center">Loading campaign details...</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Top Navigation & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
            <Link 
                href="/campaigns" 
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-dim-grey hover:text-white"
            >
                <ArrowLeft size={20} />
            </Link>
            
            <div className="relative">
                <button 
                    onClick={() => setShowCampaigns(!showCampaigns)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                >
                    <div className="text-left">
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-widest">Active Campaign</div>
                        <div className="text-lg font-bold flex items-center gap-2">
                            {campaign?.name || "Campaign"}
                            <ChevronDown size={16} className={`text-dim-grey group-hover:text-white transition-transform ${showCampaigns ? "rotate-180" : ""}`} />
                        </div>
                    </div>
                </button>

                <AnimatePresence>
                    {showCampaigns && (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowCampaigns(false)}
                                className="fixed inset-0 z-40"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="absolute top-full left-0 mt-2 w-64 bg-background-dark border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                            >
                                {/* This list should ideally be fetched as well */}
                                <div className="px-5 py-4 text-dim-grey text-xs uppercase font-bold border-b border-white/5">Switch Campaign</div>
                                <Link 
                                    href="/campaigns"
                                    className="block px-5 py-3 text-sm text-dim-grey hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Back to list
                                </Link>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <button 
                onClick={toggleStatus}
                disabled={statusMutation.isPending}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
                    isRunning 
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20" 
                    : "bg-green-500 text-black shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:scale-105"
                } ${statusMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
             >
                {isRunning ? (
                    <><Pause size={18} /> Stop Campaign</>
                ) : (
                    <><Play size={18} /> Start Campaign</>
                )}
             </button>
             <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-dim-grey hover:text-white">
                <RotateCcw size={20} />
             </button>
             <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-dim-grey hover:text-white">
                <Settings size={20} />
             </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Analytics Section */}
        <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-8 relative overflow-hidden">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold">Campaign Performance</h3>
                        <p className="text-xs text-dim-grey">Daily sentiment and acceptance rates</p>
                    </div>
                </div>

                <CampaignChart data={chartData} />

                <div className="flex items-center justify-center gap-8 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-xs font-bold text-dim-grey uppercase tracking-widest">Connection Sent</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10_rgba(34,197,94,0.5)]"></div>
                        <span className="text-xs font-bold text-dim-grey uppercase tracking-widest">Accepted</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Total Leads", value: stats?.totalLeads || 0, icon: Target, trend: "" },
                    { label: "Connections Sent", value: stats?.statusCounts?.CONNECTION_SENT || 0, icon: Zap, trend: "" },
                    { label: "Accepted", value: stats?.statusCounts?.CONNECTED || 0, icon: UserCheck, trend: "" },
                ].map((item, i) => (
                    <div key={i} className="glass-card p-6 rounded-3xl border border-white/5 bg-white/2 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="text-[10px] text-dim-grey font-bold uppercase tracking-widest">{item.label}</div>
                            <div className="text-2xl font-bold">{item.value}</div>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-blue-400">
                            <item.icon size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Sidebar Section */}
        <div className="space-y-8">
            {/* Status Card */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-6">
                <h3 className="text-lg font-bold">Campaign Status</h3>
                
                <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 rounded-2xl border ${isRunning ? "bg-green-500/5 border-green-500/10" : "bg-amber-500/5 border-amber-500/10"}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full animate-pulse ${isRunning ? "bg-green-400" : "bg-amber-400"}`}></div>
                            <span className={`text-sm font-bold uppercase tracking-widest ${isRunning ? "text-green-400" : "text-amber-400"}`}>
                                {isRunning ? "Active Now" : "Paused"}
                            </span>
                        </div>
                        <span className="text-xs text-dim-grey">{campaign?.executionStatus}</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-dim-grey uppercase tracking-widest">
                            <span>Progress</span>
                            <span className="text-white">{stats?.statusCounts?.ENRICHMENT_DONE || 0} / {stats?.totalLeads || 0}</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${((stats?.statusCounts?.ENRICHMENT_DONE || 0) / (stats?.totalLeads || 1)) * 100}%` }}
                                className="h-full bg-linear-to-r from-blue-400 to-indigo-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-4">
                     <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-dim-grey">
                            <Users size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Active Agents</span>
                         </div>
                         <span className="text-sm font-bold">{(agents?.agents?.length) || 0} Agents</span>
                     </div>
                </div>
            </div>

            {/* Active Agents */}
            <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">Agents Performance</h3>
                    <button className="text-dim-grey hover:text-white transition-colors">
                        <MoreHorizontal size={20} />
                    </button>
                 </div>

                 <div className="space-y-4">
                    {(agents?.agents || []).map((agent: string, i: number) => (
                        <div key={i} className="flex items-center justify-between group p-2 hover:bg-white/5 rounded-2xl transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden relative">
                                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=agent-${i}`} alt="Agent" width={40} height={40} />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background-dark rounded-full"></div>
                                </div>
                                <div>
                                    <div className="text-xs font-bold">{agent.split('/').pop()}</div>
                                    <div className="text-[10px] text-dim-grey">Connected</div>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>

                  <Link href="/agents" className="block w-full py-3 text-center rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-widest transition-all">
                    View All Agents
                  </Link>
             </div>
        </div>
      </div>
    </div>
  );
}
