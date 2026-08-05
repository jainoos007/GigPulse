import { apiClient } from "../../../lib/axios";
import { InvoiceSchemaType, RecordPaymentSchemaType } from "../schemas/invoice.schema";
import { Invoice, InvoiceMeta, InvoiceMetrics } from "../types/invoice.types";

export class InvoiceService {
  static async getInvoices(params?: { search?: string; status?: string; clientId?: string; page?: number; limit?: number }) {
    const response = await apiClient.get("/invoices", { params });
    return response.data as { success: boolean; data: Invoice[]; meta: InvoiceMeta; metrics: InvoiceMetrics };
  }

  static async getInvoiceById(id: string): Promise<Invoice> {
    const response = await apiClient.get(`/invoices/${id}`);
    return response.data.data;
  }

  static async createInvoice(data: InvoiceSchemaType): Promise<Invoice> {
    const response = await apiClient.post("/invoices", data);
    return response.data.data;
  }

  static async updateInvoice(id: string, data: Partial<InvoiceSchemaType>): Promise<Invoice> {
    const response = await apiClient.patch(`/invoices/${id}`, data);
    return response.data.data;
  }

  static async recordPayment(id: string, data: RecordPaymentSchemaType): Promise<Invoice> {
    const response = await apiClient.post(`/invoices/${id}/payments`, data);
    return response.data.data;
  }

  static async deleteInvoice(id: string): Promise<void> {
    await apiClient.delete(`/invoices/${id}`);
  }
}
