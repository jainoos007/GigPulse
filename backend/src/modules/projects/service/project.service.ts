import { ProjectRepository } from "../repository/project.repository";
import { ClientRepository } from "../../clients/repository/client.repository";
import { CreateProjectInput } from "../validators/create-project.validator";
import { UpdateProjectInput } from "../validators/update-project.validator";
import { ProjectQueryFilter } from "../interfaces/project.interface";
import { ProjectResponseDto } from "../types/project.types";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";
import { Project } from "@prisma/client";

export class ProjectService {
  static async createProject(userId: string, input: CreateProjectInput): Promise<ProjectResponseDto> {
    const client = await ClientRepository.findClientById(input.clientId, userId);
    if (!client) {
      throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
    }

    const project = await ProjectRepository.createProject({
      userId,
      ...input,
    });
    return this.mapProjectToDto(project);
  }

  static async getProjectById(id: string, userId: string): Promise<ProjectResponseDto> {
    const project = await ProjectRepository.findProjectById(id, userId);
    if (!project) {
      throw new AppError("Project not found", HttpStatus.NOT_FOUND);
    }
    return this.mapProjectToDto(project);
  }

  static async getProjects(filter: ProjectQueryFilter) {
    const result = await ProjectRepository.findProjects(filter);
    return {
      data: result.data.map((p) => this.mapProjectToDto(p)),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      },
    };
  }

  static async updateProject(id: string, userId: string, input: UpdateProjectInput): Promise<ProjectResponseDto> {
    const existing = await ProjectRepository.findProjectById(id, userId);
    if (!existing) {
      throw new AppError("Project not found", HttpStatus.NOT_FOUND);
    }

    if (input.clientId) {
      const client = await ClientRepository.findClientById(input.clientId, userId);
      if (!client) {
        throw new AppError("Associated client not found", HttpStatus.BAD_REQUEST);
      }
    }

    const updated = await ProjectRepository.updateProject(id, userId, input);
    return this.mapProjectToDto(updated);
  }

  static async deleteProject(id: string, userId: string): Promise<void> {
    const existing = await ProjectRepository.findProjectById(id, userId);
    if (!existing) {
      throw new AppError("Project not found", HttpStatus.NOT_FOUND);
    }

    await ProjectRepository.softDeleteProject(id, userId);
  }

  private static mapProjectToDto(project: Project & { client?: any }): ProjectResponseDto {
    return {
      id: project.id,
      userId: project.userId,
      clientId: project.clientId,
      clientName: project.client?.name || undefined,
      name: project.name,
      description: project.description,
      budget: project.budget,
      startDate: project.startDate,
      deadline: project.deadline,
      status: project.status as ProjectStatusEnum,
      priority: project.priority as ProjectPriorityEnum,
      progress: project.progress,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
