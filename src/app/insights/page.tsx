"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/shared/Container";
import Counter from "@/components/shared/Counter";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getInsights } from "@/lib/json";
import { Insight } from "@/types/insight";
import { ArrowUpRight, Search, Clock, User, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/shared/ScrollMotion";

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
  const [allInsights, setAllInsights] = useState<Insight[]>(getInsights());
  const { jurisdiction, filterActive, clearFilter } = useJurisdiction();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/insights", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setAllInsights(data.data);
        }
      })
      .catch(() => {});
  }, []);

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
      {/* Hero Section with Architectural Image Style Banner */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <FadeIn direction="up" className="lg:col-span-7 space-y-6">
              <SectionLabel>TECHNICAL PUBLICATIONS & RESEARCH</SectionLabel>
              <h1 className="font-editorial text-clamp-hero text-brand-primary leading-tight">
                Insights <br />
                <span className="text-brand-red">That Turn Complexity into Clarity.</span>
              </h1>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-sans max-w-xl">
                Explore expert perspectives, regulatory updates and practical guidance designed to help businesses navigate change, manage risk and make informed decisions with confidence.
              </p>

              {/* Fast Facts Bar */}
              <div className="flex flex-row items-stretch gap-4 sm:gap-7 pt-4 border-t border-[#E7E5E1] max-w-xl">
                <div>
                  <div className="font-editorial text-2xl sm:text-3xl text-brand-primary font-bold">
                    <Counter end={45} suffix="+" />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted whitespace-nowrap">
                    Technical Papers
                  </div>
                </div>
                <div className="border-l border-[#E7E5E1] pl-4 sm:pl-7">
                  <div className="font-editorial text-2xl sm:text-3xl text-brand-primary font-bold">
                    <Counter end={6} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted whitespace-nowrap">
                    Core Practices
                  </div>
                </div>
                <div className="border-l border-[#E7E5E1] pl-4 sm:pl-7">
                  <div className="font-editorial text-2xl sm:text-3xl text-brand-red font-bold whitespace-nowrap">
                    UAE
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted whitespace-nowrap">
                    Jurisdictions
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right Visual Image Frame */}
            <ScaleIn delay={0.15} className="lg:col-span-5 relative">
              <div className="relative p-2 bg-white border border-[#E7E5E1] shadow-md">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-brand-dark group">
                  <Image
                    src="/images/insights-architecture.jpg"
                    alt="Taxmetryx Technical Publications and Research in Dubai"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
                        RESEARCH DESK
                      </div>
                      <div className="font-editorial text-base sm:text-lg">
                        Dubai • Tax Research
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase text-white">
                      FTA & OECD
                    </span>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </Container>
      </section>

      {/* Insights Editorial Archive */}
      <section className="py-12 sm:py-16">
        <Container>
          {/* Integrated Filter & Search Toolbar directly above articles */}
          <FadeIn direction="up" className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E7E5E1]">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
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

              {/* Right Side: Search Input & Jurisdiction indicator */}
              <div className="flex items-center gap-3 shrink-0">
                {filterActive && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E5E1] text-xs font-mono">
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

                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search publications..."
                    className="w-full pl-9 pr-4 py-2 bg-white border border-[#E7E5E1] text-xs sm:text-sm text-brand-primary placeholder:text-brand-muted focus:outline-hidden focus:border-brand-red transition-colors"
                  />
                  <Search className="w-4 h-4 text-brand-muted absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </FadeIn>

          {filteredInsights.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#E7E5E1] space-y-3">
              <p className="font-editorial text-2xl text-brand-primary">
                No publications found
              </p>
              <p className="text-xs text-brand-muted">
                Try clearing your search query or choosing another category filter.
              </p>
              <div className="pt-2">
                <CTAButton
                  onClick={() => {
                    setSelectedCategory("ALL");
                    setSearchQuery("");
                  }}
                  variant="primary"
                  size="sm"
                >
                  Reset Filters
                </CTAButton>
              </div>
            </div>
          ) : (
            <StaggerContainer
              staggerDelay={0.08}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredInsights.map((article) => (
                <StaggerItem key={article.slug}>
                  <article className="bg-white border border-[#E7E5E1] hover:border-brand-red/60 transition-all duration-300 flex flex-col justify-between group h-full shadow-xs hover:shadow-md">
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
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </Container>
      </section>
    </div>
  );
}
