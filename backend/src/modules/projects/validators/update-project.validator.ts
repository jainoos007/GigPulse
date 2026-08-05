import { z } from "zod";
import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export const updateProjectValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format").optional(),
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    budget: z.number().min(0).optional(),
    startDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    deadline: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    status: z.nativeEnum(ProjectStatusEnum).optional(),
    priority: z.nativeEnum(ProjectPriorityEnum).optional(),
    progress: z.number().min(0).max(100).optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid project ID format"),
  }),
});

export type UpdateProjectInput = z.infer<typeof updateProjectValidator>["body"];
