import prisma from "../../../database/prisma";
import { Client, Prisma } from "@prisma/client";
import { CreateClientData, UpdateClientData, ClientQueryFilter } from "../interfaces/client.interface";

export class ClientRepository {
  static async createClient(data: CreateClientData): Promise<Client> {
    return prisma.client.create({
      data: {
        userId: data.userId,
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone,
        address: data.address,
        companyName: data.companyName,
        website: data.website,
        industry: data.industry,
        taxId: data.taxId,
        status: data.status || "ACTIVE",
        notes: data.notes,
      },
    });
  }

  static async findClientById(id: string, userId: string): Promise<Client | null> {
    return prisma.client.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
    });
  }

  static async findClients(filter: ClientQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ClientWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.industry) {
      where.industry = { contains: filter.industry };
    }

    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { email: { contains: filter.search } },
        { companyName: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.client.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateClient(id: string, userId: string, data: UpdateClientData): Promise<Client> {
    return prisma.client.update({
      where: { id },
      data: {
        ...data,
        email: data.email ? data.email.toLowerCase() : undefined,
      },
    });
  }

  static async softDeleteClient(id: string, userId: string): Promise<Client> {
    return prisma.client.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
