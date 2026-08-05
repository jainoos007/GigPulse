import { TaskStatusEnum } from "../../../shared/enums/task-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export interface TaskResponseDto {
  id: string;
  userId: string;
  projectId: string;
  projectName?: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
  priority: ProjectPriorityEnum;
  status: TaskStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

export interface KanbanBoardResponseDto {
  TODO: TaskResponseDto[];
  IN_PROGRESS: TaskResponseDto[];
  REVIEW: TaskResponseDto[];
  COMPLETED: TaskResponseDto[];
}
