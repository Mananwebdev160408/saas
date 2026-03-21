"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Billing & Subscription</h1>
          <p className="text-dim-grey">Manage your plan and payment methods</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
            <h2 className="text-2xl font-bold mb-6">Current Plan</h2>
            <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <div className="text-sm text-dim-grey uppercase tracking-widest font-bold mb-1">Active Plan</div>
                <div className="text-2xl font-bold">Pro Monthly</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">$99/mo</div>
                <div className="text-xs text-dim-grey">Next billing: April 22, 2026</div>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <button className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all">Change Plan</button>
              <button className="text-dim-grey hover:text-white transition-colors px-6 py-3">Cancel Subscription</button>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[2.5rem] border border-white/10 bg-black/40">
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
              <div className="p-3 rounded-xl bg-white/5">
                <CreditCard size={24} />
              </div>
              <div>
                <div className="font-bold">Visa ending in 4242</div>
                <div className="text-sm text-dim-grey">Expires 12/28</div>
              </div>
              <button className="ml-auto text-sm font-bold text-white/60 hover:text-white transition-colors">Edit</button>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/5 h-fit">
          <h3 className="text-xl font-bold mb-4">Plan Features</h3>
          <ul className="space-y-4">
            {[
              "Unlimited Campaigns",
              "10 AI Agents",
              "Advanced Analytics",
              "CRM Integration",
              "Priority Support"
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-blue-400" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
