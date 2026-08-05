import { z } from "zod";

export const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  projectId: z.string().optional(),
  invoiceNumber: z.string().optional(),
  amount: z.number().min(0, "Amount is required"),
  tax: z.number().min(0).default(0),
  discount: z.number().min(0).default(0),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"]).default("DRAFT"),
  notes: z.string().optional(),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;

export const recordPaymentSchema = z.object({
  amount: z.number().positive("Payment amount must be greater than zero"),
  paymentMethod: z.enum(["BANK_TRANSFER", "CREDIT_CARD", "PAYPAL", "CASH", "OTHER"]).default("BANK_TRANSFER"),
  transactionId: z.string().optional(),
  paidDate: z.string().optional(),
});

export type RecordPaymentSchemaType = z.infer<typeof recordPaymentSchema>;
