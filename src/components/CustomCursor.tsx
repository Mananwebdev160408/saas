"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Precision dot: immediate following with slight dampening
  const dotX = useSpring(0, { damping: 40, stiffness: 400 });
  const dotY = useSpring(0, { damping: 40, stiffness: 400 });

  // Outer ring: delayed following with momentum
  const ringX = useSpring(0, { damping: 25, stiffness: 150 });
  const ringY = useSpring(0, { damping: 25, stiffness: 150 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
    
    dotX.set(clientX - 4); // Center the 8px dot
    dotY.set(clientY - 4);
    
    ringX.set(clientX - 20); // Center the 40px ring
    ringY.set(clientY - 20);

    // Check if hovering over interactive element
    const target = e.target as HTMLElement;
    const isClickable = target.closest("a, button, .cursor-pointer, .glass-card");
    setIsHovering(!!isClickable);
  }, [dotX, dotY, ringX, ringY]);

  const handleClick = useCallback((e: MouseEvent) => {
    const clickId = Date.now();
    const newRipple = {
      id: clickId,
      x: e.clientX,
      y: e.clientY,
    };
    setRipples((prev) => [...prev, newRipple]);

    // Cleanup ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== clickId));
    }, 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    // Initial hide default cursor
    document.body.style.cursor = "none";
    
    // Safety: ensure default cursor is hidden everywhere
    const style = document.createElement("style");
    style.innerHTML = `
      * { cursor: none !important; }
      .cursor-auto { cursor: auto !important; }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-99999">
      {/* Outer Ring */}
      <motion.div
        className="fixed w-10 h-10 border border-white/40 rounded-full mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          scale: isHovering ? 1.5 : 1,
          borderWidth: isHovering ? "1px" : "1.5px",
          backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
          backdropFilter: isHovering ? "blur(2px)" : "none",
        }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
      />

      {/* Precision Dot */}
      <motion.div
        className="fixed w-2 h-2 bg-white rounded-full mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{
          x: dotX,
          y: dotY,
          scale: isHovering ? 0.4 : 1,
        }}
      />

      {/* Multi-layered Digital Pulse Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <React.Fragment key={ripple.id}>
            {/* Primary Pulse */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "1px solid white",
                mixBlendMode: "difference",
              }}
            />
            {/* Secondary delayed ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 10, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease: "easeOut" }}
              style={{
                position: "absolute",
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "0.5px solid white",
                mixBlendMode: "difference",
              }}
            />
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}
