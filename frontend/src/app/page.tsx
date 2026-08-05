import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-600/30">
            FF
          </div>
          <span className="font-bold text-xl tracking-tight">FreelanceFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-600/25 transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16 max-w-5xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Production-Grade Modular Monolith CRM
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-3xl leading-tight">
          Streamline Your Freelance Business with <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Precision</span>
        </h1>

        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Manage clients, projects, tasks, invoices, meetings, and revenue analytics in one unified platform built with modern TypeScript architecture.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2 text-sm"
          >
            Start Free Account <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium rounded-xl border border-slate-800 transition-all text-sm"
          >
            Sign In
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left w-full">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">JWT Security Core</h3>
            <p className="text-sm text-slate-400">
              Short-lived access tokens, httpOnly refresh token cookies, and role-based access control (RBAC).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Modular Monolith</h3>
            <p className="text-sm text-slate-400">
              Clean separation of controllers, services, repositories, validators, and database schemas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Next.js & Redux Toolkit</h3>
            <p className="text-sm text-slate-400">
              Feature-driven frontend state management, Zod form validation, and reactive UI experience.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        © 2026 FreelanceFlow CRM. All rights reserved.
      </footer>
    </div>
  );
}
