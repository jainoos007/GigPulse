import { z } from "zod";
import { TaskStatusEnum } from "../../../shared/enums/task-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export const updateTaskValidator = z.object({
  body: z.object({
    projectId: z.string().uuid("Invalid project ID format").optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    priority: z.nativeEnum(ProjectPriorityEnum).optional(),
    status: z.nativeEnum(TaskStatusEnum).optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid task ID format"),
  }),
});

export type UpdateTaskInput = z.infer<typeof updateTaskValidator>["body"];
