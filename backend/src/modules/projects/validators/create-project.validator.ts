import { z } from "zod";
import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export const createProjectValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format"),
    name: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    budget: z.number().min(0).optional(),
    startDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    deadline: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    status: z.nativeEnum(ProjectStatusEnum).optional(),
    priority: z.nativeEnum(ProjectPriorityEnum).optional(),
    progress: z.number().min(0).max(100).optional(),
  }),
});

export type CreateProjectInput = z.infer<typeof createProjectValidator>["body"];
