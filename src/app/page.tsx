"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function StatItem({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return spring.onChange((latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [spring]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl lg:text-6xl font-display font-bold mb-4 tracking-tight tabular-nums">
        {displayValue.toLocaleString()}{suffix}
      </div>
      <p className="text-dim-grey text-lg font-medium">{label}</p>
    </div>
  );
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  // Task List:
  // - [x] Move the hand and blob down in the hero section <!-- id: 3 -->
  // - [x] Verify the new positioning <!-- id: 4 -->
  // - [x] Shift the hand and blob significantly lower (User feedback: "still so high") <!-- id: 5 -->
  // - [ ] Verify final positioning results <!-- id: 6 -->
  const flowRef = useRef(null);
  const { scrollYProgress: flowProgress } = useScroll({
    target: flowRef,
    offset: ["start start", "end end"]
  });

  const pathHeight = useTransform(flowProgress, [0, 1], ["0%", "100%"]);
  const step1Opacity = useTransform(flowProgress, [0.05, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const step2Opacity = useTransform(flowProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const step3Opacity = useTransform(flowProgress, [0.45, 0.55, 0.65, 0.7], [0, 1, 1, 0]);
  const step4Opacity = useTransform(flowProgress, [0.65, 0.75, 0.85], [0, 1, 1]);

  const step1X = useTransform(flowProgress, [0.05, 0.15], [-50, 0]);
  const step2X = useTransform(flowProgress, [0.25, 0.35], [50, 0]);
  const step3X = useTransform(flowProgress, [0.45, 0.55], [-50, 0]);
  const step4X = useTransform(flowProgress, [0.65, 0.75], [50, 0]);

  const step1Y = useTransform(flowProgress, [0.25, 0.3], [0, -30]);
  const step2Y = useTransform(flowProgress, [0.45, 0.5], [0, -30]);
  const step3Y = useTransform(flowProgress, [0.65, 0.7], [0, -30]);
  
  const gridY = useTransform(flowProgress, [0.1, 0.8], ["0%", "-40%"]);
  const particleOpacity = useTransform(flowProgress, [0.05, 0.95], [0, 1]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.add('no-scrollbar');
      document.body.classList.add('no-scrollbar');
    }
    return () => {
      if (typeof window !== "undefined") {
        document.documentElement.classList.remove('no-scrollbar');
        document.body.classList.remove('no-scrollbar');
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background-dark text-white selection:bg-white selection:text-black font-sans relative">
      {/* Custom Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-[0%] z-9999"
        style={{ scaleX }}
      />
      {/* Monochrome Background Blobs */}
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
        className="quirky-blob w-[500px] h-[500px] bg-white/5 top-[1000px] -right-64" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          x: [0, 15, -15, 0],
          y: [0, -15, 15, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="quirky-blob w-72 h-72 bg-white/5 top-[2500px] left-20" 
      />

      {/* Randomized Background Blobs using blob.png */}
      <motion.img 
        src="/blob.png"
        className="absolute top-[400px] right-[-10%] w-[600px] opacity-[0.03] mix-blend-screen pointer-events-none z-0"
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute top-[1800px] left-[-5%] w-[500px] opacity-[0.05] mix-blend-screen pointer-events-none z-0"
        animate={{ rotate: [360, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute top-[3500px] right-[5%] w-[700px] opacity-[0.02] mix-blend-screen pointer-events-none z-0"
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute top-[800px] left-[20%] w-[300px] opacity-[0.02] mix-blend-screen pointer-events-none z-0"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute top-[1500px] right-[15%] w-[400px] opacity-[0.03] mix-blend-screen pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute top-[2800px] left-[5%] w-[500px] opacity-[0.02] mix-blend-screen pointer-events-none z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute top-[4200px] right-[-5%] w-[600px] opacity-[0.02] mix-blend-screen pointer-events-none z-0"
        animate={{ y: [0, 60, 0], x: [0, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute bottom-[2000px] left-[10%] w-[350px] opacity-[0.03] mix-blend-screen pointer-events-none z-0"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
      />
      <motion.img 
        src="/blob.png"
        className="absolute bottom-[1000px] right-[10%] w-[450px] opacity-[0.03] mix-blend-screen pointer-events-none z-0"
        animate={{ scale: [1, 1.1, 1], rotate: [0, -45, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-hero-radial">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5
              }}
              animate={{
                y: [null, (Math.random() * -200 - 100) + "px"],
                opacity: [0, 0.5, 0],
                x: [null, (Math.random() * 100 - 50) + "px"]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>

        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0 opacity-80 scale-x-[-1]"
        >
          <img 
            src="/bg.svg" 
            alt="Hero Texture" 
            className="w-full h-full object-cover mix-blend-screen"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background-dark/40 to-background-dark"></div>
        </motion.div>
        <div className="noise-bg"></div>
        {/* Monochrome Moving Background Strips */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[10%] w-[120%] h-[150%] -skew-y-12 flex flex-col gap-24 opacity-20">
            <motion.div 
              animate={{ x: [-200, 200] }} 
              transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              className="w-full h-48 bg-linear-to-r from-white/10 via-white/5 to-white/10 blur-3xl" 
            />
            <motion.div 
              animate={{ x: [200, -200] }} 
              transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              className="w-full h-64 bg-linear-to-r from-white/10 via-white/5 to-white/10 blur-3xl" 
            />
            <motion.div 
              animate={{ x: [-300, 300] }} 
              transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              className="w-full h-48 bg-linear-to-r from-white/10 via-white/5 to-white/10 blur-3xl" 
            />
          </div>
        </div>
        
        {/* Animated Monochrome Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-white/5 blur-[120px] animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-[10%] w-[500px] h-[500px] bg-white/5 blur-[150px] animate-pulse-glow animate-delay-1000"></div>
        </div>

        <div className="absolute inset-0 grid-bg opacity-20"></div>

        {/* Interactive Mouse Glow */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none opacity-30 overflow-hidden"
          animate={{
            background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.05), transparent 80%)`
          }}
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.01,
            rotateX: (mousePos.y - (typeof window !== 'undefined' ? window.innerHeight / 2 : 0)) * -0.01,
            rotateY: (mousePos.x - (typeof window !== 'undefined' ? window.innerWidth / 2 : 0)) * 0.01
          }}
          transition={{ duration: 0.8, ease: "easeOut", x: { duration: 0 }, rotateX: { duration: 0 }, rotateY: { duration: 0 } }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-1000 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="text-left py-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">New: AI Sequence Generator</span>
            </motion.div>
            <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.95]">
              <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40">10x your</span><br />
              <span className="metallic-text">LinkedIn</span><br />
              <span className="text-white/20">outbound</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-xl mb-12">
              Automate outreach, reach <span className="text-white font-medium">1000+ leads weekly</span>, and scale your GTM motion with precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-start items-center sm:items-stretch">
              <Link className="group relative bg-white text-black px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 overflow-hidden text-center min-w-[240px]" href="#">
                <div className="absolute inset-0 bg-linear-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Free Trial
                  <span className="material-icons text-2xl">arrow_forward</span>
                </span>
              </Link>
              <Link className="group px-8 py-5 rounded-2xl text-lg font-semibold border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3" href="#">
                <span className="material-icons text-gray-400 group-hover:text-white transition-colors">play_circle</span>
                Watch Demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-dim-grey">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="material-icons text-lg text-green-500/70">check_circle</span> No credit card
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
                <span className="material-icons text-lg text-blue-500/70">verified</span> Premium setup
              </div>
            </div>
          </div>

          {/* Right Section: Visual Composition */}
          <div className="relative hidden lg:flex items-center justify-center min-h-[600px]">
            <div className="relative w-full max-w-[550px] aspect-square flex items-center justify-center translate-y-48">
              {/* Static Blob Background - Enhanced Wobble */}
              <motion.img 
                src="/blob.png"
                alt="Blob"
                className="absolute w-[130%] h-[130%] object-contain opacity-40 mix-blend-screen pointer-events-none"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                  x: [0, 10, -10, 0],
                  y: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              
              {/* Hero Image Space (Dashboard to be added later) */}
              <div className="relative w-full h-full flex items-end justify-center">
                {/* Empty container preserving space */}
              </div>
              
              {/* Subtle Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
            </div>
          </div>
        </motion.div>

        {/* Floating UI Elements Around Hero - Repositioned for 2-column */}
        <div className="absolute inset-0 pointer-events-none hidden xl:block z-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute top-1/4 left-1/2 -translate-x-[120%] p-4 rounded-2xl glass-card border border-white/10 flex items-center gap-4 animate-float"
          >
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <span className="material-icons text-blue-400 text-xl">person_add</span>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">Request Sent</div>
              <div className="text-xs text-dim-grey">To: Sarah Jenkins</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute top-2/3 right-[5%] p-5 rounded-3xl glass-card border border-white/10 flex items-center gap-5 animate-float animate-delay-1000"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <span className="material-icons text-green-400 text-2xl">reply</span>
            </div>
            <div className="text-left">
              <div className="text-base font-bold">New Reply!</div>
              <div className="text-sm text-dim-grey">&quot;Let&apos;s talk tomorrow&quot;</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Automation Flow Simulation Section */}
      <section id="product" className="py-24 relative overflow-hidden bg-background-dark border-y border-white/5">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Real-time <span className="metallic-text">Automation</span> Logic
            </h2>
            <p className="text-gray-400 text-lg">Watch HeyReach process leads and book meetings in the background.</p>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-b from-white/10 via-white/5 to-white/10 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative glass-card rounded-3xl p-4 md:p-10 border border-white/10 overflow-hidden bg-black/40 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-10 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.3)]"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white/70 flex items-center gap-2 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Campaign: Ultra-Scale Outreach Q1
                </div>
              </div>
              
              <div className="relative h-auto min-h-[500px] md:h-[450px] flex items-center justify-center overflow-hidden py-8 md:py-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl relative z-10">
                  {/* Step 1: Profile View */}
                  <div className="flex flex-col items-center gap-5 group/step">
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-3xl border transition-all duration-700 flex items-center justify-center ${
                        activeStep >= 0 ? "bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-110" : "bg-white/5 border-white/5"
                      }`}>
                        <span className={`material-icons text-4xl transition-colors duration-700 ${activeStep >= 0 ? "text-white" : "text-white/20"}`}>visibility</span>
                      </div>
                      {activeStep === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-lg mb-1 transition-colors ${activeStep >= 0 ? "text-white" : "text-dim-grey"}`}>Profile Visit</div>
                      <div className="text-xs text-dim-grey uppercase tracking-wider">AI-driven viewing</div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-5 relative pt-12 md:pt-0">
                    <div className="absolute top-12 -left-1/2 w-full h-[2px] bg-linear-to-r from-transparent via-white/10 to-transparent hidden md:block"></div>
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-3xl border transition-all duration-700 flex items-center justify-center ${
                        activeStep >= 1 ? "bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-110" : "bg-white/5 border-white/5"
                      }`}>
                        <span className={`material-icons text-4xl transition-colors duration-700 ${activeStep >= 1 ? "text-white" : "text-white/20"}`}>person_add</span>
                      </div>
                      {activeStep === 1 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-lg mb-1 transition-colors ${activeStep >= 1 ? "text-white" : "text-dim-grey"}`}>Connect</div>
                      <div className="text-xs text-dim-grey uppercase tracking-wider">With personalized note</div>
                    </div>
                  </div>

                  {/* Step 3: Message / Email */}
                  <div className="flex flex-col items-center gap-5 relative pt-12 md:pt-0">
                    <div className="absolute top-12 -left-1/2 w-full h-[2px] bg-linear-to-r from-transparent via-white/10 to-transparent hidden md:block"></div>
                    <div className="relative">
                      <div className={`w-24 h-24 rounded-3xl border transition-all duration-700 flex items-center justify-center ${
                        activeStep >= 2 ? "bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.15)] scale-110" : "bg-white/5 border-white/5"
                      }`}>
                        <span className={`material-icons text-4xl transition-colors duration-700 ${activeStep >= 2 ? "text-white" : "text-white/20"}`}>alternate_email</span>
                      </div>
                      {activeStep === 2 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className={`font-bold text-lg mb-1 transition-colors ${activeStep >= 2 ? "text-white" : "text-dim-grey"}`}>Multichannel</div>
                      <div className="text-xs text-dim-grey uppercase tracking-wider">LinkedIn + Email</div>
                    </div>
                  </div>
                </div>

                {/* Meeting Booked Popup in Simulation */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={activeStep === 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  className="absolute top-10 left-10 p-4 rounded-2xl glass-card border-purple-500/30 bg-purple-500/10 backdrop-blur-3xl flex items-center gap-4 z-20 shadow-[0_0_40px_rgba(168,85,247,0.2)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <span className="material-icons text-purple-400">event_available</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Meeting Booked 🎉</div>
                    <div className="text-[10px] text-purple-300">With: Alex @ TechCorp</div>
                  </div>
                </motion.div>

                {/* Automation Log Overlay */}
                <div className="absolute bottom-6 left-6 right-6 h-28 glass-card border-white/10 rounded-2xl p-5 overflow-hidden bg-black/60 shadow-2xl">
                  <div className="flex flex-col gap-3">
                    {activeStep >= 0 && (
                      <div className="flex items-center gap-4 text-xs animate-fade-in-up">
                        <span className="text-blue-400 font-mono tracking-tighter opacity-70">[14:26:01]</span>
                        <span className="text-white/90">Visiting profile: <b className="text-white">Sarah Wilson</b> (Head of GTM at ScaleFlow)</span>
                        <span className="ml-auto text-green-500 flex items-center gap-1.5 font-bold">
                          <span className="material-icons text-[14px]">check_circle</span>
                          DONE
                        </span>
                      </div>
                    )}
                    {activeStep >= 1 && (
                      <div className="flex items-center gap-4 text-xs animate-fade-in-up">
                        <span className="text-blue-400 font-mono tracking-tighter opacity-70">[14:26:05]</span>
                        <span className="text-white/90">Generating AI-personalized note and sending request...</span>
                        <span className="ml-auto text-green-500 flex items-center gap-1.5 font-bold">
                          <span className="material-icons text-[14px]">check_circle</span>
                          SENT
                        </span>
                      </div>
                    )}
                    {activeStep >= 2 && (
                      <div className="flex items-center gap-4 text-xs animate-fade-in-up">
                        <span className="text-blue-400 font-mono tracking-tighter opacity-70">[14:26:12]</span>
                        <span className="text-white/90">Connection accepted. Initializing multichannel sequence...</span>
                        <span className="ml-auto text-blue-400 flex items-center gap-2 font-bold animate-pulse">
                          <span className="material-icons text-[14px]">sync</span>
                          PROCESSING
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Particle / Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="white" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 225 L 1000 225" stroke="url(#lineGrad)" strokeWidth="1" fill="none" className="animate-draw" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Interactive Process Flowchart Section */}
        <section className="py-24 relative overflow-hidden bg-background-dark">
          <div className="absolute inset-0 grid-bg opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                The <span className="metallic-text">Future of Outbound</span> Architecture
              </h2>
              <p className="text-gray-400 text-lg">
                Visualize how HeyReach turns raw data into high-quality meetings at scale.
              </p>
            </div>

            <div className="relative h-auto md:h-[400px] py-12 md:py-0">
              {/* SVG Connecting Lines - Hidden on Mobile */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="50%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#4ADE80" />
                  </linearGradient>
                </defs>
              
              {/* Path 1 -> 2 */}
              <motion.path 
                d="M 120 180 Q 250 180 300 180" 
                fill="none" stroke="url(#flow-grad)" strokeWidth="2" strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              {/* Path 2 -> 3 */}
              <motion.path 
                d="M 400 180 Q 550 180 600 180" 
                fill="none" stroke="url(#flow-grad)" strokeWidth="2" strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1 }}
              />
              {/* Path 3 -> 4 */}
              <motion.path 
                d="M 700 180 Q 850 180 900 180" 
                fill="none" stroke="url(#flow-grad)" strokeWidth="2" strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </svg>

            {/* Nodes Grid - Vertical on Mobile */}
            <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8 h-full items-center relative z-20">
              {/* Node 1: Sources */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-center group hover:border-blue-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30 group-hover:scale-110 transition-transform">
                  <span className="material-icons text-blue-400">dataset</span>
                </div>
                <h4 className="font-bold text-white mb-2">Sources</h4>
                <p className="text-xs text-gray-400">Sales Nav, HubSpot, CSVs, Apollo</p>
              </motion.div>

              {/* Node 2: Automation Hub */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-center group hover:border-indigo-500/50 transition-all shadow-indigo-500/10 shadow-2xl scale-110 z-30 bg-black/60"
              >
                <div className="w-14 h-14 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30 group-hover:rotate-12 transition-transform">
                  <span className="material-icons text-indigo-400 text-3xl">bolt</span>
                </div>
                <h4 className="font-bold text-white mb-2">Automation Hub</h4>
                <p className="text-xs text-gray-400">Enrichment, Sequences, Smart Filters</p>
              </motion.div>

              {/* Node 3: Outreach Engine */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-center group hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-500/30 group-hover:animate-pulse transition-all">
                  <span className="material-icons text-purple-400">rocket_launch</span>
                </div>
                <h4 className="font-bold text-white mb-2">Outreach Engine</h4>
                <p className="text-xs text-gray-400">Multi-sender Loops, Parallel Send</p>
              </motion.div>

              {/* Node 4: Victory (CRM) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="glass-card p-6 rounded-2xl border border-white/10 text-center group hover:border-green-500/50 transition-all"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-500/30 group-hover:scale-125 transition-all">
                  <span className="material-icons text-green-400">emoji_events</span>
                </div>
                <h4 className="font-bold text-white mb-2">Victory</h4>
                <p className="text-xs text-gray-400">Meetings Booked, Revenue, CRM Sync</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 border-t border-white/5 bg-black overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-dim-grey uppercase tracking-widest mb-8">Trusted by 4,000+ companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <h3 className="text-lg md:text-xl font-bold font-display text-white">INTERCOM</h3>
            <h3 className="text-lg md:text-xl font-bold font-display text-white italic">Clay</h3>
            <h3 className="text-lg md:text-xl font-bold font-display text-white flex items-center gap-1"><span className="material-icons text-base">bolt</span>Instantly</h3>
            <h3 className="text-lg md:text-xl font-bold font-display text-white">Trigify.io</h3>
            <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-widest">FRECKLE.</h3>
          </div>
        </div>
      </motion.section>

      {/* Rotating Hub Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card rounded-3xl p-8 lg:p-12 border border-white/10 relative overflow-hidden group rotate-1 hover:rotate-0 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Smart Rotation</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                  Auto-rotate <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-gray-400 to-gray-600">LinkedIn senders</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Connect unlimited LinkedIn accounts for one flat fee. We automatically rotate sending between them to maximize reach while keeping accounts safe under the radar.
                </p>
                <div className="flex gap-4">
                  <Link href="#" className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors hover:scale-105 active:scale-95 shadow-lg">
                    Try HeyReach for free
                  </Link>
                  <div className="flex items-center gap-2 text-sm text-dim-grey px-4">
                    <span className="material-icons text-green-500 text-base animate-pulse">check</span> Unlimited senders
                  </div>
                </div>
              </div>
              <div className="relative min-h-[350px] sm:min-h-[450px] flex items-center justify-center scale-[0.65] sm:scale-90 md:scale-100 transition-transform">
                {/* Content aligned centrally */}
                {/* Concentric Rotating Rings */}
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                  {/* Outer Orbit Paths */}
                  <div className="absolute inset-0 rounded-full border border-white/5 bg-linear-to-r from-white/5 to-transparent"></div>
                  <div className="absolute inset-10 rounded-full border border-white/5 bg-linear-to-r from-transparent via-white/5 to-transparent"></div>
                  
                  {/* Central Hub Icon */}
                  <div className="relative z-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-linear-to-b from-white/10 to-transparent border border-white/20 flex items-center justify-center shadow-2xl backdrop-blur-xl group-hover:scale-110 transition-transform duration-500">
                    <span className="material-icons text-3xl md:text-5xl text-white drop-shadow-lg">hub</span>
                  </div>

                  {/* Multiple Rings of Orbit Icons */}
                  {[
                    { ring: 0, count: 8, radius: 130, speed: 'animate-spin-slow' },
                    { ring: 1, count: 6, radius: 90, speed: 'animate-spin-reverse-slow' }
                  ].map((orbit, ringIdx) => (
                    <div key={`ring-${ringIdx}`} className="absolute inset-0">
                      {Array.from({ length: orbit.count }).map((_, i) => {
                        const angle = (360 / orbit.count) * i;
                        return (
                          <div 
                            key={`orbit-${ringIdx}-${i}`}
                            className={`absolute inset-0 ${orbit.speed} pointer-events-none`} 
                            style={{ transform: `rotate(${angle}deg)` }}
                          >
                            <div 
                              className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-black border border-white/20 overflow-hidden shadow-lg pointer-events-auto hover:scale-125 transition-transform duration-300"
                              style={{ 
                                transform: `rotate(-${angle}deg) translateY(-${orbit.radius}px)`
                              }}
                            >
                              <img 
                                alt="Sender" 
                                className="opacity-80 object-cover w-full h-full" 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=sender-${ringIdx}-${i}`} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" fill="none" r="160" stroke="white" strokeDasharray="4 4" strokeWidth="1"></circle>
                  <circle cx="20%" cy="20%" fill="white" r="2" className="animate-pulse"></circle>
                  <circle cx="80%" cy="30%" fill="white" r="3" className="animate-pulse" style={{ animationDelay: '1s' }}></circle>
                  <circle cx="10%" cy="70%" fill="white" r="1.5" className="animate-pulse" style={{ animationDelay: '2s' }}></circle>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid: Import Leads & Combine Steps */}
      <motion.section 
        id="solutions"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all -rotate-2 hover:rotate-0">
              <div className="mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 text-white">
                  <span className="material-icons">download</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Import <span className="text-green-400">qualified leads</span></h3>
                <p className="text-gray-400">Run outbound and inbound-led campaigns. Import relevant LinkedIn contacts from Sales Navigator, Clay, HubSpot, or CSV.</p>
              </div>
              <div className="mt-auto relative h-48 bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid-bg opacity-20"></div>
                <div className="flex flex-col gap-3 w-3/4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                    <span className="material-icons text-blue-400">description</span>
                    <span className="text-sm font-medium">Sales Navigator Search</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                    <span className="material-icons text-orange-400">table_chart</span>
                    <span className="text-sm font-medium">HubSpot List Import</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between group hover:border-white/20 transition-all rotate-2 hover:rotate-0">
              <div className="mb-8">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10 text-white">
                  <span className="material-icons">merge_type</span>
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Combine <span className="text-blue-400">LinkedIn steps</span></h3>
                <p className="text-gray-400">Automate actions such as connection requests, messages, and profile views. Use &apos;If Connected&apos; logic for precision.</p>
              </div>
              <div className="mt-auto relative h-48 bg-black/40 rounded-xl border border-white/5 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 grid-bg opacity-20"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <div className="px-3 py-2 rounded bg-white/10 border border-white/10 text-xs">Connection</div>
                  <div className="w-8 h-px bg-white/20"></div>
                  <div className="px-3 py-2 rounded bg-white/10 border border-white/10 text-xs flex flex-col items-center gap-1">
                    <span>Condition</span>
                  </div>
                  <div className="w-8 h-px bg-white/20"></div>
                  <div className="px-3 py-2 rounded bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">Message</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

      {/* Multichannel Outreach: Sticky Scroll Flow Simulator */}
      <section ref={flowRef} className="relative h-[650vh] bg-background-dark border-t border-white/5 z-0">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden z-10">
          {/* Header */}
          <div className="absolute top-20 left-0 right-0 z-20 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Automated Intelligence</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                The <span className="metallic-text">Perfect Workflow</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
                Our AI orchestrates your entire GTM motion, evolving from simple leads to booked meetings in one seamless loop.
              </p>
            </motion.div>
          </div>

          <div className="relative w-full max-w-6xl h-full flex flex-col items-center pt-48 pb-20">
            {/* Vertical Flow Path - Starts lower */}
            <div className="absolute inset-x-0 top-[35%] bottom-0 flex justify-center pointer-events-none">
              <div className="w-px h-[90%] bg-white/5 relative">
                <motion.div 
                  className="absolute top-0 w-0.5 -left-px bg-linear-to-b from-blue-500 via-purple-500 to-emerald-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                  style={{ height: pathHeight }}
                />
                {/* Moving Pulse Particle */}
                <motion.div 
                  className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_25px_#fff] z-20"
                  style={{ 
                    top: pathHeight, 
                    opacity: particleOpacity 
                  }}
                />
              </div>
            </div>

            {/* Stages Grid */}
            <motion.div 
              style={{ y: gridY }}
              className="w-full flex flex-col gap-20 relative z-10"
            >
              {/* Stage 1: Discovery */}
              <div className="flex justify-start w-full px-4 md:px-0 lg:-ml-24">
                <motion.div 
                  style={{ opacity: step1Opacity, x: step1X, y: step1Y }}
                  className="glass-card p-6 rounded-2xl border border-white/10 w-full md:w-[340px] relative group hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                      <span className="material-icons text-blue-400">api</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Phase 01</span>
                      <h4 className="text-lg font-bold">Smart Discovery</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Auto-ingest leads from Sales Navigator, Clay, or Apollo. We scrape and clean data in real-time.
                  </p>
                </motion.div>
              </div>

              {/* Stage 2: AI Enrichment */}
              <div className="flex justify-end w-full px-4 md:px-0 lg:-mr-24">
                <motion.div 
                  style={{ opacity: step2Opacity, x: step2X, y: step2Y }}
                  className="glass-card p-6 rounded-2xl border border-white/10 w-full md:w-[340px] relative group hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                      <span className="material-icons text-purple-400">auto_awesome</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400">Phase 02</span>
                      <h4 className="text-lg font-bold">AI Enrichment</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Personalize every single icebreaker using GPT-4o. Find verified work emails and mobile numbers automatically.
                  </p>
                </motion.div>
              </div>

              {/* Stage 3: Routing */}
              <div className="flex justify-start w-full px-4 md:px-0 lg:-ml-24">
                <motion.div 
                  style={{ opacity: step3Opacity, x: step3X, y: step3Y }}
                  className="glass-card p-6 rounded-2xl border border-white/10 w-full md:w-[340px] relative group hover:border-indigo-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                      <span className="material-icons text-indigo-400">alt_route</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Phase 03</span>
                      <h4 className="text-lg font-bold">Multi-path Routing</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Logic-based execution. If email is bounced, trigger LinkedIn connection. If OOO, delay sequence automatically.
                  </p>
                </motion.div>
              </div>

              {/* Stage 4: CRM Sync */}
              <div className="flex justify-end w-full px-4 md:px-0 lg:-mr-24">
                <motion.div 
                  style={{ opacity: step4Opacity, x: step4X }}
                  className="glass-card p-6 rounded-2xl border border-white/10 w-full md:w-[340px] relative group hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                      <span className="material-icons text-emerald-400">task_alt</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Output</span>
                      <h4 className="text-lg font-bold">Revenue Captured</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Sync booked meetings to HubSpot, Pipedrive or Salesforce. 100% data fidelity across your stack.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified Inbox Section */}
      <motion.section 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="glass-card rounded-3xl p-2 border border-white/10 -rotate-2 hover:rotate-0 transition-all duration-700 animate-float">
                <div className="bg-black rounded-2xl overflow-hidden border border-white/5 relative h-[500px]">
                  <div className="bg-graphite p-4 border-b border-white/10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-600 relative overflow-hidden">
                        <img alt="Inbox User" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvnJauUxvC4prR8vKB4OsY8Fya2I0vyxeClaV96qOMk7JUzLHmL4lzS3vtB1byu3kdVWhY-fFHRRfBnauqXxT9IV0i6bSvzz2mTPNIvWdZldTeO87GJjdb8KdXl8Ay2DcUjI1Zbg6yDlMDb5Aj7fAA7SvJfrFjJPbY-yH-mf5oNkHqKjKavEBL5MB6T6G2vhphTgjDjA7jfKECzvm-PICEwmVuTGGvxQbTtJDK-oW6Nc_kpoetyXcAiyjYyHtm4uLbUWYg6-lpjc78" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black"></div>
                      </div>
                      <div>
                        <div className="text-sm font-bold">Unified Inbox</div>
                        <div className="text-[10px] text-gray-400">All accounts active</div>
                      </div>
                    </div>
                    <span className="material-icons text-gray-400 text-sm cursor-pointer hover:text-white transition-colors">settings</span>
                  </div>
                  <div className="p-2 space-y-2">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 cursor-pointer transition-colors group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium group-hover:text-white">Thomas Lean</span>
                        <span className="text-xs text-dim-grey">10:42 AM</span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">That sounds awesome, I&apos;ve been looking...</p>
                    </div>
                    <div className="p-3 bg-transparent rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Sarah Wilson</span>
                        <span className="text-xs text-dim-grey">Yesterday</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">Let&apos;s schedule a call for next week.</p>
                    </div>
                    <div className="p-3 bg-transparent rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Michael Gough</span>
                        <span className="text-xs text-dim-grey">Mon</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">Thanks for the connection request!</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full p-4 bg-graphite border-t border-white/10">
                    <div className="bg-black rounded-lg p-3 text-xs text-gray-500 border border-white/5 flex justify-between items-center hover:border-white/20 transition-all cursor-text">
                      <span>Type a message...</span>
                      <span className="material-icons text-sm hover:text-white cursor-pointer">send</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Zero Context Switching</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                Manage replies in <span className="bg-clip-text text-transparent bg-linear-to-r from-orange-200 to-orange-400">Unified Inbox</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Handle all LinkedIn messages in one centralized inbox without logging in and out of accounts. Send voice notes from your desktop and reply on behalf of colleagues seamlessly.
              </p>
              <Link className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all group" href="#">
                Learn more about Inbox <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Analytics Section with Animated Chart */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Unlock <span className="bg-white/10 px-2 rounded font-light italic font-serif">key insights</span>
            </h2>
          <p className="text-gray-400">
            Monitor lead behavior in real time. Track campaign results, sender performance, A/B tests.
          </p>
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/10 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
              <div className="flex items-center gap-4 sm:gap-8 w-full md:w-auto justify-between md:justify-start">
                <div className="text-center group-hover:scale-105 transition-transform cursor-default">
                  <div className="text-[10px] sm:text-xs text-dim-grey uppercase tracking-wide">Sent</div>
                  <div className="text-xl sm:text-2xl font-bold font-display">2,557</div>
                </div>
                <div className="hidden xs:block w-px h-8 sm:h-10 bg-white/10"></div>
                <div className="text-center group-hover:scale-105 transition-transform cursor-default">
                  <div className="text-[10px] sm:text-xs text-dim-grey uppercase tracking-wide">Accepted</div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-green-400">840</div>
                </div>
                <div className="hidden xs:block w-px h-8 sm:h-10 bg-white/10"></div>
                <div className="text-center group-hover:scale-105 transition-transform cursor-default">
                  <div className="text-[10px] sm:text-xs text-dim-grey uppercase tracking-wide">Replies</div>
                  <div className="text-xl sm:text-2xl font-bold font-display text-blue-400">178</div>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="w-full md:w-auto bg-white text-black px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl">Try HeyReach</button>
              </div>
            </div>
            {/* Animated SVG Chart */}
            <div className="relative h-64 md:h-80 w-full bg-linear-to-b from-white/5 to-transparent rounded-xl border border-white/5 p-4 overflow-hidden">
              <motion.svg 
                viewBox="0 0 800 250"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full p-4 md:p-8 overflow-visible" 
                preserveAspectRatio="none"
              >
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.5 }}
                  d="M0,200 C100,150 200,180 300,100 S450,120 550,50 S650,80 750,20 S800,60 850,10" 
                  fill="none" 
                  stroke="#60A5FA" 
                  strokeWidth="3" 
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.7 }}
                  d="M0,220 C100,180 200,200 300,150 S450,170 550,120 S650,140 750,80 S800,100 850,50" 
                  fill="none" 
                  stroke="#4ADE80" 
                  strokeDasharray="6 6" 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke"
                  className="opacity-40"
                />
                <defs>
                  <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgba(96, 165, 250, 0.15)', stopOpacity: 1 }}></stop>
                    <stop offset="100%" style={{ stopColor: 'rgba(96, 165, 250, 0)', stopOpacity: 0 }}></stop>
                  </linearGradient>
                </defs>
                <motion.path 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  d="M0,200 C100,150 200,180 300,100 S450,120 550,50 S650,80 750,20 S800,60 850,10 V250 H0 Z" 
                  fill="url(#grad1)" 
                  stroke="none" 
                  vectorEffect="non-scaling-stroke"
                />
              </motion.svg>
              
              {/* Chart X-Axis Labels */}
              <div className="absolute bottom-4 left-0 w-full flex justify-between px-6 sm:px-12 pointer-events-none">
                {["Apr 14", "Apr 16", "Apr 18", "Apr 20", "Apr 22"].map((date, i) => (
                  <span key={i} className="text-[10px] text-dim-grey font-medium">{date}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Outbound Outliers movement (Playbook Marquee) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-display font-bold mb-6"
          >
            Join the <span className="metallic-text">Outbound Outliers</span> movement
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Take a deep dive into proven GTM playbooks from people who see the game differently.
          </motion.p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-black to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-linear-to-l from-black to-transparent z-10"></div>
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              duration: 40, 
              ease: "linear", 
              repeat: Infinity 
            }}
            className="flex gap-4 md:gap-8 whitespace-nowrap w-max px-4"
          >
            {[1, 2, 3, 4, 1, 2, 3, 4].map((item, idx) => (
              <div key={idx} className="w-[300px] sm:w-[450px] inline-block whitespace-normal">
                <div className="glass-card rounded-3xl p-8 border border-white/10 h-full hover:border-white/30 transition-all group">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-white/10 to-transparent border border-white/20 overflow-hidden flex items-center justify-center">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item}`} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item === 1 ? "Hiring campaign" : item === 2 ? "Recruiting Masterclass" : item === 3 ? "Lead Gen Machine" : "SaaS Growth"}</h4>
                      <p className="text-xs text-dim-grey">{item === 1 ? "Matthew @ LevelUp" : item === 2 ? "Nikita @ Influencer" : item === 3 ? "Sanko @ Platinum" : "Alex @ ScaleUp"}</p>
                    </div>
                  </div>
                  <div className="bg-black/40 rounded-2xl p-6 border border-white/5 mb-8 h-32 flex items-center">
                    <p className="text-lg font-medium metallic-text italic">
                      {item === 1 ? "\"Build hiring campaign with 13.8% reply rates\"" : 
                       item === 2 ? "\"800 connections, 571 replies, 2 weeks: a masterclass\"" : 
                       item === 3 ? "\"Smart way to turn your LinkedIn engagers into leads\"" :
                       "\"Scale to $1M ARR with 0 ad spend using automated loops\""}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className={`material-icons text-sm ${item === 1 ? "text-green-500" : item === 2 ? "text-blue-500" : "text-orange-500"}`}>
                        {item === 1 ? "link" : item === 2 ? "reply" : "trending_up"}
                      </span>
                      <span className="text-dim-grey">{item === 1 ? "Acceptance: 72%" : item === 2 ? "Reply Rate: 79%" : "Leads: 450+"}</span>
                    </div>
                    <Link href="#" className="text-xs font-bold text-white flex items-center gap-1 group/link">
                      Read playbook <span className="material-icons text-[14px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-12 text-center">
            <button className="bg-transparent border border-white/20 hover:bg-white/5 text-white px-8 py-3 rounded-lg text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg">
              Show me all the playbooks
            </button>
          </div>
      </motion.section>

      {/* Conversations Counter Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 text-center relative overflow-hidden bg-black border-y border-white/5"
      >
        <div className="absolute inset-0 bg-hero-radial opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            <StatItem value={426089} label="Conversations started last month" suffix=" 🔥" />
            <StatItem value={12500} label="Active senders using HeyReach" suffix="+" />
            <StatItem value={98} label="Average deliverability rate" suffix="%" />
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        id="resources"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 relative overflow-hidden bg-background-dark"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Common <span className="metallic-text">Questions</span>
            </h2>
            <p className="text-gray-400">Everything you need to know about scaling your outreach.</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Is HeyReach safe for my LinkedIn account?",
                a: "Absolutely. We use enterprise-grade cloud environments and smart rotation to ensure your activity patterns look human. We limit actions per account to stay well within LinkedIn's safety thresholds."
              },
              {
                q: "Can I connect unlimited accounts?",
                a: "Yes! Unlike other platforms that charge per seat, HeyReach allows you to connect as many LinkedIn accounts as you need on our Scale plans."
              },
              {
                q: "Do I need a LinkedIn Sales Navigator subscription?",
                a: "While Sales Navigator helps with search granularity, it's not strictly required. You can import leads from CSVs, Apollo, or basic LinkedIn searches."
              },
              {
                q: "How does the Unified Inbox work?",
                a: "It aggregates all messages from all connected accounts into one dashboard. You can reply, send voice notes, and manage conversations without ever logging into LinkedIn directly."
              }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                className="glass-card rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all cursor-pointer group"
              >
                <h3 className="text-lg font-bold flex items-center justify-between">
                  {faq.q}
                  <motion.span 
                    animate={{ rotate: activeFAQ === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="material-icons text-dim-grey group-hover:text-white transition-colors"
                  >
                    {activeFAQ === i ? 'close' : 'add'}
                  </motion.span>
                </h3>
                <motion.div
                  initial={false}
                  animate={{ height: activeFAQ === i ? "auto" : 0, opacity: activeFAQ === i ? 1 : 0, marginTop: activeFAQ === i ? 16 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Handcrafted Support Section */}
      <section className="py-24 relative overflow-hidden border-t border-white/5 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
                <span className="text-[10px] font-bold text-dim-grey uppercase tracking-widest">Human-Led Support</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-display font-bold mb-8 leading-tight">
                Not just <span className="metallic-text italic border-b border-white/20">software.</span><br />
                A partner in <span className="text-blue-400">GTM.</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-xl">
                We don&apos;t do generic tickets. Our team consists of actual outbound experts who help you optimize your sequences, verify your domains, and scale your pipeline.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative bg-white text-black px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  Talk to an expert
                  <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=support-${i}`} alt="Agent" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-white font-quirky text-2xl">Live now</div>
                    <div className="text-dim-grey uppercase tracking-tighter text-[9px]">Avg response: 4 mins</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                    <span className="material-icons text-blue-400 text-xl">menu_book</span>
                  </div>
                  <h4 className="font-bold mb-2">Knowledge Base</h4>
                  <p className="text-xs text-gray-400 mb-4 text-left">Hand-picked guides on scaling past 100+ accounts.</p>
                  <Link href="#" className="text-[10px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-white uppercase tracking-widest">
                    Enter Hub <span className="material-icons text-xs">north_east</span>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass-card p-6 rounded-3xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all group mt-8 sm:mt-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                    <span className="material-icons text-purple-400 text-xl">groups</span>
                  </div>
                  <h4 className="font-bold mb-2">The Community</h4>
                  <p className="text-xs text-gray-400 mb-4 text-left">Connect with 4k+ agency owners in our Slack.</p>
                  <Link href="#" className="text-[10px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-white uppercase tracking-widest">
                    Join Channel <span className="material-icons text-xs">north_east</span>
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="col-span-1 sm:col-span-2 glass-card p-8 rounded-3xl border border-white/10 bg-linear-to-br from-white/5 to-transparent relative overflow-hidden group"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="text-xl font-bold mb-1">GTM Strategy Session</h4>
                      <p className="text-sm text-gray-400 text-left">Book a 1-on-1 with our team to audit your current outbound flow.</p>
                    </div>
                    <button className="whitespace-nowrap bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/40">
                      Reserve a Slot
                    </button>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] pointer-events-none"></div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] uppercase tracking-[0.2em] font-medium text-dim-grey">
            <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-green-500"></span> System Status: 100% Operational</div>
            <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-blue-500"></span> 24/7 Human Coverage</div>
            <div className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-purple-500"></span> Expert-Led Documentation</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
