import { z } from "zod";
import { ProposalStatusEnum } from "../../../shared/enums/proposal-status.enum";

export const createProposalValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format"),
    leadId: z.string().uuid("Invalid lead ID format").optional(),
    title: z.string().min(1, "Proposal title is required"),
    value: z.number().min(0).optional(),
    content: z.string().optional(),
    status: z.nativeEnum(ProposalStatusEnum).optional(),
    expiryDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  }),
});

export type CreateProposalInput = z.infer<typeof createProposalValidator>["body"];
