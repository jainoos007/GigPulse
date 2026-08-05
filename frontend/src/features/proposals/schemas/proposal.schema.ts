import { z } from "zod";

export const proposalSchema = z.object({
  clientId: z.string().min(1, "Client selection is required"),
  leadId: z.string().optional(),
  title: z.string().min(1, "Proposal title is required"),
  value: z.number().min(0).optional(),
  content: z.string().optional(),
  status: z.enum(["DRAFT", "SENT", "ACCEPTED", "REJECTED", "EXPIRED"]).default("DRAFT"),
  expiryDate: z.string().optional(),
});

export type ProposalSchemaType = z.infer<typeof proposalSchema>;
