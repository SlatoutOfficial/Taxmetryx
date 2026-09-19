"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Briefcase, Plus, MapPin, Trash2, ArrowUpRight, X } from "lucide-react";
import { getCareers } from "@/lib/json";
import { JobOpening } from "@/types/career";

export default function AdminCareersPage() {
  const [openings, setOpenings] = useState<JobOpening[]>(getCareers().openings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobOpening>>({
    title: "",
    department: "Transfer Pricing",
    location: "Dubai, UAE",
    type: "Full-Time",
    experience: "5-8 Years",
    overview: "",
    responsibilities: ["Lead client engagements and benchmarking studies"],
    requirements: ["Degree in Law, Economics, or Taxation", "Big-4 or tier-one advisory experience"],
  });

  useEffect(() => {
    fetch("/api/admin/careers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setOpenings(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title) {
      toast.error("Please enter a job title.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Job opening created successfully!");
        setOpenings((prev) => [data.data as JobOpening, ...prev]);
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to post job.");
      }
    } catch {
      toast.error("Network error while creating career role.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Job Openings
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Manage career opportunities and positions listed on the website.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </button>
      </div>

      {/* Vacancy Cards List */}
      <div className="space-y-4">
        {openings.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-4 hover:border-white/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1.5">
                  <span className="px-2 py-0.5 bg-[#eb0045]/15 text-[#eb0045] border border-[#eb0045]/30 text-xs font-medium rounded-xs">
                    {job.department}
                  </span>
                  <span className="text-white/50 text-xs">{job.type}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/70 inline-flex items-center gap-1 text-xs">
                    <MapPin className="w-3 h-3 text-[#eb0045]" />
                    {job.location}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {job.title}
                </h3>
              </div>

              <div className="text-xs text-white/80 bg-[#071219] px-3 py-1 rounded-xs border border-white/10">
                Experience: <span className="font-semibold text-white">{job.experience}</span>
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
                    className="text-xs px-2.5 py-1 bg-[#071219] text-white/80 rounded-xs border border-white/10"
                  >
                    ✓ {req}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post Job Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D1C26] border border-white/20 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white rounded-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Post New Job Opening
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  This role will be listed on your public Careers page immediately.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-sm hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Senior Tax Consultant - Corporate Tax"
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Department
                  </label>
                  <select
                    value={newJob.department}
                    onChange={(e) =>
                      setNewJob({ ...newJob, department: e.target.value as JobOpening["department"] })
                    }
                    className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors cursor-pointer"
                  >
                    <option value="Transfer Pricing">Transfer Pricing</option>
                    <option value="Corporate Tax">Corporate Tax</option>
                    <option value="International Tax">International Tax</option>
                    <option value="Controversy & Regulatory">Controversy & Regulatory</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    placeholder="e.g. 3-5 Years"
                    className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Job Overview / Summary
                </label>
                <textarea
                  rows={3}
                  value={newJob.overview}
                  onChange={(e) => setNewJob({ ...newJob, overview: e.target.value })}
                  placeholder="Describe the role responsibilities and what you are looking for..."
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-semibold rounded-sm cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  {isSaving ? "Posting..." : "Post Job Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
