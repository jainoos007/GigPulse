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
  };
}
