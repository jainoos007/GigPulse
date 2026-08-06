"use client";

import Link from "next/link";
import { Github, FileText, Mail, ShieldCheck } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-blue-500/20">
                FF
              </div>
              <span className="font-bold text-lg text-white tracking-tight">FreelanceFlow</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A modern full-stack CRM built for freelancers to manage clients, projects, tasks, invoices, and meetings in one place.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Full-Stack Portfolio Showcase</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Project Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">About Project</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#showcase" className="hover:text-white transition-colors">Screen Showcase</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Workflow</a></li>
              <li><a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Architecture</a></li>
            </ul>
          </div>

          {/* Key Resources (GitHub, Documentation, Contact, License) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> GitHub Repository
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Documentation
                </a>
              </li>
              <li>
                <a href="mailto:contact@freelanceflow.dev" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Contact Developer
                </a>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> MIT License
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FreelanceFlow Portfolio Project. Built with Next.js, Express, & Prisma.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="mailto:contact@freelanceflow.dev" className="hover:text-slate-300 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
