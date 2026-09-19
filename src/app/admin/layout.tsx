"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Type,
  Layers,
  BookOpen,
  Inbox,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  Database,
  Menu,
  X,
  Shield,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavGroup {
  label: string;
  items: {
    title: string;
    description?: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

const navGroups: NavGroup[] = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Website Content",
    items: [
      {
        title: "Services",
        href: "/admin/services",
        icon: <Layers className="w-4 h-4" />,
      },
      {
        title: "Insights",
        href: "/admin/insights",
        icon: <BookOpen className="w-4 h-4" />,
      },
      {
        title: "Careers",
        href: "/admin/careers",
        icon: <Briefcase className="w-4 h-4" />,
      },
      {
        title: "Inquiries",
        href: "/admin/inquiries",
        icon: <Inbox className="w-4 h-4" />,
      },
    ],
  },
  {
    label: "Configuration",
    items: [
      {
        title: "Typography",
        href: "/admin/theme",
        icon: <Type className="w-4 h-4" />,
      },
      {
        title: "Firm Settings",
        href: "/admin/settings",
        icon: <Settings className="w-4 h-4" />,
      },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ isOnline: boolean; checking: boolean }>({
    isOnline: false,
    checking: true,
  });

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    fetch("/api/admin/seed")
      .then((res) => res.json())
      .then((data) => {
        setDbStatus({ isOnline: Boolean(data?.data?.prismaOnline), checking: false });
      })
      .catch(() => setDbStatus({ isOnline: false, checking: false }));
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="h-screen bg-[#071117] text-white flex flex-col font-sans selection:bg-[#eb0045] selection:text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="h-16 shrink-0 bg-[#09141C] border-b border-white/10 px-4 sm:px-8 flex items-center justify-between z-40">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white/70 hover:text-white p-1 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="inline-flex items-baseline gap-2 group">
            <span className="font-serif text-2xl tracking-tight text-white font-bold">
              Taxmetryx
            </span>
            <span className="text-[#eb0045] font-mono text-[10px] font-bold uppercase tracking-[0.2em] px-1.5 py-0.5 bg-[#eb0045]/15 border border-[#eb0045]/30">
              CMS
            </span>
          </Link>
        </div>

        {/* Status Badges & Quick Actions */}
        <div className="flex items-center space-x-4 sm:space-x-5 text-xs">
          {/* DB Indicator */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-2 px-3 py-1.5 border font-mono text-[11px]",
              dbStatus.isOnline
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/30 bg-amber-500/10 text-amber-300"
            )}
            title={dbStatus.isOnline ? "Supabase PostgreSQL Live" : "Fallback Mode"}
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              {dbStatus.checking
                ? "Connecting..."
                : dbStatus.isOnline
                  ? "Supabase: Online"
                  : "Database: Cache"}
            </span>
          </div>

          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors py-1.5 px-3 border border-white/10 hover:border-white/20 bg-white/5"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3 h-3 text-[#eb0045]" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-white/70 hover:text-[#eb0045] transition-colors cursor-pointer py-1.5 px-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout: Fixed Viewport */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Sidebar: Fixed, pinned, independent scrolling, no gap */}
        <aside
          className={cn(
            "w-64 shrink-0 bg-[#050D12] border-r border-white/10 flex flex-col p-4 gap-6 overflow-y-auto scrollbar-thin transition-transform duration-200 z-30",
            "fixed inset-y-16 left-0 lg:static lg:inset-auto lg:h-full",
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="space-y-6">
            {navGroups.map((group) => (
              <div key={group.label} className="space-y-1.5">
                <div className="text-[11px] font-mono font-medium text-white/40 uppercase tracking-wider px-3">
                  {group.label}
                </div>
                <nav className="space-y-0.5">
                  {group.items.map((item) => {
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
                          "flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded-sm transition-all",
                          isActive
                            ? "bg-[#eb0045] text-white font-semibold shadow-xs"
                            : "text-white/75 hover:text-white hover:bg-white/5"
                        )}
                      >
                        <span className={isActive ? "text-white" : "text-white/60"}>
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ))}
          </div>

          {/* User Session Footer (sits neatly below nav without giant empty gap) */}
          <div className="p-3 border border-white/10 bg-[#09151C] rounded-sm space-y-1 mt-2">
            <div className="text-[10px] font-mono text-[#eb0045] font-semibold flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              <span>Signed In As</span>
            </div>
            <div className="text-xs font-semibold text-white truncate">
              Senior Managing Partner
            </div>
            <div className="text-[11px] text-white/50 font-mono truncate">
              admin@taxmetryx.com
            </div>
          </div>
        </aside>

        {/* Content Area: Scrolls independently */}
        <main className="flex-1 min-h-0 overflow-y-auto scrollbar-thin p-6 sm:p-10 bg-[#09151C]">
          <div className="max-w-6xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
