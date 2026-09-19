"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  BookOpen,
  Plus,
  Edit3,
  ArrowUpRight,
  Search,
  Filter,
  Trash2,
  X,
  Sparkles,
  Clock,
  User,
  Eye,
} from "lucide-react";
import { getInsights } from "@/lib/json";
import { Insight } from "@/types/insight";

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>(getInsights());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentInsight, setCurrentInsight] = useState<Partial<Insight>>({
    title: "",
    slug: "",
    category: "Corporate Tax",
    readTime: "6 min read",
    lead: "",
    excerpt: "",
    featured: false,
    author: { name: "Tariq Al-Mansoor", role: "Head of Transfer Pricing" },
    keyTakeaways: ["Key statutory requirement", "Practical implementation guideline"],
    tags: ["Corporate Tax", "UAE"],
  });

  const fetchInsights = () => {
    fetch("/api/admin/insights")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setInsights(data.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(insights.map((i) => i.category).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [insights]);

  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const matchesCategory =
        selectedCategory === "ALL" || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author?.name || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [insights, selectedCategory, searchQuery]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInsight.title || !currentInsight.slug) {
      toast.error("Please provide both a title and URL slug.");
      return;
    }

    setIsSaving(true);
    try {
      const isExisting = insights.some((i) => i.slug === currentInsight.slug);
      const res = await fetch("/api/admin/insights", {
        method: isExisting ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentInsight),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isExisting ? "Article updated successfully!" : "Article published successfully!");
        setInsights((prev) => {
          const idx = prev.findIndex((i) => i.slug === currentInsight.slug);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], ...(currentInsight as Insight) };
            return copy;
          }
          return [data.data as Insight, ...prev];
        });
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to save article.");
      }
    } catch {
      toast.error("Network error while saving article.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/insights?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Article deleted successfully.");
        setInsights((prev) => prev.filter((i) => i.slug !== slug));
      } else {
        toast.error(data.message || "Failed to delete article.");
      }
    } catch {
      toast.error("Network error deleting article.");
    }
  };

  const openEdit = (article: Insight) => {
    setCurrentInsight({ ...article });
    setIsModalOpen(true);
  };

  const openNew = () => {
    setCurrentInsight({
      title: "",
      slug: "",
      category: "Transfer Pricing",
      readTime: "5 min read",
      lead: "",
      excerpt: "",
      featured: false,
      author: { name: "Taxmetryx Advisory Partner", role: "Partner" },
      keyTakeaways: ["Clear executive compliance point"],
      tags: ["UAE Tax"],
    });
    setIsModalOpen(true);
  };

  const getCategoryBadgeClass = (category?: string) => {
    switch (category) {
      case "Transfer Pricing":
        return "bg-[#eb0045]/15 text-[#eb0045] border-[#eb0045]/30";
      case "Corporate Tax":
        return "bg-emerald-950/50 text-emerald-400 border-emerald-500/30";
      case "International Tax":
        return "bg-sky-950/50 text-sky-400 border-sky-500/30";
      case "VAT & Indirect Tax":
        return "bg-purple-950/50 text-purple-400 border-purple-500/30";
      default:
        return "bg-white/10 text-white/80 border-white/15";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Articles & Insights
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
              {insights.length} Articles
            </span>
          </div>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Write, edit, and organize articles and technical bulletins published on your website.
          </p>
        </div>

        <button
          onClick={openNew}
          className="px-4 py-2.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-[#0D1C26] border border-white/10 rounded-lg shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, author, or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-[#071219] border border-white/15 text-white placeholder-white/30 text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-white/40 shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Articles Table Card */}
      <div className="bg-[#0D1C26] border border-white/10 rounded-lg shadow-xl overflow-hidden">
        {filteredInsights.length === 0 ? (
          <div className="py-16 text-center text-white/50 space-y-2">
            <BookOpen className="w-8 h-8 text-white/30 mx-auto" />
            <p className="text-sm font-semibold text-white/70">No articles found</p>
            <p className="text-xs text-white/40">Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-white/50 text-[11px] font-semibold uppercase tracking-wider bg-[#071219]">
                <tr>
                  <th className="py-3.5 px-5">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Read Time</th>
                  <th className="py-3.5 px-4">Visibility</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredInsights.map((article) => (
                  <tr key={article.slug} className="hover:bg-white/[0.03] transition-colors group">
                    {/* Title & Excerpt */}
                    <td className="py-4 px-5 max-w-md">
                      <div className="font-semibold text-white text-sm group-hover:text-[#eb0045] transition-colors">
                        {article.title}
                      </div>
                      <div className="text-xs text-white/50 line-clamp-1 mt-0.5">
                        {article.excerpt}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryBadgeClass(
                          article.category
                        )}`}
                      >
                        {article.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="py-4 px-4 text-white/80 whitespace-nowrap">
                      <div className="font-medium">{article.author?.name || "Taxmetryx Partner"}</div>
                      <div className="text-[11px] text-white/40">{article.author?.role || "Advisory"}</div>
                    </td>

                    {/* Read Time */}
                    <td className="py-4 px-4 text-white/60 text-xs whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white/40" />
                        {article.readTime || "5 min read"}
                      </span>
                    </td>

                    {/* Homepage Visibility */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {article.featured ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-semibold bg-amber-500/15 px-2.5 py-1 rounded-full border border-amber-500/30">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-white/40 text-xs px-2 py-1">
                          Standard
                        </span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(article)}
                          className="px-3 py-1.5 bg-[#071219] hover:bg-[#eb0045] border border-white/10 hover:border-transparent text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <Link
                          href={`/insights/${article.slug}`}
                          target="_blank"
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
                        >
                          <span>View</span>
                          <ArrowUpRight className="w-3 h-3 text-[#eb0045]" />
                        </Link>

                        <button
                          onClick={() => handleDelete(article.slug, article.title)}
                          className="p-1.5 text-white/40 hover:text-[#eb0045] transition-colors cursor-pointer rounded-md hover:bg-white/5"
                          title="Delete article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Clean Edit / Create Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D1C26] border border-white/20 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-white rounded-lg">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {currentInsight.slug ? "Edit Article" : "Create New Article"}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Publish authoritative legal updates and technical commentary.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-md hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={currentInsight.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCurrentInsight({
                      ...currentInsight,
                      title: val,
                      slug:
                        currentInsight.slug ||
                        val
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-|-$/g, ""),
                    });
                  }}
                  placeholder="e.g. GCC Withholding Tax Optimization Under Modern Treaties"
                  className="w-full px-3.5 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentInsight.slug}
                    onChange={(e) =>
                      setCurrentInsight({ ...currentInsight, slug: e.target.value })
                    }
                    placeholder="e.g. gcc-withholding-tax"
                    className="w-full px-3.5 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] font-mono transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Topic Category *
                  </label>
                  <select
                    value={currentInsight.category}
                    onChange={(e) =>
                      setCurrentInsight({
                        ...currentInsight,
                        category: e.target.value as Insight["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors cursor-pointer"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={currentInsight.author?.name || ""}
                    onChange={(e) =>
                      setCurrentInsight({
                        ...currentInsight,
                        author: {
                          name: e.target.value,
                          role: currentInsight.author?.role || "Advisory Partner",
                        },
                      })
                    }
                    placeholder="e.g. Tariq Al-Mansoor"
                    className="w-full px-3.5 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-white/80 font-medium text-xs">
                    Estimated Reading Time
                  </label>
                  <input
                    type="text"
                    value={currentInsight.readTime || "5 min read"}
                    onChange={(e) =>
                      setCurrentInsight({ ...currentInsight, readTime: e.target.value })
                    }
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Article Lead / Opening Statement
                </label>
                <textarea
                  rows={2}
                  value={currentInsight.lead}
                  onChange={(e) =>
                    setCurrentInsight({ ...currentInsight, lead: e.target.value })
                  }
                  placeholder="A strong opening sentence summarizing the core finding..."
                  className="w-full px-3.5 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-white/80 font-medium text-xs">
                  Short Excerpt (Card Summary)
                </label>
                <textarea
                  rows={2}
                  value={currentInsight.excerpt}
                  onChange={(e) =>
                    setCurrentInsight({ ...currentInsight, excerpt: e.target.value })
                  }
                  placeholder="2-3 sentence overview shown on index cards..."
                  className="w-full px-3.5 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={currentInsight.featured}
                  onChange={(e) =>
                    setCurrentInsight({ ...currentInsight, featured: e.target.checked })
                  }
                  className="accent-[#eb0045] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="featuredCheck" className="text-white text-xs font-medium select-none cursor-pointer">
                  Feature this article prominently on the homepage
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs font-semibold rounded-md cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer disabled:opacity-50 shadow-md shadow-[#eb0045]/20"
                >
                  {isSaving ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
