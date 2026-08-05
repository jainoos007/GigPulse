import { InvoiceStatusEnum } from "../../../shared/enums/invoice-status.enum";
import { PaymentMethodEnum } from "../../../shared/enums/payment-method.enum";

export interface CreateInvoiceData {
  userId: string;
  clientId: string;
  projectId?: string;
  invoiceNumber?: string;
  amount: number;
  tax?: number;
  discount?: number;
  totalAmount: number;
  dueDate: Date;
  status?: InvoiceStatusEnum;
  notes?: string;
}

export interface UpdateInvoiceData {
  clientId?: string;
  projectId?: string;
  amount?: number;
  tax?: number;
  discount?: number;
  totalAmount?: number;
  dueDate?: Date;
  status?: InvoiceStatusEnum;
  notes?: string;
}

export interface RecordPaymentData {
  userId: string;
  invoiceId: string;
  amount: number;
  paymentMethod?: PaymentMethodEnum;
  transactionId?: string;
  paidDate?: Date;
}

export interface InvoiceQueryFilter {
  userId: string;
  clientId?: string;
  projectId?: string;
  search?: string;
  status?: InvoiceStatusEnum;
  page?: number;
  limit?: number;
}
