import { ClientRepository } from "../repository/client.repository";
import { CreateClientInput } from "../validators/create-client.validator";
import { UpdateClientInput } from "../validators/update-client.validator";
import { ClientQueryFilter } from "../interfaces/client.interface";
import { ClientResponseDto } from "../types/client.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { ClientStatusEnum } from "../../../shared/enums/client-status.enum";
import { Client } from "@prisma/client";

export class ClientService {
  static async createClient(userId: string, input: CreateClientInput): Promise<ClientResponseDto> {
    const client = await ClientRepository.createClient({
      userId,
      ...input,
    });
    return this.mapClientToDto(client);
  }

  static async getClientById(id: string, userId: string): Promise<ClientResponseDto> {
    const client = await ClientRepository.findClientById(id, userId);
    if (!client) {
      throw new AppError("Client not found", HttpStatus.NOT_FOUND);
    }
    return this.mapClientToDto(client);
  }

  static async getClients(filter: ClientQueryFilter) {
    const result = await ClientRepository.findClients(filter);
    return {
      data: result.data.map(this.mapClientToDto),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  static async updateClient(id: string, userId: string, input: UpdateClientInput): Promise<ClientResponseDto> {
    const existing = await ClientRepository.findClientById(id, userId);
    if (!existing) {
      throw new AppError("Client not found", HttpStatus.NOT_FOUND);
    }

    const updated = await ClientRepository.updateClient(id, userId, input);
    return this.mapClientToDto(updated);
  }

  static async deleteClient(id: string, userId: string): Promise<void> {
    const existing = await ClientRepository.findClientById(id, userId);
    if (!existing) {
      throw new AppError("Client not found", HttpStatus.NOT_FOUND);
    }

    await ClientRepository.softDeleteClient(id, userId);
  }

  private static mapClientToDto(client: Client): ClientResponseDto {
    return {
      id: client.id,
      userId: client.userId,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      companyName: client.companyName,
      website: client.website,
      industry: client.industry,
      taxId: client.taxId,
      status: client.status as ClientStatusEnum,
      notes: client.notes,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
