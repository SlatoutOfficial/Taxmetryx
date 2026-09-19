"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Plus,
  Edit3,
  ArrowUpRight,
  Search,
  Filter,
  Trash2,
  Sparkles,
  Clock,
  BookOpen,
} from "lucide-react";
import { getInsights } from "@/lib/json";
import { Insight } from "@/types/insight";

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>(getInsights());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

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
            Publish and manage client advisories and technical tax bulletins with dedicated full-page editing.
          </p>
        </div>

        <Link
          href="/admin/insights/new"
          className="px-4 py-2.5 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Article</span>
        </Link>
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
              <option key={cat} value={cat} className="bg-[#0D1C26] text-white">
                {cat === "ALL" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Insights Table */}
      <div className="bg-[#0D1C26] border border-white/10 rounded-lg shadow-sm overflow-hidden">
        {filteredInsights.length === 0 ? (
          <div className="py-16 px-4 text-center">
            <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/60 text-sm font-medium">No publications found.</p>
            <p className="text-white/40 text-xs mt-1">
              Try adjusting your search query or category filter.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-white/50 text-[11px] font-semibold tracking-wider uppercase bg-[#071219]">
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
                      <Link
                        href={`/admin/insights/edit/${article.slug}`}
                        className="font-semibold text-white text-sm group-hover:text-[#eb0045] transition-colors block"
                      >
                        {article.title}
                      </Link>
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
                        <Link
                          href={`/admin/insights/edit/${article.slug}`}
                          className="px-3 py-1.5 bg-[#071219] hover:bg-[#eb0045] border border-white/10 hover:border-transparent text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>

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
    </div>
  );
}
