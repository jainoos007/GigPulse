import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur fixed top-0 w-full z-50 px-6 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-blue-600/30">
            FF
          </div>
          <span className="font-bold text-xl tracking-tight">FreelanceFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="text-slate-300 hover:text-white">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="font-semibold shadow-md shadow-blue-600/25">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-16 max-w-5xl mx-auto space-y-8">
        <Badge variant="default" className="gap-2 px-3.5 py-1 text-xs uppercase tracking-wider font-semibold">
          <Sparkles className="w-4 h-4" /> Production-Grade Modular Monolith CRM
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 max-w-3xl leading-tight">
          Streamline Your Freelance Business with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Precision
          </span>
        </h1>

        <p className="text-slate-400 text-base sm:text-xl max-w-2xl leading-relaxed">
          Manage clients, projects, tasks, invoices, meetings, and revenue analytics in one unified platform built with modern TypeScript architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" asChild className="h-12 px-8 font-semibold text-base gap-2 shadow-xl shadow-blue-600/25">
            <Link href="/register">
              Start Free Account <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 px-8 font-semibold text-base">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left w-full">
          <Card className="bg-slate-900/60 border-slate-800 space-y-2">
            <CardHeader className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold">JWT Security Core</CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Short-lived access tokens, httpOnly refresh token cookies, and role-based access control (RBAC).
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 space-y-2">
            <CardHeader className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold">Modular Monolith</CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Clean separation of controllers, services, repositories, validators, and database schemas.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 space-y-2">
            <CardHeader className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg font-bold">Next.js & Redux Toolkit</CardTitle>
              <CardDescription className="text-slate-400 text-xs leading-relaxed">
                Feature-driven frontend state management, Zod form validation, and reactive UI experience.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © 2026 FreelanceFlow CRM. All rights reserved.
      </footer>
    </div>
  );
}
