"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Briefcase, Plus, MapPin, Trash2, ArrowUpRight } from "lucide-react";
import { getCareers } from "@/lib/json";
import { JobOpening } from "@/types/career";

export default function AdminCareersPage() {
  const [openings, setOpenings] = useState<JobOpening[]>(getCareers().openings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newJob, setNewJob] = useState<Partial<JobOpening>>({
    title: "",
    department: "Transfer Pricing",
    location: "Dubai (DIFC), UAE",
    type: "Full-Time",
    experience: "5-8 Years",
    overview: "",
    responsibilities: ["Lead client engagements and benchmarking studies"],
    requirements: ["Degree in Law or Economics", "Big-4 experience"],
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
      toast.error("Job title is required");
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
        toast.success("Job position posted successfully in MySQL!");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            TALENT & RECRUITMENT
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            DIFC Advisory Vacancies
          </h1>
          <p className="text-xs text-white/60">
            Publish, edit, and manage career positions stored in MySQL.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-3 bg-brand-red hover:bg-[#b80012] text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      <div className="space-y-4">
        {openings.map((job) => (
          <div
            key={job.id}
            className="p-6 bg-white/5 border border-white/10 space-y-4 hover:border-white/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1">
                  <span className="px-2 py-0.5 bg-brand-red/20 text-brand-red font-mono text-[10px] font-semibold uppercase">
                    {job.department}
                  </span>
                  <span className="text-white/40 font-mono text-[11px]">{job.type}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/50">{job.location}</span>
                </div>
                <h3 className="font-editorial text-xl text-white">
                  {job.title}
                </h3>
              </div>

              <div className="text-xs text-white/50 font-mono">
                Exp: {job.experience}
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
              {job.overview}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1A24] border border-white/20 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-editorial text-2xl text-white">
                Create DIFC Vacancy in MySQL
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/60">
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Position Title *</label>
                <input
                  type="text"
                  required
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Senior Manager - Controversy"
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/70 uppercase font-semibold">Department</label>
                  <select
                    value={newJob.department}
                    onChange={(e) =>
                      setNewJob({ ...newJob, department: e.target.value as JobOpening["department"] })
                    }
                    className="w-full px-3 py-2 bg-[#0B1A24] border border-white/15 text-white"
                  >
                    <option value="Transfer Pricing">Transfer Pricing</option>
                    <option value="Corporate Tax">Corporate Tax</option>
                    <option value="International Tax">International Tax</option>
                    <option value="Controversy & Regulatory">Controversy & Regulatory</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-white/70 uppercase font-semibold">Experience</label>
                  <input
                    type="text"
                    value={newJob.experience}
                    onChange={(e) => setNewJob({ ...newJob, experience: e.target.value })}
                    placeholder="e.g. 7-10 Years"
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Role Overview</label>
                <textarea
                  rows={3}
                  value={newJob.overview}
                  onChange={(e) => setNewJob({ ...newJob, overview: e.target.value })}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-brand-red hover:bg-[#b80012] text-white uppercase tracking-wider font-semibold"
                >
                  {isSaving ? "Saving..." : "Post Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
