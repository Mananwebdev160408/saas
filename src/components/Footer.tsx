"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Footer() {
  const brandSectionRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Mouse coordinates relative to the brand section
  const relX = useMotionValue(0);
  const relY = useMotionValue(0);

  // Smooth springs for the spotlight and glow
  const springX = useSpring(relX, { stiffness: 100, damping: 20 });
  const springY = useSpring(relY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!brandSectionRef.current) return;
    const rect = brandSectionRef.current.getBoundingClientRect();
    relX.set(e.clientX - rect.left);
    relY.set(e.clientY - rect.top);
  };

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* UPPER CONTENT (LOGO & LINKS) */}
        <div className="flex flex-col items-center mb-16">
          <Link href="/" className="flex items-center gap-2 mb-6 group cursor-pointer hover:scale-105 transition-transform">
            <div className="h-8 w-8 bg-white rounded flex items-center justify-center group-hover:bg-primary transition-colors text-black">
              <span className="material-icons text-sm font-bold">bolt</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white uppercase">heyreach</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 text-sm">
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Join the movement</h4>
            <ul className="space-y-3 text-dim-grey">
              <li><Link className="hover:text-white transition-colors" href="/pricing">See pricing</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Try HeyReach free</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Log in to your account</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Join our expert program</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Join our affiliate program</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-3 text-dim-grey">
              <li><Link className="hover:text-white transition-colors" href="/#product">For Agencies</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#product">For Sales</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#product">For Growth</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#solutions">Multichannel outreach</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/integrations">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-3 text-dim-grey">
              <li><Link className="hover:text-white transition-colors" href="/#resources">Content Hub</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#resources">Outbound Outliers</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/#resources">Help Center</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/integrations">Clay templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3 text-dim-grey">
              <li><Link className="hover:text-white transition-colors" href="/about">About us</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/careers">Careers</Link></li>
              <li><Link className="hover:text-white transition-colors" href="/linkedin">Connect on LinkedIn</Link></li>
              <li><Link className="hover:text-white transition-colors" href="https://youtube.com">Subscribe to YouTube</Link></li>
            </ul>
          </div>
        </div>

        {/* INTERACTIVE BRAND SECTION */}
        <div 
          ref={brandSectionRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative w-full h-[30vw] min-h-[120px] max-h-[300px] flex items-center justify-center select-none mt-16 mb-12 cursor-default"
        >
          {/* 1. Underlying Static Outline - More visible now */}
          <h2 
            className="text-[12vw] font-black leading-none text-center uppercase tracking-tighter"
            style={{ 
              WebkitTextStroke: "1.5px rgba(255,255,255,0.25)", 
              color: "transparent" 
            }}
          >
            HEYREACH
          </h2>

          {/* 2. Spotlight Reveal Layer - Pure white masked center */}
          <motion.h2 
            className="absolute inset-0 flex items-center justify-center text-[12vw] font-black leading-none text-center uppercase tracking-tighter z-20 pointer-events-none w-full"
            animate={{ 
              opacity: isHovering ? 1 : 0 
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} 
            style={{ 
              color: "white",
              WebkitTextStroke: "1px white",
              clipPath: useTransform(
                [springX, springY],
                ([x, y]) => `circle(140px at ${x}px ${y}px)`
              )
            }}
          >
            HEYREACH
          </motion.h2>

          {/* 3. Outer Glow - Removed overflow-hidden from parent so this bleeds naturally */}
          <motion.div 
             className="absolute pointer-events-none z-0 rounded-full bg-blue-500/15 blur-[120px]"
             animate={{ 
               opacity: isHovering ? 1 : 0
             }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             style={{ 
               width: 600,
               height: 600,
               x: useTransform(springX, (x) => x - 300),
               y: useTransform(springY, (y) => y - 300),
             }}
          />
        </div>

        {/* LOWER CONTENT */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs text-dim-grey relative z-10 uppercase font-mono tracking-widest">
          <p className="mb-6 md:mb-0 text-center md:text-left">HeyReach - LinkedIn automation tool for agencies, sales teams, and GTM operators © 2025</p>
          <div className="flex gap-6">
            <Link className="hover:text-white transition-colors" href="/privacy">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors" href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
