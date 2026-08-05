import { z } from "zod";
import { TaskStatusEnum } from "../../../shared/enums/task-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export const createTaskValidator = z.object({
  body: z.object({
    projectId: z.string().uuid("Invalid project ID format"),
    title: z.string().min(1, "Task title is required"),
    description: z.string().optional(),
    dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    priority: z.nativeEnum(ProjectPriorityEnum).optional(),
    status: z.nativeEnum(TaskStatusEnum).optional(),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskValidator>["body"];
