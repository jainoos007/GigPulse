"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Starter",
      desc: "Perfect for new freelancers organizing their first clients.",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever free",
      popular: false,
      features: [
        "Up to 5 Active Clients",
        "Basic Kanban Task Board",
        "Lead Pipeline Tracker",
        "Manual PDF Invoices",
        "Community Support",
      ],
      cta: "Get Started Free",
      href: "/register",
    },
    {
      name: "Pro",
      desc: "For full-time independent professionals and solo consultants.",
      priceMonthly: "$24",
      priceAnnual: "$19",
      period: "per month, billed annually",
      popular: true,
      features: [
        "Unlimited Clients & Projects",
        "Advanced Analytics & Revenue Forecasting",
        "Unlimited Custom PDF Invoices",
        "Meeting Scheduler & Sync",
        "Client Asset & Contract Storage",
        "Priority Email & Chat Support",
      ],
      cta: "Start 14-Day Free Trial",
      href: "/register",
    },
    {
      name: "Business",
      desc: "For boutique agency owners and small creative teams.",
      priceMonthly: "$59",
      priceAnnual: "$49",
      period: "per month, billed annually",
      popular: false,
      features: [
        "Everything in Pro",
        "Multi-user Team Collaboration",
        "Custom Branding on Invoices",
        "Client Portal Access",
        "Dedicated Account Manager",
        "Custom API & Webhook Integrations",
      ],
      cta: "Contact Sales / Start Trial",
      href: "/register",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative border-t border-slate-800/80" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 px-3 py-1 text-xs">
            Simple & Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Invest in Your Freelance Superpower
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            No hidden fees. Upgrade, downgrade, or cancel at any time.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-white" : "text-slate-400"}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
              className="relative w-14 h-7 rounded-full bg-slate-800 p-1 transition-colors border border-slate-700"
            >
              <div
                className={`w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-transform ${
                  billingCycle === "annual" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === "annual" ? "text-white" : "text-slate-400"}`}>
              Annual Billing
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === "annual" ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "bg-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 md:-translate-y-2"
                    : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.desc}</p>
                  </div>

                  <div className="border-y border-slate-800 py-4 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white font-mono">{price}</span>
                      {price !== "$0" && <span className="text-xs text-slate-400">/ mo</span>}
                    </div>
                    <p className="text-[11px] text-slate-400">{plan.period}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">What's included:</span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Button
                    asChild
                    className={`w-full h-11 text-sm font-semibold rounded-xl ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    <Link href={plan.href} className="flex items-center justify-center gap-2">
                      {plan.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
