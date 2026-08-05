import { apiClient } from "../../../lib/axios";
import { ProposalSchemaType } from "../schemas/proposal.schema";
import { Proposal, ProposalMeta } from "../types/proposal.types";

export class ProposalService {
  static async getProposals(params?: { search?: string; status?: string; clientId?: string; page?: number; limit?: number }) {
    const response = await apiClient.get("/proposals", { params });
    return response.data as { success: boolean; data: Proposal[]; meta: ProposalMeta };
  }

  static async getProposalById(id: string): Promise<Proposal> {
    const response = await apiClient.get(`/proposals/${id}`);
    return response.data.data;
  }

  static async createProposal(data: ProposalSchemaType): Promise<Proposal> {
    const response = await apiClient.post("/proposals", data);
    return response.data.data;
  }

  static async updateProposal(id: string, data: Partial<ProposalSchemaType>): Promise<Proposal> {
    const response = await apiClient.patch(`/proposals/${id}`, data);
    return response.data.data;
  }

  static async convertProposal(id: string): Promise<{ proposal: Proposal; projectId: string }> {
    const response = await apiClient.post(`/proposals/${id}/convert`);
    return response.data.data;
  }

  static async deleteProposal(id: string): Promise<void> {
    await apiClient.delete(`/proposals/${id}`);
  }
}
