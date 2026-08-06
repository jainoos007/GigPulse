"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import { Menu, X, ArrowRight, LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, isLoading, fetchCurrentUser, logout } = useAuth();

  // Ensure hydration is done before rendering auth-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // The landing page doesn't have a layout that calls fetchCurrentUser,
  // so we do it here if a token exists but user hasn't been loaded yet.
  useEffect(() => {
    if (isLoading) {
      fetchCurrentUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Workflow", href: "#workflow" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/10 border border-blue-500/20 dark:border-blue-500/30 flex items-center justify-center p-1.5 transition-transform duration-300 group-hover:scale-105">
              <Logo className="w-full h-full" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              Gig<span className="text-blue-600 dark:text-blue-500">Pulse</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {!mounted ? null : isLoading ? (
              // Show skeleton while auth resolves to prevent layout flash
              <div className="flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            ) : (
              user ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-2 ring-blue-500/30 hover:ring-blue-500 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
                      title={`${user.firstName} ${user.lastName}`}
                    >
                      <Avatar className="h-full w-full border-none">
                        <AvatarFallback className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-xl rounded-xl">
                    <DropdownMenuLabel className="font-normal p-3">
                      <div className="flex flex-col space-y-1">
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user.firstName} {user.lastName}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-none">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                    <DropdownMenuItem asChild className="gap-2 text-xs cursor-pointer py-2 font-medium">
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="gap-2 text-xs text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 focus:bg-red-500/10 cursor-pointer py-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 border border-blue-400/30 transition-all duration-300 rounded-xl"
                  >
                    <Link href="/login" className="flex items-center gap-2">
                      Launch App <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-3">
            {!isLoading && (user ? (
              <Button
                asChild
                className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/25 rounded-xl"
              >
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard className="w-4 h-4 mr-2" /> Go to Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  asChild
                  className="w-full justify-center border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-600/25"
                >
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Launch App
                  </Link>
                </Button>
              </>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
