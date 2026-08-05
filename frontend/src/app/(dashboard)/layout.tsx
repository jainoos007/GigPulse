"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Target,
  Briefcase,
  CheckSquare,
  Calendar,
  FileText,
  FileCode,
  LogOut,
  Bell,
  Search,
  Menu,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Clients", href: "/clients", icon: Users },
  { title: "Leads", href: "/leads", icon: Target },
  { title: "Projects", href: "/projects", icon: Briefcase },
  { title: "Tasks", href: "/tasks", icon: CheckSquare },
  { title: "Meetings", href: "/meetings", icon: Calendar },
  { title: "Invoices", href: "/invoices", icon: FileText },
  { title: "Proposals", href: "/proposals", icon: FileCode },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, fetchCurrentUser, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  // Handle unauthorized state redirect
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 animate-pulse flex items-center justify-center font-bold text-xl text-white">
          FF
        </div>
        <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 text-sm">
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const userInitials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : "FF";

  const getBreadcrumbTitle = () => {
    const active = navItems.find((item) => item.href === pathname);
    return active ? active.title : "Workspace";
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="space-y-1 px-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-900"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 dark:text-slate-400"}`} />
            <span className="flex-1">{item.title}</span>
            {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors duration-200">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur shrink-0 fixed inset-y-0 z-40 transition-colors">
        <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-base text-white shadow-md shadow-blue-600/30">
              FF
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                FreelanceFlow
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-1">
                CRM Dashboard
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          <div>
            <p className="px-6 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Main Menu
            </p>
            <NavLinks />
          </div>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/40">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Avatar className="w-9 h-9">
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur px-4 sm:px-8 flex items-center justify-between transition-colors">
          <div className="flex items-center gap-4">
            {/* Mobile Sheet Trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                  <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-base text-white">
                      FF
                    </div>
                    <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">FreelanceFlow</span>
                  </Link>
                </div>
                <div className="py-6">
                  <NavLinks onClick={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            {/* Breadcrumb Navigation */}
            <Breadcrumb className="hidden sm:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">CRM</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-slate-900 dark:text-slate-100 font-semibold">{getBreadcrumbTitle()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher Toggle */}
            <ThemeToggle />

            {/* Notification Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Notifications</h4>
                  <Badge variant="default" className="text-[10px]">New</Badge>
                </div>
                <div className="py-3 space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-200">System Ready</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">All CRM modules active and synchronized.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 space-y-1">
                    <p className="font-semibold text-slate-900 dark:text-slate-200">Welcome {user.firstName}!</p>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">Manage clients, projects, tasks, and invoices seamlessly.</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* User Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative gap-2 px-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-900">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 leading-none">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-none mt-1">
                      {user.role}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 shadow-xl">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.firstName} {user.lastName}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                <DropdownMenuItem className="gap-2 text-xs">
                  <UserIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Company: {user.companyName || "Independent"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Role: {user.role}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-800" />
                <DropdownMenuItem
                  onClick={logout}
                  className="gap-2 text-xs text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
