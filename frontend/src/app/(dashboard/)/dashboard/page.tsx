"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import {
  LogOut,
  User,
  Building,
  Shield,
  Users,
  Target,
  Briefcase,
  CheckSquare,
  Calendar,
  FileText,
  FileCode,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout, fetchCurrentUser, isLoading } = useAuth();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading session...
      </div>
    );
  }

  const modules = [
    {
      title: "Clients",
      desc: "Manage client directory, contact info, and status",
      href: "/clients",
      icon: Users,
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    {
      title: "Lead Pipeline",
      desc: "Track sales pipeline and convert leads to clients",
      href: "/leads",
      icon: Target,
      color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    {
      title: "Projects",
      desc: "Oversee active projects, budgets, and deadlines",
      href: "/projects",
      icon: Briefcase,
      color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
    {
      title: "Task Kanban",
      desc: "Manage tasks across To-Do, In Progress, Review, Completed",
      href: "/tasks",
      icon: CheckSquare,
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    {
      title: "Meetings",
      desc: "Schedule client calls, platform links, and reminders",
      href: "/meetings",
      icon: Calendar,
      color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    },
    {
      title: "Invoices & Payments",
      desc: "Client billing, tax/discount calculations, and revenue tracking",
      href: "/invoices",
      icon: FileText,
      color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    },
    {
      title: "Proposals & Contracts",
      desc: "Draft project scopes, manage proposals, and convert into projects",
      href: "/proposals",
      icon: FileCode,
      color: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
            FF
          </div>
          <span className="font-bold text-xl tracking-tight">FreelanceFlow</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Welcome back, {user?.firstName}! Access your workspace CRM modules below.</p>
        </div>

        {/* Account Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Account Identity</p>
            <h3 className="text-lg font-semibold">{user?.firstName} {user?.lastName}</h3>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Company</p>
            <h3 className="text-lg font-semibold">{user?.companyName || "Independent Freelancer"}</h3>
            <p className="text-sm text-slate-400">Primary Workspace</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Access Role</p>
            <h3 className="text-lg font-semibold">{user?.role}</h3>
            <p className="text-sm text-emerald-400 font-medium">Active & Verified</p>
          </div>
        </div>

        {/* Module Navigation Grid */}
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold tracking-tight">CRM Workspace Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.title}
                  href={m.href}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${m.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                  </div>

                  <div className="flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-1 transition-transform">
                    Open Module <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
