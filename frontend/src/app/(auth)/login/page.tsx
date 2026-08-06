"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginPage() {
  const { user, isLoading, fetchCurrentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only verify session if there's a stored token (isLoading === true means token exists).
    // After logout, isLoading is false and there's nothing to verify.
    if (isLoading) {
      fetchCurrentUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading || user) {
    return (
      <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center p-2 shadow-md shadow-blue-500/10">
          <Logo className="w-full h-full animate-pulse" />
        </div>
        <Skeleton className="h-4 w-32 rounded-full" />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-purple-500/10 dark:from-blue-600/20 dark:via-indigo-600/15 dark:to-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Floating Theme Toggle in Top-Right Corner */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Center Auth Card */}
      <div className="z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
