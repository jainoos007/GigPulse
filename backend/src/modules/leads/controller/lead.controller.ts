import { Request, Response, NextFunction } from "express";
import { LeadService } from "../service/lead.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";
import { LeadStatusEnum } from "../../../shared/enums/lead-status.enum";

export class LeadController {
  static async createLead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const lead = await LeadService.createLead(userId, req.body);
      return ApiResponseUtil.success(res, "Lead created successfully", lead, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getLeads(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, status, source } = req.query;

      const result = await LeadService.getLeads({
        userId,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        status: status as LeadStatusEnum,
        source: source as string,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Leads retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getLeadById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const lead = await LeadService.getLeadById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Lead details retrieved", lead);
    } catch (error) {
      next(error);
    }
  }

  static async updateLead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await LeadService.updateLead(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Lead updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async convertLead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await LeadService.convertLeadToClient(req.params.id, userId);
      return ApiResponseUtil.success(res, "Lead converted to client successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteLead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await LeadService.deleteLead(req.params.id, userId);
      return ApiResponseUtil.success(res, "Lead deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
