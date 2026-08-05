import { RoleEnum } from "../enums/role.enum";

export interface JwtPayload {
  userId: string;
  email: string;
  role: RoleEnum;
}

export interface JwtRefreshPayload {
  userId: string;
  tokenId: string;
}
