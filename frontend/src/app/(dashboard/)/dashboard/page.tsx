"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LogOut, User, Building, Shield, LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  const { user, logout, fetchCurrentUser, isLoading } = useAuth();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
            FF
          </div>
          <span className="font-bold text-xl tracking-tight">FreelanceFlow</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-400 mt-1">Welcome back, {user?.firstName}! Here is your current account status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Account Identity</p>
            <h3 className="text-lg font-semibold">{user?.firstName} {user?.lastName}</h3>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Company</p>
            <h3 className="text-lg font-semibold">{user?.companyName || "Independent Freelancer"}</h3>
            <p className="text-sm text-slate-400">Primary Workspace</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Access Role</p>
            <h3 className="text-lg font-semibold">{user?.role}</h3>
            <p className="text-sm text-emerald-400 font-medium">Active & Verified</p>
          </div>
        </div>

        {/* Placeholder Module Banner */}
        <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold">Module 1 (Authentication Core) Active</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            User authentication, JWT token refresh rotation, and Redux state management are operational. Next modules (Clients, Projects, Tasks) ready to connect.
          </p>
        </div>
      </main>
    </div>
  );
}
