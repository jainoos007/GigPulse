import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export interface CreateProjectData {
  userId: string;
  clientId: string;
  name: string;
  description?: string;
  budget?: number;
  startDate?: Date;
  deadline?: Date;
  status?: ProjectStatusEnum;
  priority?: ProjectPriorityEnum;
  progress?: number;
}

export interface UpdateProjectData {
  clientId?: string;
  name?: string;
  description?: string;
  budget?: number;
  startDate?: Date;
  deadline?: Date;
  status?: ProjectStatusEnum;
  priority?: ProjectPriorityEnum;
  progress?: number;
}

export interface ProjectQueryFilter {
  userId: string;
  clientId?: string;
  search?: string;
  status?: ProjectStatusEnum;
  priority?: ProjectPriorityEnum;
  page?: number;
  limit?: number;
}
