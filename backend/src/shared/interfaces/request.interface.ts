import { Request } from "express";
import { JwtPayload } from "./jwt.interface";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}
