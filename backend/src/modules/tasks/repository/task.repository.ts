import prisma from "../../../database/prisma";
import { Task, Prisma } from "@prisma/client";
import { CreateTaskData, UpdateTaskData, TaskQueryFilter } from "../interfaces/task.interface";

export class TaskRepository {
  static async createTask(data: CreateTaskData): Promise<Task> {
    return prisma.task.create({
      data: {
        userId: data.userId,
        projectId: data.projectId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        priority: data.priority || "MEDIUM",
        status: data.status || "TODO",
      },
      include: {
        project: true,
      },
    });
  }

  static async findTaskById(id: string, userId: string): Promise<(Task & { project?: any }) | null> {
    return prisma.task.findFirst({
      where: {
        id,
        userId,
        isDeleted: false,
      },
      include: {
        project: true,
      },
    });
  }

  static async findTasks(filter: TaskQueryFilter) {
    const page = filter.page || 1;
    const limit = filter.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = {
      userId: filter.userId,
      isDeleted: false,
    };

    if (filter.projectId) {
      where.projectId = filter.projectId;
    }

    if (filter.status) {
      where.status = filter.status;
    }

    if (filter.priority) {
      where.priority = filter.priority;
    }

    if (filter.search) {
      where.OR = [
        { title: { contains: filter.search } },
        { description: { contains: filter.search } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          project: true,
        },
      }),
      prisma.task.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async findTasksForKanban(userId: string, projectId?: string) {
    const where: Prisma.TaskWhereInput = {
      userId,
      isDeleted: false,
    };

    if (projectId) {
      where.projectId = projectId;
    }

    return prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        project: true,
      },
    });
  }

  static async updateTask(id: string, userId: string, data: UpdateTaskData): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
      include: {
        project: true,
      },
    });
  }

  static async softDeleteTask(id: string, userId: string): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }
}
