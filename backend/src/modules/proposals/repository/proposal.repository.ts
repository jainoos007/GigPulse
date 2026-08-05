import prisma from "../../../database/prisma";
import { Proposal, Prisma } from "@prisma/client";
import { CreateProposalData, UpdateProposalData, ProposalQueryFilter } from "../interfaces/proposal.interface";

export class ProposalRepository {
  static async createProposal(data: CreateProposalData): Promise<Proposal> {
    return prisma.proposal.create({
      data: {
        userId: data.userId,
        clientId: data.clientId,
        leadId: data.leadId,
        title: data.title,
        value: data.value,
        content: data.content,
        status: data.status || "DRAFT",
        expiryDate: data.expiryDate,
      },
      include: {
        client: true,
        lead: true,
      },
    });
  }

  static async findProposalById(id: string, userId: string): Promise<(Proposal & { client?: any; lead?: any }) | null> {
    return prisma.proposal.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
      include: {
        client: true,
        lead: true,
      },
    });
  }

  static async findProposals(filter: ProposalQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 15;
    const skip = (page - 1) * limit;

    const where: Prisma.ProposalWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.clientId) {
      where.clientId = filter.clientId;
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { content: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.proposal.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          client: true,
          lead: true,
        },
      }),
      prisma.proposal.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateProposal(id: string, userId: string, data: UpdateProposalData): Promise<Proposal> {
    return prisma.proposal.update({
      where: { id },
      data,
      include: {
        client: true,
        lead: true,
      },
    });
  }

  static async softDeleteProposal(id: string, userId: string): Promise<Proposal> {
    return prisma.proposal.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
