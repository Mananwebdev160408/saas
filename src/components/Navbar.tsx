"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          isScrolled 
            ? 'md:mt-4 px-0 md:px-4' 
            : 'px-0'
        }`}
      >
        <div 
          className={`transition-all duration-500 flex items-center justify-between border-white/5 bg-background-dark/95 backdrop-blur-md ${
            isScrolled 
              ? 'w-full md:w-[70%] md:rounded-full border-b md:border px-8 py-4 md:py-3 shadow-2xl' 
              : 'w-full border-b px-8 sm:px-12 lg:px-24 py-6'
          }`}
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-white rounded flex items-center justify-center">
              <span className="material-icons text-black text-sm font-bold">bolt</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">heyreach</span>
          </Link>
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-8">
              <Link className="text-dim-grey hover:text-white transition-all text-sm font-medium" href="/#product">Product</Link>
              <Link className="text-dim-grey hover:text-white transition-all text-sm font-medium" href="/#solutions">Solutions</Link>
              <Link className="text-dim-grey hover:text-white transition-all text-sm font-medium" href="/pricing">Pricing</Link>
              <Link className="text-dim-grey hover:text-white transition-all text-sm font-medium" href="/#resources">Resources</Link>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center">
            <Link className="text-sm font-medium text-dim-grey hover:text-white hidden sm:block" href="#">Login</Link>
            <Link className="bg-white text-black px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 whitespace-nowrap" href="#">Start Free Trial</Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-white flex items-center justify-center">
              <span className="material-icons">{isMobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 lg:hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              <Link onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-bold" href="/#product">Product</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-bold" href="/#solutions">Solutions</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-bold" href="/pricing">Pricing</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-display font-bold" href="/#resources">Resources</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold mt-8 text-dim-grey" href="#">Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
