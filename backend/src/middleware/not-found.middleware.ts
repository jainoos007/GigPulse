import { Request, Response } from "express";
import { HttpStatus } from "../shared/constants/http-status";
import { Messages } from "../shared/constants/messages";

export const notFoundMiddleware = (req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `${Messages.COMMON.NOT_FOUND} - [${req.method}] ${req.originalUrl}`,
  });
};
