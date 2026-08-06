import { LoginForm } from "@/features/auth/components/LoginForm";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LoginPage() {
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
