import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export interface ProjectResponseDto {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  name: string;
  description: string | null;
  budget: number | null;
  startDate: Date | null;
  deadline: Date | null;
  status: ProjectStatusEnum;
  priority: ProjectPriorityEnum;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
}
