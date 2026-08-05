import { Request, Response, NextFunction } from "express";
import { AppError } from "../shared/errors/app-error";
import { HttpStatus } from "../shared/constants/http-status";
import { Messages } from "../shared/constants/messages";
import { JwtService } from "../shared/services/jwt.service";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(Messages.AUTH.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = JwtService.verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    throw new AppError(Messages.AUTH.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);
  }
};
