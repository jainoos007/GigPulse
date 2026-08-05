"use client";

import { UserPlus, UserCheck, FolderKanban, CheckSquare, FileSpreadsheet, DollarSign, ArrowRight } from "lucide-react";

export function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "Lead Capture",
      desc: "Log new inquiries into your visual pipeline.",
      icon: UserPlus,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    },
    {
      step: "02",
      title: "Client Onboarding",
      desc: "Convert leads into 360° client profiles with rates & notes.",
      icon: UserCheck,
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    },
    {
      step: "03",
      title: "Project Setup",
      desc: "Establish milestones, deliverables, and timelines.",
      icon: FolderKanban,
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    },
    {
      step: "04",
      title: "Task Execution",
      desc: "Track daily tasks with priority tags & Kanban boards.",
      icon: CheckSquare,
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      step: "05",
      title: "1-Click Invoice",
      desc: "Generate professional PDF invoices with custom rates.",
      icon: FileSpreadsheet,
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    },
    {
      step: "06",
      title: "Instant Payout",
      desc: "Track payment status and watch your revenue grow.",
      icon: DollarSign,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative overflow-hidden" id="workflow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            Seamless Lifecycle
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            From Lead to Paid in 6 Simple Steps
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Stop losing hours stitching together mismatched tools. FreelanceFlow connects every phase of your client lifecycle.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative group">
                <div className="h-full bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 space-y-4 flex flex-col justify-between backdrop-blur-md hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-500">{s.step}</span>
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${s.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-700">
                    <ArrowRight className="w-5 h-5 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
