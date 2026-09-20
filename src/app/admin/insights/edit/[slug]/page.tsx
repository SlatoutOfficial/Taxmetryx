"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowUpRight,
  Save,
  Trash2,
  Sparkles,
  Clock,
  Calendar,
  User,
  Tag,
  Eye,
  FileEdit,
  Code2,
  Copy,
  Check,
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
  AlertCircle,
  ExternalLink,
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

export default function EditInsightPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "turndown">("editor");

  const [article, setArticle] = useState<Partial<Insight>>({
    title: "",
    slug: "",
    category: "Corporate Tax",
    readTime: "6 min read",
    publishedAt: new Date().toISOString().split("T")[0],
    lead: "",
    excerpt: "",
    featured: false,
    image: "/images/insights-architecture.jpg",
    author: { name: "Taxmetryx Partner", role: "Advisory Leader" },
    keyTakeaways: [],
    tags: ["UAE Tax", "Corporate Tax"],
  });

  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlInput, setHtmlInput] = useState("");
  const [copiedSlug, setCopiedSlug] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newTakeaway, setNewTakeaway] = useState("");

  // Load article
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/admin/insights?slug=${encodeURIComponent(slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const item: Insight = data.data;
          setArticle(item);

          // Convert sections back to markdown for editing
          if (item.sections && item.sections.length > 0) {
            const md = item.sections
              .map((s) => `## ${s.heading}\n\n${(s.content || []).join("\n\n")}`)
              .join("\n\n\n");
            setMarkdownContent(md);
          } else if (item.lead) {
            setMarkdownContent(`## Overview\n\n${item.lead}`);
          }
        } else {
          toast.error("Article not found.");
          router.push("/admin/insights");
        }
      })
      .catch(() => {
        toast.error("Error loading article.");
      })
      .finally(() => setLoading(false));
  }, [slug, router]);

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

  // Helper to insert markdown tags at cursor/end
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    setMarkdownContent((prev) => prev + `\n\n${prefix}Heading or text${suffix}`);
  };

  // Word count & read time estimator
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

  const handleCopyPermalink = () => {
    const url = `${window.location.origin}/insights/${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(true);
    setTimeout(() => setCopiedSlug(false), 2000);
    toast.success("Public URL copied to clipboard!");
  };

  // Save handler
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
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Publication saved successfully!");
      } else {
        toast.error(data.message || "Failed to update publication.");
      }
    } catch {
      toast.error("Network error while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${article.title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/insights?slug=${encodeURIComponent(article.slug || "")}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Publication deleted successfully.");
        router.push("/admin/insights");
      } else {
        toast.error(data.message || "Failed to delete.");
      }
    } catch {
      toast.error("Network error while deleting.");
    }
  };

  // Key Takeaways functions
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

  // Tags functions
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-white/50 text-sm">
        <RefreshCw className="w-5 h-5 animate-spin mr-3 text-[#eb0045]" />
        Loading article details...
      </div>
    );
  }

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
              <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                Article Editor
              </span>
              <span className="text-white/20">•</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#eb0045]/15 text-[#eb0045] border border-[#eb0045]/30">
                {article.category || "Tax Advisory"}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-1">
              {article.title || "Untitled Article"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Link
            href={`/insights/${article.slug}`}
            target="_blank"
            className="px-3 py-2 bg-[#0D1C26] hover:bg-[#152735] border border-white/15 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span>Live Article</span>
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
            <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 bg-black/30 rounded-xs text-[10px] text-white/60 ml-1">
              Ctrl+S
            </kbd>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Editor & Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Center: Main Writing Canvas (8 cols) */}
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
                onChange={(e) => setArticle({ ...article, title: e.target.value })}
                placeholder="e.g. Navigating Transfer Pricing Benchmark Audits in the UAE"
                className="w-full px-4 py-3 bg-[#071219] border border-white/15 text-white font-semibold text-base sm:text-lg rounded-md focus:outline-hidden focus:border-[#eb0045] transition-colors"
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
            {/* Tab Controls & Formatting Toolbar */}
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
                        "| Criteria | Requirement | Guidance |\n| --- | --- | --- |\n| Substance | Mandatory Core Activities | Cabinet Decision No. 57 |\n| Threshold | AED 375,000 | Article 3 |\n"
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

            {/* Tab 1: Editor Pane */}
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

            {/* Tab 2: Live Preview Pane */}
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
                      No markdown content written yet. Switch to Editor to compose.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Turndown HTML Importer */}
            {activeTab === "turndown" && (
              <div className="p-6 space-y-4 bg-[#071219]">
                <div className="p-4 bg-[#0D1C26] border border-white/10 rounded-md space-y-2">
                  <div className="flex items-center gap-2 text-white font-semibold text-xs">
                    <Sparkles className="w-4 h-4 text-[#eb0045]" />
                    <span>One-Click Turndown HTML to Markdown Conversion</span>
                  </div>
                  <p className="text-xs text-white/60">
                    Paste raw HTML from MS Word, Google Docs, or existing web publications below.
                    Our Turndown engine converts tags, tables, headings, and bold formatting into
                    clean GitHub-Flavored Markdown.
                  </p>
                </div>

                <textarea
                  rows={10}
                  value={htmlInput}
                  onChange={(e) => setHtmlInput(e.target.value)}
                  placeholder="<h2>Substantive TP Adjustments</h2><p>Article 55 of UAE Corporate Tax Decree Law requires...</p>"
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

            {/* List of Takeaways */}
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

              {(!article.keyTakeaways || article.keyTakeaways.length === 0) && (
                <div className="text-xs text-white/30 italic p-3 text-center border border-dashed border-white/10 rounded-md">
                  No executive takeaways added yet.
                </div>
              )}
            </div>

            {/* Add Takeaway Input */}
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

          {/* Bottom Save Bar */}
          <div className="p-4 bg-[#0D1C26] border border-white/10 rounded-lg flex items-center justify-between gap-4">
            <Link
              href="/admin/insights"
              className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Articles</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href={`/insights/${article.slug}`}
                target="_blank"
                className="px-3 py-2 bg-[#071219] hover:bg-[#152735] border border-white/15 text-white/80 hover:text-white text-xs font-medium rounded-md inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Live Article</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#eb0045]" />
              </Link>
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2 bg-[#eb0045] hover:bg-[#c9003b] disabled:opacity-50 text-white text-xs font-semibold rounded-md inline-flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#eb0045]/20"
              >
                {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Metadata & Settings Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publishing & Category Card */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              Publication Settings
            </h3>

            {/* Featured Switch */}
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

            {/* Category Dropdown */}
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

            {/* Read Time with Auto Calculator */}
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
                  placeholder="e.g. 7 min read"
                  className="w-full pl-9 pr-3 py-2 bg-[#071219] border border-white/15 text-white text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
                />
              </div>
            </div>

            {/* Published Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Published Date</label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="date"
                  value={article.publishedAt || ""}
                  onChange={(e) => setArticle({ ...article, publishedAt: e.target.value })}
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

          {/* Hero Cover Image Card */}
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

          {/* URL Slug & Permalink Card */}
          <div className="p-5 bg-[#0D1C26] border border-white/10 rounded-lg space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-white/10">
              URL Slug & Permalink
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Slug (Unique identifier)</label>
              <input
                type="text"
                value={article.slug || ""}
                onChange={(e) => setArticle({ ...article, slug: e.target.value })}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white font-mono text-xs rounded-md focus:outline-hidden focus:border-[#eb0045]"
              />
            </div>

            <div className="p-2.5 bg-[#071219] border border-white/10 rounded-md flex items-center justify-between gap-2 text-xs">
              <span className="text-white/60 font-mono text-[11px] truncate">
                /insights/{article.slug}
              </span>
              <button
                type="button"
                onClick={handleCopyPermalink}
                className="p-1.5 hover:bg-white/10 rounded-sm text-white/60 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Copy URL"
              >
                {copiedSlug ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Tags Card */}
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
                placeholder="Add tag (e.g. Pillar 2)..."
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

          {/* Danger Zone */}
          <div className="p-5 bg-red-950/20 border border-red-500/20 rounded-lg space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
              <AlertCircle className="w-4 h-4" />
              <span>Danger Zone</span>
            </div>
            <p className="text-[11px] text-white/50">
              Permanently delete this publication and all its stored content from the live database.
            </p>
            <button
              onClick={handleDelete}
              className="w-full py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Publication</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
