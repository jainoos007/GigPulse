import { apiClient } from "../../../lib/axios";
import { ProjectSchemaType } from "../schemas/project.schema";
import { Project, ProjectMeta } from "../types/project.types";

export class ProjectService {
  static async getProjects(params?: { search?: string; status?: string; priority?: string; clientId?: string; page?: number; limit?: number }) {
    const response = await apiClient.get("/projects", { params });
    return response.data as { success: boolean; data: Project[]; meta: ProjectMeta };
  }

  static async getProjectById(id: string): Promise<Project> {
    const response = await apiClient.get(`/projects/${id}`);
    return response.data.data;
  }

  static async createProject(data: ProjectSchemaType): Promise<Project> {
    const response = await apiClient.post("/projects", data);
    return response.data.data;
  }

  static async updateProject(id: string, data: Partial<ProjectSchemaType>): Promise<Project> {
    const response = await apiClient.patch(`/projects/${id}`, data);
    return response.data.data;
  }

  static async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`);
  }
}
