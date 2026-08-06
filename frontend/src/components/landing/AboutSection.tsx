"use client";

import { Info, Target, Users, Zap, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-800/80" id="about">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 px-3.5 py-1 text-xs">
            <Info className="w-3.5 h-3.5 mr-1.5" /> About FreelanceFlow
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built to Solve Real Freelance Fragmentation
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            FreelanceFlow was designed to replace disjointed spreadsheet trackers, standalone invoice apps, and loose email threads with a single unified operating platform.
          </p>
        </div>

        {/* 3 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Pillar 1: Why It Was Built */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                Why FreelanceFlow Was Built
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Freelancers waste hours every week context switching between separate apps for CRM, task management, invoice generation, and scheduling. FreelanceFlow bridges these modules into one seamless system.
              </p>
            </div>

            <ul className="space-y-2.5 pt-6 mt-6 border-t border-slate-800/60 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unified data flow from lead to invoice</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Streamlined client and project management</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: The Problem It Solves */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                The Problem It Solves
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Eliminates untracked client inquiries, missed project deadlines, lost contract assets, manual invoice preparation, and lack of real-time financial visibility.
              </p>
            </div>

            <ul className="space-y-2.5 pt-6 mt-6 border-t border-slate-800/60 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Real-time revenue visibility & analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Kanban task priority tracking</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Who It Is Designed For */}
          <div className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold shadow-lg shadow-purple-500/10 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                Who It Is Designed For
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tailored for independent software developers, UI/UX designers, copywriters, digital consultants, and freelance agency owners managing multiple active accounts.
              </p>
            </div>

            <ul className="space-y-2.5 pt-6 mt-6 border-t border-slate-800/60 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Solo freelancers & small agency owners</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Contractors needing 360° client records</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
