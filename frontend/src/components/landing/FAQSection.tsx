"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      q: "Is GigPulse really free to start?",
      a: "Yes! Our Starter plan is 100% free forever with no credit card required. You get up to 5 active client profiles, pipeline tracking, and manual invoice generation out of the box.",
    },
    {
      q: "Can I upload contracts and project briefs?",
      a: "Absolutely. Pro and Business users can attach signed contracts, design briefs, PDFs, and client asset links directly inside the 360° client record.",
    },
    {
      q: "How does invoice generation work?",
      a: "GigPulse enables you to generate professional PDF invoices with custom line items, tax rates, payment terms, and notes in 1-click. You can track payment status right from your financial dashboard.",
    },
    {
      q: "Is my client data safe and encrypted?",
      a: "Security is our core foundation. GigPulse uses industry-standard JWT authentication, httpOnly secure cookie sessions, and encrypted database backups to ensure your business data is 100% protected.",
    },
    {
      q: "Can I manage retainer clients and recurring projects?",
      a: "Yes. You can mark client profiles as active retainers, assign recurring project deliverables, and schedule monthly billing cycles without losing context.",
    },
    {
      q: "Can I export my financial reports for tax season?",
      a: "Yes. You can export complete CSV/JSON financial summaries, billable hours breakdown, and invoice histories with a single click anytime.",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative border-t border-slate-800/80" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Everything you need to know about setting up and running your business on GigPulse.
          </p>
        </div>

        {/* Accordion Component */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-slate-800/80">
                <AccordionTrigger className="text-base font-semibold text-white hover:text-blue-400 transition-colors text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-slate-400 leading-relaxed pt-2">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
