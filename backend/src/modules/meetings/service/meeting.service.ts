import { MeetingRepository } from "../repository/meeting.repository";
import { ClientRepository } from "../../clients/repository/client.repository";
import { CreateMeetingInput } from "../validators/create-meeting.validator";
import { UpdateMeetingInput } from "../validators/update-meeting.validator";
import { MeetingQueryFilter } from "../interfaces/meeting.interface";
import { MeetingResponseDto } from "../types/meeting.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { Meeting } from "@prisma/client";

export class MeetingService {
  static async createMeeting(userId: string, input: CreateMeetingInput): Promise<MeetingResponseDto> {
    const client = await ClientRepository.findClientById(input.clientId, userId);
    if (!client) {
      throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
    }

    const meeting = await MeetingRepository.createMeeting({
      userId,
      ...input,
    });
    return this.mapMeetingToDto(meeting);
  }

  static async getMeetingById(id: string, userId: string): Promise<MeetingResponseDto> {
    const meeting = await MeetingRepository.findMeetingById(id, userId);
    if (!meeting) {
      throw new AppError("Meeting not found", HttpStatus.NOT_FOUND);
    }
    return this.mapMeetingToDto(meeting);
  }

  static async getMeetings(filter: MeetingQueryFilter) {
    const result = await MeetingRepository.findMeetings(filter);
    return {
      data: result.data.map((m) => this.mapMeetingToDto(m)),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  static async updateMeeting(id: string, userId: string, input: UpdateMeetingInput): Promise<MeetingResponseDto> {
    const existing = await MeetingRepository.findMeetingById(id, userId);
    if (!existing) {
      throw new AppError("Meeting not found", HttpStatus.NOT_FOUND);
    }

    if (input.clientId) {
      const client = await ClientRepository.findClientById(input.clientId, userId);
      if (!client) {
        throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
      }
    }

    const updated = await MeetingRepository.updateMeeting(id, userId, input);
    return this.mapMeetingToDto(updated);
  }

  static async deleteMeeting(id: string, userId: string): Promise<void> {
    const existing = await MeetingRepository.findMeetingById(id, userId);
    if (!existing) {
      throw new AppError("Meeting not found", HttpStatus.NOT_FOUND);
    }

    await MeetingRepository.softDeleteMeeting(id, userId);
  }

  private static mapMeetingToDto(meeting: Meeting & { client?: any }): MeetingResponseDto {
    return {
      id: meeting.id,
      userId: meeting.userId,
      clientId: meeting.clientId,
      clientName: meeting.client?.name || undefined,
      title: meeting.title,
      meetingDate: meeting.meetingDate,
      platform: meeting.platform,
      locationUrl: meeting.locationUrl,
      notes: meeting.notes,
      reminder: meeting.reminder,
      createdAt: meeting.createdAt,
      updatedAt: meeting.updatedAt,
    };
  }
}
