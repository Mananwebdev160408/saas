"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Calendar,
  ArrowUpRight,
  MoreHorizontal,
  Activity,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Total Reach", value: "12,840", icon: Users, trend: "+12.5%", color: "text-blue-400" },
    { label: "Replies", value: "842", icon: MessageSquare, trend: "+8.2%", color: "text-purple-400" },
    { label: "Meetings", value: "42", icon: Calendar, trend: "+14.1%", color: "text-green-400" },
    { label: "Success Rate", value: "24.8%", icon: Zap, trend: "+2.4%", color: "text-amber-400" },
  ];

  const activities = [
    { id: 1, type: "connection", user: "Sarah Jenkins", company: "Google", time: "2 mins ago" },
    { id: 2, type: "reply", user: "Michael Chen", company: "Meta", time: "15 mins ago" },
    { id: 3, type: "meeting", user: "David Miller", company: "Stripe", time: "1 hour ago" },
    { id: 4, type: "connection", user: "Emily Davis", company: "Amazon", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Workspace Overview</h1>
          <p className="text-dim-grey text-sm sm:text-base">Welcome back, Alex. Here&apos;s what&apos;s happening with your outbound.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] sm:text-xs text-dim-grey">
                Updating in real-time
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/2 hover:border-white/20 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                <TrendingUp size={10} /> {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold font-display tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-dim-grey uppercase tracking-[0.2em] font-bold">{stat.label}</div>
            </div>
            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/2 blur-3xl rounded-full group-hover:bg-white/5 transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40 relative overflow-hidden group">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-display">Performance Metrics</h3>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs outline-none hover:bg-white/10 transition-colors">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[300px] flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 90, 55, 75, 85, 60, 95, 70, 80, 65].map((val, i) => (
                <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${val}%` }}
                    transition={{ delay: 0.5 + i * 0.05, duration: 1 }}
                    className="w-full bg-linear-to-t from-blue-500/20 via-purple-500/40 to-white/60 rounded-t-lg group/bar relative"
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none">
                        {val}%
                    </div>
                </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] text-dim-grey px-4 uppercase tracking-widest font-bold">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Live Activity */}
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-display flex items-center gap-2">
                <Activity size={20} className="text-blue-400" /> Recent Activity
            </h3>
            <button className="p-2 hover:bg-white/5 rounded-xl transition-colors text-dim-grey hover:text-white">
                <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {activities.map((item) => (
              <div key={item.id} className="flex items-start gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-white/10 to-transparent border border-white/20 p-0.5 shadow-lg group-hover:scale-110 transition-transform">
                  <div className="w-full h-full rounded-full overflow-hidden bg-black/40">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.user}`} alt="Avatar" className="w-full h-full" />
                  </div>
                </div>
                <div className="grow space-y-0.5">
                  <div className="text-sm font-bold flex items-center justify-between">
                    {item.user}
                    <span className="text-[10px] text-dim-grey font-normal">{item.time}</span>
                  </div>
                  <div className="text-[11px] text-dim-grey">
                    {item.type === "connection" ? "Sent connection to" : item.type === "reply" ? "Received reply from" : "Booked meeting with"} <span className="text-white">{item.company}</span>
                  </div>
                </div>
                <div className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} className="text-dim-grey hover:text-white" />
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-white/5 text-xs font-bold hover:bg-white/10 transition-all text-dim-grey hover:text-white">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
