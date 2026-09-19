"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Briefcase,
  ExternalLink,
  Save,
  Trash2,
  Plus,
  X,
  Check,
  MapPin,
  Clock,
  Building,
  Award,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { JobOpening } from "@/types/career";

const DEPARTMENTS = [
  "Transfer Pricing",
  "Corporate Tax",
  "International Tax",
  "VAT & Indirect Tax",
  "Dispute Resolution & Controversy",
  "Economic Modeling",
];

const JOB_TYPES = [
  "Full-Time",
  "Director",
  "Senior Manager",
  "Manager",
  "Senior Associate",
  "Associate",
  "Contract",
];

export default function EditCareerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [job, setJob] = useState<Partial<JobOpening>>({
    id: "",
    title: "",
    department: "Transfer Pricing",
    location: "Dubai, UAE",
    type: "Full-Time",
    experience: "5-8 Years",
    overview: "",
    responsibilities: [],
    requirements: [],
    postedDate: new Date().toISOString().split("T")[0],
    status: "ACTIVE",
  });

  const [newResp, setNewResp] = useState("");
  const [newReq, setNewReq] = useState("");

  // Load career role
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/admin/careers?id=${encodeURIComponent(id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setJob(data.data);
        } else {
          toast.error("Career role not found.");
          router.push("/admin/careers");
        }
      })
      .catch(() => {
        toast.error("Error loading career role.");
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  // Keyboard shortcut for saving (Ctrl/Cmd + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [job]);

  // Save handler
  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!job.title) {
      toast.error("Role title is required.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/careers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`"${job.title}" updated successfully!`);
      } else {
        toast.error(data.message || "Failed to update role.");
      }
    } catch {
      toast.error("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${job.title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/careers?id=${encodeURIComponent(job.id || "")}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Role deleted successfully.");
        router.push("/admin/careers");
      } else {
        toast.error(data.message || "Failed to delete.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  // Responsibilities Helpers
  const addResponsibility = () => {
    if (!newResp.trim()) return;
    setJob((prev) => ({
      ...prev,
      responsibilities: [...(prev.responsibilities || []), newResp.trim()],
    }));
    setNewResp("");
  };

  const removeResponsibility = (idx: number) => {
    setJob((prev) => ({
      ...prev,
      responsibilities: (prev.responsibilities || []).filter((_, i) => i !== idx),
    }));
  };

  // Requirements Helpers
  const addRequirement = () => {
    if (!newReq.trim()) return;
    setJob((prev) => ({
      ...prev,
      requirements: [...(prev.requirements || []), newReq.trim()],
    }));
    setNewReq("");
  };

  const removeRequirement = (idx: number) => {
    setJob((prev) => ({
      ...prev,
      requirements: (prev.requirements || []).filter((_, i) => i !== idx),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-white/50 text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mr-3 text-[#eb0045]" />
        Loading career details...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl pb-24">
      {/* Top Header & Navigation Bar */}
      <div className="pb-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/careers"
            className="w-8 h-8 rounded-md bg-[#0D1C26] hover:bg-[#152735] border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Back to Careers"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#eb0045] tracking-wider uppercase">
                Career Opening
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/50">{job.department}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">
              {job.title || "Untitled Role"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href="/careers"
            target="_blank"
            className="px-3 py-2 bg-[#0D1C26] hover:bg-[#152735] border border-white/15 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Careers Page</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#eb0045]" />
          </Link>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-[#eb0045] hover:bg-[#c9003b] disabled:opacity-50 text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20"
          >
            {isSaving ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isSaving ? "Saving..." : "Save Role"}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-black/30 rounded-xs text-[10px] text-white/60 ml-1">
              Ctrl+S
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Form (7 cols) & Right Sidebar (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Role Description & Criteria (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Title & Overview Card */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Role Definition
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">Role Title *</label>
              <input
                type="text"
                value={job.title || ""}
                onChange={(e) => setJob({ ...job, title: e.target.value })}
                placeholder="e.g. Director - Transfer Pricing & Financial Transactions"
                className="w-full px-4 py-3 bg-[#071219] border border-white/15 text-white font-semibold text-sm rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80">
                Role Overview & Mandate
              </label>
              <textarea
                rows={4}
                value={job.overview || ""}
                onChange={(e) => setJob({ ...job, overview: e.target.value })}
                placeholder="High-level mandate describing client leadership, transaction complexity, and practice growth expectations..."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white text-xs leading-relaxed rounded-md focus:outline-hidden focus:border-[#eb0045] resize-none"
              />
            </div>
          </div>

          {/* Responsibilities Card */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Key Responsibilities
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Day-to-day engagement deliverables and advisory leadership tasks.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {job.responsibilities?.length || 0} items
              </span>
            </div>

            <div className="space-y-2">
              {(job.responsibilities || []).map((resp, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 bg-[#071219] border border-white/10 rounded-md text-xs text-white/90"
                >
                  <div className="flex items-start gap-2 flex-1">
                    <span className="w-4 h-4 rounded-full bg-[#eb0045]/20 text-[#eb0045] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{resp}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeResponsibility(idx)}
                    className="text-white/30 hover:text-[#eb0045] p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newResp}
                onChange={(e) => setNewResp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addResponsibility()}
                placeholder="Add responsibility and press Enter..."
                className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <button
                type="button"
                onClick={addResponsibility}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Requirements & Qualifications Card */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Requirements & Credentials
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Academic degrees, technical certifications (ADIT, CTA, CPA), and experience prerequisites.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {job.requirements?.length || 0} items
              </span>
            </div>

            <div className="space-y-2">
              {(job.requirements || []).map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 bg-[#071219] border border-white/10 rounded-md text-xs text-white/90"
                >
                  <div className="flex items-start gap-2 flex-1">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{req}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRequirement(idx)}
                    className="text-white/30 hover:text-[#eb0045] p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newReq}
                onChange={(e) => setNewReq(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addRequirement()}
                placeholder="Add requirement (e.g. Master's in Tax Law / ADIT)..."
                className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <button
                type="button"
                onClick={addRequirement}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Attributes & Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Attributes Card */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Role Logistics & Criteria
            </h3>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Department</label>
              <select
                value={job.department || "Transfer Pricing"}
                onChange={(e) => setJob({ ...job, department: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Employment Level / Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Seniority Level / Type</label>
              <select
                value={job.type || "Full-Time"}
                onChange={(e) => setJob({ ...job, type: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              >
                {JOB_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Location & Experience */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Location</label>
                <input
                  type="text"
                  value={job.location || "Dubai, UAE"}
                  onChange={(e) => setJob({ ...job, location: e.target.value })}
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/70">Experience</label>
                <input
                  type="text"
                  value={job.experience || "5-8 Years"}
                  onChange={(e) => setJob({ ...job, experience: e.target.value })}
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Listing Status</label>
              <select
                value={job.status || "ACTIVE"}
                onChange={(e) => setJob({ ...job, status: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              >
                <option value="ACTIVE">ACTIVE (Accepting Applications)</option>
                <option value="PAUSED">PAUSED (Reviewing Candidates)</option>
                <option value="CLOSED">CLOSED (Filled / Inactive)</option>
              </select>
            </div>
          </div>

          {/* Live Card Preview */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-3 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Candidate Preview
            </h3>

            <div className="p-5 bg-[#071219] border border-white/15 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#eb0045] uppercase tracking-wider">
                  {job.department}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/50 text-emerald-400 border border-emerald-500/30 font-medium">
                  {job.status || "ACTIVE"}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white leading-snug">{job.title}</h4>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/60">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-white/40" />
                  <span>{job.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-white/40" />
                  <span>{job.type}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-white/40" />
                  <span>{job.experience}</span>
                </span>
              </div>

              <p className="text-xs text-white/70 line-clamp-2 pt-1 border-t border-white/5">
                {job.overview || "Role overview summary..."}
              </p>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-5 bg-red-950/20 border border-red-500/20 rounded-lg space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>Danger Zone</span>
            </div>
            <p className="text-[11px] text-white/50">
              Permanently remove this career opening from the recruitment portal.
            </p>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Career Opening</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
