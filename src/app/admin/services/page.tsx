"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Layers, Edit3, ArrowUpRight, Check } from "lucide-react";
import { getServices } from "@/lib/json";
import { Service } from "@/types/service";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(getServices());
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setServices(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Practice ${editingService.title} updated successfully.`);
        setServices((prev) =>
          prev.map((s) => (s.slug === editingService.slug ? editingService : s))
        );
        setEditingService(null);
      } else {
        toast.error(data.message || "Failed to update service in database.");
      }
    } catch {
      toast.error("Network error while updating service.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            PRACTICE MANAGEMENT
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            Six Core Tax Disciplines
          </h1>
          <p className="text-xs text-white/60">
            Configure practice statements, capabilities, deliverables, and statutory frameworks in Supabase.
          </p>
        </div>

        <Link
          href="/services"
          target="_blank"
          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-1.5 transition-colors"
        >
          <span>View Public Services Page</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-brand-red" />
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-white/50 uppercase font-mono text-[10px] bg-white/5">
              <tr>
                <th className="py-4 px-4">No.</th>
                <th className="py-4 px-4">Practice Title</th>
                <th className="py-4 px-4">Eyebrow</th>
                <th className="py-4 px-4">Capabilities</th>
                <th className="py-4 px-4">Statutory Frameworks</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((service) => (
                <tr key={service.slug} className="hover:bg-white/5">
                  <td className="py-4 px-4 font-mono text-brand-red font-bold">
                    {service.number}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white text-sm">
                      {service.title}
                    </div>
                    <div className="text-[11px] text-white/50 line-clamp-1 max-w-sm">
                      {service.shortDescription}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/60 font-mono text-[10px] uppercase">
                    {service.eyebrow}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-white/10 text-white text-[11px] font-mono">
                      {service.capabilities?.length || 0} Workstreams
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/60">
                    <div className="text-[11px] line-clamp-1 max-w-xs">
                      {service.applicableFrameworks?.join(", ") || "OECD / UAE CT Law"}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setEditingService(service)}
                      className="px-3 py-1.5 bg-brand-red hover:bg-[#b80012] text-white text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1A24] border border-white/20 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">
                  EDIT PRACTICE IN SUPABASE
                </span>
                <h3 className="font-editorial text-2xl text-white">
                  {editingService.title} ({editingService.number})
                </h3>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="text-white/60 hover:text-white text-xs uppercase font-mono cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/70 uppercase font-semibold">Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/70 uppercase font-semibold">Eyebrow</label>
                  <input
                    type="text"
                    value={editingService.eyebrow}
                    onChange={(e) =>
                      setEditingService({ ...editingService, eyebrow: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Hero Statement</label>
                <input
                  type="text"
                  value={editingService.heroStatement}
                  onChange={(e) =>
                    setEditingService({ ...editingService, heroStatement: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Short Summary</label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Full Editorial Overview</label>
                <textarea
                  rows={4}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2.5 text-white/60 hover:text-white uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-brand-red hover:bg-[#b80012] text-white uppercase tracking-wider font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Saving to Supabase..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
