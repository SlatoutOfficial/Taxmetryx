"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BookOpen, Plus, Edit3, ArrowUpRight, Check, Clock } from "lucide-react";
import { getInsights } from "@/lib/json";
import { Insight } from "@/types/insight";

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>(getInsights());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentInsight, setCurrentInsight] = useState<Partial<Insight>>({
    title: "",
    slug: "",
    category: "Corporate Tax",
    readTime: "7 min read",
    lead: "",
    excerpt: "",
    featured: false,
    author: { name: "Tariq Al-Mansoor", role: "Head of Transfer Pricing" },
    keyTakeaways: ["Key statutory point 1", "Key risk threshold 2"],
    tags: ["Corporate Tax", "UAE"],
  });

  useEffect(() => {
    fetch("/api/admin/insights")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setInsights(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInsight.title || !currentInsight.slug) {
      toast.error("Title and slug are required");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentInsight),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Publication saved successfully to MySQL!");
        setInsights((prev) => [data.data as Insight, ...prev]);
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to save publication.");
      }
    } catch {
      toast.error("Network error while saving publication.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            EDITORIAL PUBLICATIONS
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            Technical Insights & Bulletins
          </h1>
          <p className="text-xs text-white/60">
            Publish, edit, and categorize thought leadership articles in MySQL.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentInsight({
              title: "",
              slug: `advisory-${Date.now().toString().slice(-4)}`,
              category: "Transfer Pricing",
              readTime: "6 min read",
              lead: "",
              excerpt: "",
              featured: false,
              author: { name: "Tariq Al-Mansoor", role: "Partner" },
              keyTakeaways: ["Key statutory requirement", "Practical implementation guideline"],
              tags: ["Tax Advisory", "UAE"],
            });
            setIsModalOpen(true);
          }}
          className="px-4 py-3 bg-brand-red hover:bg-[#b80012] text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Publication</span>
        </button>
      </div>

      {/* Publications Table */}
      <div className="bg-white/5 border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-white/50 uppercase font-mono text-[10px] bg-white/5">
              <tr>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Publication Title</th>
                <th className="py-4 px-4">Author</th>
                <th className="py-4 px-4">Read Time</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-4 text-right">Preview</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {insights.map((article) => (
                <tr key={article.slug} className="hover:bg-white/5">
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 bg-brand-red/15 text-brand-red font-mono text-[10px] uppercase font-semibold">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white text-sm">
                      {article.title}
                    </div>
                    <div className="text-[11px] text-white/50 line-clamp-1 max-w-sm">
                      {article.excerpt}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-white/70">
                    {article.author?.name || "Taxmetryx Partner"}
                  </td>
                  <td className="py-4 px-4 text-white/50 font-mono text-[11px]">
                    {article.readTime}
                  </td>
                  <td className="py-4 px-4">
                    {article.featured ? (
                      <span className="text-brand-red font-mono text-[10px] uppercase font-semibold">
                        ★ Yes
                      </span>
                    ) : (
                      <span className="text-white/30 text-[10px] font-mono">No</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link
                      href={`/insights/${article.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] uppercase tracking-wider font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3 text-brand-red" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Publication Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B1A24] border border-white/20 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">
                  AUTHOR NEW TECHNICAL BULLETIN
                </span>
                <h3 className="font-editorial text-2xl text-white">
                  Publish Insight in MySQL
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white text-xs uppercase font-mono cursor-pointer"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Title *</label>
                <input
                  type="text"
                  required
                  value={currentInsight.title}
                  onChange={(e) =>
                    setCurrentInsight({
                      ...currentInsight,
                      title: e.target.value,
                      slug:
                        currentInsight.slug ||
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, ""),
                    })
                  }
                  placeholder="e.g. GCC Withholding Tax Optimization under Modern DTAAs"
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/70 uppercase font-semibold">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={currentInsight.slug}
                    onChange={(e) =>
                      setCurrentInsight({ ...currentInsight, slug: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-white/70 uppercase font-semibold">Practice Category *</label>
                  <select
                    value={currentInsight.category}
                    onChange={(e) =>
                      setCurrentInsight({
                        ...currentInsight,
                        category: e.target.value as Insight["category"],
                      })
                    }
                    className="w-full px-3 py-2 bg-[#0B1A24] border border-white/15 text-white focus:outline-hidden focus:border-brand-red"
                  >
                    <option value="Transfer Pricing">Transfer Pricing</option>
                    <option value="Corporate Tax">Corporate Tax</option>
                    <option value="International Tax">International Tax</option>
                    <option value="VAT & Indirect Tax">VAT & Indirect Tax</option>
                    <option value="Tax Regulation">Tax Regulation</option>
                    <option value="Global Tax">Global Tax</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Executive Lead Text</label>
                <textarea
                  rows={3}
                  value={currentInsight.lead}
                  onChange={(e) =>
                    setCurrentInsight({ ...currentInsight, lead: e.target.value })
                  }
                  placeholder="Lead editorial sentence summarizing the core finding..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-white/70 uppercase font-semibold">Short Excerpt (for cards)</label>
                <textarea
                  rows={2}
                  value={currentInsight.excerpt}
                  onChange={(e) =>
                    setCurrentInsight({ ...currentInsight, excerpt: e.target.value })
                  }
                  placeholder="2-3 sentence overview..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-white focus:outline-hidden focus:border-brand-red resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={currentInsight.featured}
                  onChange={(e) =>
                    setCurrentInsight({ ...currentInsight, featured: e.target.checked })
                  }
                  className="accent-[#eb0045] w-4 h-4"
                />
                <label htmlFor="featuredCheck" className="text-white/80 select-none cursor-pointer">
                  Feature as Homepage Lead Insight
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-white/60 hover:text-white uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-brand-red hover:bg-[#b80012] text-white uppercase tracking-wider font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? "Publishing..." : "Publish Insight"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
