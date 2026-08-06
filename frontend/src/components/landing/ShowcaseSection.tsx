"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Kanban,
  FileText,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/landing/FadeIn";

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "clients" | "projects" | "tasks" | "invoices" | "calendar">("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "clients", label: "Clients", icon: Users },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "tasks", label: "Tasks", icon: Kanban },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ] as const;

  return (
    <section className="py-20 sm:py-32 bg-slate-50 dark:bg-slate-950 relative border-t border-slate-200 dark:border-slate-800/80 transition-colors duration-200" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 text-xs">
              Interactive Product Preview
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore the Core Application Interfaces
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
              Switch between the screens below to experience FreelanceFlow's responsive UI modules.
            </p>
          </div>
        </FadeIn>

        {/* Tab Controls */}
        <FadeIn delay={0.1} direction="up">
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto bg-white/90 dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg dark:shadow-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Dynamic Screen View */}
        <FadeIn delay={0.2} direction="up">
          <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-slate-200/50 dark:shadow-blue-950/40 backdrop-blur-xl">
            {/* Tab 1: Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Main Executive Dashboard</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">High-level financial KPIs, revenue charts, and active client stats</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">Live System</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Monthly Revenue</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">$14,850.00</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +24% vs last month
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Active Retainers</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">4 Clients</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">$9,500 recurring MRR</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Open Deliverables</span>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">8 Projects</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">92% completed on time</p>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Revenue Trend (2026)</span>
                    <span>Target: $15,000/mo</span>
                  </div>
                  <div className="h-40 flex items-end justify-between gap-3 pt-4">
                    {[
                      { m: "Mar", h: "40%", val: "$8.2k" },
                      { m: "Apr", h: "60%", val: "$11.5k" },
                      { m: "May", h: "55%", val: "$10.1k" },
                      { m: "Jun", h: "75%", val: "$13.8k" },
                      { m: "Jul", h: "70%", val: "$12.4k" },
                      { m: "Aug", h: "90%", val: "$14.8k", current: true },
                    ].map((col) => (
                      <div key={col.m} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{col.val}</span>
                        <div
                          className={`w-full rounded-t-md ${
                            col.current ? "bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md shadow-blue-500/30" : "bg-slate-200 dark:bg-slate-800"
                          }`}
                          style={{ height: col.h }}
                        />
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{col.m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Clients */}
            {activeTab === "clients" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Client Management Directory</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">360° client profiles with rates, project logs, and notes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search clients..."
                        readOnly
                        className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-300 focus:outline-none"
                      />
                    </div>
                    <Button size="sm" className="bg-blue-600 text-white text-xs">
                      + New Client
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Acme Corporation", contact: "Sarah Jenkins", email: "sarah@acme.com", status: "Active Retainer", value: "$4,500/mo" },
                    { name: "Nexus Digital Studio", contact: "David Chen", email: "david@nexus.io", status: "Project Active", value: "$8,200" },
                    { name: "Vantage Health", contact: "Elena Rostova", email: "elena@vantage.com", status: "Proposal Sent", value: "$6,000" },
                  ].map((client, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20">
                          {client.name.substring(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{client.name}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {client.contact} • {client.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                          {client.status}
                        </span>
                        <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">{client.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Projects */}
            {activeTab === "projects" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Project Deliverables Tracker</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage client projects, milestones, and deliverable timelines</p>
                  </div>
                  <Button size="sm" className="bg-blue-600 text-white gap-1.5 text-xs">
                    <Plus className="w-3.5 h-3.5" /> New Project
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Acme Brand System Redesign", client: "Acme Corp", progress: "85%", status: "In Final Review", budget: "$12,500", due: "Aug 14" },
                    { title: "Nexus E-Commerce Platform", client: "Nexus Studio", progress: "45%", status: "In Development", budget: "$18,000", due: "Aug 30" },
                    { title: "Vantage Mobile App Design", client: "Vantage Health", progress: "20%", status: "Planning Phase", budget: "$9,500", due: "Sep 10" },
                    { title: "FinTech Stripe Integration", client: "FinTech Co", progress: "100%", status: "Completed", budget: "$6,200", due: "Completed" },
                  ].map((proj, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{proj.client}</p>
                        </div>
                        <span className="text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">{proj.budget}</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                          <span>Progress: {proj.progress}</span>
                          <span>Due: {proj.due}</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" style={{ width: proj.progress }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Tasks */}
            {activeTab === "tasks" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kanban Task Board</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Drag and drop deliverables across priority status columns</p>
                  </div>
                  <Button size="sm" className="bg-blue-600 text-white gap-1.5 text-xs">
                    <Plus className="w-3.5 h-3.5" /> Add Task
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-100/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500" /> To Do
                      </span>
                      <span className="bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px]">2</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg space-y-2 shadow-sm dark:shadow-none">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Figma Wireframes for Mobile App</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="text-amber-600 dark:text-amber-400">High Priority</span>
                        <span>Due Aug 12</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-100/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> In Progress
                      </span>
                      <span className="bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-[10px]">2</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 border border-blue-500/30 rounded-lg space-y-2 shadow-sm dark:shadow-none">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Landing Page Redesign</p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                        <span className="text-blue-600 dark:text-blue-400">Active Task</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-100/70 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 rounded-xl p-3 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> Done
                      </span>
                      <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-[10px]">2</span>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 opacity-75 rounded-lg space-y-2 shadow-sm dark:shadow-none">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 line-through">Client Onboarding Call</p>
                      <div className="flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400">
                        <span>Completed</span>
                        <span>Yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Invoices */}
            {activeTab === "invoices" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invoice Builder & Payout Ledger</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Generate PDF invoices, calculate taxes, and track paid status</p>
                  </div>
                  <Button size="sm" className="bg-blue-600 text-white gap-1.5 text-xs">
                    <Download className="w-3.5 h-3.5" /> Export All
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "INV-2026-004", client: "Acme Corporation", date: "Aug 01, 2026", amount: "$4,500.00", status: "Paid", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
                    { id: "INV-2026-003", client: "Nexus Digital", date: "Jul 28, 2026", amount: "$3,200.00", status: "Paid", badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
                    { id: "INV-2026-002", client: "Vantage Health", date: "Jul 15, 2026", amount: "$2,800.00", status: "Pending", badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
                  ].map((inv) => (
                    <div
                      key={inv.id}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-slate-300 dark:hover:border-slate-700 text-xs sm:text-sm"
                    >
                      <div className="space-y-0.5">
                        <p className="font-mono font-bold text-blue-600 dark:text-blue-400">{inv.id}</p>
                        <p className="text-slate-800 dark:text-slate-300 font-medium">{inv.client}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="font-mono font-bold text-slate-900 dark:text-white">{inv.amount}</p>
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${inv.badge}`}>
                          {inv.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Calendar */}
            {activeTab === "calendar" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Calendar & Meeting Scheduler</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Sync project milestones, deliverables, and client calls</p>
                  </div>
                  <Badge variant="outline" className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs">
                    Week of Aug 06, 2026
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Scheduled Meetings</span>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-slate-900 border border-blue-500/30 rounded-lg space-y-1 shadow-sm dark:shadow-none">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                          <span>10:00 AM - Client Kickoff</span>
                          <span className="text-blue-600 dark:text-blue-400 font-mono">Zoom</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">With Nexus Digital Team</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Upcoming Milestones</span>
                    <div className="space-y-2">
                      <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center justify-between text-xs shadow-sm dark:shadow-none">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">Project Sprint Release</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">Vantage Health Portal</p>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 font-mono">Aug 10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
