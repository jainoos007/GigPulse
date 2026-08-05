import { RoleEnum } from "../../../shared/enums/role.enum.js";

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  avatarUrl: string | null;
  role: RoleEnum;
  createdAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResult {
  user: UserResponseDto;
  tokens: AuthTokens;
}
