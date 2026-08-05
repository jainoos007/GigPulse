import { User, RefreshToken } from "@prisma/client";
import { RoleEnum } from "../../../shared/enums/role.enum";

export interface CreateUserData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  role?: RoleEnum;
}

export interface SaveRefreshTokenData {
  userId: string;
  token: string;
  expiresAt: Date;
}
