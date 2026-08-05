import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/app-error";
import { HttpStatus } from "../shared/constants/http-status";
import { Messages } from "../shared/constants/messages";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error("Unhandled Error:", err);

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: Messages.COMMON.SERVER_ERROR,
    errors: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
