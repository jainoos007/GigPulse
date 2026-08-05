import { z } from "zod";
import { ProposalStatusEnum } from "../../../shared/enums/proposal-status.enum";

export const updateProposalValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format").optional(),
    leadId: z.string().uuid("Invalid lead ID format").optional(),
    title: z.string().min(1).optional(),
    value: z.number().min(0).optional(),
    content: z.string().optional(),
    status: z.nativeEnum(ProposalStatusEnum).optional(),
    expiryDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
  }),
  params: z.object({
    id: z.string().uuid("Invalid proposal ID format"),
  }),
});

export type UpdateProposalInput = z.infer<typeof updateProposalValidator>["body"];
