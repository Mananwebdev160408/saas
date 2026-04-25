"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Target, 
  MousePointer2, 
  Mail,
  Download,
  Calendar,
  ChevronDown
} from "lucide-react";

export default function AnalyticsPage() {
  const mainStats = [
    { label: "Connection Rate", value: "32.4%", icon: Target, trend: "+4.2%", color: "text-blue-400" },
    { label: "Reply Rate", value: "18.5%", icon: Mail, trend: "+2.1%", color: "text-purple-400" },
    { label: "Click Rate", value: "12.2%", icon: MousePointer2, trend: "-1.2%", color: "text-green-400" },
    { label: "Conversion", value: "4.8%", icon: TrendingUp, trend: "+0.8%", color: "text-amber-400" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">Analytics Insights</h1>
          <p className="text-dim-grey text-sm sm:text-base">Deep dive into your campaign performance and audience behavior.</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/2 hover:bg-white/5 transition-all text-xs font-bold whitespace-nowrap">
                <Calendar size={16} /> Last 30 Days <ChevronDown size={14} />
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black text-xs font-bold hover:scale-105 active:scale-95 transition-all whitespace-nowrap">
                <Download size={16} /> Export
            </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[2rem] border border-white/5 bg-white/2 relative group"
          >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${stat.color}`}>
                    <stat.icon size={20} />
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {stat.trend}
                </div>
            </div>
            <div className="text-3xl font-bold font-display">{stat.value}</div>
            <div className="text-[10px] text-dim-grey uppercase tracking-[0.2em] font-bold mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Performance Chart Placeholder */}
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold font-display">Reach & Engagement</h3>
                    <p className="text-xs text-dim-grey">Daily performance across all agents</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-widest text-dim-grey hover:text-white transition-colors">
                    Filters
                </button>
            </div>
            <div className="h-[250px] relative mt-12">
                {/* SVG for Line Chart Placeholder */}
                <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'rgb(59,130,246)', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: 'rgb(59,130,246)', stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                    <motion.path 
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0,250 C100,220 200,280 300,180 C400,80 500,150 600,120 C700,90 800,50 900,100 C1000,150 1000,150 1000,150" 
                        fill="none" 
                        stroke="rgb(59,130,246)" 
                        strokeWidth="4" 
                    />
                    <path d="M0,250 C100,220 200,280 300,180 C400,80 500,150 600,120 C700,90 800,50 900,100 C1000,150 1000,300 0,300 Z" fill="url(#grad1)" />
                </svg>
                {/* Horizontal Lines */}
                {[0, 1, 2, 3].map((_, i) => (
                    <div key={i} className="absolute w-full h-px bg-white/5" style={{ bottom: `${i * 33}%` }} />
                ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] text-dim-grey uppercase tracking-widest font-bold">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
            </div>
        </div>

        {/* Demographics / Channels */}
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
            <h3 className="text-xl font-bold font-display mb-8">Audience Demographics</h3>
            <div className="space-y-8">
                {[
                    { label: "Software Engineering", percentage: 42, color: "bg-blue-500" },
                    { label: "Marketing & Sales", percentage: 28, color: "bg-purple-500" },
                    { label: "Product Management", percentage: 15, color: "bg-amber-500" },
                    { label: "Operations", percentage: 10, color: "bg-green-500" },
                    { label: "Other", percentage: 5, color: "bg-gray-500" },
                ].map((item, i) => (
                    <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-dim-grey uppercase tracking-wider">{item.label}</span>
                            <span className="font-bold">{item.percentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percentage}%` }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                className={`h-full ${item.color}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
