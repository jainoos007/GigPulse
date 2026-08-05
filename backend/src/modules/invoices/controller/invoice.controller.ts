import { Request, Response, NextFunction } from "express";
import { InvoiceService } from "../service/invoice.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";
import { InvoiceStatusEnum } from "../../../shared/enums/invoice-status.enum";

export class InvoiceController {
  static async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const invoice = await InvoiceService.createInvoice(userId, req.body);
      return ApiResponseUtil.success(res, "Invoice created successfully", invoice, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, status, clientId, projectId } = req.query;

      const result = await InvoiceService.getInvoices({
        userId,
        clientId: clientId as string,
        projectId: projectId as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        status: status as InvoiceStatusEnum,
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Invoices retrieved successfully",
        data: result.data,
        meta: result.meta,
        metrics: result.metrics,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInvoiceById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const invoice = await InvoiceService.getInvoiceById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Invoice details retrieved", invoice);
    } catch (error) {
      next(error);
    }
  }

  static async updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await InvoiceService.updateInvoice(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Invoice updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async recordPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await InvoiceService.recordPayment(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Payment recorded successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await InvoiceService.deleteInvoice(req.params.id, userId);
      return ApiResponseUtil.success(res, "Invoice deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
