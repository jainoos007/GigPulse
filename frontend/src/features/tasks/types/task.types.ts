export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface Task {
  id: string;
  userId: string;
  projectId: string;
  projectName?: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanBoard {
  TODO: Task[];
  IN_PROGRESS: Task[];
  REVIEW: Task[];
  COMPLETED: Task[];
}
