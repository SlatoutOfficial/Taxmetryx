"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  BookOpen,
  Inbox,
  Briefcase,
  Settings,
  Type,
  LogOut,
  ExternalLink,
  Database,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Dashboard Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
  { title: "Typography & Fonts", href: "/admin/theme", icon: <Type className="w-4 h-4" /> },
  { title: "Practices & Services", href: "/admin/services", icon: <Layers className="w-4 h-4" /> },
  { title: "Publications & Insights", href: "/admin/insights", icon: <BookOpen className="w-4 h-4" /> },
  { title: "Client Inquiries", href: "/admin/inquiries", icon: <Inbox className="w-4 h-4" /> },
  { title: "Careers & Recruitment", href: "/admin/careers", icon: <Briefcase className="w-4 h-4" /> },
  { title: "Firm Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ isOnline: boolean; checking: boolean }>({
    isOnline: false,
    checking: true,
  });

  // Skip admin layout styling on /admin/login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  useEffect(() => {
    fetch("/api/admin/seed")
      .then((res) => res.json())
      .then((data) => {
        setDbStatus({ isOnline: Boolean(data?.data?.isOnline), checking: false });
      })
      .catch(() => setDbStatus({ isOnline: false, checking: false }));
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#061016] text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-[#061016]/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/70 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="inline-flex items-baseline gap-1.5">
            <span className="font-editorial text-2xl tracking-tight text-white">
              Taxmetryx
            </span>
            <span className="text-brand-red font-mono text-xs font-bold uppercase tracking-widest pl-1">
              CMS
            </span>
          </Link>
        </div>

        {/* Status Badges & Quick Links */}
        <div className="flex items-center space-x-5 text-xs">
          {/* DB Indicator */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-2 px-3 py-1.5 border",
              dbStatus.isOnline
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-300"
            )}
            title={dbStatus.isOnline ? "MySQL 3306 Connected" : "Operating in Resilient JSON Cache Mode"}
          >
            <Database className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">
              {dbStatus.checking
                ? "Checking DB..."
                : dbStatus.isOnline
                  ? "MySQL: Online"
                  : "MySQL: Fallback Mode"}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-red" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/70 hover:text-brand-red transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside
          className={cn(
            "fixed inset-y-16 left-0 z-20 w-64 bg-[#08151D] border-r border-white/10 flex flex-col justify-between p-6 transition-transform duration-200 lg:static lg:translate-x-0",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
              EXECUTIVE MANAGEMENT
            </div>

            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-all",
                      isActive
                        ? "bg-brand-red text-white font-semibold"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Info Card */}
          <div className="p-4 border border-white/10 bg-white/5 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-brand-red">
              Current Session
            </div>
            <div className="text-xs font-semibold text-white truncate">
              Senior Managing Partner
            </div>
            <div className="text-[11px] text-white/50 truncate">
              admin@taxmetryx.com
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#0B1A24]">
          <div className="max-w-6xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
