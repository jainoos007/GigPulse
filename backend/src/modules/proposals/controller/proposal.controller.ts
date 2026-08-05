import { Request, Response, NextFunction } from "express";
import { ProposalService } from "../service/proposal.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";
import { ProposalStatusEnum } from "../../../shared/enums/proposal-status.enum";

export class ProposalController {
  static async createProposal(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const proposal = await ProposalService.createProposal(userId, req.body);
      return ApiResponseUtil.success(res, "Proposal created successfully", proposal, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getProposals(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, status, clientId } = req.query;

      const result = await ProposalService.getProposals({
        userId,
        clientId: clientId as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        status: status as ProposalStatusEnum,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Proposals retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProposalById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const proposal = await ProposalService.getProposalById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Proposal details retrieved", proposal);
    } catch (error) {
      next(error);
    }
  }

  static async updateProposal(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await ProposalService.updateProposal(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Proposal updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async convertProposal(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const result = await ProposalService.convertProposalToProject(req.params.id, userId);
      return ApiResponseUtil.success(res, "Proposal converted to Project successfully", result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProposal(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await ProposalService.deleteProposal(req.params.id, userId);
      return ApiResponseUtil.success(res, "Proposal deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
