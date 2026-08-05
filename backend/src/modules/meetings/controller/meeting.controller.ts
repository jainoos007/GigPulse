import { Request, Response, NextFunction } from "express";
import { MeetingService } from "../service/meeting.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { HttpStatus } from "../../../shared/constants/http-status";

export class MeetingController {
  static async createMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const meeting = await MeetingService.createMeeting(userId, req.body);
      return ApiResponseUtil.success(res, "Meeting scheduled successfully", meeting, HttpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  }

  static async getMeetings(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const { page, limit, search, clientId, upcomingOnly } = req.query;

      const result = await MeetingService.getMeetings({
        userId,
        clientId: clientId as string,
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        search: search as string,
        upcomingOnly: upcomingOnly === "true",
      });

      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Meetings retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMeetingById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const meeting = await MeetingService.getMeetingById(req.params.id, userId);
      return ApiResponseUtil.success(res, "Meeting details retrieved", meeting);
    } catch (error) {
      next(error);
    }
  }

  static async updateMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const updated = await MeetingService.updateMeeting(req.params.id, userId, req.body);
      return ApiResponseUtil.success(res, "Meeting updated successfully", updated);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMeeting(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      await MeetingService.deleteMeeting(req.params.id, userId);
      return ApiResponseUtil.success(res, "Meeting deleted successfully");
    } catch (error) {
      next(error);
    }
  }
}
