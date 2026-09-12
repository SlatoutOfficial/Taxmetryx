"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import CTAButton from "@/components/shared/CTAButton";
import { getInsights } from "@/lib/json";
import { useJurisdiction } from "@/context/JurisdictionContext";
import { Insight } from "@/types/insight";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  LineReveal,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

const categories = [
  "All",
  "Transfer Pricing",
  "Corporate Tax",
  "International Tax",
  "VAT & Indirect Tax",
  "Tax Regulation",
];

export default function InsightsSection() {
  const [selected, setSelected] = useState("All");
  const [hoveredInsight, setHoveredInsight] = useState<Insight | null>(null);
  const { jurisdiction, filterActive } = useJurisdiction();
  const allInsights = getInsights();

  // Filter by active jurisdiction first
  const jurisdictionFiltered = filterActive && jurisdiction
    ? allInsights.filter((i) => i.jurisdiction === jurisdiction.code)
    : allInsights;

  // Use the jurisdiction-matched items, falling back to all if none exist for a specific topic
  const insights = jurisdictionFiltered.length > 0 ? jurisdictionFiltered : allInsights;
  const featured = insights.find((i) => i.featured) || insights[0];

  const list = insights
    .filter((i) =>
      selected === "All"
        ? i.id !== featured?.id
        : i.category.toLowerCase() === selected.toLowerCase(),
    )
    .slice(0, 4);

  return (
    <section
      id="insights-section"
      className="reference-section reference-insights"
    >
      <Container>
        <div className="insights-composition">
          <div className="insights-main">
            <FadeIn className="insights-visual" distance={25}>
              <div className="insights-visual-bg">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={hoveredInsight ? hoveredInsight.id : "default-visual"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: LUXURY_EASE }}
                    className="insights-visual-slide"
                  >
                    <Image
                      src={hoveredInsight?.image || "/images/insights-reference.webp"}
                      alt={hoveredInsight?.title || "Sculptural concrete architecture"}
                      fill
                      className="insights-visual-img"
                      sizes="(max-width: 900px) 100vw, 60vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="insights-intro">
                <AnimatePresence mode="wait">
                  {hoveredInsight ? (
                    <motion.div
                      key={hoveredInsight.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="insights-dynamic-content"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#eb0045] animate-pulse" />
                        <span className="text-[11px] font-mono tracking-widest text-[#eb0045] uppercase font-semibold">
                          {hoveredInsight.category}
                        </span>
                        {hoveredInsight.jurisdiction && (
                          <span className="text-[10px] font-mono tracking-wider text-[#646A70] uppercase bg-[#EAE8E3] px-1.5 py-0.5 ml-1">
                            {hoveredInsight.jurisdiction}
                          </span>
                        )}
                      </div>

                      <h2 className="reference-heading insights-dynamic-heading">
                        {hoveredInsight.title}
                      </h2>

                      <p className="reference-copy insights-dynamic-copy">
                        {hoveredInsight.excerpt || hoveredInsight.lead}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default-intro"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="insights-default-content"
                    >
                      <SectionLabel>INSIGHTS</SectionLabel>
                      <h2 className="reference-heading">
                        <em>
                          Knowledge
                          <br />
                          today.
                        </em>
                        <br />A more certain
                        <br />
                        tomorrow.
                      </h2>
                      <LineReveal delay={0.2} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>

            {featured && (
              <FadeIn delay={0.2} distance={20}>
                <div className="flex items-center justify-between featured-label mb-2">
                  <p className="micro-copy">FEATURED INSIGHT</p>
                  {featured.jurisdiction && (
                    <span className="text-[10px] font-mono tracking-widest text-[#727d85] uppercase">
                      {featured.jurisdiction}
                    </span>
                  )}
                </div>

                <Link
                  href={`/insights/${featured.slug}`}
                  className="featured-insight group"
                >
                  <div className="featured-insight-stage">
                    <div className="featured-insight-media">
                      <Image
                        src={featured.image || "/images/insights-reference.webp"}
                        alt={featured.title}
                        fill
                        className="featured-insight-img"
                        sizes="(max-width: 900px) 100vw, 60vw"
                        priority
                      />
                      <div className="featured-insight-scrim" />
                    </div>

                    <div className="featured-insight-body">
                      <div className="featured-insight-details">
                        <span className="featured-insight-tag">
                          {featured.category}
                        </span>
                        <h3 className="featured-insight-title">
                          {featured.title}
                        </h3>
                        {featured.excerpt && (
                          <p className="featured-insight-excerpt">
                            {featured.excerpt}
                          </p>
                        )}
                        <small className="featured-insight-meta">
                          {featured.monthYear} &nbsp; | &nbsp; {featured.readTime}
                        </small>
                      </div>
                      <span className="featured-insight-action">
                        Read insight <ArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )}
          </div>

          <div
            className="latest-insights"
            onMouseLeave={() => setHoveredInsight(null)}
          >
            <FadeIn distance={15}>
              <SectionLabel>LATEST INSIGHTS</SectionLabel>
            </FadeIn>

            <StaggerContainer
              aria-live="polite"
              staggerDelay={0.08}
              delayChildren={0.1}
            >
              {list.length ? (
                list.map((article) => {
                  const isActive = hoveredInsight?.id === article.id;
                  return (
                    <StaggerItem key={article.id}>
                      <Link
                        href={`/insights/${article.slug}`}
                        className={`insight-row ${isActive ? "is-active" : ""}`}
                        onMouseEnter={() => setHoveredInsight(article)}
                        onFocus={() => setHoveredInsight(article)}
                      >
                        <time dateTime={article.publishedAt}>
                          <strong>{article.day}</strong>
                          <small>{article.monthYear}</small>
                        </time>
                        <div>
                          <span className="insight-category">
                            {article.category}
                          </span>
                          <h3>{article.title}</h3>
                          <p>{article.excerpt}</p>
                        </div>
                        <ArrowRight />
                      </Link>
                    </StaggerItem>
                  );
                })
              ) : (
                <p className="insight-empty">
                  New insights in this practice are coming soon.{" "}
                  <Link href="/insights">Explore all insights.</Link>
                </p>
              )}
            </StaggerContainer>

            <FadeIn delay={0.25} distance={15} className="pt-4">
              <CTAButton href="/insights" variant="secondary" size="md" icon>
                View All Insights
              </CTAButton>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
