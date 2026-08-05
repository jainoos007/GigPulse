import prisma from "../../../database/prisma";
import { Project, Prisma } from "@prisma/client";
import { CreateProjectData, UpdateProjectData, ProjectQueryFilter } from "../interfaces/project.interface";

export class ProjectRepository {
  static async createProject(data: CreateProjectData): Promise<Project> {
    return prisma.project.create({
      data: {
        userId: data.userId,
        clientId: data.clientId,
        name: data.name,
        description: data.description,
        budget: data.budget,
        startDate: data.startDate,
        deadline: data.deadline,
        status: data.status || "PLANNING",
        priority: data.priority || "MEDIUM",
        progress: data.progress || 0,
      },
      include: {
        client: true,
      },
    });
  }

  static async findProjectById(id: string, userId: string): Promise<(Project & { client?: any }) | null> {
    return prisma.project.findFirst({
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

  static async findProjects(filter: ProjectQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const where: Prisma.ProjectWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.clientId) {
      where.clientId = filter.clientId;
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.priority) {
      where.priority = filter.priority;
    }

    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search } },
        { description: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          client: true,
        },
      }),
      prisma.project.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async updateProject(id: string, userId: string, data: UpdateProjectData): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data,
      include: {
        client: true,
      },
    });
  }

  static async softDeleteProject(id: string, userId: string): Promise<Project> {
    return prisma.project.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
