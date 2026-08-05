import { InvoiceRepository } from "../repository/invoice.repository";
import { ClientRepository } from "../../clients/repository/client.repository";
import { ProjectRepository } from "../../projects/repository/project.repository";
import { CreateInvoiceInput } from "../validators/create-invoice.validator";
import { UpdateInvoiceInput } from "../validators/update-invoice.validator";
import { RecordPaymentInput } from "../validators/record-payment.validator";
import { InvoiceQueryFilter } from "../interfaces/invoice.interface";
import { InvoiceResponseDto, InvoiceMetricsDto } from "../types/invoice.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { InvoiceStatusEnum } from "../../../shared/enums/invoice-status.enum";
import { PaymentMethodEnum } from "../../../shared/enums/payment-method.enum";
import { Invoice, Payment } from "@prisma/client";

export class InvoiceService {
  static async createInvoice(userId: string, input: CreateInvoiceInput): Promise<InvoiceResponseDto> {
    const client = await ClientRepository.findClientById(input.clientId, userId);
    if (!client) {
      throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
    }

    if (input.projectId) {
      const project = await ProjectRepository.findProjectById(input.projectId, userId);
      if (!project) {
        throw new AppError("Associated project not found", HttpStatus.BAD_REQUEST);
      }
    }

    const subtotal = input.amount;
    const discountAmount = input.discount || 0;
    const taxAmount = (subtotal * (input.tax || 0)) / 100;
    const totalAmount = Math.max(0, subtotal - discountAmount + taxAmount);

    const invoice = await InvoiceRepository.createInvoice({
      userId,
      ...input,
      totalAmount,
    });

    return this.mapInvoiceToDto(invoice);
  }

  static async getInvoiceById(id: string, userId: string): Promise<InvoiceResponseDto> {
    const invoice = await InvoiceRepository.findInvoiceById(id, userId);
    if (!invoice) {
      throw new AppError("Invoice not found", HttpStatus.NOT_FOUND);
    }
    return this.mapInvoiceToDto(invoice);
  }

  static async getInvoices(filter: InvoiceQueryFilter) {
    const result = await InvoiceRepository.findInvoices(filter);
    const metrics = await InvoiceRepository.getFinancialMetrics(filter.userId);

    return {
      data: result.data.map((i) => this.mapInvoiceToDto(i)),
      meta: result.meta,
      metrics,
    };
  }

  static async updateInvoice(id: string, userId: string, input: UpdateInvoiceInput): Promise<InvoiceResponseDto> {
    const existing = await InvoiceRepository.findInvoiceById(id, userId);
    if (!existing) {
      throw new AppError("Invoice not found", HttpStatus.NOT_FOUND);
    }

    const subtotal = input.amount !== undefined ? input.amount : existing.amount;
    const discountAmount = input.discount !== undefined ? input.discount : existing.discount;
    const taxPercentage = input.tax !== undefined ? input.tax : existing.tax;
    const taxAmount = (subtotal * taxPercentage) / 100;
    const totalAmount = Math.max(0, subtotal - discountAmount + taxAmount);

    const updated = await InvoiceRepository.updateInvoice(id, userId, {
      ...input,
      totalAmount,
    });

    return this.mapInvoiceToDto(updated);
  }

  static async recordPayment(id: string, userId: string, input: RecordPaymentInput): Promise<InvoiceResponseDto> {
    const invoice = await InvoiceRepository.findInvoiceById(id, userId);
    if (!invoice) {
      throw new AppError("Invoice not found", HttpStatus.NOT_FOUND);
    }

    await InvoiceRepository.recordPayment({
      userId,
      invoiceId: id,
      amount: input.amount,
      paymentMethod: input.paymentMethod,
      transactionId: input.transactionId,
      paidDate: input.paidDate,
    });

    // Check updated payments total
    const updatedInvoice = await InvoiceRepository.findInvoiceById(id, userId);
    const totalPaid = updatedInvoice?.payments?.reduce((acc, p) => acc + p.amount, 0) || 0;

    if (totalPaid >= invoice.totalAmount) {
      await InvoiceRepository.updateInvoice(id, userId, { status: InvoiceStatusEnum.PAID });
    }

    const finalInvoice = await InvoiceRepository.findInvoiceById(id, userId);
    return this.mapInvoiceToDto(finalInvoice!);
  }

  static async deleteInvoice(id: string, userId: string): Promise<void> {
    const existing = await InvoiceRepository.findInvoiceById(id, userId);
    if (!existing) {
      throw new AppError("Invoice not found", HttpStatus.NOT_FOUND);
    }

    await InvoiceRepository.softDeleteInvoice(id, userId);
  }

  private static mapInvoiceToDto(invoice: Invoice & { client?: any; project?: any; payments?: Payment[] }): InvoiceResponseDto {
    return {
      id: invoice.id,
      userId: invoice.userId,
      clientId: invoice.clientId,
      clientName: invoice.client?.name || undefined,
      projectId: invoice.projectId,
      projectName: invoice.project?.name || undefined,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount,
      tax: invoice.tax,
      discount: invoice.discount,
      totalAmount: invoice.totalAmount,
      dueDate: invoice.dueDate,
      status: invoice.status as InvoiceStatusEnum,
      notes: invoice.notes,
      payments: invoice.payments?.map((p) => ({
        id: p.id,
        amount: p.amount,
        paymentMethod: p.paymentMethod as PaymentMethodEnum,
        transactionId: p.transactionId,
        paidDate: p.paidDate,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
