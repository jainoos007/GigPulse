import { z } from "zod";
import { PaymentMethodEnum } from "../../../shared/enums/payment-method.enum";

export const recordPaymentValidator = z.object({
  body: z.object({
    amount: z.number().positive("Payment amount must be greater than zero"),
    paymentMethod: z.nativeEnum(PaymentMethodEnum).optional(),
    transactionId: z.string().optional(),
    paidDate: z.string().optional().transform((val) => (val ? new Date(val) : new Date())),
  }),
  params: z.object({
    id: z.string().uuid("Invalid invoice ID format"),
  }),
});

export type RecordPaymentInput = z.infer<typeof recordPaymentValidator>["body"];
