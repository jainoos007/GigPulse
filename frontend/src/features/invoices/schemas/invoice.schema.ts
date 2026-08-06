import { z } from "zod";

export const invoiceSchema = z.object({
  clientId: z.string().min(1, "Client is required"),
  projectId: z.string().optional(),
  invoiceNumber: z.string().optional(),
  amount: z.preprocess(
    (val) => (val === "" || val === undefined || val === null || Number.isNaN(val) ? undefined : Number(val)),
    z.number({ required_error: "Subtotal amount is required" }).min(0, "Amount must be non-negative")
  ),
  tax: z.preprocess(
    (val) => (val === "" || val === undefined || val === null || Number.isNaN(val) ? 0 : Number(val)),
    z.number().min(0, "Tax rate cannot be negative").default(0)
  ),
  discount: z.preprocess(
    (val) => (val === "" || val === undefined || val === null || Number.isNaN(val) ? 0 : Number(val)),
    z.number().min(0, "Discount cannot be negative").default(0)
  ),
  dueDate: z.string().min(1, "Due date is required"),
  status: z.enum(["DRAFT", "SENT", "PAID", "OVERDUE", "CANCELLED"]).default("DRAFT"),
  notes: z.string().optional(),
});

export type InvoiceSchemaType = z.infer<typeof invoiceSchema>;

export const recordPaymentSchema = z.object({
  amount: z.preprocess(
    (val) => (val === "" || val === undefined || val === null || Number.isNaN(val) ? undefined : Number(val)),
    z.number({ required_error: "Payment amount is required" }).positive("Payment amount must be greater than zero")
  ),
  paymentMethod: z.enum(["BANK_TRANSFER", "CREDIT_CARD", "PAYPAL", "CASH", "OTHER"]).default("BANK_TRANSFER"),
  transactionId: z.string().optional(),
  paidDate: z.string().optional(),
});

export type RecordPaymentSchemaType = z.infer<typeof recordPaymentSchema>;
