"use client";

import { Layers, Network, Database, KeyRound, FileCheck, Server, ArrowRight, Shield, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ArchitectureSection() {
  const architecturalPillars = [
    {
      icon: Layers,
      title: "Modular Monolith",
      desc: "Clean separation of concern into domain-driven backend modules (clients, projects, invoices, tasks) paired with Next.js App Router.",
      tag: "Structure",
      color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
    },
    {
      icon: Network,
      title: "RESTful API Layer",
      desc: "Standardized JSON endpoints with explicit HTTP status handling, request validation middlewares, and global error handling.",
      tag: "API Design",
      color: "from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30",
    },
    {
      icon: Database,
      title: "Prisma Relational ORM",
      desc: "Strongly typed database schemas with declarative migrations, automated foreign key constraints, and relational joins.",
      tag: "Data Layer",
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    },
    {
      icon: KeyRound,
      title: "Role-Based Authentication",
      desc: "State-of-the-art JWT session handling with bcrypt password encryption, protected API middleware, and secure cookie storage.",
      tag: "Security",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      icon: FileCheck,
      title: "Secure File Uploads",
      desc: "Cloudinary cloud storage integration for hosting client contract PDFs, project design briefs, and attachment deliverables.",
      tag: "Storage",
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    },
    {
      icon: Server,
      title: "Production VPS Deployment",
      desc: "Hosted on an Oracle Cloud VPS instance with PM2 process monitoring, SSL certificate management, and Nginx proxy routing.",
      tag: "Infrastructure",
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative border-t border-slate-800/80 overflow-hidden" id="architecture">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10 px-3.5 py-1 text-xs">
            <Layers className="w-3.5 h-3.5 mr-1.5" /> Engineering Architecture
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Scalability & Maintainability
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Explore the underlying system design and technical architecture that powers FreelanceFlow.
          </p>
        </div>

        {/* Visual Architecture Flow Diagram Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Full-Stack Data Flow Architecture</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Step 1: Next.js Client */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-center relative group">
              <span className="text-[10px] font-mono text-blue-400 font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                Client Layer
              </span>
              <h4 className="text-sm font-bold text-white pt-1">Next.js 14 UI</h4>
              <p className="text-xs text-slate-400">Redux Toolkit, Tailwind, Form Validation</p>
            </div>

            {/* Step 2: REST API Express */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-center relative group">
              <span className="text-[10px] font-mono text-indigo-400 font-semibold px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                API Layer
              </span>
              <h4 className="text-sm font-bold text-white pt-1">Express REST Server</h4>
              <p className="text-xs text-slate-400">JWT Middleware, Routes, Controllers</p>
            </div>

            {/* Step 3: Prisma ORM */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-center relative group">
              <span className="text-[10px] font-mono text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                ORM Layer
              </span>
              <h4 className="text-sm font-bold text-white pt-1">Prisma Client</h4>
              <p className="text-xs text-slate-400">Type-Safe Queries & Migrations</p>
            </div>

            {/* Step 4: MySQL & Cloudinary */}
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-center relative group">
              <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                Persistence Layer
              </span>
              <h4 className="text-sm font-bold text-white pt-1">MySQL & Cloudinary</h4>
              <p className="text-xs text-slate-400">Relational DB & Asset Storage</p>
            </div>
          </div>
        </div>

        {/* 6 Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {architecturalPillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 space-y-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
