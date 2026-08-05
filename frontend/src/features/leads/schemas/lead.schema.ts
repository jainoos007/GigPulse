import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  estimatedValue: z.number().min(0).optional(),
  source: z.string().optional(),
  status: z.enum(["NEW", "CONTACTED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST"]).default("NEW"),
  notes: z.string().optional(),
});

export type LeadSchemaType = z.infer<typeof leadSchema>;
