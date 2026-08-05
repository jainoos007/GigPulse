import prisma from "../../../database/prisma";
import { Invoice, Payment, Prisma } from "@prisma/client";
import { CreateInvoiceData, UpdateInvoiceData, RecordPaymentData, InvoiceQueryFilter } from "../interfaces/invoice.interface";

export class InvoiceRepository {
  static async generateInvoiceNumber(userId: string): Promise<string> {
    const count = await prisma.invoice.count({ where: { userId } });
    const year = new Date().getFullYear();
    const nextNum = (count + 1).toString().padStart(3, "0");
    return `INV-${year}-${nextNum}`;
  }

  static async createInvoice(data: CreateInvoiceData): Promise<Invoice> {
    return prisma.invoice.create({
      data: {
        userId: data.userId,
        clientId: data.clientId,
        projectId: data.projectId,
        invoiceNumber: data.invoiceNumber || (await this.generateInvoiceNumber(data.userId)),
        amount: data.amount,
        tax: data.tax || 0,
        discount: data.discount || 0,
        totalAmount: data.totalAmount,
        dueDate: data.dueDate,
        status: data.status || "DRAFT",
        notes: data.notes,
      },
      include: {
        client: true,
        project: true,
        payments: true,
      },
    });
  }

  static async findInvoiceById(id: string, userId: string): Promise<(Invoice & { client?: any; project?: any; payments?: Payment[] }) | null> {
    return prisma.invoice.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
      include: {
        client: true,
        project: true,
        payments: true,
      },
    });
  }

  static async findInvoices(filter: InvoiceQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 15;
    const skip = (page - 1) * limit;

    const where: Prisma.InvoiceWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.clientId) {
      where.clientId = filter.clientId;
    }

    if (filter.projectId) {
      where.projectId = filter.projectId;
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.search) {
      where.OR = [
        { invoiceNumber: { contains: filter.search } },
        { notes: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          client: true,
          project: true,
          payments: true,
        },
      }),
      prisma.invoice.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateInvoice(id: string, userId: string, data: UpdateInvoiceData): Promise<Invoice> {
    return prisma.invoice.update({
      where: { id },
      data,
      include: {
        client: true,
        project: true,
        payments: true,
      },
    });
  }

  static async recordPayment(data: RecordPaymentData): Promise<Payment> {
    return prisma.payment.create({
      data: {
        userId: data.userId,
        invoiceId: data.invoiceId,
        amount: data.amount,
        paymentMethod: data.paymentMethod || "BANK_TRANSFER",
        transactionId: data.transactionId,
        paidDate: data.paidDate || new Date(),
      },
    });
  }

  static async getFinancialMetrics(userId: string) {
    const invoices = await prisma.invoice.findMany({
      where: { userId, isDeleted: false },
      include: { payments: true },
    });

    let totalRevenue = 0;
    let pendingRevenue = 0;
    let overdueAmount = 0;
    const now = new Date();

    invoices.forEach((inv) => {
      const paidSum = inv.payments.reduce((acc, p) => acc + p.amount, 0);
      totalRevenue += paidSum;

      if (inv.status === "PAID") return;

      const remaining = Math.max(0, inv.totalAmount - paidSum);
      if (inv.status === "OVERDUE" || inv.dueDate < now) {
        overdueAmount += remaining;
      } else {
        pendingRevenue += remaining;
      }
    });

    return { totalRevenue, pendingRevenue, overdueAmount };
  }

  static async softDeleteInvoice(id: string, userId: string): Promise<Invoice> {
    return prisma.invoice.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
