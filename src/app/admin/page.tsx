"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Layers,
  BookOpen,
  Inbox,
  Briefcase,
  Database,
  RefreshCw,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Calendar,
} from "lucide-react";
import { getServices, getInsights, getCareers } from "@/lib/json";

interface Inquiry {
  id: string;
  name: string;
  company: string;
  email: string;
  areaOfInterest: string;
  status?: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [services, setServices] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [openingsCount, setOpeningsCount] = useState<number>(4);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [dbInfo, setDbInfo] = useState<{ isOnline: boolean }>({ isOnline: false });

  useEffect(() => {
    try {
      const s = getServices();
      if (Array.isArray(s)) setServices(s);
      const ins = getInsights();
      if (Array.isArray(ins)) setInsights(ins);
      const c = getCareers();
      if (c && Array.isArray(c.openings)) setOpeningsCount(c.openings.length);
    } catch {
      // Fallback
    }

    // Check DB status
    fetch("/api/admin/seed")
      .then((res) => res.json())
      .then((data) => setDbInfo({ isOnline: Boolean(data?.data?.prismaOnline) }))
      .catch(() => {});

    // Load Inquiries
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setInquiries(data.data);
        }
      })
      .finally(() => setLoadingInquiries(false));
  }, []);

  const handleSyncDatabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Database synchronized successfully!");
        setDbInfo({ isOnline: true });
      } else {
        toast.error(data.message || "Failed to sync database.");
      }
    } catch {
      toast.error("Network error connecting to database sync.");
    } finally {
      setSeeding(false);
    }
  };

  const newInquiriesCount = (inquiries || []).filter((i) => !i.status || i.status === "NEW").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Welcome back. Here is an overview of your website content and recent inquiries.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncDatabase}
            disabled={seeding}
            className="px-3.5 py-2 bg-[#0D1C26] hover:bg-[#152735] border border-white/15 text-white text-xs font-medium rounded-sm inline-flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#eb0045] ${seeding ? "animate-spin" : ""}`} />
            <span>{seeding ? "Syncing..." : "Sync Database"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>View Website</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Database Connection Alert */}
      <div className="p-4 rounded-sm border border-white/10 bg-[#0D1C26] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-sm bg-[#071219] border border-white/10 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4 text-[#eb0045]" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white flex items-center gap-2">
              <span>Database Connection:</span>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-sm border ${
                dbInfo.isOnline 
                  ? "bg-emerald-950/50 text-emerald-400 border-emerald-500/30" 
                  : "bg-amber-950/50 text-amber-300 border-amber-500/30"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dbInfo.isOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
                {dbInfo.isOnline ? "Connected to Supabase" : "Fallback Cache Active"}
              </span>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              {dbInfo.isOnline
                ? "Changes made in this admin panel are saved directly to your live database."
                : "Database is working in high-availability cache mode."}
            </p>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Inquiries */}
        <Link
          href="/admin/inquiries"
          className="p-5 bg-[#0D1C26] border border-white/10 rounded-sm space-y-3 hover:border-white/20 transition-colors block group"
        >
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-medium text-white/70">Client Inquiries</span>
            <div className="w-7 h-7 rounded-sm bg-[#071219] flex items-center justify-center border border-white/10 group-hover:border-[#eb0045]/40 transition-colors">
              <Inbox className="w-3.5 h-3.5 text-[#eb0045]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {inquiries.length}
          </div>
          <div className="text-xs font-medium text-[#eb0045]">
            {newInquiriesCount > 0 ? `${newInquiriesCount} new message${newInquiriesCount > 1 ? "s" : ""}` : "All messages reviewed"}
          </div>
        </Link>

        {/* Services */}
        <Link
          href="/admin/services"
          className="p-5 bg-[#0D1C26] border border-white/10 rounded-sm space-y-3 hover:border-white/20 transition-colors block group"
        >
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-medium text-white/70">Services</span>
            <div className="w-7 h-7 rounded-sm bg-[#071219] flex items-center justify-center border border-white/10 group-hover:border-[#eb0045]/40 transition-colors">
              <Layers className="w-3.5 h-3.5 text-[#eb0045]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {services.length}
          </div>
          <div className="text-xs text-white/50">
            6 active service practices
          </div>
        </Link>

        {/* Insights */}
        <Link
          href="/admin/insights"
          className="p-5 bg-[#0D1C26] border border-white/10 rounded-sm space-y-3 hover:border-white/20 transition-colors block group"
        >
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-medium text-white/70">Articles & Insights</span>
            <div className="w-7 h-7 rounded-sm bg-[#071219] flex items-center justify-center border border-white/10 group-hover:border-[#eb0045]/40 transition-colors">
              <BookOpen className="w-3.5 h-3.5 text-[#eb0045]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {insights.length}
          </div>
          <div className="text-xs text-white/50">
            Published articles on site
          </div>
        </Link>

        {/* Careers */}
        <Link
          href="/admin/careers"
          className="p-5 bg-[#0D1C26] border border-white/10 rounded-sm space-y-3 hover:border-white/20 transition-colors block group"
        >
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="font-medium text-white/70">Job Openings</span>
            <div className="w-7 h-7 rounded-sm bg-[#071219] flex items-center justify-center border border-white/10 group-hover:border-[#eb0045]/40 transition-colors">
              <Briefcase className="w-3.5 h-3.5 text-[#eb0045]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">
            {openingsCount}
          </div>
          <div className="text-xs text-white/50">
            Open positions listed
          </div>
        </Link>
      </div>

      {/* Recent Client Messages Table */}
      <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white">
              Recent Inquiries
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Messages received from visitors using the contact form.
            </p>
          </div>

          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-[#eb0045] hover:underline inline-flex items-center gap-1 transition-colors"
          >
            <span>View All Messages</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loadingInquiries ? (
          <div className="py-8 text-center text-xs text-white/40">
            Loading recent messages...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-white/40">
            No inquiries received yet. Any messages sent from the contact form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-white/50 text-[11px] font-medium bg-[#071219]">
                <tr>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Company</th>
                  <th className="py-3 px-3">Interest</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-3 font-medium text-white">
                      {inq.name}
                    </td>
                    <td className="py-3.5 px-3 text-white/70">{inq.company || "—"}</td>
                    <td className="py-3.5 px-3">
                      <span className="px-2 py-0.5 bg-[#eb0045]/15 text-[#eb0045] border border-[#eb0045]/30 text-[11px] rounded-xs font-medium">
                        {inq.areaOfInterest}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-white/50">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 text-[11px] font-medium rounded-xs border ${
                        !inq.status || inq.status === "NEW"
                          ? "bg-amber-950/50 text-amber-300 border-amber-500/30"
                          : "bg-emerald-950/50 text-emerald-400 border-emerald-500/30"
                      }`}>
                        {!inq.status || inq.status === "NEW" ? "New" : inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/services"
          className="p-5 border border-white/10 bg-[#0D1C26] hover:border-white/25 rounded-sm transition-all block group space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="font-medium text-white/60">Manage Services</span>
            <ArrowUpRight className="w-4 h-4 text-[#eb0045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="text-base font-bold text-white group-hover:text-[#eb0045] transition-colors">
            Services & Practices
          </div>
          <p className="text-xs text-white/50">
            Update service descriptions, deliverables, and capabilities shown to clients.
          </p>
        </Link>

        <Link
          href="/admin/insights"
          className="p-5 border border-white/10 bg-[#0D1C26] hover:border-white/25 rounded-sm transition-all block group space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="font-medium text-white/60">Publish Content</span>
            <ArrowUpRight className="w-4 h-4 text-[#eb0045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="text-base font-bold text-white group-hover:text-[#eb0045] transition-colors">
            Articles & Insights
          </div>
          <p className="text-xs text-white/50">
            Write new technical bulletins and thought leadership posts for the website.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="p-5 border border-white/10 bg-[#0D1C26] hover:border-white/25 rounded-sm transition-all block group space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="font-medium text-white/60">Firm Details</span>
            <ArrowUpRight className="w-4 h-4 text-[#eb0045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="text-base font-bold text-white group-hover:text-[#eb0045] transition-colors">
            Firm Settings
          </div>
          <p className="text-xs text-white/50">
            Update telephone number, office address, and commercial license details.
          </p>
        </Link>
      </div>
    </div>
  );
}
