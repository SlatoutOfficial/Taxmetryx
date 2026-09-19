"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Layers, Edit3, ArrowUpRight, Check, X, Plus } from "lucide-react";
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
        toast.success(`"${editingService.title}" updated successfully.`);
        setServices((prev) =>
          prev.map((s) => (s.slug === editingService.slug ? editingService : s))
        );
        setEditingService(null);
      } else {
        toast.error(data.message || "Failed to update service.");
      }
    } catch {
      toast.error("Network error while updating service.");
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
            Services
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Manage the practice areas and advisory services shown on the website.
          </p>
        </div>

        <Link
          href="/services"
          target="_blank"
          className="px-3.5 py-2 bg-[#0D1C26] hover:bg-[#152735] border border-white/15 text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <span>View Public Services Page</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#eb0045]" />
        </Link>
      </div>

      {/* Services Table */}
      <div className="bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-white/50 text-[11px] font-medium bg-[#071219]">
              <tr>
                <th className="py-3.5 px-4">#</th>
                <th className="py-3.5 px-4">Service Title & Summary</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Workstreams</th>
                <th className="py-3.5 px-4">Regulations</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {services.map((service) => (
                <tr key={service.slug} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 px-4 font-bold text-[#eb0045] text-sm">
                    {service.number}
                  </td>
                  <td className="py-4 px-4 max-w-sm">
                    <div className="font-semibold text-white text-sm">
                      {service.title}
                    </div>
                    <div className="text-xs text-white/60 line-clamp-1 mt-0.5">
                      {service.shortDescription}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    {service.eyebrow}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 bg-[#071219] text-white/80 border border-white/10 text-xs rounded-xs font-medium">
                      {service.capabilities?.length || 0} workstreams
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    <div className="text-xs line-clamp-1 max-w-xs">
                      {service.applicableFrameworks?.join(", ") || "OECD Guidelines / UAE CT Law"}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setEditingService({ ...service })}
                      className="px-3 py-1.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
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

      {/* Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D1C26] border border-white/20 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white rounded-sm">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Edit Service: {editingService.title}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Update service details. Changes will reflect on the live website.
                </p>
              </div>
              <button
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-sm hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) =>
                      setEditingService({ ...editingService, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingService.eyebrow}
                    onChange={(e) =>
                      setEditingService({ ...editingService, eyebrow: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Hero Tagline
                </label>
                <input
                  type="text"
                  value={editingService.heroStatement || ""}
                  onChange={(e) =>
                    setEditingService({ ...editingService, heroStatement: e.target.value })
                  }
                  placeholder="e.g. Robust Corporate Tax Structuring Across UAE Jurisdictions"
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Short Summary (Shown on Cards & Homepage)
                </label>
                <textarea
                  rows={2}
                  value={editingService.shortDescription}
                  onChange={(e) =>
                    setEditingService({ ...editingService, shortDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Full Description (Shown on Service Detail Page)
                </label>
                <textarea
                  rows={4}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Applicable Regulations (Separated by commas)
                </label>
                <input
                  type="text"
                  value={(editingService.applicableFrameworks || []).join(", ")}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      applicableFrameworks: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. UAE Federal Decree-Law No. 47, OECD Guidelines"
                  className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-sm focus:outline-hidden focus:border-[#eb0045] transition-colors"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-semibold rounded-sm cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
