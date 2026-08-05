import prisma from "../../../database/prisma";
import { Lead, Prisma } from "@prisma/client";
import { CreateLeadData, UpdateLeadData, LeadQueryFilter } from "../interfaces/lead.interface";

export class LeadRepository {
  static async createLead(data: CreateLeadData): Promise<Lead> {
    return prisma.lead.create({
      data: {
        userId: data.userId,
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        companyName: data.companyName,
        estimatedValue: data.estimatedValue,
        source: data.source,
        status: data.status || "NEW",
        notes: data.notes,
      },
    });
  }

  static async findLeadById(id: string, userId: string): Promise<Lead | null> {
    return prisma.lead.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });
  }

  static async findLeads(filter: LeadQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.LeadWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.source) {
      where.source = { contains: filter.source };
    }

    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { email: { contains: filter.search } },
        { companyName: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateLead(id: string, userId: string, data: UpdateLeadData): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data: {
        ...data,
        email: data.email ? data.email.toLowerCase() : undefined,
      },
    });
  }

  static async softDeleteLead(id: string, userId: string): Promise<Lead> {
    return prisma.lead.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
