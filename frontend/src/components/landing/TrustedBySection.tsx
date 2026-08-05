"use client";

import { Building2, Layers, Cpu, Compass, Globe2, ShieldAlert } from "lucide-react";

export function TrustedBySection() {
  const logos = [
    { name: "Acme Studio", icon: Building2 },
    { name: "Nexus Digital", icon: Layers },
    { name: "HyperScale Tech", icon: Cpu },
    { name: "Veloce Design", icon: Compass },
    { name: "Global Pulse", icon: Globe2 },
    { name: "Quantum Labs", icon: ShieldAlert },
  ];

  return (
    <section className="py-12 bg-slate-950 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
          Trusted by top freelancers, agencies, and studio teams worldwide
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
          {logos.map((logo) => {
            const Icon = logo.icon;
            return (
              <div
                key={logo.name}
                className="flex items-center gap-2.5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer group"
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <span className="font-semibold text-sm tracking-tight text-slate-400 group-hover:text-slate-200">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
