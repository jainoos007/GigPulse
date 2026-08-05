import { z } from "zod";
import { LeadStatusEnum } from "../../../shared/enums/lead-status.enum";

export const updateLeadValidator = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    companyName: z.string().optional(),
    estimatedValue: z.number().min(0).optional(),
    source: z.string().optional(),
    status: z.nativeEnum(LeadStatusEnum).optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid lead ID format"),
  }),
});

export type UpdateLeadInput = z.infer<typeof updateLeadValidator>["body"];
