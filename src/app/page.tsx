"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background-dark">
      {/* Navigation */}
      <nav 
        className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          isScrolled 
            ? "top-4 w-[85%] md:w-[70%] rounded-full border border-white/10 bg-background-dark/60 backdrop-blur-xl px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.8)]" 
            : "top-0 w-full border-b border-white/5 bg-background-dark/80 backdrop-blur-md px-4"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-14" : "h-20"}`}>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center shrink-0">
                <span className="material-icons text-black text-sm font-bold">bolt</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight hidden sm:block">HeyReach</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4 lg:space-x-8">
                <Link className="text-dim-grey hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5" href="#">Product</Link>
                <Link className="text-dim-grey hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5" href="#">Solutions</Link>
                <Link className="text-dim-grey hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5" href="#">Pricing</Link>
                <Link className="text-dim-grey hover:text-white transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-white/5" href="#">Resources</Link>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Link className="text-sm font-medium text-dim-grey hover:text-white transition-colors" href="#">Login</Link>
              <Link className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/10 transition-all hover:scale-105 active:scale-95 whitespace-nowrap" href="#">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-hero-radial">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-float">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">New: AI Sequence Generator</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter mb-6 leading-[1.1]">
            <span className="metallic-text">10x your LinkedIn</span><br />
            <span className="text-dim-grey">outbound output</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 font-light leading-relaxed">
            Unlimited senders. One fixed cost. Automate outreach for agencies, sales teams, and GTM experts with absolute precision.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
            <Link className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg text-base font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2" href="#">
              Try HeyReach for free
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
            <Link className="group px-8 py-4 rounded-lg text-base font-medium border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2" href="#">
              <span className="material-icons text-dim-grey group-hover:text-white transition-colors">play_circle</span>
              View Demo
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-dim-grey">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <span className="material-icons text-base">credit_card_off</span> No card required
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <span className="material-icons text-base">workspace_premium</span> Premium features
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative mx-auto max-w-5xl group">
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative glass-card rounded-xl p-2 md:p-4 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 px-2 opacity-50">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="grid grid-cols-12 gap-4 h-[400px] md:h-[500px] relative">
                <div className="hidden md:block col-span-2 border-r border-white/5 pr-4 flex flex-col gap-4">
                  <div className="h-8 w-full bg-white/5 rounded animate-pulse"></div>
                  <div className="h-8 w-3/4 bg-white/5 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-8 w-5/6 bg-white/5 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <div className="col-span-12 md:col-span-10 flex flex-col items-center justify-center relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
                    <div className="flex justify-between items-center mb-12">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg relative z-10 animate-float">
                        <span className="material-icons text-white/50">person</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 mx-4 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-dim-grey border border-white/10 rounded">Wait 2d</div>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg relative z-10 animate-float" style={{ animationDelay: '1s' }}>
                        <span className="material-icons text-white/50">mail</span>
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1 mx-4 relative">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-xs text-dim-grey border border-white/10 rounded">If Replied</div>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center shadow-lg relative z-10 animate-float" style={{ animationDelay: '2s' }}>
                        <span className="material-icons text-white/50">check_circle</span>
                      </div>
                    </div>
                    {/* Floating Notifications */}
                    <div className="absolute -top-20 left-10 p-2 glass-card rounded-lg flex items-center gap-3 animate-float" style={{ animationDuration: "3s" }}>
                      <div className="w-8 h-8 rounded-full bg-gray-600 border border-white/20 overflow-hidden shrink-0">
                        <img alt="Avatar" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDG3_TUBhuhBEbhSqpPBNz_vhIP_v_6c-RZRnzoidOS0WpnUiaY818EfcFvdPqRFiKRUVlr9ocvb2gLXpcTPUy6oyPfkDflXDcJGFHfox6UiKO9WRvwhgsEcbPwd0AYhI77ip2x3BBPB2L4_MZuu4Hvt0kNW7YehAS58LDePJKttOw9W2NLMK-yArUdRGKoozId3miJ0vE2VTsFP8XKHuyS-Ji9HRwelTQCQVlcst4KeLnF7HVJr7jqVwpQbtv62CuLDrnaKycZddkP" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-white font-medium">Sarah connected</div>
                        <div className="text-[10px] text-dim-grey">Just now</div>
                      </div>
                    </div>
                    <div className="absolute -bottom-10 right-20 p-2 glass-card rounded-lg flex items-center gap-3 animate-float" style={{ animationDuration: "4s", animationDelay: '1.5s' }}>
                      <div className="w-8 h-8 rounded-full bg-gray-600 border border-white/20 overflow-hidden shrink-0">
                        <img alt="Avatar" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiu474yiGrg9-9pfity0dPBiuCP_JxgpH8Eoq9voSWqvp6gZScTck2XNtnLaKSMbBh5gO_8_GbYfdy03cjCM672yXKk_gxESBC2CLyUkYpq1m6zfHcWi0JMn_sbsRbwdLpxYS1Bl0MESEOaT-kto9EcoGW04bIWf6Xk6Q2Fi0K6KCgms4ZHWU6Elqc4vmXGrdHtgqnPmuVLZoJ1AuG7VXM2bePyjeyQbS8885MR-us_hqLnwhHJOIFX8IZY4FdttL2cAD-hWuXeK76" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] text-white font-medium">Mike replied</div>
                        <div className="text-[10px] text-dim-grey">2m ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-y border-white/5 bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-dim-grey uppercase tracking-widest mb-8">Trusted by 4,000+ companies</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <h3 className="text-xl font-bold font-display text-white italic">Clay</h3>
            <h3 className="text-xl font-bold font-display text-white flex items-center gap-1"><span className="material-icons">bolt</span>Instantly</h3>
            <h3 className="text-xl font-bold font-display text-white">Trigify.io</h3>
            <h3 className="text-xl font-bold font-display text-white tracking-widest">FRECKLE.</h3>
          </div>
        </div>
      </section>

      {/* Rotating Hub Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Smart Rotation</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6">
                  Auto-rotate <span className="metallic-text">LinkedIn senders</span>
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
              <div className="relative min-h-[400px] flex items-center justify-center">
                {/* Concentric Rotating Rings */}
                <div className="relative w-80 h-80 rounded-full border border-white/5 flex items-center justify-center">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin-slow"></div>
                  {/* Inner Ring (Reverse) */}
                  <div className="absolute inset-8 rounded-full border border-dashed border-white/10 animate-spin-reverse-slow"></div>
                  
                  <div className="w-20 h-20 bg-gradient-to-b from-gray-800 to-black rounded-full border border-white/20 flex items-center justify-center z-10 relative shadow-[0_0_30px_rgba(255,255,255,0.15)] animate-float">
                    <span className="material-icons text-white text-3xl">hub</span>
                  </div>

                  {/* Sender Avatars on Orbit */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border border-white/20 overflow-hidden shadow-lg animate-float">
                    <img alt="Sender" className="opacity-80 object-cover w-full h-full hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOlkn1O4IvHcU6Et2FiRLanS7iJHmT1eNYEL8meFRb_Eod8TeNL4kDQeW90mPVDyx1uhq_0ZE27Aek7IvND3tFwDpEipWsJJzGNB9GXm893iKvRkX3_BPUTpMT7hvJ1M5oHwLNbJRlwrJMi6YivPdQBjmqL0DJLrrmaLthX_e_2d_Rki4eF6SUNdwq6Fj6xQriX-JblGlkCKWwyCazZz7PkUE29FZcdM5ZsPYplVG9iuVSp5vZbISUvYuR67bXjcq6S7k0dPMOHGnV" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-black border border-white/20 overflow-hidden shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                    <img alt="Sender" className="opacity-80 object-cover w-full h-full hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpW09xfpjy0vk06OAZFWG6V73_SoXJek146l_ojOnIArHWtbM972fqs9z-HlFb4oZr2XeQxri3lLmm7Stw_oAqC2qYRoOSxaH5fLmGjSHwmYSN_rVy6ro_RKh18FsPWyXBbfEuBjtitU35bfoqhDlx-Uia2ezWBGJz_DLqhangjuxBOYyFAUAQAj-PBA6hB-t5LnP7X14BozFKlAKk26vbDhGI_HZj-Si1hmJcShTZ7Kx8pc53jp2zHLi0NKFER1MJtp6eur16GEBE" />
                  </div>
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border border-white/20 overflow-hidden shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                    <img alt="Sender" className="opacity-80 object-cover w-full h-full hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Zf7tpqUXMOXpyWIoFCIwqOt-kQF4gF_eIzh6HRmMPePKUyupIfnLoHIHk4HvfLwV6RSl8-C3iZkwu3jgKJXFHEItcPKM8tmFBy6BdphHnB1ENNpeEffPXxqmIgM2BP4B7Tjqw2kJ_bLdLDdN_fApBM-kK0jNhQTY9hgeVvLsWSdk23TqOtEY1QjowGNxrwR7iVAQY1IXuqUI1sQAoJLTVwyuaGuo1WoAVcxZgj110CI_b0nbTrhhYFXwVTxCB1eAw88TERXq6R61" />
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black border border-white/20 overflow-hidden shadow-lg animate-float" style={{ animationDelay: '3s' }}>
                    <img alt="Sender" className="opacity-80 object-cover w-full h-full hover:scale-110 transition-transform" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBej7__AC2fBf_klzl1PrMlohLyQZGappe4deSf7pt9iF2wNgT0KeVSMbQONQ_rTO7RPctti-og4N7_g3WVcFpuVM-dYRJ2MLoOqVSTu038cz7iGeDe9fMM79GksGj6DpSrSgYmEwky-jyDrw4I_SzQGrs1L7Cmc-A7ob3mfr-ueJJAdHMWMt0ug7-zd8IHP68RCCklbkZptDdrbWW2afwGNz7lpQpaLK4khrsd3AhVAhelnu76oB-QqJ7kD6kEokURBlx27dbV4lm0" />
                  </div>
                </div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50%" cy="50%" fill="none" r="160" stroke="white" strokeDasharray="4 4" strokeWidth="1"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section with Animated Chart */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Unlock <span className="bg-white/10 px-2 rounded font-light italic font-serif">key insights</span>
            </h2>
            <p className="text-gray-400">Monitor lead behavior in real time. Track campaign results, sender performance, A/B tests.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 md:p-10 border border-white/10 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div className="flex gap-4">
                <div className="text-center hover:scale-105 transition-transform cursor-default">
                  <div className="text-xs text-dim-grey uppercase tracking-wide">Sent</div>
                  <div className="text-2xl font-bold font-display">2,557</div>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center hover:scale-105 transition-transform cursor-default">
                  <div className="text-xs text-dim-grey uppercase tracking-wide">Accepted</div>
                  <div className="text-2xl font-bold font-display text-green-400">840</div>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div className="text-center hover:scale-105 transition-transform cursor-default">
                  <div className="text-xs text-dim-grey uppercase tracking-wide">Replies</div>
                  <div className="text-2xl font-bold font-display text-blue-400">178</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-white text-black px-4 py-2 rounded text-sm font-bold hover:scale-105 active:scale-95 transition-all">Try HeyReach</button>
              </div>
            </div>
            {/* Animated SVG Chart */}
            <div className="relative h-64 w-full bg-gradient-to-b from-white/5 to-transparent rounded-lg border border-white/5 p-4 flex items-end gap-1">
              <div className="w-full flex items-end justify-between h-full px-2">
                <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none">
                  <path 
                    d="M0,200 C50,150 100,180 150,100 S250,120 300,50 S400,80 500,20 S600,60 800,10" 
                    fill="none" 
                    stroke="#60A5FA" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                    className="animate-draw"
                  />
                  <path 
                    d="M0,220 C50,180 100,200 150,150 S250,170 300,120 S400,140 500,80 S600,100 800,50" 
                    fill="none" 
                    stroke="#4ADE80" 
                    strokeDasharray="4 4" 
                    strokeWidth="2" 
                    vectorEffect="non-scaling-stroke"
                    className="animate-draw opacity-50"
                  />
                  <defs>
                    <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(96, 165, 250, 0.2)', stopOpacity: 1 }}></stop>
                      <stop offset="100%" style={{ stopColor: 'rgba(96, 165, 250, 0)', stopOpacity: 0 }}></stop>
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0,200 C50,150 100,180 150,100 S250,120 300,50 S400,80 500,20 S600,60 800,10 V250 H0 Z" 
                    fill="url(#grad1)" 
                    stroke="none" 
                    vectorEffect="non-scaling-stroke"
                    className="animate-fade-in-up"
                  />
                </svg>
                <div className="absolute bottom-2 left-4 text-[10px] text-dim-grey">Apr 14</div>
                <div className="absolute bottom-2 left-1/4 text-[10px] text-dim-grey">Apr 16</div>
                <div className="absolute bottom-2 left-2/4 text-[10px] text-dim-grey">Apr 18</div>
                <div className="absolute bottom-2 left-3/4 text-[10px] text-dim-grey">Apr 20</div>
                <div className="absolute bottom-2 right-4 text-[10px] text-dim-grey">Apr 22</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="bg-black border-t border-white/5 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-6 hover:scale-105 transition-transform group cursor-pointer">
              <div className="h-6 w-6 bg-white rounded flex items-center justify-center group-hover:bg-primary transition-colors">
                <span className="material-icons text-black text-xs font-bold">bolt</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight">heyreach</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-dim-grey mb-12">
            <Link className="hover:text-white transition-colors" href="#">Pricing</Link>
            <Link className="hover:text-white transition-colors" href="#">About</Link>
            <Link className="hover:text-white transition-colors" href="#">Help Center</Link>
            <Link className="hover:text-white transition-colors" href="#">Terms</Link>
          </div>
          <p className="text-xs text-dim-grey opacity-50">© 2025 HeyReach - LinkedIn Automation for Scale</p>
        </div>
      </footer>
    </main>
  );
}
