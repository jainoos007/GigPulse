"use client";

import {
  Users,
  Target,
  Briefcase,
  Kanban,
  Calendar,
  FileText,
  CreditCard,
  UploadCloud,
  BarChart3,
  History,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FeaturesSection() {
  const features = [
    {
      icon: Users,
      title: "Client Management",
      description: "360° client directory with contact info, custom rates, contract history, and notes in one searchable hub.",
      tag: "CRM Core",
      color: "from-blue-500/20 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      icon: Target,
      title: "Lead Pipeline Tracking",
      description: "Visual Kanban stages to track inquiries from initial contact to proposal sent and won contracts.",
      tag: "Sales",
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Organize client deliverables, track milestones, deadlines, budget usage, and project statuses.",
      tag: "Workflow",
      color: "from-purple-500/20 to-pink-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    },
    {
      icon: Kanban,
      title: "Kanban Task Board",
      description: "Intuitive task boards categorized by priority tags, project associations, and progress columns.",
      tag: "Productivity",
      color: "from-amber-500/20 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
    {
      icon: Calendar,
      title: "Meeting Scheduler",
      description: "Schedule client calls, attach agenda notes, set meeting links, and sync review sessions.",
      tag: "Scheduling",
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    },
    {
      icon: FileText,
      title: "Invoice Generation",
      description: "Generate professional PDF invoices with custom line items, tax calculations, and payment terms.",
      tag: "Billing",
      color: "from-indigo-500/20 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    },
    {
      icon: CreditCard,
      title: "Payment Tracking",
      description: "Track paid, pending, and overdue invoices with real-time financial ledger updates.",
      tag: "Finance",
      color: "from-emerald-500/20 to-green-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    },
    {
      icon: UploadCloud,
      title: "File Uploads",
      description: "Store signed client contracts, design briefs, and deliverable files securely via Cloudinary integration.",
      tag: "Assets",
      color: "from-rose-500/20 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    },
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Real-time metrics on monthly revenue, client lifetime value, active retainers, and billable hours.",
      tag: "Insights",
      color: "from-blue-500/20 to-cyan-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
    {
      icon: History,
      title: "Activity Timeline",
      description: "Chronological audit log tracking recent client communications, invoice dispatches, and project updates.",
      tag: "Audit Trail",
      color: "from-violet-500/20 to-purple-500/10 text-violet-600 dark:text-violet-400 border-violet-500/30",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Instant in-app alerts for pending task deadlines, paid invoices, and upcoming client meetings.",
      tag: "Alerts",
      color: "from-amber-500/20 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-200" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 text-xs">
            Full Suite Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Manage Your Freelance Operations
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Integrated modules designed to handle the complete end-to-end freelancer workflow without third-party friction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl dark:shadow-none backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore capability</span>
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
