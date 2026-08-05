import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../../config/environment";
import { JwtPayload, JwtRefreshPayload } from "../interfaces/jwt.interface";

export class JwtService {
  static generateAccessToken(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: config.jwt.accessExpiresIn as any,
    };
    return jwt.sign(payload, config.jwt.accessSecret, options);
  }

  static generateRefreshToken(payload: JwtRefreshPayload): string {
    const options: SignOptions = {
      expiresIn: config.jwt.refreshExpiresIn as any,
    };
    return jwt.sign(payload, config.jwt.refreshSecret, options);
  }

  static verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, config.jwt.accessSecret) as JwtPayload;
  }

  static verifyRefreshToken(token: string): JwtRefreshPayload {
    return jwt.verify(token, config.jwt.refreshSecret) as JwtRefreshPayload;
  }
}
