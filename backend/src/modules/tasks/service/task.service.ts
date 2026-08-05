import { TaskRepository } from "../repository/task.repository";
import { ProjectRepository } from "../../projects/repository/project.repository";
import { CreateTaskInput } from "../validators/create-task.validator";
import { UpdateTaskInput } from "../validators/update-task.validator";
import { TaskQueryFilter } from "../interfaces/task.interface";
import { TaskResponseDto, KanbanBoardResponseDto } from "../types/task.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { TaskStatusEnum } from "../../../shared/enums/task-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";
import { Task } from "@prisma/client";

export class TaskService {
  static async createTask(userId: string, input: CreateTaskInput): Promise<TaskResponseDto> {
    const project = await ProjectRepository.findProjectById(input.projectId, userId);
    if (!project) {
      throw new AppError("Associated project not found", HttpStatus.BAD_REQUEST);
    }

    const task = await TaskRepository.createTask({
      userId,
      ...input,
    });
    return this.mapTaskToDto(task);
  }

  static async getTaskById(id: string, userId: string): Promise<TaskResponseDto> {
    const task = await TaskRepository.findTaskById(id, userId);
    if (!task) {
      throw new AppError("Task not found", HttpStatus.NOT_FOUND);
    }
    return this.mapTaskToDto(task);
  }

  static async getTasks(filter: TaskQueryFilter) {
    const result = await TaskRepository.findTasks(filter);
    return {
      data: result.data.map((t) => this.mapTaskToDto(t)),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  static async getKanbanBoard(userId: string, projectId?: string): Promise<KanbanBoardResponseDto> {
    const tasks = await TaskRepository.findTasksForKanban(userId, projectId);

    const board: KanbanBoardResponseDto = {
      TODO: [],
      IN_PROGRESS: [],
      REVIEW: [],
      COMPLETED: [],
    };

    tasks.forEach((t) => {
      const dto = this.mapTaskToDto(t);
      if (board[dto.status]) {
        board[dto.status].push(dto);
      }
    });

    return board;
  }

  static async updateTask(id: string, userId: string, input: UpdateTaskInput): Promise<TaskResponseDto> {
    const existing = await TaskRepository.findTaskById(id, userId);
    if (!existing) {
      throw new AppError("Task not found", HttpStatus.NOT_FOUND);
    }

    if (input.projectId) {
      const project = await ProjectRepository.findProjectById(input.projectId, userId);
      if (!project) {
        throw new AppError("Associated project not found", HttpStatus.BAD_REQUEST);
      }
    }

    const updated = await TaskRepository.updateTask(id, userId, input);
    return this.mapTaskToDto(updated);
  }

  static async deleteTask(id: string, userId: string): Promise<void> {
    const existing = await TaskRepository.findTaskById(id, userId);
    if (!existing) {
      throw new AppError("Task not found", HttpStatus.NOT_FOUND);
    }

    await TaskRepository.softDeleteTask(id, userId);
  }

  private static mapTaskToDto(task: Task & { project?: any }): TaskResponseDto {
    return {
      id: task.id,
      userId: task.userId,
      projectId: task.projectId,
      projectName: task.project?.name || undefined,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority as ProjectPriorityEnum,
      status: task.status as TaskStatusEnum,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}
