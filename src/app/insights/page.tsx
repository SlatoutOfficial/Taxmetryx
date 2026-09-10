"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { getInsights } from "@/lib/json";
import { ArrowUpRight, Search, Clock, User, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJurisdiction } from "@/context/JurisdictionContext";

const categories = [
  "ALL",
  "TRANSFER PRICING",
  "CORPORATE TAX",
  "INTERNATIONAL TAX",
  "VAT & INDIRECT TAX",
  "TAX REGULATION",
  "GLOBAL TAX",
];

export default function InsightsPage() {
  const allInsights = getInsights();
  const { jurisdiction, filterActive, clearFilter } = useJurisdiction();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = allInsights.filter((item) => {
    const matchesJurisdiction =
      !filterActive || !jurisdiction || item.jurisdiction === jurisdiction.code;

    const matchesCat =
      selectedCategory === "ALL" ||
      item.category.toUpperCase() === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesJurisdiction && matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Insights" }]} />
      </Container>

      {/* Hero Section */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-6">
            <SectionLabel>TECHNICAL PUBLICATIONS</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Knowledge today. <br />
              <span className="text-brand-red">A more certain tomorrow.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
              Forensic analysis, statutory interpretations, and cross-border advisory opinions authored by Taxmetryx partners in Dubai DIFC.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 pt-8 border-t border-[#E7E5E1] space-y-6">
            {/* Search Input & Jurisdiction Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative max-w-md w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or statute..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E7E5E1] text-xs sm:text-sm text-brand-primary focus:outline-hidden focus:border-brand-red transition-colors"
                />
                <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              {filterActive && (
                <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[#E7E5E1] text-xs font-mono">
                  <span className="text-brand-muted">JURISDICTION:</span>
                  <span className="font-semibold text-brand-primary uppercase">{jurisdiction.name}</span>
                  <button
                    type="button"
                    onClick={clearFilter}
                    className="flex items-center gap-0.5 text-brand-red hover:underline font-bold text-[11px] ml-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                    selectedCategory === cat
                      ? "bg-brand-red text-white font-semibold shadow-xs"
                      : "bg-white text-brand-charcoal border border-[#E7E5E1] hover:border-brand-primary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Insights Editorial Archive */}
      <section className="py-16 sm:py-24">
        <Container>
          {filteredInsights.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E7E5E1] space-y-3">
              <p className="font-editorial text-2xl text-brand-primary">
                No publications found
              </p>
              <p className="text-xs text-brand-muted">
                Try clearing your search query or choosing another category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-xs uppercase font-semibold text-brand-red hover:underline pt-2 inline-block cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInsights.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white border border-[#E7E5E1] hover:border-brand-red/60 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Visual Frame */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#E7E5E1] bg-brand-dark">
                      <Image
                        src={article.image || "/images/insights-architecture.jpg"}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-brand-dark/95 text-white px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest">
                        {article.category}
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-brand-muted font-mono">
                        <span>{article.monthYear}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <Link href={`/insights/${article.slug}`}>
                        <h2 className="font-editorial text-xl sm:text-2xl text-brand-primary group-hover:text-brand-red transition-colors leading-snug line-clamp-2">
                          {article.title}
                        </h2>
                      </Link>

                      <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer with Author & Link */}
                  <div className="p-6 pt-0 space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-[#F8F7F4] text-[10px] text-brand-muted border border-[#E7E5E1]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#E7E5E1] flex items-center justify-between text-xs">
                      <span className="text-brand-muted text-[11px] truncate max-w-[150px]">
                        {article.author.name}
                      </span>
                      <Link
                        href={`/insights/${article.slug}`}
                        className="inline-flex items-center gap-1 font-semibold uppercase tracking-wider text-brand-red hover:underline text-[11px]"
                      >
                        <span>Read Analysis</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
