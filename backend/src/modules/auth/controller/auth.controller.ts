import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service";
import { ApiResponseUtil } from "../../../shared/utils/api-response.util";
import { Messages } from "../../../shared/constants/messages";
import { HttpStatus } from "../../../shared/constants/http-status";
import { cookieOptions, REFRESH_TOKEN_COOKIE_NAME } from "../../../shared/constants/cookie";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.register(req.body);
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, result.tokens.refreshToken, cookieOptions);

      return ApiResponseUtil.success(
        res,
        Messages.AUTH.REGISTER_SUCCESS,
        {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
        HttpStatus.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await AuthService.login(req.body);
      res.cookie(REFRESH_TOKEN_COOKIE_NAME, result.tokens.refreshToken, cookieOptions);

      return ApiResponseUtil.success(
        res,
        Messages.AUTH.LOGIN_SUCCESS,
        {
          user: result.user,
          accessToken: result.tokens.accessToken,
        },
        HttpStatus.OK
      );
    } catch (error) {
      next(error);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME] || req.body?.refreshToken;
      const accessToken = await AuthService.refreshAccessToken(refreshToken);

      return ApiResponseUtil.success(res, Messages.AUTH.REFRESH_SUCCESS, { accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.[REFRESH_TOKEN_COOKIE_NAME] || req.body?.refreshToken;
      await AuthService.logout(refreshToken);

      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME, cookieOptions);
      return ApiResponseUtil.success(res, Messages.AUTH.LOGOUT_SUCCESS);
    } catch (error) {
      next(error);
    }
  }

  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const user = await AuthService.getCurrentUser(userId);

      return ApiResponseUtil.success(res, "Current user profile fetched", { user });
    } catch (error) {
      next(error);
    }
  }
}
