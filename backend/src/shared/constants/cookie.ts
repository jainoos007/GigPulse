import { CookieOptions } from "express";
import { config } from "../../config/environment";

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === "production",
  sameSite: config.nodeEnv === "production" ? "strict" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};
