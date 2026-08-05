"use client";

import {
  Users,
  Target,
  Briefcase,
  Kanban,
  Calendar,
  FileText,
  CreditCard,
  FolderLock,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Client Management",
      description: "Complete 360° client directory with contact info, rates, project logs, and notes in one searchable hub.",
      tag: "CRM Core",
      color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
    },
    {
      icon: Target,
      title: "Lead Pipeline Tracking",
      description: "Visual Kanban stages to track inquiries from initial contact to proposal sent and won contracts.",
      tag: "Sales",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Organize client deliverables, track milestones, deadlines, and project statuses effortlessly.",
      tag: "Workflow",
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    },
    {
      icon: Kanban,
      title: "Kanban Task Board",
      description: "Intuitive drag-and-drop task boards categorized by priority, project, and status tags.",
      tag: "Productivity",
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    },
    {
      icon: Calendar,
      title: "Meeting Scheduler",
      description: "Schedule client calls, set agenda notes, and sync project review meetings effortlessly.",
      tag: "Scheduling",
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
    },
    {
      icon: FileText,
      title: "Invoice Generation",
      description: "Generate professional PDF invoices with custom line items, tax calculations, and payment terms.",
      tag: "Billing",
      color: "from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30",
    },
    {
      icon: CreditCard,
      title: "Payment Tracking",
      description: "Track paid, pending, and overdue invoices with automatic payment status updates.",
      tag: "Finance",
      color: "from-emerald-500/20 to-green-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      icon: FolderLock,
      title: "Contract & File Storage",
      description: "Store signed client contracts, design assets, and project briefs securely in cloud storage.",
      tag: "Vault",
      color: "from-rose-500/20 to-pink-500/10 text-rose-400 border-rose-500/30",
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Real-time metrics on monthly revenue, client lifetime value, billable hours, and growth trends.",
      tag: "Insights",
      color: "from-blue-500/20 to-cyan-500/10 text-blue-400 border-blue-500/30",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            All-In-One Toolkit
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Everything You Need to Run Your Freelance Empire
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Purpose-built modules that integrate seamlessly so you never lose track of a client, project, or invoice.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/40 backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-400 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/50">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    {feat.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore module</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
