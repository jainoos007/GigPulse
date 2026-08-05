import { z } from "zod";
import { InvoiceStatusEnum } from "../../../shared/enums/invoice-status.enum";

export const updateInvoiceValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format").optional(),
    projectId: z.string().uuid("Invalid project ID format").optional(),
    amount: z.number().min(0).optional(),
    tax: z.number().min(0).optional(),
    discount: z.number().min(0).optional(),
    dueDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    status: z.nativeEnum(InvoiceStatusEnum).optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid invoice ID format"),
  }),
});

export type UpdateInvoiceInput = z.infer<typeof updateInvoiceValidator>["body"];
