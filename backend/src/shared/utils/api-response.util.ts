import { Response } from "express";
import { HttpStatus } from "../constants/http-status.js";
import { ApiResponse } from "../types/api.js";

export class ApiResponseUtil {
  static success<T>(res: Response, message: string, data?: T, statusCode: number = HttpStatus.OK) {
    const payload: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(payload);
  }

  static error(res: Response, message: string, errors?: any, statusCode: number = HttpStatus.BAD_REQUEST) {
    const payload: ApiResponse = {
      success: false,
      message,
      errors,
    };
    return res.status(statusCode).json(payload);
  }
}
