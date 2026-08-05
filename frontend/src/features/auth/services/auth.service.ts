import { apiClient } from "../../../lib/axios";
import { LoginSchemaType } from "../schemas/login.schema";
import { RegisterSchemaType } from "../schemas/register.schema";
import { AuthResponse, User } from "../types/auth.types";

export class AuthService {
  static async login(data: LoginSchemaType): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/login", data);
    return response.data.data;
  }

  static async register(data: RegisterSchemaType): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/register", data);
    return response.data.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get("/auth/me");
    return response.data.data.user;
  }
}
