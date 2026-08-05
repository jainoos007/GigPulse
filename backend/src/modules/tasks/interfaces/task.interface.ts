import { TaskStatusEnum } from "../../../shared/enums/task-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export interface CreateTaskData {
  userId: string;
  projectId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: ProjectPriorityEnum;
  status?: TaskStatusEnum;
}

export interface UpdateTaskData {
  projectId?: string;
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: ProjectPriorityEnum;
  status?: TaskStatusEnum;
}

export interface TaskQueryFilter {
  userId: string;
  projectId?: string;
  search?: string;
  status?: TaskStatusEnum;
  priority?: ProjectPriorityEnum;
  page?: number;
  limit?: number;
}
