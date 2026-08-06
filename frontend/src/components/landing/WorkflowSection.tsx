"use client";

import { UserPlus, UserCheck, FolderKanban, CheckSquare, FileSpreadsheet, DollarSign, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WorkflowSection() {
  const steps = [
    {
      step: "01",
      title: "Lead Capture",
      desc: "Log incoming inquiries into visual lead pipeline stages.",
      icon: UserPlus,
      color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    },
    {
      step: "02",
      title: "Client Onboarding",
      desc: "Convert won leads into 360° client profiles with rates & notes.",
      icon: UserCheck,
      color: "border-indigo-500/30 text-indigo-400 bg-indigo-500/10",
    },
    {
      step: "03",
      title: "Project Creation",
      desc: "Set up project milestones, budgets, and deliverable schedules.",
      icon: FolderKanban,
      color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    },
    {
      step: "04",
      title: "Task Execution",
      desc: "Track daily tasks with priority tags & Kanban status boards.",
      icon: CheckSquare,
      color: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    },
    {
      step: "05",
      title: "Invoice Generation",
      desc: "Generate professional PDF invoices with custom line items.",
      icon: FileSpreadsheet,
      color: "border-amber-500/30 text-amber-400 bg-amber-500/10",
    },
    {
      step: "06",
      title: "Payment Tracking",
      desc: "Track payment status and update revenue ledger analytics.",
      icon: DollarSign,
      color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative overflow-hidden border-t border-slate-800/80" id="workflow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 px-3.5 py-1 text-xs">
            End-To-End Application Workflow
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Data Flows Through FreelanceFlow
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Experience a continuous lifecycle where lead records convert into clients, projects, tasks, invoices, and payouts without data re-entry.
          </p>
        </div>

        {/* Workflow Breadcrumb Indicator */}
        <div className="hidden lg:flex items-center justify-center gap-2 py-3 px-6 bg-slate-900/90 border border-slate-800 rounded-full max-w-4xl mx-auto text-xs font-mono text-slate-300 font-semibold shadow-xl">
          <span className="text-blue-400">Lead</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-indigo-400">Client</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-purple-400">Project</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-cyan-400">Tasks</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-amber-400">Invoice</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-400">Payment</span>
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
