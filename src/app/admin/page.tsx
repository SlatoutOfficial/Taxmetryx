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
      .then((data) => setDbInfo({ isOnline: Boolean(data?.data?.isOnline) }))
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
        toast.success("MySQL database synced successfully from Taxmetryx JSON records!");
        setDbInfo({ isOnline: true });
      } else {
        toast.error(data.message || "Failed to sync MySQL. Ensure MySQL is running on port 3306.");
      }
    } catch {
      toast.error("Network error connecting to database sync API");
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
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            EXECUTIVE DASHBOARD
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            Advisory Operations Centre
          </h1>
          <p className="text-xs text-white/60">
            DIFC Gate Precinct 4 • Commercial License DIFC-CL-89240
          </p>
        </div>

        {/* Sync MySQL Button */}
        <button
          onClick={handleSyncDatabase}
          disabled={seeding}
          className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-brand-red ${seeding ? "animate-spin" : ""}`} />
          <span>{seeding ? "Syncing to MySQL..." : "Sync JSON to MySQL"}</span>
        </button>
      </div>

      {/* Database Status Alert Banner */}
      <div className="p-4 border border-white/10 bg-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-brand-red shrink-0" />
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-white">
              Data Engine Status:{" "}
              <span className={dbInfo.isOnline ? "text-emerald-400 font-mono" : "text-amber-300 font-mono"}>
                {dbInfo.isOnline ? "MySQL 3306 (Active & Connected)" : "Resilient JSON Cache Mode (Active)"}
              </span>
            </div>
            <p className="text-[11px] text-white/50">
              {dbInfo.isOnline
                ? "All read/write operations execute against MySQL database tables."
                : "MySQL service is offline on 127.0.0.1:3306. Platform automatically serves cached seed data with zero downtime."}
            </p>
          </div>
        </div>

        {!dbInfo.isOnline && (
          <span className="text-[10px] font-mono px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-widest shrink-0">
            Zero-Downtime Fallback
          </span>
        )}
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider">Client Inquiries</span>
            <Inbox className="w-4 h-4 text-brand-red" />
          </div>
          <div className="font-editorial text-4xl text-white">
            {inquiries.length}
          </div>
          <div className="text-[11px] text-brand-red font-semibold">
            {newInquiriesCount} Require Review
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider">Core Practices</span>
            <Layers className="w-4 h-4 text-brand-red" />
          </div>
          <div className="font-editorial text-4xl text-white">
            {services.length}
          </div>
          <div className="text-[11px] text-white/50">
            All 6 Practices Published
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider">Publications</span>
            <BookOpen className="w-4 h-4 text-brand-red" />
          </div>
          <div className="font-editorial text-4xl text-white">
            {insights.length}
          </div>
          <div className="text-[11px] text-white/50">
            Technical Bulletins Live
          </div>
        </div>

        <div className="p-6 bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider">DIFC Vacancies</span>
            <Briefcase className="w-4 h-4 text-brand-red" />
          </div>
          <div className="font-editorial text-4xl text-white">
            {openingsCount}
          </div>
          <div className="text-[11px] text-white/50">
            Recruiting Top Tax Leaders
          </div>
        </div>
      </div>

      {/* Recent Client Inquiries Table */}
      <div className="p-6 bg-white/5 border border-white/10 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h3 className="font-editorial text-xl text-white">
              Recent Confidential Inquiries
            </h3>
            <p className="text-xs text-white/50">
              Direct form submissions received through taxmetryx.com/contact
            </p>
          </div>

          <Link
            href="/admin/inquiries"
            className="text-xs uppercase tracking-wider font-semibold text-brand-red hover:underline inline-flex items-center gap-1"
          >
            <span>View All Inbox</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loadingInquiries ? (
          <div className="py-8 text-center text-xs text-white/50 font-mono">
            Loading inquiries...
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-8 text-center text-xs text-white/50 font-mono">
            No inquiries received yet. Submit the public contact form to test.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-white/50 uppercase font-mono text-[10px]">
                <tr>
                  <th className="py-3 px-2">Sender Name</th>
                  <th className="py-3 px-2">Company</th>
                  <th className="py-3 px-2">Area of Interest</th>
                  <th className="py-3 px-2">Date Received</th>
                  <th className="py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/5">
                    <td className="py-3 px-2 font-semibold text-white">
                      {inq.name}
                    </td>
                    <td className="py-3 px-2 text-white/80">{inq.company}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 bg-brand-red/10 text-brand-red border border-brand-red/20 text-[10px] font-mono">
                        {inq.areaOfInterest}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-white/50 font-mono text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-white/10 text-white border border-white/15">
                        {inq.status || "NEW"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Link
          href="/admin/services"
          className="p-5 border border-white/10 bg-white/5 hover:border-brand-red transition-all block group space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider font-mono">PRACTICE SUITE</span>
            <ArrowUpRight className="w-4 h-4 text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-editorial text-lg text-white group-hover:text-brand-red transition-colors">
            Manage 6 Core Practices
          </div>
          <p className="text-xs text-white/50">
            Edit Transfer Pricing, Corporate Tax, and international service matrices.
          </p>
        </Link>

        <Link
          href="/admin/insights"
          className="p-5 border border-white/10 bg-white/5 hover:border-brand-red transition-all block group space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider font-mono">EDITORIAL SUITE</span>
            <ArrowUpRight className="w-4 h-4 text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-editorial text-lg text-white group-hover:text-brand-red transition-colors">
            Publish New Insight
          </div>
          <p className="text-xs text-white/50">
            Author technical bulletins, executive takeaways, and legal interpretations.
          </p>
        </Link>

        <Link
          href="/admin/settings"
          className="p-5 border border-white/10 bg-white/5 hover:border-brand-red transition-all block group space-y-1.5"
        >
          <div className="flex items-center justify-between text-xs text-white/50">
            <span className="uppercase tracking-wider font-mono">GOVERNANCE</span>
            <ArrowUpRight className="w-4 h-4 text-brand-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <div className="font-editorial text-lg text-white group-hover:text-brand-red transition-colors">
            Firm & DIFC Settings
          </div>
          <p className="text-xs text-white/50">
            Update telephone hotline, license ID, and DIFC registered addresses.
          </p>
        </Link>
      </div>
    </div>
  );
}
