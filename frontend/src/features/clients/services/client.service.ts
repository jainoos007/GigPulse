import { apiClient } from "../../../lib/axios";
import { ClientSchemaType } from "../schemas/client.schema";
import { Client, ClientMeta } from "../types/client.types";

export class ClientService {
  static async getClients(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const response = await apiClient.get("/clients", { params });
    return response.data as { success: boolean; data: Client[]; meta: ClientMeta };
  }

  static async getClientById(id: string): Promise<Client> {
    const response = await apiClient.get(`/clients/${id}`);
    return response.data.data;
  }

  static async createClient(data: ClientSchemaType): Promise<Client> {
    const response = await apiClient.post("/clients", data);
    return response.data.data;
  }

  static async updateClient(id: string, data: Partial<ClientSchemaType>): Promise<Client> {
    const response = await apiClient.patch(`/clients/${id}`, data);
    return response.data.data;
  }

  static async deleteClient(id: string): Promise<void> {
    await apiClient.delete(`/clients/${id}`);
  }
}
