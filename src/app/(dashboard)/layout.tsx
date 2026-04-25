"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Rocket, 
  PlusCircle, 
  Settings, 
  BarChart3, 
  Users, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Campaigns", icon: Rocket, href: "/campaigns" },
    { name: "New Campaign", icon: PlusCircle, href: "/campaigns/create" },
    { name: "Agents", icon: Users, href: "/agents" },
    { name: "Connectors", icon: PlusCircle, href: "/connectors" },
    { name: "Analytics", icon: BarChart3, href: "/analytics" },
    { name: "Billing", icon: Settings, href: "/billing" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-background-dark text-white font-sans overflow-hidden">
      {/* Sidebar - Desktop */}
      <motion.aside 
        initial={false}
        animate={{ width: collapsed ? 80 : 280 }}
        className="hidden lg:flex relative z-50 flex-col border-r border-white/5 bg-black/40 backdrop-blur-3xl"
      >
        <LogoSection collapsed={collapsed} />
        <NavContent navItems={navItems} pathname={pathname} collapsed={collapsed} />
        <UserSection collapsed={collapsed} />
        <ToggleButton collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.aside>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[60] w-72 bg-background-dark border-r border-white/10 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between pr-4 border-b border-white/5">
                <LogoSection collapsed={false} />
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-dim-grey hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <NavContent 
                navItems={navItems} 
                pathname={pathname} 
                collapsed={false} 
                onItemClick={() => setMobileMenuOpen(false)} 
              />
              <UserSection collapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="grow flex flex-col relative overflow-hidden">
         {/* Top Header */}
         <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 sm:px-8 relative z-40 bg-black/20 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white"
              >
                <Menu size={20} />
              </button>
              
              <div className="hidden sm:flex items-center gap-4 bg-white/2 px-5 py-2.5 rounded-2xl border border-white/5 w-full max-w-md focus-within:border-white/20 focus-within:bg-white/5 transition-all group">
                  <Search size={18} className="text-dim-grey group-focus-within:text-white transition-colors" />
                  <input 
                      type="text" 
                      placeholder="Search..." 
                      className="bg-transparent border-none outline-none text-sm w-full placeholder:text-dim-grey text-white"
                  />
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <button className="relative text-dim-grey hover:text-white transition-colors p-2">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                </button>

                <Link href="/profile" className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-white/5 hover:opacity-80 transition-opacity">
                    <div className="hidden xs:block text-right">
                        <div className="text-sm font-bold metallic-text">Alex Johnson</div>
                        <div className="text-[9px] text-dim-grey uppercase tracking-[0.2em] font-bold">Pro Plan</div>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-linear-to-br from-white/10 to-transparent border border-white/20 p-0.5">
                        <div className="w-full h-full rounded-full overflow-hidden bg-black/40">
                            <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" width={40} height={40} className="w-full h-full" />
                        </div>
                    </div>
                </Link>
            </div>
         </header>

         {/* Scrollable Content */}
         <main className="grow overflow-y-auto p-4 sm:p-8 relative no-scrollbar">
            {/* Background Blobs for Dashboard */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-20 left-[10%] w-[300px] h-[300px] bg-white/5 blur-[120px]"></div>
                <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-white/5 blur-[150px]"></div>
            </div>
            {children}
         </main>
      </div>
    </div>
  );
}

// Sub-components for Sidebar to keep it DRY
function LogoSection({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="h-20 flex items-center px-6 border-b border-white/5 shrink-0">
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
          <span className="text-black font-bold text-lg">H</span>
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-display font-bold tracking-tight whitespace-nowrap"
          >
            HeyReach
          </motion.span>
        )}
      </Link>
    </div>
  );
}

interface NavContentProps {
  navItems: { name: string; icon: React.ElementType; href: string }[];
  pathname: string;
  collapsed: boolean;
  onItemClick?: () => void;
}

function NavContent({ navItems, pathname, collapsed, onItemClick }: NavContentProps) {
  return (
    <nav className="grow p-4 space-y-2 mt-4 overflow-y-auto no-scrollbar">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link 
            key={item.href} 
            href={item.href}
            onClick={() => onItemClick?.()}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${
              isActive 
              ? "text-white bg-white/5 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
              : "text-dim-grey hover:text-white hover:bg-white/2"
            }`}
          >
            <item.icon size={20} className="shrink-0" />
            {!collapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            )}
            {isActive && (
                <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-transparent opacity-100"
                />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function UserSection({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="p-4 border-t border-white/5 shrink-0">
      <Link 
        href="/"
        className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-dim-grey hover:text-red-400 hover:bg-red-400/5 transition-all group"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        {!collapsed && <span>Logout</span>}
      </Link>
    </div>
  );
}

interface ToggleButtonProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

function ToggleButton({ collapsed, setCollapsed }: ToggleButtonProps) {
  return (
    <button 
      onClick={() => setCollapsed(!collapsed)}
      className="absolute -right-4 top-24 w-8 h-8 bg-white border border-white/20 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:scale-110 hover:bg-white/90 active:scale-95 transition-all z-60"
    >
      {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
    </button>
  );
}
