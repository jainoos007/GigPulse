import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setCredentials, logout as logoutAction, setUser, setLoading } from "../../../store/slices/auth.slice";
import { AuthService } from "../services/auth.service";
import { LoginSchemaType } from "../schemas/login.schema";
import { RegisterSchemaType } from "../schemas/register.schema";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginSchemaType) => {
    try {
      setError(null);
      const res = await AuthService.login(data);
      dispatch(setCredentials({ user: res.user, accessToken: res.accessToken }));
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      throw err;
    }
  };

  const register = async (data: RegisterSchemaType) => {
    try {
      setError(null);
      const res = await AuthService.register(data);
      dispatch(setCredentials({ user: res.user, accessToken: res.accessToken }));
      router.push("/dashboard");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      dispatch(logoutAction());
      router.push("/login");
    }
  };

  const fetchCurrentUser = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const currentUser = await AuthService.getCurrentUser();
      dispatch(setUser(currentUser));
    } catch (err) {
      dispatch(logoutAction());
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchCurrentUser,
  };
};
