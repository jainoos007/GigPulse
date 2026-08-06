"use client";

import { Clock, TrendingUp, ShieldCheck, Zap, Award, Sparkles } from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      stat: "10+ Hours Saved",
      unit: "Per Week",
      title: "Reclaim Your Free Time",
      desc: "Eliminate repetitive administrative tasks like creating invoices, hunting for client files, or setting up project trackers.",
      glow: "from-blue-600/10 to-indigo-600/5 border-blue-500/20",
    },
    {
      icon: TrendingUp,
      stat: "+35% Higher Revenue",
      unit: "Average Increase",
      title: "Close Deals Faster",
      desc: "Stay top-of-mind with automated lead follow-ups, structured proposals, and timely retainer billing.",
      glow: "from-emerald-600/10 to-teal-600/5 border-emerald-500/20",
    },
    {
      icon: Zap,
      stat: "30% Faster",
      unit: "Delivery Speed",
      title: "Accelerate Deliverables",
      desc: "Kanban priority task boards and clear project milestones ensure you deliver high-quality work ahead of schedule.",
      glow: "from-purple-600/10 to-indigo-600/5 border-purple-500/20",
    },
    {
      icon: Award,
      stat: "Premium Status",
      unit: "Client Trust",
      title: "Command Higher Rates",
      desc: "Present clients with polished invoices, structured project updates, and transparent billing that builds instant authority.",
      glow: "from-amber-600/10 to-orange-600/5 border-amber-500/20",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative border-t border-slate-800/80" id="benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            Measurable Outcomes
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Real Freelance Growth
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            GigPulse isn't just software; it's your competitive advantage in a crowded market.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className={`bg-gradient-to-br ${b.glow} border rounded-2xl p-8 space-y-6 backdrop-blur-md hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white shadow-lg">
                    <Icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{b.stat}</span>
                    <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">{b.unit}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
