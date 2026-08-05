"use client";

import React, { useEffect } from "react";
import { MeetingList } from "@/features/meetings/components/MeetingList";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import { LogOut, ArrowLeft } from "lucide-react";

export default function MeetingsPage() {
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
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
              FF
            </div>
            <span className="font-bold text-xl tracking-tight">FreelanceFlow</span>
          </div>
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-8">
        <MeetingList />
      </main>
    </div>
  );
}
