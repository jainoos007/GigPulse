"use client";

import React from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import {
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
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();

  const modules = [
    {
      title: "Clients",
      desc: "Manage client directory, contact info, and status",
      href: "/clients",
      icon: Users,
      badge: "Directory",
    },
    {
      title: "Lead Pipeline",
      desc: "Track sales pipeline and convert leads to clients",
      href: "/leads",
      icon: Target,
      badge: "Deals",
    },
    {
      title: "Projects",
      desc: "Oversee active projects, budgets, and deadlines",
      href: "/projects",
      icon: Briefcase,
      badge: "Active",
    },
    {
      title: "Task Kanban",
      desc: "Manage tasks across To-Do, In Progress, Review, Completed",
      href: "/tasks",
      icon: CheckSquare,
      badge: "Kanban",
    },
    {
      title: "Meetings",
      desc: "Schedule client calls, platform links, and reminders",
      href: "/meetings",
      icon: Calendar,
      badge: "Schedule",
    },
    {
      title: "Invoices & Payments",
      desc: "Client billing, tax/discount calculations, and revenue tracking",
      href: "/invoices",
      icon: FileText,
      badge: "Financials",
    },
    {
      title: "Proposals & Contracts",
      desc: "Draft project scopes, manage proposals, and convert into projects",
      href: "/proposals",
      icon: FileCode,
      badge: "Contracts",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner / Welcome Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Workspace Overview
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your freelance clients, active projects, invoices, and pipeline from your dashboard.
          </p>
        </div>
      </div>

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-900/80 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Account Identity
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Workspace Company
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <h3 className="text-lg font-bold text-white">
              {user?.companyName || "Independent Freelancer"}
            </h3>
            <p className="text-xs text-slate-400">Primary Workspace</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/80 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Access Role
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <h3 className="text-lg font-bold text-white">{user?.role}</h3>
            <div className="pt-0.5">
              <Badge variant="success">Active & Verified</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Navigation Grid */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-bold tracking-tight text-white">CRM Workspace Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.title} href={m.href} className="group">
                <Card className="h-full hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px]">
                        {m.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-400 transition-colors">
                      {m.title}
                    </CardTitle>
                    <CardDescription>{m.desc}</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                      Open Module <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
