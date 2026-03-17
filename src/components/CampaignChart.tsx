"use client";

import { motion } from "framer-motion";

interface DataPoint {
  day: string;
  sent: number;
  accepted: number;
}

export default function CampaignChart({ data }: { data: DataPoint[] }) {
  const maxVal = Math.max(...data.flatMap(d => [d.sent, d.accepted]), 10);
  const width = 800;
  const height = 300;
  const padding = 40;

  const pointsSent = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.sent / maxVal) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(" ");

  const pointsAccepted = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.accepted / maxVal) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="w-full aspect-8/3 relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => {
          const y = height - padding - p * (height - 2 * padding);
          return (
            <g key={p}>
                <line 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="white" 
                strokeOpacity="0.05" 
                strokeWidth="1" 
                />
                <text x={padding - 10} y={y + 4} textAnchor="end" className="text-[10px] fill-dim-grey font-bold">
                    {Math.round(p * maxVal)}
                </text>
            </g>
          );
        })}

        {/* X-Axis Labels */}
        {data.map((d, i) => {
          const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
          return (
            <text key={i} x={x} y={height - padding + 20} textAnchor="middle" className="text-[10px] fill-dim-grey font-bold">
              {d.day}
            </text>
          );
        })}

        {/* Sent Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={`M ${pointsSent}`}
          fill="none"
          stroke="url(#gradientSent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Accepted Line */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          d={`M ${pointsAccepted}`}
          fill="none"
          stroke="url(#gradientAccepted)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="gradientSent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <linearGradient id="gradientAccepted" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>

        {/* Highlight points */}
        {data.map((d, i) => {
            const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
            const ySent = height - padding - (d.sent / maxVal) * (height - 2 * padding);
            const yAccepted = height - padding - (d.accepted / maxVal) * (height - 2 * padding);
            return (
                <g key={i} className="group/point">
                    <circle cx={x} cy={ySent} r="4" className="fill-blue-400 stroke-background-dark stroke-2 opacity-0 group-hover/point:opacity-100 transition-opacity" />
                    <circle cx={x} cy={yAccepted} r="4" className="fill-green-400 stroke-background-dark stroke-2 opacity-0 group-hover/point:opacity-100 transition-opacity" />
                </g>
            );
        })}
      </svg>
    </div>
  );
}
