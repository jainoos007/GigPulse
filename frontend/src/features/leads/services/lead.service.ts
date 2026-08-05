import { apiClient } from "../../../lib/axios";
import { LeadSchemaType } from "../schemas/lead.schema";
import { Lead, LeadMeta } from "../types/lead.types";

export class LeadService {
  static async getLeads(params?: { search?: string; status?: string; page?: number; limit?: number }) {
    const response = await apiClient.get("/leads", { params });
    return response.data as { success: boolean; data: Lead[]; meta: LeadMeta };
  }

  static async getLeadById(id: string): Promise<Lead> {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data.data;
  }

  static async createLead(data: LeadSchemaType): Promise<Lead> {
    const response = await apiClient.post("/leads", data);
    return response.data.data;
  }

  static async updateLead(id: string, data: Partial<LeadSchemaType>): Promise<Lead> {
    const response = await apiClient.patch(`/leads/${id}`, data);
    return response.data.data;
  }

  static async convertLead(id: string): Promise<{ lead: Lead; client: any }> {
    const response = await apiClient.post(`/leads/${id}/convert`);
    return response.data.data;
  }

  static async deleteLead(id: string): Promise<void> {
    await apiClient.delete(`/leads/${id}`);
  }
}
