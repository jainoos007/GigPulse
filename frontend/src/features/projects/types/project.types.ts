export type ProjectStatus = "PLANNING" | "ACTIVE" | "ON_HOLD" | "COMPLETED" | "CANCELLED";
export type ProjectPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Project {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  name: string;
  description: string | null;
  budget: number | null;
  startDate: string | null;
  deadline: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
