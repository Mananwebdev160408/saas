"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  FileJson, 
  FileSpreadsheet, 
  Plus, 
  Trash2, 
  Linkedin,
  Monitor,
  Rocket,
  CheckCircle2,
  Info
} from "lucide-react";
import Link from "next/link";

export default function CreateCampaignPage() {
  const [step, setStep] = useState(1);
  const [agents, setAgents] = useState<{ id: string; name: string; status: string }[]>([]);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [leadMethod, setLeadMethod] = useState<"manual" | "mass">("mass");

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const addAgent = () => {
    // Simulating agent addition after "auth"
    const newAgent = { 
        id: Math.random().toString(36).substr(2, 9), 
        name: `LinkedIn Agent ${agents.length + 1}`, 
        status: "Authenticated" 
    };
    setAgents([...agents, newAgent]);
    setShowAgentModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Back Button */}
      <Link 
        href="/campaigns" 
        className="inline-flex items-center gap-2 text-dim-grey hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to campaigns
      </Link>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-16 relative px-4">
        <div className="absolute top-[1.25rem] left-0 w-full h-px bg-white/5 -z-10"></div>
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold font-display transition-all border ${
              step === s ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.2)] scale-110" : 
              step > s ? "bg-green-500 text-white border-green-500" : "bg-black/40 text-dim-grey border-white/5"
            }`}>
              {step > s ? <Check size={20} /> : s}
            </div>
            <span className={`text-[9px] uppercase tracking-[0.2em] font-bold ${step === s ? "text-white" : "text-dim-grey"}`}>
                {s === 1 ? "Details" : s === 2 ? "Agents" : s === 3 ? "Leads" : "Review"}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-8"
          >
            <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Campaign Details</h2>
                <p className="text-dim-grey">Give your campaign a name and purpose</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim-grey ml-1">Campaign Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Q2 Outreach - SaaS Founders"
                        className="w-full bg-white/2 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all placeholder:text-dim-grey/50"
                    />
                </div>
 
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-dim-grey ml-1">Description (Optional)</label>
                    <textarea 
                        placeholder="What's the goal of this campaign?"
                        rows={4}
                        className="w-full bg-white/2 border border-white/5 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-white/20 focus:bg-white/5 transition-all placeholder:text-dim-grey/50"
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button 
                  onClick={nextStep}
                  className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                >
                  Configure Agents <ArrowRight size={20} />
                </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-8"
          >
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <h2 className="text-3xl font-display font-bold">LinkedIn Agents</h2>
                    <p className="text-dim-grey">Add the LinkedIn accounts that will run this campaign</p>
                </div>
                <button 
                    onClick={() => setShowAgentModal(true)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-xl transition-all font-bold group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                    Connect Agent
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {agents.length === 0 ? (
                    <div className="col-span-2 py-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-dim-grey space-y-4">
                         <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <Linkedin size={32} />
                         </div>
                         <p>No agents connected yet</p>
                    </div>
                ) : (
                    agents.map((agent) => (
                        <div key={agent.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                                    <Linkedin size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <div className="font-bold">{agent.name}</div>
                                    <div className="text-[10px] text-green-400 font-bold uppercase tracking-widest">{agent.status}</div>
                                </div>
                            </div>
                            <button className="p-2 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-between pt-4 border-t border-white/5">
                <button onClick={prevStep} className="text-dim-grey hover:text-white transition-colors font-bold flex items-center gap-2 px-4">
                    <ArrowLeft size={18} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  disabled={agents.length === 0}
                  className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import Leads <ArrowRight size={20} />
                </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-8"
          >
            <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold">Lead List</h2>
                <p className="text-dim-grey">Upload your leads via CSV, Excel, or JSON</p>
            </div>

            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                <button 
                    onClick={() => setLeadMethod("mass")}
                    className={`grow py-3 rounded-xl font-bold transition-all ${leadMethod === "mass" ? "bg-white text-black" : "text-dim-grey hover:text-white"}`}
                >
                    Mass Upload
                </button>
                <button 
                    onClick={() => setLeadMethod("manual")}
                    className={`grow py-3 rounded-xl font-bold transition-all ${leadMethod === "manual" ? "bg-white text-black" : "text-dim-grey hover:text-white"}`}
                >
                    Manual Addition
                </button>
            </div>

            {leadMethod === "mass" ? (
                <div className="space-y-6">
                    <div className="border-2 border-dashed border-white/10 rounded-4xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:border-white/30 transition-all cursor-pointer bg-white/2 group">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload size={40} className="text-dim-grey group-hover:text-white transition-colors" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-bold">Click to upload or drag & drop</p>
                            <p className="text-sm text-dim-grey">Accepted formats: .csv, .xlsx, .json</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {[
                            { name: "Excel Sheet", icon: FileSpreadsheet, ext: ".xlsx" },
                            { name: "CSV File", icon: Plus, ext: ".csv" },
                            { name: "JSON Data", icon: FileJson, ext: ".json" },
                        ].map((type) => (
                            <div key={type.name} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer">
                                <div className="p-2 rounded-lg bg-white/5">
                                    <type.icon size={20} className="text-white/60" />
                                </div>
                                <span className="text-xs font-bold">{type.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <p className="text-sm text-dim-grey bg-white/5 p-4 rounded-xl flex items-start gap-2 border border-blue-500/20">
                        <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
                        Paste LinkedIn URLs or emails separated by new lines to add leads manually.
                    </p>
                    <textarea 
                        rows={10}
                        placeholder="https://linkedin.com/in/username&#10;name@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
                <button onClick={prevStep} className="text-dim-grey hover:text-white transition-colors font-bold flex items-center gap-2 px-4">
                    <ArrowLeft size={18} /> Back
                </button>
                <button 
                  onClick={nextStep}
                  className="bg-white text-black font-bold px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
                >
                  Review Campaign <ArrowRight size={20} />
                </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 rounded-[2.5rem] border border-white/10 bg-black/40 space-y-8"
          >
            <div className="text-center space-y-2">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h2 className="text-3xl font-display font-bold">Ready to Launch?</h2>
                <p className="text-dim-grey">Review your settings one last time</p>
            </div>

            <div className="grid grid-cols-2 gap-6 bg-white/2 p-8 rounded-3xl border border-white/5">
                <div className="space-y-4">
                    <div>
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-widest">Campaign Name</div>
                        <div className="text-lg font-bold">Q2 Outreach - SaaS Founders</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-widest">Connected Agents</div>
                        <div className="text-lg font-bold">{agents.length} Agents active</div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-widest">Lead Count</div>
                        <div className="text-lg font-bold">1,250 Leads imported</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-dim-grey font-bold uppercase tracking-widest">Method</div>
                        <div className="text-lg font-bold">{leadMethod === "mass" ? "Mass Upload (CSV)" : "Manual Addition"}</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <Info size={20} className="text-blue-400 shrink-0" />
                    <p className="text-xs text-blue-200/70 leading-relaxed">
                        Your campaign will start in a <b>Queued</b> state and begin processing within 5-10 minutes. Agents will rotate automatically to ensure safety.
                    </p>
                </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/5">
                <button onClick={prevStep} className="text-dim-grey hover:text-white transition-colors font-bold flex items-center gap-2 px-4">
                    <ArrowLeft size={18} /> Back
                </button>
                <Link 
                  href="/campaigns"
                  className="bg-linear-to-r from-green-400 to-emerald-500 text-black font-extrabold px-12 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(52,211,153,0.2)]"
                >
                  LAUNCH CAMPAIGN <Rocket size={20} />
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agent Auth Simulation Modal */}
      <AnimatePresence>
        {showAgentModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowAgentModal(false)}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl bg-background-dark border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
                >
                    <div className="h-1 bg-blue-500 w-full"></div>
                    <div className="p-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-display font-bold">LinkedIn Session Capture</h3>
                                <p className="text-dim-grey text-sm">Follow the prompts in the secure window to link your account.</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                                <Linkedin size={24} className="text-blue-400" />
                            </div>
                        </div>

                        {/* Premium Connect UI */}
                        <div className="relative py-12 flex flex-col items-center justify-center space-y-8 overflow-hidden">
                            {/* Animated Background Aura */}
                            <div className="absolute inset-0 flex items-center justify-center -z-10">
                                <motion.div 
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]"
                                />
                            </div>

                            <div className="relative">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-8 border border-dashed border-blue-500/20 rounded-full"
                                />
                                <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.3)] relative z-10">
                                    <Linkedin size={40} className="text-white" />
                                </div>
                            </div>

                            <div className="text-center space-y-3 z-10">
                                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-400">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                    Ready to sync
                                </div>
                                <h4 className="text-xl font-display font-medium text-white/90">Click below to open the secure login window</h4>
                            </div>

                            <div className="w-full max-w-sm space-y-4 pt-4 z-10">
                                <button 
                                    onClick={addAgent}
                                    className="w-full bg-white text-black font-extrabold py-5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 group/btn"
                                >
                                    Open LinkedIn Secure Portal <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                
                                <p className="text-[10px] text-center text-dim-grey uppercase tracking-widest leading-relaxed">
                                    Protected by 256-bit AES Encryption
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center gap-3">
                                <Monitor size={16} className="text-dim-grey" />
                                <span className="text-[10px] font-bold text-dim-grey uppercase tracking-wider">Cloud Instance: US-EAST-1</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/2 border border-white/5 flex items-center gap-3">
                                <Check size={16} className="text-green-500" />
                                <span className="text-[10px] font-bold text-dim-grey uppercase tracking-wider">Playwright Runtime Active</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowAgentModal(false)}
                            className="w-full text-dim-grey hover:text-white transition-colors py-2 font-bold text-sm"
                        >
                            Nevermind, go back
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
