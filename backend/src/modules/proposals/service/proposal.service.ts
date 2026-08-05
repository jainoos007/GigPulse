import { ProposalRepository } from "../repository/proposal.repository";
import { ClientRepository } from "../../clients/repository/client.repository";
import { ProjectRepository } from "../../projects/repository/project.repository";
import { CreateProposalInput } from "../validators/create-proposal.validator";
import { UpdateProposalInput } from "../validators/update-proposal.validator";
import { ProposalQueryFilter } from "../interfaces/proposal.interface";
import { ProposalResponseDto } from "../types/proposal.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { ProposalStatusEnum } from "../../../shared/enums/proposal-status.enum";
import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { Proposal } from "@prisma/client";

export class ProposalService {
  static async createProposal(userId: string, input: CreateProposalInput): Promise<ProposalResponseDto> {
    const client = await ClientRepository.findClientById(input.clientId, userId);
    if (!client) {
      throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
    }

    const proposal = await ProposalRepository.createProposal({
      userId,
      ...input,
    });
    return this.mapProposalToDto(proposal);
  }

  static async getProposalById(id: string, userId: string): Promise<ProposalResponseDto> {
    const proposal = await ProposalRepository.findProposalById(id, userId);
    if (!proposal) {
      throw new AppError("Proposal not found", HttpStatus.NOT_FOUND);
    }
    return this.mapProposalToDto(proposal);
  }

  static async getProposals(filter: ProposalQueryFilter) {
    const result = await ProposalRepository.findProposals(filter);
    return {
      data: result.data.map((p) => this.mapProposalToDto(p)),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  static async updateProposal(id: string, userId: string, input: UpdateProposalInput): Promise<ProposalResponseDto> {
    const existing = await ProposalRepository.findProposalById(id, userId);
    if (!existing) {
      throw new AppError("Proposal not found", HttpStatus.NOT_FOUND);
    }

    if (input.clientId) {
      const client = await ClientRepository.findClientById(input.clientId, userId);
      if (!client) {
        throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
      }
    }

    const updated = await ProposalRepository.updateProposal(id, userId, input);
    return this.mapProposalToDto(updated);
  }

  static async convertProposalToProject(id: string, userId: string): Promise<{ proposal: ProposalResponseDto; projectId: string }> {
    const proposal = await ProposalRepository.findProposalById(id, userId);
    if (!proposal) {
      throw new AppError("Proposal not found", HttpStatus.NOT_FOUND);
    }

    // Create a new active project from accepted proposal
    const project = await ProjectRepository.createProject({
      userId,
      clientId: proposal.clientId,
      name: proposal.title,
      description: proposal.content || undefined,
      budget: proposal.value || undefined,
      status: ProjectStatusEnum.PLANNING,
    });

    const updatedProposal = await ProposalRepository.updateProposal(id, userId, {
      status: ProposalStatusEnum.ACCEPTED,
      convertedToId: project.id,
    });

    return {
      proposal: this.mapProposalToDto(updatedProposal),
      projectId: project.id,
    };
  }

  static async deleteProposal(id: string, userId: string): Promise<void> {
    const existing = await ProposalRepository.findProposalById(id, userId);
    if (!existing) {
      throw new AppError("Proposal not found", HttpStatus.NOT_FOUND);
    }

    await ProposalRepository.softDeleteProposal(id, userId);
  }

  private static mapProposalToDto(proposal: Proposal & { client?: any; lead?: any }): ProposalResponseDto {
    return {
      id: proposal.id,
      userId: proposal.userId,
      clientId: proposal.clientId,
      clientName: proposal.client?.name || undefined,
      leadId: proposal.leadId,
      leadName: proposal.lead?.name || undefined,
      title: proposal.title,
      value: proposal.value,
      content: proposal.content,
      status: proposal.status as ProposalStatusEnum,
      expiryDate: proposal.expiryDate,
      convertedToId: proposal.convertedToId,
      createdAt: proposal.createdAt,
      updatedAt: proposal.updatedAt,
    };
  }
}
