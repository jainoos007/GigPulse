import { Request, Response, NextFunction } from "express";
import { ProjectService } from "../service/project.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";
import { ProjectStatusEnum } from "../../../shared/enums/project-status.enum";
import { ProjectPriorityEnum } from "../../../shared/enums/project-priority.enum";

export class ProjectController {
  static async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const project = await ProjectService.createProject(userId, req.body);
      return ApiResponseUtil.success(res, "Project created successfully", project, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, status, priority, clientId } = req.query;

      const result = await ProjectService.getProjects({
        userId,
        clientId: clientId as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        status: status as ProjectStatusEnum,
        priority: priority as ProjectPriorityEnum,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Projects retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const project = await ProjectService.getProjectById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Project details retrieved", project);
    } catch (error) {
      next(error);
    }
  }

  static async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await ProjectService.updateProject(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Project updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await ProjectService.deleteProject(req.params.id, userId);
      return ApiResponseUtil.success(res, "Project deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
