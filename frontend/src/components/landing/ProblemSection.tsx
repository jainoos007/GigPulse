"use client";

import { XCircle, CheckCircle, AlertTriangle, Sparkles } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      title: "Scattered Spreadsheets & Notes",
      bad: "Client contacts buried in Google Sheets, Slack messages, and email threads.",
      good: "Single 360° client portal containing project history, contracts, and notes.",
    },
    {
      title: "Forgotten Lead Follow-Ups",
      bad: "Inquiries slip through the cracks due to zero tracking or reminders.",
      good: "Kanban pipeline with automated follow-up alerts and deal stage tracking.",
    },
    {
      title: "Manual Invoice Friction",
      bad: "Spending hours creating manual PDFs and manually chasing late payments.",
      good: "1-click professional PDF invoice generation with integrated payment status.",
    },
    {
      title: "Unpredictable Revenue",
      bad: "No visibility into billable hours, profit margins, or upcoming payments.",
      good: "Real-time financial analytics dashboard with revenue forecasting.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" /> Stop Losing Time & Money
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Freelancing Shouldn't Feel Like Endless Admin Chaos
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional tools force you to switch between 5 different apps just to manage a single client. GigPulse brings total clarity back to your work.
          </p>
        </div>

        {/* Comparative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-6 hover:border-slate-700 transition-all duration-300 backdrop-blur-md"
            >
              <h3 className="text-xl font-bold text-white flex items-center justify-between">
                <span>{item.title}</span>
                <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
              </h3>

              <div className="space-y-4 pt-2">
                {/* The Old/Bad Way */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/5 border border-rose-500/15">
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Without GigPulse</span>
                    <p className="text-sm text-slate-300">{item.bad}</p>
                  </div>
                </div>

                {/* The GigPulse Way */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> With GigPulse
                    </span>
                    <p className="text-sm text-slate-200">{item.good}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
