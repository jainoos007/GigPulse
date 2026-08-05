import { HttpStatus } from "../constants/http-status";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: any;

  constructor(message: string, statusCode: number = HttpStatus.BAD_REQUEST, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
