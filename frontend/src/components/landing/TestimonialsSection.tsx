"use client";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Senior UI/UX Designer",
      handle: "@marcusdesign",
      avatar: "MV",
      quote:
        "FreelanceFlow completely transformed how I manage my design studio. I used to lose 5-6 hours a week toggling between Notion and Excel. Now everything from lead intake to PDF invoicing happens in one sleek app.",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "Full-Stack Engineer & Consultant",
      handle: "@sophiacodes",
      avatar: "SM",
      quote:
        "The financial forecasting and automated invoice status alone paid for the app in week one. My clients love the professional invoices, and I haven’t had a late payment since switching.",
      rating: 5,
    },
    {
      name: "Alex Rivera",
      role: "Creative Director, Rivera Media",
      handle: "@arivera",
      avatar: "AR",
      quote:
        "As an independent consultant running a 3-person creative team, keeping track of client contracts and project tasks was chaos. FreelanceFlow brought total clarity.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
            Loved By Freelancers
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Hear From Independent Creators Winning with FreelanceFlow
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Join thousands of designers, developers, writers, and agency owners who trust FreelanceFlow daily.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-6 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">"{t.quote}"</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <Avatar className="w-10 h-10 border border-blue-500/30">
                  <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                    {t.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-slate-400">
                    {t.role} <span className="text-slate-500 font-mono text-[10px]">{t.handle}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
