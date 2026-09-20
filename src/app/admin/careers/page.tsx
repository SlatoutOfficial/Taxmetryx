"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Briefcase,
  Plus,
  MapPin,
  Trash2,
  ArrowUpRight,
  Edit3,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { getCareers } from "@/lib/json";
import { JobOpening } from "@/types/career";

export default function AdminCareersPage() {
  const [openings, setOpenings] = useState<JobOpening[]>(getCareers().openings);

  const fetchCareers = () => {
    fetch("/api/admin/careers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOpenings(data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the role "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/careers?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Role deleted successfully.");
        setOpenings((prev) => prev.filter((o) => o.id !== id));
      } else {
        toast.error(data.message || "Failed to delete role.");
      }
    } catch {
      toast.error("Network error while deleting role.");
    }
  };

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Job Openings
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
              {openings.length} Positions
            </span>
          </div>
          <p className="text-sm text-white/60 mt-1">
            Manage active career opportunities, statutory mandates, and candidate qualifications.
          </p>
        </div>

        <Link
          href="/admin/careers/new"
          className="px-4 py-2.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Vacancy Cards List */}
      <div className="space-y-4">
        {openings.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg shadow-sm space-y-4 hover:border-white/20 transition-colors group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-[#eb0045]/15 text-[#eb0045] border border-[#eb0045]/30 text-xs font-semibold rounded-sm">
                    {job.department}
                  </span>
                  <span className="text-white/50 text-xs">{job.type}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70 inline-flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3 text-[#eb0045]" />
                    {job.location}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/50 text-xs">
                    Exp: <span className="text-white/80 font-medium">{job.experience}</span>
                  </span>
                </div>
                <Link
                  href={`/admin/careers/edit/${job.id}`}
                  className="text-lg font-bold text-white group-hover:text-[#eb0045] transition-colors block"
                >
                  {job.title}
                </Link>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <Link
                  href={`/admin/careers/edit/${job.id}`}
                  className="px-3 py-1.5 bg-[#071219] hover:bg-[#eb0045] border border-white/10 hover:border-transparent text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </Link>

                <Link
                  href="/careers"
                  target="_blank"
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
                  title="View on Careers page"
                >
                  <span>View</span>
                  <ArrowUpRight className="w-3 h-3 text-[#eb0045]" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(job.id, job.title)}
                  className="p-1.5 text-white/40 hover:text-[#eb0045] transition-colors cursor-pointer rounded-md hover:bg-white/5"
                  title="Delete role"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
              {job.overview}
            </p>

            {job.requirements && job.requirements.length > 0 && (
              <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
                {job.requirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 bg-[#071219] text-white/80 rounded-sm border border-white/10 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}

        {openings.length === 0 && (
          <div className="p-12 text-center bg-[#0D1C26] border border-white/10 rounded-lg">
            <Briefcase className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/60 text-sm">No job openings currently posted.</p>
          </div>
        )}
      </div>
    </div>
  );
}
