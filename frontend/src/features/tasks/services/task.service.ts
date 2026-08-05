import { apiClient } from "../../../lib/axios";
import { TaskSchemaType } from "../schemas/task.schema";
import { Task, KanbanBoard } from "../types/task.types";

export class TaskService {
  static async getKanbanBoard(projectId?: string): Promise<KanbanBoard> {
    const response = await apiClient.get("/tasks/kanban", { params: { projectId } });
    return response.data.data;
  }

  static async createTask(data: TaskSchemaType): Promise<Task> {
    const response = await apiClient.post("/tasks", data);
    return response.data.data;
  }

  static async updateTask(id: string, data: Partial<TaskSchemaType>): Promise<Task> {
    const response = await apiClient.patch(`/tasks/${id}`, data);
    return response.data.data;
  }

  static async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/tasks/${id}`);
  }
}
