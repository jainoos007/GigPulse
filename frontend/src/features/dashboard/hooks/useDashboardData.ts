"use client";

import { useEffect, useState, useCallback } from "react";
import { ClientService } from "@/features/clients/services/client.service";
import { LeadService } from "@/features/leads/services/lead.service";
import { ProjectService } from "@/features/projects/services/project.service";
import { TaskService } from "@/features/tasks/services/task.service";
import { MeetingService } from "@/features/meetings/services/meeting.service";
import { InvoiceService } from "@/features/invoices/services/invoice.service";
import { ProposalService } from "@/features/proposals/services/proposal.service";

import { Client } from "@/features/clients/types/client.types";
import { Lead } from "@/features/leads/types/lead.types";
import { Project } from "@/features/projects/types/project.types";
import { Task } from "@/features/tasks/types/task.types";
import { Meeting } from "@/features/meetings/types/meeting.types";
import { Invoice, InvoiceMetrics } from "@/features/invoices/types/invoice.types";
import { Proposal } from "@/features/proposals/types/proposal.types";

export interface MonthlyRevenueData {
  month: string;
  year: number;
  amount: number;
  heightPct: string;
  formattedAmount: string;
  isCurrent: boolean;
}

export interface DashboardStats {
  totalClients: number;
  totalLeads: number;
  totalLeadValue: number;
  activeProjectsCount: number;
  avgProjectProgress: number;
  pendingTasksCount: number;
  urgentTasksCount: number;
  upcomingMeetingsCount: number;
  totalRevenue: number;
  pendingRevenue: number;
  overdueAmount: number;
  acceptedProposalsCount: number;
  momGrowthPercentage: number;
}

export function useDashboardData() {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [invoiceMetrics, setInvoiceMetrics] = useState<InvoiceMetrics | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    const results = await Promise.allSettled([
      ClientService.getClients({ limit: 100 }),
      LeadService.getLeads({ limit: 100 }),
      ProjectService.getProjects({ limit: 100 }),
      TaskService.getKanbanBoard(),
      MeetingService.getMeetings({ limit: 100 }),
      InvoiceService.getInvoices({ limit: 100 }),
      ProposalService.getProposals({ limit: 100 }),
    ]);

    if (results[0].status === "fulfilled") setClients(results[0].value.data);
    if (results[1].status === "fulfilled") setLeads(results[1].value.data);
    if (results[2].status === "fulfilled") setProjects(results[2].value.data);
    if (results[3].status === "fulfilled") {
      const board = results[3].value;
      const allTasks = [
        ...(board.TODO || []),
        ...(board.IN_PROGRESS || []),
        ...(board.REVIEW || []),
        ...(board.COMPLETED || []),
      ];
      setTasks(allTasks);
    }
    if (results[4].status === "fulfilled") setMeetings(results[4].value.data);
    if (results[5].status === "fulfilled") {
      setInvoices(results[5].value.data);
      setInvoiceMetrics(results[5].value.metrics);
    }
    if (results[6].status === "fulfilled") setProposals(results[6].value.data);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Derived metrics
  const totalClients = clients.length;
  const totalLeads = leads.length;
  const totalLeadValue = leads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);
  const activeProjects = projects.filter((p) => p.status === "ACTIVE" || p.status === "PLANNING");
  const activeProjectsCount = activeProjects.length;
  const avgProjectProgress = projects.length
    ? Math.round(projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length)
    : 0;

  const pendingTasks = tasks.filter((t) => t.status !== "COMPLETED");
  const pendingTasksCount = pendingTasks.length;
  const urgentTasksCount = tasks.filter((t) => (t.priority === "URGENT" || t.priority === "HIGH") && t.status !== "COMPLETED").length;

  const upcomingMeetings = meetings
    .filter((m) => new Date(m.meetingDate) >= new Date())
    .sort((a, b) => new Date(a.meetingDate).getTime() - new Date(b.meetingDate).getTime());
  const upcomingMeetingsCount = upcomingMeetings.length;

  const acceptedProposalsCount = proposals.filter((pr) => pr.status === "ACCEPTED").length;

  // 6-Month Historical Revenue Calculation
  const now = new Date();
  const past6Months: { month: string; year: number; monthIdx: number; amount: number; isCurrent: boolean }[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = d.toLocaleString("default", { month: "short" });
    past6Months.push({
      month: monthName,
      year: d.getFullYear(),
      monthIdx: d.getMonth(),
      amount: 0,
      isCurrent: i === 0,
    });
  }

  invoices.forEach((inv) => {
    if (inv.status === "PAID" || inv.status === "SENT") {
      const invDate = new Date(inv.updatedAt || inv.createdAt);
      const mIdx = invDate.getMonth();
      const y = invDate.getFullYear();
      const target = past6Months.find((item) => item.monthIdx === mIdx && item.year === y);
      if (target) {
        target.amount += inv.totalAmount || inv.amount || 0;
      }
    }
  });

  const maxAmount = Math.max(...past6Months.map((m) => m.amount), 1);

  const monthlyRevenueTrend: MonthlyRevenueData[] = past6Months.map((item) => {
    const pct = Math.max(18, Math.round((item.amount / maxAmount) * 100));
    const formattedAmount =
      item.amount >= 1000
        ? `$${(item.amount / 1000).toFixed(1)}k`
        : `$${item.amount.toFixed(0)}`;
    return {
      month: item.month,
      year: item.year,
      amount: item.amount,
      heightPct: `${pct}%`,
      formattedAmount,
      isCurrent: item.isCurrent,
    };
  });

  const currMonthVal = past6Months[5]?.amount || 0;
  const prevMonthVal = past6Months[4]?.amount || 0;
  let momGrowthPercentage = 0;
  if (prevMonthVal > 0) {
    momGrowthPercentage = Math.round(((currMonthVal - prevMonthVal) / prevMonthVal) * 100);
  } else if (currMonthVal > 0) {
    momGrowthPercentage = 100;
  }

  const stats: DashboardStats = {
    totalClients,
    totalLeads,
    totalLeadValue,
    activeProjectsCount,
    avgProjectProgress,
    pendingTasksCount,
    urgentTasksCount,
    upcomingMeetingsCount,
    totalRevenue: invoiceMetrics?.totalRevenue || 0,
    pendingRevenue: invoiceMetrics?.pendingRevenue || 0,
    overdueAmount: invoiceMetrics?.overdueAmount || 0,
    acceptedProposalsCount,
    momGrowthPercentage,
  };

  return {
    isLoading,
    refresh: fetchAll,
    stats,
    clients,
    leads,
    projects,
    tasks,
    meetings,
    invoices,
    proposals,
    upcomingMeetings,
    pendingTasks,
    monthlyRevenueTrend,
  };
}
