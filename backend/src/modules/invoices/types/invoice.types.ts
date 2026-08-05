import { InvoiceStatusEnum } from "../../../shared/enums/invoice-status.enum";
import { PaymentMethodEnum } from "../../../shared/enums/payment-method.enum";

export interface PaymentDto {
  id: string;
  amount: number;
  paymentMethod: PaymentMethodEnum;
  transactionId: string | null;
  paidDate: Date;
}

export interface InvoiceResponseDto {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  projectId: string | null;
  projectName?: string;
  invoiceNumber: string;
  amount: number;
  tax: number;
  discount: number;
  totalAmount: number;
  dueDate: Date;
  status: InvoiceStatusEnum;
  notes: string | null;
  payments?: PaymentDto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceMetricsDto {
  totalRevenue: number;
  pendingRevenue: number;
  overdueAmount: number;
}
