"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function LandingFooter() {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Workflow", href: "#workflow" },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 py-10 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 flex items-center justify-center p-1 shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform">
              <Logo className="w-full h-full" />
            </div>
            <span className="font-bold text-base text-slate-900 dark:text-white tracking-tight">GigPulse</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Link */}
          <a
            href="mailto:contact@gigpulse.dev"
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>contact@gigpulse.dev</span>
          </a>
        </div>

        {/* Divider & Copyright */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <p>© {new Date().getFullYear()} GigPulse CRM. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
