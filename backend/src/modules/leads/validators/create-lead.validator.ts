import { z } from "zod";
import { LeadStatusEnum } from "../../../shared/enums/lead-status.enum";

export const createLeadValidator = z.object({
  body: z.object({
    name: z.string().min(1, "Lead name is required"),
    email: z.string().email("Invalid email address format"),
    phone: z.string().optional(),
    companyName: z.string().optional(),
    estimatedValue: z.number().min(0).optional(),
    source: z.string().optional(),
    status: z.nativeEnum(LeadStatusEnum).optional(),
    notes: z.string().optional(),
  }),
});

export type CreateLeadInput = z.infer<typeof createLeadValidator>["body"];
