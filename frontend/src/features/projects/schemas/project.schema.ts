import { z } from "zod";

export const projectSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  budget: z.number().min(0).optional(),
  startDate: z.string().optional(),
  deadline: z.string().optional(),
  status: z.enum(["PLANNING", "ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  progress: z.number().min(0).max(100).default(0),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
