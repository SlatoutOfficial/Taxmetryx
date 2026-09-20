"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Sparkles,
  Clock,
  Calendar,
  User,
  Tag,
  Eye,
  FileEdit,
  Code2,
  Plus,
  X,
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Table as TableIcon,
  RefreshCw,
} from "lucide-react";
import { Insight } from "@/types/insight";
import { convertHtmlToMarkdown } from "@/lib/turndown";

const CATEGORIES = [
  "Transfer Pricing",
  "Corporate Tax",
  "International Tax",
  "VAT & Indirect Tax",
  "Cross-Border M&A",
  "Pillar Two & Global Tax",
];

export default function NewInsightPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "turndown">("editor");

  const [article, setArticle] = useState<Partial<Insight>>({
    title: "",
    slug: "",
    category: "Transfer Pricing",
    readTime: "6 min read",
    publishedAt: new Date().toISOString().split("T")[0],
    lead: "",
    excerpt: "",
    featured: false,
    image: "/images/insights-architecture.jpg",
    author: { name: "Taxmetryx Global", role: "Advisory Leader" },
    keyTakeaways: ["Statutory alignment with UAE Federal Decree-Law No. 47 of 2022"],
    tags: ["Transfer Pricing", "UAE"],
  });

  const [markdownContent, setMarkdownContent] = useState(
    "## Statutory Background\n\nEnter the legal framework, OECD commentary, or cabinet decisions governing this area...\n\n## Technical Analysis & Economic Substance\n\nProvide granular economic analysis, functional characterizations, and transaction risk models...\n\n## Implementation & Compliance Action Plan\n\nConcrete advisory guidance for multi-jurisdictional finance and tax directors."
  );
  const [htmlInput, setHtmlInput] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newTakeaway, setNewTakeaway] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);

  // Auto generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const updates: Partial<Insight> = { title };
    if (autoSlug) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      updates.slug = generated;
    }
    setArticle((prev) => ({ ...prev, ...updates }));
  };

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
  }, [article, markdownContent]);

  // Turndown HTML conversion
  const handleConvertHtml = () => {
    if (!htmlInput.trim()) {
      toast.error("Please paste HTML first.");
      return;
    }
    try {
      const converted = convertHtmlToMarkdown(htmlInput);
      setMarkdownContent(converted);
      setHtmlInput("");
      setActiveTab("editor");
      toast.success("HTML successfully converted to GitHub-Flavored Markdown!");
    } catch {
      toast.error("Failed to convert HTML to markdown.");
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setMarkdownContent((prev) => prev + `\n\n${prefix}Heading or text${suffix}`);
  };

  const wordCount = useMemo(() => {
    const text = `${article.title || ""} ${article.lead || ""} ${markdownContent || ""}`;
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length;
  }, [article.title, article.lead, markdownContent]);

  const autoCalculateReadTime = () => {
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    setArticle((prev) => ({ ...prev, readTime: `${minutes} min read` }));
    toast.success(`Calculated: ${minutes} min read (${wordCount} words)`);
  };

  const handleDateChange = (dateVal: string) => {
    if (!dateVal) {
      setArticle((prev) => ({ ...prev, publishedAt: "" }));
      return;
    }
    const parts = dateVal.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const mIndex = parseInt(month, 10) - 1;
      const monthYear = `${monthNames[mIndex] || "JAN"} ${year}`;
      setArticle((prev) => ({
        ...prev,
        publishedAt: dateVal,
        day: day.padStart(2, "0"),
        monthYear,
      }));
    } else {
      setArticle((prev) => ({ ...prev, publishedAt: dateVal }));
    }
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!article.title || !article.slug) {
      toast.error("Title and URL slug are required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        ...article,
        markdown: markdownContent,
      };

      const res = await fetch("/api/admin/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Publication created successfully!");
        router.push(`/admin/insights/edit/${article.slug}`);
      } else {
        toast.error(data.message || "Failed to create publication.");
      }
    } catch {
      toast.error("Network error while creating publication.");
    } finally {
      setIsSaving(false);
    }
  };

  const addTakeaway = () => {
    if (!newTakeaway.trim()) return;
    setArticle((prev) => ({
      ...prev,
      keyTakeaways: [...(prev.keyTakeaways || []), newTakeaway.trim()],
    }));
    setNewTakeaway("");
  };

  const removeTakeaway = (index: number) => {
    setArticle((prev) => ({
      ...prev,
      keyTakeaways: (prev.keyTakeaways || []).filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    if ((article.tags || []).includes(newTag.trim())) {
      setNewTag("");
      return;
    }
    setArticle((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), newTag.trim()],
    }));
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    setArticle((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((t) => t !== tagToRemove),
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl pb-24">
      {/* Top Header & Navigation Bar */}
      <div className="pb-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/insights"
            className="w-8 h-8 rounded-md bg-[#0D1C26] hover:bg-[#152735] border border-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Back to Articles"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-[#eb0045] uppercase tracking-wider">
                New Publication
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs text-white/50">Draft</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {article.title || "Untitled New Article"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
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
            <span>{isSaving ? "Publishing..." : "Publish Article"}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-black/30 rounded-xs text-[10px] text-white/60 ml-1">
              Ctrl+S
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Editor & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Writing Canvas (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Article Header Card */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Article Title *
                </label>
                <span className="text-[11px] text-white/40">
                  {article.title?.length || 0} characters
                </span>
              </div>
              <input
                type="text"
                value={article.title || ""}
                onChange={handleTitleChange}
                placeholder="e.g. Navigating Transfer Pricing Benchmark Audits in the UAE"
                className="w-full px-4 py-3 bg-[#071219] border border-white/15 text-white font-semibold text-base sm:text-lg rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors"
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Hero Subtitle / Lead Paragraph
              </label>
              <textarea
                rows={3}
                value={article.lead || ""}
                onChange={(e) => setArticle({ ...article, lead: e.target.value })}
                placeholder="A compelling high-level opening narrative introducing the statutory dilemma and corporate implications..."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white/90 text-xs sm:text-sm rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                Card Excerpt (Meta Summary)
              </label>
              <textarea
                rows={2}
                value={article.excerpt || ""}
                onChange={(e) => setArticle({ ...article, excerpt: e.target.value })}
                placeholder="Concise 1-2 sentence summary displayed on homepage cards and search results..."
                className="w-full px-4 py-2.5 bg-[#071219] border border-white/15 text-white/70 text-xs rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Tabbed Content Workspace */}
          <div className="bg-[#0D1C26] border border-white/10 rounded-lg overflow-hidden shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#071219] px-4 py-2.5 gap-2">
              <div className="flex items-center gap-1 bg-[#0D1C26] p-1 rounded-md border border-white/10">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === "editor"
                      ? "bg-[#eb0045] text-white shadow-xs"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <FileEdit className="w-3.5 h-3.5" />
                  <span>Markdown Editor</span>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-[#eb0045] text-white shadow-xs"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab("turndown")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === "turndown"
                      ? "bg-[#eb0045] text-white shadow-xs"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>HTML Import (Turndown)</span>
                </button>
              </div>

              {activeTab === "editor" && (
                <div className="flex items-center gap-1 text-white/60 overflow-x-auto scrollbar-thin py-1">
                  <button
                    onClick={() => insertMarkdown("## ", "")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Heading 2"
                  >
                    <Heading2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("### ", "")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Heading 3"
                  >
                    <Heading3 className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    onClick={() => insertMarkdown("**", "**")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("*", "*")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    onClick={() => insertMarkdown("- ", "")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Bullet List"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("1. ", "")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => insertMarkdown("> ", "")}
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Quote"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() =>
                      insertMarkdown(
                        "| Factor | OECD Norm | UAE Implementation |\n| --- | --- | --- |\n| DEMPE | Economic Ownership | Ministry Guidance 2024 |\n"
                      )
                    }
                    className="p-1.5 hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                    title="Insert Table"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {activeTab === "editor" && (
              <div className="p-4">
                <textarea
                  rows={22}
                  value={markdownContent}
                  onChange={(e) => setMarkdownContent(e.target.value)}
                  placeholder="Write your article in GitHub-Flavored Markdown..."
                  className="w-full font-mono text-xs sm:text-sm text-white/90 bg-[#071219] p-4 rounded-md border border-white/10 focus:outline-hidden focus:border-[#eb0045] transition-colors leading-relaxed resize-y min-h-[400px]"
                />
                <div className="flex items-center justify-between text-[11px] text-white/40 mt-2 px-1">
                  <span>GitHub Flavored Markdown (GFM) enabled</span>
                  <span>{wordCount} words total</span>
                </div>
              </div>
            )}

            {activeTab === "preview" && (
              <div className="p-6 bg-[#071219] min-h-[450px] space-y-6 text-white text-xs sm:text-sm">
                <div className="pb-4 border-b border-white/10">
                  <div className="text-[11px] uppercase tracking-wider text-[#eb0045] font-semibold">
                    {article.category}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {article.title || "Untitled Article Preview"}
                  </h2>
                  {article.lead && (
                    <p className="text-sm text-white/70 italic mt-3 border-l-2 border-[#eb0045] pl-3 py-1">
                      {article.lead}
                    </p>
                  )}
                </div>

                <div className="prose prose-invert max-w-none space-y-4">
                  {markdownContent ? (
                    markdownContent.split("\n\n").map((block, idx) => {
                      if (block.startsWith("## ")) {
                        return (
                          <h3
                            key={idx}
                            className="text-lg font-bold text-white pt-4 pb-1 border-b border-white/10"
                          >
                            {block.replace("## ", "")}
                          </h3>
                        );
                      }
                      if (block.startsWith("### ")) {
                        return (
                          <h4 key={idx} className="text-base font-semibold text-white/90 pt-2">
                            {block.replace("### ", "")}
                          </h4>
                        );
                      }
                      if (block.startsWith("> ")) {
                        return (
                          <blockquote
                            key={idx}
                            className="p-3 bg-white/5 border-l-4 border-[#eb0045] text-white/80 rounded-r-sm italic"
                          >
                            {block.replace("> ", "")}
                          </blockquote>
                        );
                      }
                      if (block.startsWith("- ") || block.startsWith("* ")) {
                        const items = block.split("\n").map((line) => line.replace(/^[-*]\s+/, ""));
                        return (
                          <ul key={idx} className="list-disc list-inside space-y-1 text-white/80 pl-2">
                            {items.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={idx} className="text-white/80 leading-relaxed">
                          {block}
                        </p>
                      );
                    })
                  ) : (
                    <div className="text-white/30 italic py-8 text-center">
                      No markdown content written yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "turndown" && (
              <div className="p-6 space-y-4 bg-[#071219]">
                <div className="p-4 bg-[#0D1C26] border border-white/10 rounded-md space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <Sparkles className="w-4 h-4 text-[#eb0045]" />
                    <span>One-Click Turndown HTML to Markdown Conversion</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Paste raw HTML from MS Word or Google Docs below. Our Turndown engine converts
                    all formatting into clean Markdown.
                  </p>
                </div>

                <textarea
                  rows={10}
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                  placeholder="<h2>Article Heading</h2><p>Article body content...</p>"
                  className="w-full font-mono text-xs text-white/90 bg-[#050E14] p-4 rounded-md border border-white/15 focus:outline-hidden focus:border-[#eb0045]"
                />

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => setHtmlInput("")}
                    className="px-3 py-2 text-xs text-white/50 hover:text-white transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleConvertHtml}
                    className="px-4 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Convert & Apply to Editor</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Key Takeaways Builder */}
          <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Executive Takeaways
                </h3>
                <p className="text-xs text-white/50 mt-0.5">
                  Core statutory conclusions highlighted at the start of the article.
                </p>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
                {article.keyTakeaways?.length || 0} items
              </span>
            </div>

            <div className="space-y-2">
              {(article.keyTakeaways || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 bg-[#071219] border border-white/10 rounded-md text-xs text-white/90 group"
                >
                  <div className="flex items-start gap-2 flex-1">
                    <span className="w-4 h-4 rounded-full bg-[#eb0045]/20 text-[#eb0045] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                  <button
                    onClick={() => removeTakeaway(idx)}
                    className="text-white/30 hover:text-[#eb0045] transition-colors p-1"
                    title="Remove item"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newTakeaway}
                onChange={(e) => setNewTakeaway(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTakeaway()}
                placeholder="Type a key takeaway and press Enter or Add..."
                className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <button
                onClick={addTakeaway}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Settings Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publication Settings */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Publication Settings
            </h3>

            <div className="flex items-center justify-between p-3 bg-[#071219] border border-white/10 rounded-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Featured Article</div>
                  <div className="text-[11px] text-white/50">Show prominently on homepage</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(article.featured)}
                onChange={(e) => setArticle({ ...article, featured: e.target.checked })}
                className="w-4 h-4 accent-[#eb0045] cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Category</label>
              <select
                value={article.category || "Transfer Pricing"}
                onChange={(e) => setArticle({ ...article, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/70">Read Time</label>
                <button
                  type="button"
                  onClick={autoCalculateReadTime}
                  className="text-[11px] text-[#eb0045] hover:underline cursor-pointer"
                >
                  Auto-Calculate
                </button>
              </div>
              <div className="relative">
                <Clock className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={article.readTime || ""}
                  onChange={(e) => setArticle({ ...article, readTime: e.target.value })}
                  placeholder="e.g. 6 min read"
                  className="w-full pl-9 pr-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Published Date</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={article.publishedAt || ""}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>
          </div>

          {/* Author Card */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Author Information
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Author Name</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={article.author?.name || ""}
                  onChange={(e) =>
                    setArticle({
                      ...article,
                      author: {
                        name: e.target.value,
                        role: article.author?.role || "",
                      },
                    })
                  }
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full pl-9 pr-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Author Title / Role</label>
              <input
                type="text"
                value={article.author?.role || ""}
                onChange={(e) =>
                  setArticle({
                    ...article,
                    author: {
                      name: article.author?.name || "",
                      role: e.target.value,
                    },
                  })
                }
                placeholder="e.g. Head of Transfer Pricing"
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Cover Image
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Image URL</label>
              <input
                type="text"
                value={article.image || ""}
                onChange={(e) => setArticle({ ...article, image: e.target.value })}
                placeholder="/images/insights-architecture.jpg"
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>

            {article.image && (
              <div className="space-y-1.5">
                <span className="text-[11px] text-white/50">Preview Thumbnail</span>
                <div className="relative aspect-video rounded-md overflow-hidden border border-white/10 bg-[#071219]">
                  <img
                    src={article.image}
                    alt={article.title || "Cover Preview"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* URL Slug */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                URL Slug
              </h3>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className={`text-[10px] px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                  autoSlug ? "bg-[#eb0045]/20 text-[#eb0045]" : "bg-white/10 text-white/60"
                }`}
              >
                {autoSlug ? "Auto-sync from title" : "Manual slug"}
              </button>
            </div>

            <div className="space-y-1.5">
              <input
                type="text"
                value={article.slug || ""}
                onChange={(e) => {
                  setAutoSlug(false);
                  setArticle({ ...article, slug: e.target.value });
                }}
                placeholder="article-url-slug"
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white font-mono text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <span className="text-[11px] text-white/40 block">
                Target URL: /insights/{article.slug || "..."}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Article Tags
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {(article.tags || []).map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/80 text-[11px] font-medium flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-white/40" />
                  <span>{t}</span>
                  <button
                    onClick={() => removeTag(t)}
                    className="text-white/40 hover:text-white ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="Add tag..."
                className="flex-1 px-3 py-1.5 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
              <button
                onClick={addTag}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
