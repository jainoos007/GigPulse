"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl shadow-blue-950/50 backdrop-blur-xl relative overflow-hidden group">
          {/* Top border shine */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Start Your 14-Day Free Trial
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Take Full Control of Your Clients, Projects & Revenue Today.
          </h2>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of independent freelancers who run organized, profitable, and stress-free businesses with FreelanceFlow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              size="lg"
              asChild
              className="w-full sm:w-auto h-13 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 border border-blue-400/30 transition-all duration-300 rounded-xl"
            >
              <Link href="/register" className="flex items-center justify-center gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto h-13 px-8 text-base font-semibold border-slate-800 bg-slate-900/60 hover:bg-slate-900 text-slate-200 hover:text-white rounded-xl"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant setup • No credit card required • Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
