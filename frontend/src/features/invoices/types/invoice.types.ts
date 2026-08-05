export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";
export type PaymentMethod = "BANK_TRANSFER" | "CREDIT_CARD" | "PAYPAL" | "CASH" | "OTHER";

export interface Payment {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionId: string | null;
  paidDate: string;
}

export interface Invoice {
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
  dueDate: string;
  status: InvoiceStatus;
  notes: string | null;
  payments?: Payment[];
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InvoiceMetrics {
  totalRevenue: number;
  pendingRevenue: number;
  overdueAmount: number;
}
