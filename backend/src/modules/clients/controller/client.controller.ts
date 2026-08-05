import { Request, Response, NextFunction } from "express";
import { ClientService } from "../service/client.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";
import { ClientStatusEnum } from "../../../shared/enums/client-status.enum";

export class ClientController {
  static async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const client = await ClientService.createClient(userId, req.body);
      return ApiResponseUtil.success(res, "Client created successfully", client, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getClients(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, status, industry } = req.query;

      const result = await ClientService.getClients({
        userId,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        status: status as ClientStatusEnum,
        industry: industry as string,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Clients retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const client = await ClientService.getClientById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Client details retrieved", client);
    } catch (error) {
      next(error);
    }
  }

  static async updateClient(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await ClientService.updateClient(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Client updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await ClientService.deleteClient(req.params.id, userId);
      return ApiResponseUtil.success(res, "Client deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
