"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none"></div>
      
      {/* Animated Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="quirky-blob w-96 h-96 bg-white/5 top-20 -left-48" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          x: [0, -30, 30, 0],
          y: [0, 30, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="quirky-blob w-[500px] h-[500px] bg-white/5 bottom-20 -right-64" 
      />

      <motion.img 
        src="/blob.png"
        className="absolute top-[20%] right-[-10%] w-[600px] opacity-[0.15] mix-blend-screen pointer-events-none z-0"
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* Interactive Mouse Glow */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden"
        animate={{
          background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <Link href="/" className="mb-8 group flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <span className="text-black font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">HeyReach</span>
        </Link>
        {children}
      </div>
    </main>
  );
}
