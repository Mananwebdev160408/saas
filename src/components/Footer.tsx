"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the glow and spotlight
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!textContainerRef.current) return;
    const rect = textContainerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* UPPER CONTENT (LOGO & LINKS) */}
        <div className="flex flex-col items-center mb-16">
          <Link href="/" className="flex items-center gap-2 mb-6 group cursor-pointer hover:scale-105 transition-transform">
            <div className="h-8 w-8 bg-white rounded flex items-center justify-center group-hover:bg-primary transition-colors">
              <span className="material-icons text-black text-sm font-bold">bolt</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">heyreach</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-sm">
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
              <li><Link className="hover:text-white transition-colors" href="#">For Agencies</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">For Sales</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">For Growth</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Multichannel outreach</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Integrations</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-3 text-dim-grey">
              <li><Link className="hover:text-white transition-colors" href="#">Content Hub</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Outbound Outliers</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Help Center</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Clay templates</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3 text-dim-grey">
              <li><Link className="hover:text-white transition-colors" href="#">About us</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Careers</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Connect on LinkedIn</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#">Subscribe to YouTube</Link></li>
            </ul>
          </div>
        </div>

        {/* INTERACTIVE BRAND SECTION */}
        <div 
          ref={textContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative w-full select-none mt-32 mb-16 cursor-default"
        >
          {/* 1. Underlying Outline (Visible when not hovering) */}
          <h2 
            className="text-[12vw] font-black leading-none text-center uppercase tracking-tighter"
            style={{ 
              WebkitTextStroke: "1px rgba(255,255,255,0.08)", 
              color: "transparent" 
            }}
          >
            HEYREACH
          </h2>

          {/* 2. Spotlight Reveal Layer */}
          <motion.h2 
            className="absolute inset-0 text-[12vw] font-black leading-none text-center uppercase tracking-tighter z-20 pointer-events-none"
            animate={{ 
              opacity: isHovering ? 1 : 0 
            }}
            transition={{ duration: 0.5, ease: "circOut" }}
            style={{ 
              color: "white",
              WebkitTextStroke: "1px white",
              clipPath: useTransform(
                [springX, springY],
                ([x, y]) => `circle(120px at ${x}px ${y}px)`
              )
            }}
          >
            HEYREACH
          </motion.h2>

          {/* 3. Glowing Background (Centered on Cursor) */}
          <motion.div 
             className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none"
             animate={{ 
               opacity: isHovering ? 1 : 0
             }}
             transition={{ duration: 0.5, ease: "circOut" }}
             style={{ 
               x: useTransform(springX, (x) => x - 250),
               y: useTransform(springY, (y) => y - 250)
             }}
          />
        </div>

        {/* LOWER CONTENT (COPYRIGHT) */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-xs text-dim-grey relative z-10 font-mono tracking-widest uppercase">
          <p className="mb-6 md:mb-0 text-center md:text-left">HeyReach - LinkedIn automation tool for agencies, sales teams, and GTM operators © 2025</p>
          <div className="flex gap-6">
            <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
            <Link className="hover:text-white transition-colors" href="#">Terms of Service</Link>
          </div>
        </div>
        <div className="mt-8 text-[10px] text-dim-grey text-center opacity-40 relative z-10 font-mono tracking-tighter uppercase">
          HeyReach is not associated with, or endorsed by, the LinkedIn Corporation.
        </div>
      </div>
    </footer>
  );
}
