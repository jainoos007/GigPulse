import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  avatarUrl: string | null;
  role: "FREELANCER" | "ASSISTANT";
}

interface AuthState {
  user: UserState | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  // If a token is present in localStorage, treat user as likely authenticated
  // until fetchCurrentUser confirms or denies it. This prevents the login flash.
  isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem("accessToken") : false,
  isLoading: typeof window !== "undefined" ? !!localStorage.getItem("accessToken") : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserState; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
