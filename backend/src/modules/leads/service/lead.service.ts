import { LeadRepository } from "../repository/lead.repository";
import { ClientRepository } from "../../clients/repository/client.repository";
import { CreateLeadInput } from "../validators/create-lead.validator";
import { UpdateLeadInput } from "../validators/update-lead.validator";
import { LeadQueryFilter } from "../interfaces/lead.interface";
import { LeadResponseDto } from "../types/lead.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { LeadStatusEnum } from "../../../shared/enums/lead-status.enum";
import { Lead } from "@prisma/client";

export class LeadService {
  static async createLead(userId: string, input: CreateLeadInput): Promise<LeadResponseDto> {
    const lead = await LeadRepository.createLead({
      userId,
      ...input,
    });
    return this.mapLeadToDto(lead);
  }

  static async getLeadById(id: string, userId: string): Promise<LeadResponseDto> {
    const lead = await LeadRepository.findLeadById(id, userId);
    if (!lead) {
      throw new AppError("Lead not found", HttpStatus.NOT_FOUND);
    }
    return this.mapLeadToDto(lead);
  }

  static async getLeads(filter: LeadQueryFilter) {
    const result = await LeadRepository.findLeads(filter);
    return {
      data: result.data.map(this.mapLeadToDto),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  static async updateLead(id: string, userId: string, input: UpdateLeadInput): Promise<LeadResponseDto> {
    const existing = await LeadRepository.findLeadById(id, userId);
    if (!existing) {
      throw new AppError("Lead not found", HttpStatus.NOT_FOUND);
    }

    const updated = await LeadRepository.updateLead(id, userId, input);
    return this.mapLeadToDto(updated);
  }

  static async convertLeadToClient(id: string, userId: string): Promise<{ lead: LeadResponseDto; client: any }> {
    const lead = await LeadRepository.findLeadById(id, userId);
    if (!lead) {
      throw new AppError("Lead not found", HttpStatus.NOT_FOUND);
    }

    if (lead.convertedToId) {
      throw new AppError("Lead has already been converted to a client", HttpStatus.CONFLICT);
    }

    // 1. Create client from lead details
    const newClient = await ClientRepository.createClient({
      userId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone || undefined,
      companyName: lead.companyName || undefined,
      notes: lead.notes ? `Converted from Lead ID: ${lead.id}\nNotes: ${lead.notes}` : `Converted from Lead ID: ${lead.id}`,
      status: "ACTIVE",
    });

    // 2. Mark lead status WON & link convertedToId
    const updatedLead = await LeadRepository.updateLead(id, userId, {
      status: LeadStatusEnum.WON,
      convertedToId: newClient.id,
    });

    return {
      lead: this.mapLeadToDto(updatedLead),
      client: newClient,
    };
  }

  static async deleteLead(id: string, userId: string): Promise<void> {
    const existing = await LeadRepository.findLeadById(id, userId);
    if (!existing) {
      throw new AppError("Lead not found", HttpStatus.NOT_FOUND);
    }

    await LeadRepository.softDeleteLead(id, userId);
  }

  private static mapLeadToDto(lead: Lead): LeadResponseDto {
    return {
      id: lead.id,
      userId: lead.userId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      companyName: lead.companyName,
      estimatedValue: lead.estimatedValue,
      source: lead.source,
      status: lead.status as LeadStatusEnum,
      notes: lead.notes,
      convertedToId: lead.convertedToId,
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt,
    };
  }
}
