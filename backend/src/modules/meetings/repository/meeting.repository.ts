import prisma from "../../../database/prisma";
import { Meeting, Prisma } from "@prisma/client";
import { CreateMeetingData, UpdateMeetingData, MeetingQueryFilter } from "../interfaces/meeting.interface";

export class MeetingRepository {
  static async createMeeting(data: CreateMeetingData): Promise<Meeting> {
    return prisma.meeting.create({
      data: {
        userId: data.userId,
        clientId: data.clientId,
        title: data.title,
        meetingDate: data.meetingDate,
        platform: data.platform,
        locationUrl: data.locationUrl,
        notes: data.notes,
        reminder: data.reminder ?? true,
      },
      include: {
        client: true,
      },
    });
  }

  static async findMeetingById(id: string, userId: string): Promise<(Meeting & { client?: any }) | null> {
    return prisma.meeting.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
      include: {
        client: true,
      },
    });
  }

  static async findMeetings(filter: MeetingQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 15;
    const skip = (page - 1) * limit;

    const where: Prisma.MeetingWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.clientId) {
      where.clientId = filter.clientId;
    }

    if (filter.upcomingOnly) {
      where.meetingDate = { gte: new Date() };
    }

    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { platform: { contains: filter.search } },
        { notes: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.meeting.findMany({
        where,
        skip,
        take: limit,
        orderBy: { meetingDate: "asc" },
        include: {
          client: true,
        },
      }),
      prisma.meeting.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateMeeting(id: string, userId: string, data: UpdateMeetingData): Promise<Meeting> {
    return prisma.meeting.update({
      where: { id },
      data,
      include: {
        client: true,
      },
    });
  }

  static async softDeleteMeeting(id: string, userId: string): Promise<Meeting> {
    return prisma.meeting.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
