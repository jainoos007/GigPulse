import prisma from "../../../database/prisma";
import { User, RefreshToken } from "@prisma/client";
import { CreateUserData, SaveRefreshTokenData } from "../interfaces/auth.interface";

export class AuthRepository {
  static async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async createUser(data: CreateUserData): Promise<User> {
    return prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        role: data.role || "FREELANCER",
      },
    });
  }

  static async saveRefreshToken(data: SaveRefreshTokenData): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        userId: data.userId,
        token: data.token,
        expiresAt: data.expiresAt,
      },
    });
  }

  static async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  static async revokeRefreshToken(token: string): Promise<RefreshToken> {
    return prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }

  static async revokeAllUserTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }
}
