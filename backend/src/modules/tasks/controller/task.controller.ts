import { Request, Response, NextFunction } from "express";
import { TaskService } from "../service/task.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";
import { TaskStatusEnum } from "../../../shared/enums/task-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export class TaskController {
  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const task = await TaskService.createTask(userId, req.body);
      return ApiResponseUtil.success(res, "Task created successfully", task, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, status, priority, projectId } = req.query;

      const result = await TaskService.getTasks({
        userId,
        projectId: projectId as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        status: status as TaskStatusEnum,
        priority: priority as ProjectPriorityEnum,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Tasks retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getKanbanBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { projectId } = req.query;

      const board = await TaskService.getKanbanBoard(userId, projectId as string);
      return ApiResponseUtil.success(res, "Kanban board tasks retrieved", board);
    } catch (error) {
      next(error);
    }
  }

  static async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const task = await TaskService.getTaskById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Task details retrieved", task);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await TaskService.updateTask(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Task updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await TaskService.deleteTask(req.params.id, userId);
      return ApiResponseUtil.success(res, "Task deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
