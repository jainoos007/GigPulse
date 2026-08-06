"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  DollarSign,
  ChevronRight,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-purple-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-20 dark:opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 z-10">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm dark:shadow-xl backdrop-blur-md hover:border-blue-500/50 transition-colors">
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] px-2.5 py-0.5 rounded-full border-none font-semibold">
            FREELANCE OPERATING SYSTEM
          </Badge>
          <span>All-in-One CRM, Tasks & Invoicing</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Manage Clients, Projects, Tasks, Invoices & Meetings —{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
            All in One Place.
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
          A modern CRM built for freelancers to manage clients, projects, tasks, invoices, and meetings in one place.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            size="lg"
            asChild
            className="w-full sm:w-auto h-13 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 border border-blue-400/30 transition-all duration-300 rounded-xl"
          >
            <Link href="/login" className="flex items-center gap-2 justify-center">
              Launch Application <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto h-13 px-8 text-base font-semibold border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl backdrop-blur-md border"
          >
            <a href="#features" className="flex items-center gap-2 justify-center">
              Explore Features
            </a>
          </Button>
        </div>

        {/* User / Product Benefits Highlights Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Client & Lead CRM</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-slate-700">•</div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Automated PDF Invoices</span>
          </div>
          <div className="hidden sm:block text-slate-300 dark:text-slate-700">•</div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Financial Analytics</span>
          </div>
        </div>

        {/* High-Fidelity Dashboard Mockup */}
        <div className="pt-10 max-w-6xl mx-auto">
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 shadow-2xl shadow-slate-200/50 dark:shadow-blue-950/50 backdrop-blur-2xl overflow-hidden p-2 sm:p-4 group">
            {/* Top Window Control Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-950/80 rounded-t-xl border-b border-slate-200 dark:border-slate-800/80 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-500 dark:text-slate-400">freelanceflow.app/dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" /> Live Metrics
                </span>
              </div>
            </div>

            {/* Dashboard Content Mockup */}
            <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/50 rounded-xl space-y-6 text-left">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Monthly Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">$14,850.00</div>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" /> +24% vs last month
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Active Clients</span>
                    <Users className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">12 Clients</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">4 retainers active</div>
                </div>

                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Active Projects</span>
                    <Briefcase className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">8 Projects</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">92% on schedule</div>
                </div>

                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
                    <span>Paid Invoices</span>
                    <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">98.4%</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Avg payout 1.2 days</div>
                </div>
              </div>

              {/* Main Visual Row: Pipeline & Active Deliverables */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Revenue & Lead Pipeline</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">2026 Financial Performance & Forecast</p>
                    </div>
                    <Badge variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                      2026 YTD
                    </Badge>
                  </div>
                  <div className="h-44 flex items-end justify-between gap-2 sm:gap-4 pt-4 border-b border-slate-200 dark:border-slate-800/80 pb-2">
                    {[
                      { month: "Jan", val: "65%", amount: "$9.4k" },
                      { month: "Feb", val: "75%", amount: "$11.2k" },
                      { month: "Mar", val: "50%", amount: "$8.1k" },
                      { month: "Apr", val: "85%", amount: "$12.8k" },
                      { month: "May", val: "70%", amount: "$10.5k" },
                      { month: "Jun", val: "95%", amount: "$14.8k", active: true },
                    ].map((item) => (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {item.amount}
                        </span>
                        <div
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            item.active
                              ? "bg-gradient-to-t from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30"
                              : "bg-slate-200 dark:bg-slate-800 group-hover/bar:bg-slate-300 dark:group-hover/bar:bg-slate-700"
                          }`}
                          style={{ height: item.val }}
                        />
                        <span className={`text-xs ${item.active ? "text-blue-600 dark:text-blue-400 font-bold" : "text-slate-500"}`}>
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Active Deliverables</h4>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">View All</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: "Acme Brand System", client: "Acme Inc.", status: "In Review", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
                      { title: "Vortex Web App", client: "Vortex LLC", status: "In Progress", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
                      { title: "Stripe Webhook", client: "FinTech Co", status: "Completed", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
                    ].map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-100/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs">
                        <div className="space-y-0.5">
                          <p className="font-medium text-slate-800 dark:text-slate-200">{task.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{task.client}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${task.color}`}>
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
