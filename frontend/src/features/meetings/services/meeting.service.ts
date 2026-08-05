import { apiClient } from "../../../lib/axios";
import { MeetingSchemaType } from "../schemas/meeting.schema";
import { Meeting, MeetingMeta } from "../types/meeting.types";

export class MeetingService {
  static async getMeetings(params?: { search?: string; clientId?: string; upcomingOnly?: boolean; page?: number; limit?: number }) {
    const response = await apiClient.get("/meetings", { params });
    return response.data as { success: boolean; data: Meeting[]; meta: MeetingMeta };
  }

  static async getMeetingById(id: string): Promise<Meeting> {
    const response = await apiClient.get(`/meetings/${id}`);
    return response.data.data;
  }

  static async createMeeting(data: MeetingSchemaType): Promise<Meeting> {
    const response = await apiClient.post("/meetings", data);
    return response.data.data;
  }

  static async updateMeeting(id: string, data: Partial<MeetingSchemaType>): Promise<Meeting> {
    const response = await apiClient.patch(`/meetings/${id}`, data);
    return response.data.data;
  }

  static async deleteMeeting(id: string): Promise<void> {
    await apiClient.delete(`/meetings/${id}`);
  }
}
