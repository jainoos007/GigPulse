"use client";

import React, { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useDashboardData } from "@/features/dashboard/hooks/useDashboardData";
import Link from "next/link";
import {
  Users,
  Target,
  Briefcase,
  CheckSquare,
  Calendar,
  FileText,
  FileCode,
  ArrowRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Clock,
  Plus,
  Video,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Modal Imports for Quick Actions
import { CreateClientModal } from "@/features/clients/components/CreateClientModal";
import { CreateLeadModal } from "@/features/leads/components/CreateLeadModal";
import { CreateProjectModal } from "@/features/projects/components/CreateProjectModal";
import { CreateTaskModal } from "@/features/tasks/components/CreateTaskModal";
import { CreateMeetingModal } from "@/features/meetings/components/CreateMeetingModal";
import { CreateInvoiceModal } from "@/features/invoices/components/CreateInvoiceModal";
import { CreateProposalModal } from "@/features/proposals/components/CreateProposalModal";

import { ClientService } from "@/features/clients/services/client.service";
import { LeadService } from "@/features/leads/services/lead.service";
import { ProjectService } from "@/features/projects/services/project.service";
import { TaskService } from "@/features/tasks/services/task.service";
import { MeetingService } from "@/features/meetings/services/meeting.service";
import { InvoiceService } from "@/features/invoices/services/invoice.service";
import { ProposalService } from "@/features/proposals/services/proposal.service";

export default function DashboardPage() {
  const { user } = useAuth();
  const {
    isLoading,
    refresh,
    stats,
    projects,
    invoices,
    upcomingMeetings,
    pendingTasks,
  } = useDashboardData();

  // Modal Visibility States
  const [activeModal, setActiveModal] = useState<
    "client" | "lead" | "project" | "task" | "meeting" | "invoice" | "proposal" | null
  >(null);

  const modules = [
    {
      title: "Clients",
      desc: "Manage client directory & contacts",
      href: "/clients",
      icon: Users,
      count: `${stats.totalClients} Clients`,
    },
    {
      title: "Lead Pipeline",
      desc: "Track sales deals & convert leads",
      href: "/leads",
      icon: Target,
      count: `${stats.totalLeads} Deals`,
    },
    {
      title: "Projects",
      desc: "Oversee active projects & milestones",
      href: "/projects",
      icon: Briefcase,
      count: `${stats.activeProjectsCount} Active`,
    },
    {
      title: "Task Kanban",
      desc: "Manage deliverables across stages",
      href: "/tasks",
      icon: CheckSquare,
      count: `${stats.pendingTasksCount} Pending`,
    },
    {
      title: "Meetings",
      desc: "Schedule client calls & reminders",
      href: "/meetings",
      icon: Calendar,
      count: `${stats.upcomingMeetingsCount} Scheduled`,
    },
    {
      title: "Invoices & Billing",
      desc: "Client billing & revenue tracking",
      href: "/invoices",
      icon: FileText,
      count: `$${stats.pendingRevenue.toFixed(0)} Pending`,
    },
    {
      title: "Proposals & Contracts",
      desc: "Draft scopes & convert into projects",
      href: "/proposals",
      icon: FileCode,
      count: `${stats.acceptedProposalsCount} Accepted`,
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Banner / Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Workspace Executive Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Real-time overview of your revenue, active client projects, pending tasks, and upcoming meetings.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={refresh}
            disabled={isLoading}
            className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} /> Refresh Data
          </Button>

          {/* Quick Action Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white gap-2 font-semibold text-xs sm:text-sm shadow-md">
                <Plus className="w-4 h-4" /> Quick Action
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
              <DropdownMenuItem onClick={() => setActiveModal("client")} className="cursor-pointer gap-2 text-xs">
                <Users className="w-3.5 h-3.5 text-blue-500" /> New Client
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("lead")} className="cursor-pointer gap-2 text-xs">
                <Target className="w-3.5 h-3.5 text-purple-500" /> Add Lead
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("project")} className="cursor-pointer gap-2 text-xs">
                <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Create Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("task")} className="cursor-pointer gap-2 text-xs">
                <CheckSquare className="w-3.5 h-3.5 text-emerald-500" /> Add Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("meeting")} className="cursor-pointer gap-2 text-xs">
                <Calendar className="w-3.5 h-3.5 text-blue-500" /> Schedule Call
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("invoice")} className="cursor-pointer gap-2 text-xs">
                <FileText className="w-3.5 h-3.5 text-emerald-500" /> Generate Invoice
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveModal("proposal")} className="cursor-pointer gap-2 text-xs">
                <FileCode className="w-3.5 h-3.5 text-purple-500" /> Draft Proposal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Row 1: Executive KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1: Revenue */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Revenue
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-1">
            {isLoading ? (
              <Skeleton className="h-8 w-28" />
            ) : (
              <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            )}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Collected from settled client invoices
            </p>
          </CardContent>
        </Card>

        {/* Metric 2: Active Projects */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Projects
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Briefcase className="w-4.5 h-4.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-2">
            {isLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {stats.activeProjectsCount}
                </h3>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  {stats.avgProjectProgress}% avg progress
                </span>
              </div>
            )}
            <Progress value={stats.avgProjectProgress} className="h-1.5" />
          </CardContent>
        </Card>

        {/* Metric 3: Lead Pipeline */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pipeline Value
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
              <Target className="w-4.5 h-4.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-1">
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <h3 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
                ${stats.totalLeadValue.toLocaleString()}
              </h3>
            )}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {stats.totalLeads} open prospect opportunities
            </p>
          </CardContent>
        </Card>

        {/* Metric 4: Outstanding & Overdue */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pending Billing
            </CardTitle>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </CardHeader>
          <CardContent className="px-5 pb-5 space-y-1">
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">
                ${stats.pendingRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h3>
            )}
            {stats.overdueAmount > 0 ? (
              <p className="text-[11px] font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> ${stats.overdueAmount.toFixed(2)} overdue
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                No past due invoices
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Active Projects Health & Financial Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Health Monitor */}
        <Card className="lg:col-span-2 bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Active Projects Health</CardTitle>
              <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
                Milestones, priorities, and progress completion
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700">
              <Link href="/projects">View All ({projects.length}) <ChevronRight className="w-3.5 h-3.5 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                No active projects found. <Button variant="link" size="sm" onClick={() => setActiveModal("project")} className="text-blue-600 dark:text-blue-400 p-0 h-auto text-xs">Create your first project</Button>
              </div>
            ) : (
              projects.slice(0, 4).map((project) => (
                <div key={project.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{project.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{project.clientName || "Direct Client"}</p>
                    </div>
                    <Badge variant={project.status === "ACTIVE" ? "default" : "secondary"} className="text-[10px] shrink-0">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <span>Progress</span>
                      <span className="text-blue-600 dark:text-blue-400">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-1.5" />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Financial Breakdown Summary */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none flex flex-col justify-between">
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Financial Summary</CardTitle>
            <CardDescription className="text-xs text-slate-500 dark:text-slate-400">
              Invoice billing & payment status
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Collected Revenue</p>
                <h4 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">${stats.totalRevenue.toFixed(2)}</h4>
              </div>
              <Badge variant="success" className="text-[10px]">Paid</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">Pending Receivables</p>
                <h4 className="text-lg font-bold text-amber-600 dark:text-amber-400">${stats.pendingRevenue.toFixed(2)}</h4>
              </div>
              <Badge variant="warning" className="text-[10px]">Pending</Badge>
            </div>

            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-red-700 dark:text-red-400">Overdue Balance</p>
                <h4 className="text-lg font-bold text-red-600 dark:text-red-400">${stats.overdueAmount.toFixed(2)}</h4>
              </div>
              <Badge variant="destructive" className="text-[10px]">Action Needed</Badge>
            </div>
          </CardContent>

          <div className="p-5 pt-0">
            <Button variant="outline" size="sm" asChild className="w-full text-xs border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <Link href="/invoices">Open Invoices Hub <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Row 3: Operational Agenda (Upcoming Meetings & Urgent Tasks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings Panel */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Upcoming Meetings</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">Scheduled video calls & agendas</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700">
              <Link href="/meetings">View All ({stats.upcomingMeetingsCount})</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-3">
            {isLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : upcomingMeetings.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                No upcoming calls. <Button variant="link" size="sm" onClick={() => setActiveModal("meeting")} className="text-blue-600 dark:text-blue-400 p-0 h-auto text-xs">Schedule a meeting</Button>
              </div>
            ) : (
              upcomingMeetings.slice(0, 3).map((meeting) => (
                <div key={meeting.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{meeting.title}</h4>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-blue-500 shrink-0" />
                      {new Date(meeting.meetingDate).toLocaleString()}
                    </p>
                    {meeting.platform && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Video className="w-3 h-3 text-slate-400" /> {meeting.platform}
                      </span>
                    )}
                  </div>
                  {meeting.locationUrl && (
                    <Button variant="outline" size="sm" asChild className="text-[11px] h-8 shrink-0 border-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10">
                      <a href={meeting.locationUrl} target="_blank" rel="noreferrer">
                        Join Call <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Actionable Urgent Tasks Panel */}
        <Card className="bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-sm dark:shadow-none">
          <CardHeader className="flex flex-row items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <CardTitle className="text-base font-bold text-slate-900 dark:text-white">Tasks & Deliverables</CardTitle>
                <CardDescription className="text-xs text-slate-500 dark:text-slate-400">Action items needing your attention</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700">
              <Link href="/tasks">Kanban Board ({stats.pendingTasksCount})</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-3">
            {isLoading ? (
              <Skeleton className="h-20 w-full" />
            ) : pendingTasks.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                All tasks completed! 🎉 <Button variant="link" size="sm" onClick={() => setActiveModal("task")} className="text-emerald-600 dark:text-emerald-400 p-0 h-auto text-xs">Add new task</Button>
              </div>
            ) : (
              pendingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{task.title}</h4>
                    {task.projectName && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Project: {task.projectName}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant={task.priority === "URGENT" || task.priority === "HIGH" ? "warning" : "outline"} className="text-[10px]">
                      {task.priority}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {task.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 4: CRM Workspace Modules Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">CRM Workspace Launchpad</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">7 Active Modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.title} href={m.href} className="group">
                <Card className="h-full bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-sm dark:shadow-none">
                  <CardHeader className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold text-blue-600 dark:text-blue-400 border-blue-500/20">
                        {m.count}
                      </Badge>
                    </div>
                    <CardTitle className="text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {m.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">{m.desc}</CardDescription>
                  </CardHeader>

                  <CardContent className="p-5 pt-0">
                    <div className="flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                      Open Module <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Action Modals */}
      <CreateClientModal
        isOpen={activeModal === "client"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await ClientService.createClient(data);
          refresh();
        }}
      />

      <CreateLeadModal
        isOpen={activeModal === "lead"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await LeadService.createLead(data);
          refresh();
        }}
      />

      <CreateProjectModal
        isOpen={activeModal === "project"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await ProjectService.createProject(data);
          refresh();
        }}
      />

      <CreateTaskModal
        isOpen={activeModal === "task"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await TaskService.createTask(data);
          refresh();
        }}
      />

      <CreateMeetingModal
        isOpen={activeModal === "meeting"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await MeetingService.createMeeting(data);
          refresh();
        }}
      />

      <CreateInvoiceModal
        isOpen={activeModal === "invoice"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await InvoiceService.createInvoice(data);
          refresh();
        }}
      />

      <CreateProposalModal
        isOpen={activeModal === "proposal"}
        onClose={() => setActiveModal(null)}
        onSubmit={async (data) => {
          await ProposalService.createProposal(data);
          refresh();
        }}
      />
    </div>
  );
}
