"use client";

import { useState } from "react";
import {
  BarChart3,
  Kanban,
  Users,
  FileText,
  Calendar,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  Search,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<"analytics" | "kanban" | "clients" | "invoices" | "calendar">("analytics");

  const tabs = [
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "kanban", label: "Kanban Board", icon: Kanban },
    { id: "clients", label: "Client Directory", icon: Users },
    { id: "invoices", label: "Invoice Page", icon: FileText },
    { id: "calendar", label: "Calendar View", icon: Calendar },
  ] as const;

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative border-t border-slate-800/80" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 px-3 py-1 text-xs">
            Interactive Product Preview
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Designed for Speed, Built for Professional Power
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Experience the intuitive interface of FreelanceFlow. Switch between core screens below to explore.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto bg-slate-900/90 p-2 rounded-2xl border border-slate-800 backdrop-blur-md">
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
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Area */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-xl">
          {/* Tab 1: Analytics Overview */}
          {activeTab === "analytics" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Revenue & Growth Analytics</h3>
                  <p className="text-xs text-slate-400">Monthly breakdown of income and pending retainers</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Aug 2026</span>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">+$3,400 Pending</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400">Total Billed YTD</span>
                  <p className="text-2xl font-bold text-white">$68,450.00</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +18.2% vs target
                  </p>
                </div>
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400">Average Invoice Size</span>
                  <p className="text-2xl font-bold text-white">$4,250.00</p>
                  <p className="text-xs text-slate-400">Across 16 completed projects</p>
                </div>
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2">
                  <span className="text-xs text-slate-400">Billable Hours Tracked</span>
                  <p className="text-2xl font-bold text-white">142.5 hrs</p>
                  <p className="text-xs text-blue-400">Avg rate $95/hr</p>
                </div>
              </div>

              {/* Chart Representation */}
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Monthly Revenue Trend</span>
                  <span>Goal: $15,000/mo</span>
                </div>
                <div className="h-40 flex items-end justify-between gap-3 pt-4">
                  {[
                    { m: "Mar", h: "40%", val: "$8,200" },
                    { m: "Apr", h: "60%", val: "$11,500" },
                    { m: "May", h: "55%", val: "$10,100" },
                    { m: "Jun", h: "75%", val: "$13,800" },
                    { m: "Jul", h: "70%", val: "$12,400" },
                    { m: "Aug", h: "90%", val: "$14,850", current: true },
                  ].map((col) => (
                    <div key={col.m} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] text-slate-400">{col.val}</span>
                      <div
                        className={`w-full rounded-t-md ${
                          col.current ? "bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md shadow-blue-500/30" : "bg-slate-800"
                        }`}
                        style={{ height: col.h }}
                      />
                      <span className="text-xs text-slate-400 font-mono">{col.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Kanban Board */}
          {activeTab === "kanban" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Project Deliverables Kanban</h3>
                  <p className="text-xs text-slate-400">Drag and drop tasks across workflow columns</p>
                </div>
                <Button size="sm" className="bg-blue-600 text-white gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" /> Add Task
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Backlog */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-500" /> To Do
                    </span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">2</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-white">Figma Wireframes for Mobile App</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-amber-400">High Priority</span>
                      <span>Due Aug 12</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-white">Setup PostgreSQL Schemas</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-slate-400">Medium</span>
                      <span>Due Aug 15</span>
                    </div>
                  </div>
                </div>

                {/* Column 2: In Progress */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500" /> In Progress
                    </span>
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px]">2</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-blue-500/30 rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-white">Landing Page Redesign</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-blue-400">Active Task</span>
                      <span>Today</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-white">Stripe Webhook Handler</p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-amber-400">Urgent</span>
                      <span>Tomorrow</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Completed */}
                <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Done
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px]">2</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 opacity-75 rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-slate-300 line-through">Client Onboarding Call</p>
                    <div className="flex items-center justify-between text-[10px] text-emerald-400">
                      <span>Completed</span>
                      <span>Yesterday</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 opacity-75 rounded-lg space-y-2">
                    <p className="text-xs font-semibold text-slate-300 line-through">Brand Style Guide Export</p>
                    <div className="flex items-center justify-between text-[10px] text-emerald-400">
                      <span>Completed</span>
                      <span>Aug 04</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Client Directory */}
          {activeTab === "clients" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Client Directory</h3>
                  <p className="text-xs text-slate-400">360° client records and project histories</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search clients..."
                      readOnly
                      className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 focus:outline-none"
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
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-950/70 border border-slate-800 rounded-xl gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 font-bold text-sm flex items-center justify-center border border-blue-500/20">
                        {client.name.substring(0, 2)}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{client.name}</h4>
                        <p className="text-xs text-slate-400">
                          {client.contact} • {client.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                        {client.status}
                      </span>
                      <span className="text-sm font-mono font-bold text-white">{client.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Invoice Page */}
          {activeTab === "invoices" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Invoice Builder & History</h3>
                  <p className="text-xs text-slate-400">Generate, track, and send PDF invoices in seconds</p>
                </div>
                <Button size="sm" className="bg-blue-600 text-white gap-1.5 text-xs">
                  <Download className="w-3.5 h-3.5" /> Export All
                </Button>
              </div>

              <div className="space-y-3">
                {[
                  { id: "INV-2026-004", client: "Acme Corporation", date: "Aug 01, 2026", amount: "$4,500.00", status: "Paid", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                  { id: "INV-2026-003", client: "Nexus Digital", date: "Jul 28, 2026", amount: "$3,200.00", status: "Paid", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
                  { id: "INV-2026-002", client: "Vantage Health", date: "Jul 15, 2026", amount: "$2,800.00", status: "Pending", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
                ].map((inv) => (
                  <div
                    key={inv.id}
                    className="flex items-center justify-between p-4 bg-slate-950/70 border border-slate-800 rounded-xl hover:border-slate-700 text-xs sm:text-sm"
                  >
                    <div className="space-y-0.5">
                      <p className="font-mono font-bold text-blue-400">{inv.id}</p>
                      <p className="text-slate-300 font-medium">{inv.client}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-mono font-bold text-white">{inv.amount}</p>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${inv.badge}`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Calendar View */}
          {activeTab === "calendar" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Schedule & Client Meetings</h3>
                  <p className="text-xs text-slate-400">Keep milestones and calls in sync</p>
                </div>
                <Badge variant="outline" className="border-slate-700 text-slate-300 text-xs">
                  Week of Aug 06, 2026
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Today's Schedule</span>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 border border-blue-500/30 rounded-lg space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>10:00 AM - Client Kickoff</span>
                        <span className="text-blue-400 font-mono">Zoom</span>
                      </div>
                      <p className="text-[11px] text-slate-400">With Nexus Digital Team</p>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span>02:30 PM - Deliverable Review</span>
                        <span className="text-emerald-400 font-mono">Google Meet</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Acme Brand System presentation</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Upcoming Milestones</span>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-white">Project Sprint 2 Release</p>
                        <p className="text-[11px] text-slate-400">Vantage Health Portal</p>
                      </div>
                      <span className="text-slate-400 font-mono">Aug 10</span>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-white">Monthly Retainer Invoice Due</p>
                        <p className="text-[11px] text-slate-400">Acme Corp</p>
                      </div>
                      <span className="text-amber-400 font-mono">Aug 15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
