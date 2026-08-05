import { AuthRepository } from "../repository/auth.repository";
import { RegisterInput } from "../validators/register.validator";
import { LoginInput } from "../validators/login.validator";
import { AuthResult, UserResponseDto } from "../types/auth.types";
import { PasswordUtil } from "../../../shared/utils/password.util";
import { JwtService } from "../../../shared/services/jwt.service";
import { AppError } from "../../../shared/errors/app-error";
import { HttpStatus } from "../../../shared/constants/http-status";
import { Messages } from "../../../shared/constants/messages";
import { RoleEnum } from "../../../shared/enums/role.enum";
import { User } from "@prisma/client";

export class AuthService {
  static async register(input: RegisterInput): Promise<AuthResult> {
    const existingUser = await AuthRepository.findUserByEmail(input.email);
    if (existingUser) {
      throw new AppError(Messages.AUTH.EMAIL_EXISTS, HttpStatus.CONFLICT);
    }

    const passwordHash = await PasswordUtil.hash(input.password);

    const user = await AuthRepository.createUser({
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      companyName: input.companyName,
    });

    const tokens = await this.generateUserTokens(user);

    return {
      user: this.mapUserToDto(user),
      tokens,
    };
  }

  static async login(input: LoginInput): Promise<AuthResult> {
    const user = await AuthRepository.findUserByEmail(input.email);
    if (!user) {
      throw new AppError(Messages.AUTH.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await PasswordUtil.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError(Messages.AUTH.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    if (!user.isActive) {
      throw new AppError("Account is disabled", HttpStatus.FORBIDDEN);
    }

    const tokens = await this.generateUserTokens(user);

    return {
      user: this.mapUserToDto(user),
      tokens,
    };
  }

  static async refreshAccessToken(refreshTokenStr: string): Promise<string> {
    if (!refreshTokenStr) {
      throw new AppError("Refresh token missing", HttpStatus.UNAUTHORIZED);
    }

    const storedToken = await AuthRepository.findRefreshToken(refreshTokenStr);
    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      throw new AppError(Messages.AUTH.TOKEN_EXPIRED, HttpStatus.UNAUTHORIZED);
    }

    try {
      JwtService.verifyRefreshToken(refreshTokenStr);
    } catch {
      throw new AppError(Messages.AUTH.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);
    }

    const user = storedToken.user;
    return JwtService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role as RoleEnum,
    });
  }

  static async logout(refreshTokenStr: string): Promise<void> {
    if (refreshTokenStr) {
      const storedToken = await AuthRepository.findRefreshToken(refreshTokenStr);
      if (storedToken) {
        await AuthRepository.revokeRefreshToken(refreshTokenStr);
      }
    }
  }

  static async getCurrentUser(userId: string): Promise<UserResponseDto> {
    const user = await AuthRepository.findUserById(userId);
    if (!user) {
      throw new AppError(Messages.AUTH.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return this.mapUserToDto(user);
  }

  private static async generateUserTokens(user: User) {
    const accessToken = JwtService.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role as RoleEnum,
    });

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const refreshToken = JwtService.generateRefreshToken({
      userId: user.id,
      tokenId: user.id + "_" + Date.now(),
    });

    await AuthRepository.saveRefreshToken({
      userId: user.id,
      token: refreshToken,
      expiresAt,
    });

    return { accessToken, refreshToken };
  }

  private static mapUserToDto(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      avatarUrl: user.avatarUrl,
      role: user.role as RoleEnum,
      createdAt: user.createdAt,
    };
  }
}
