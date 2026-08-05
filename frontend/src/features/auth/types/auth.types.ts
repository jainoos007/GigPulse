export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  avatarUrl: string | null;
  role: "FREELANCER" | "ASSISTANT";
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
