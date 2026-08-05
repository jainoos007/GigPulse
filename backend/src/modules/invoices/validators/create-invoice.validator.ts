import { z } from "zod";
import { InvoiceStatusEnum } from "../../../shared/enums/invoice-status.enum";

export const createInvoiceValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format"),
    projectId: z.string().uuid("Invalid project ID format").optional(),
    invoiceNumber: z.string().optional(),
    amount: z.number().min(0, "Amount must be greater than or equal to 0"),
    tax: z.number().min(0).default(0),
    discount: z.number().min(0).default(0),
    dueDate: z.string().transform((val) => new Date(val)),
    status: z.nativeEnum(InvoiceStatusEnum).optional(),
    notes: z.string().optional(),
  }),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceValidator>["body"];
