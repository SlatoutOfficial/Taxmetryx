"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import CTAButton from "@/components/shared/CTAButton";
import { getInsights } from "@/lib/json";
import { useJurisdiction } from "@/context/JurisdictionContext";
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
  const { jurisdiction, filterActive, clearFilter } = useJurisdiction();
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
              <Image
                src="/images/insights-reference.webp"
                alt="Sculptural concrete architecture"
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
              />
              <div className="insights-intro">
                <SectionLabel>INSIGHTS</SectionLabel>
                <h2 className="reference-heading">
                  Knowledge
                  <br />
                  today.
                  <br />A more certain
                  <br />
                  tomorrow.
                </h2>
                <LineReveal delay={0.2} />
                <p className="reference-copy">
                  Thoughts, perspectives and practical insights on Transfer
                  Pricing, Corporate Tax, International Tax, regulation and the
                  evolving global tax landscape.
                </p>
              </div>
            </FadeIn>

            {featured && (
              <FadeIn delay={0.2} distance={20}>
                <p className="micro-copy featured-label">FEATURED INSIGHT</p>
                <Link
                  href={`/insights/${featured.slug}`}
                  className="featured-insight"
                >
                  <Image
                    src="/images/insights-reference.webp"
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 60vw"
                  />
                  <div>
                    <span className="micro-copy">{featured.category}</span>
                    <h3>{featured.title}</h3>
                    <small>
                      {featured.monthYear} &nbsp; | &nbsp; {featured.readTime}
                    </small>
                  </div>
                  <span>
                    Read insight <ArrowRight />
                  </span>
                </Link>
              </FadeIn>
            )}
          </div>

          <div className="latest-insights">
            <FadeIn
              className="flex items-center justify-between gap-2 flex-wrap mb-4"
              distance={15}
            >
              <SectionLabel>LATEST INSIGHTS</SectionLabel>
              {filterActive && (
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase bg-[#F8F7F4] border border-[#E7E5E1] px-2 py-1">
                  <span className="text-[#646A70]">JURISDICTION:</span>
                  <span className="text-[#080E14] font-semibold">{jurisdiction.name}</span>
                  <button
                    type="button"
                    onClick={clearFilter}
                    className="text-[#e00019] hover:underline font-bold ml-1 cursor-pointer"
                    title="Show all jurisdictions"
                  >
                    × Show All
                  </button>
                </div>
              )}
            </FadeIn>

            <StaggerContainer
              aria-live="polite"
              staggerDelay={0.08}
              delayChildren={0.1}
            >
              {list.length ? (
                list.map((article) => (
                  <StaggerItem key={article.id}>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="insight-row"
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
                ))
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
