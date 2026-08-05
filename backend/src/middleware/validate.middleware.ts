import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { AppError } from "../shared/errors/app-error";
import { HttpStatus } from "../shared/constants/http-status";
import { Messages } from "../shared/constants/messages";

export const validateMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          field: err.path.join(".").replace(/^body\.|^query\.|^params\./, ""),
          message: err.message,
        }));
        next(new AppError(Messages.COMMON.VALIDATION_ERROR, HttpStatus.UNPROCESSABLE_ENTITY, formattedErrors));
      } else {
        next(error);
      }
    }
  };
};
