import { Request, Response, NextFunction } from "express";
import { RoleEnum } from "../shared/enums/role.enum";
import { AppError } from "../shared/errors/app-error";
import { HttpStatus } from "../shared/constants/http-status";
import { Messages } from "../shared/constants/messages";

export const rbacMiddleware = (allowedRoles: RoleEnum[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(Messages.AUTH.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError(Messages.AUTH.FORBIDDEN, HttpStatus.FORBIDDEN);
    }

    next();
  };
};
