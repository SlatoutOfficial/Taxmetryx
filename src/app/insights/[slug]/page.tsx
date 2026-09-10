import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getInsights, getInsightBySlug } from "@/lib/json";
import { ArrowUpRight, Clock, User, CheckCircle2, Share2, ArrowLeft, Bookmark } from "lucide-react";

interface InsightPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const insights = getInsights();
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    return { title: "Publication Not Found" };
  }

  return {
    title: `${insight.title} | Taxmetryx Insights`,
    description: insight.excerpt,
    openGraph: {
      title: insight.title,
      description: insight.excerpt,
      type: "article",
      publishedTime: insight.publishedAt,
      authors: [insight.author.name],
      images: [
        {
          url: insight.image || "/images/insights-architecture.jpg",
          width: 1200,
          height: 630,
          alt: insight.title,
        },
      ],
    },
  };
}

export default async function InsightDetailPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const allInsights = getInsights();
  const related = allInsights
    .filter((i) => i.slug !== insight.slug)
    .slice(0, 3);

  return (
    <article className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb
          items={[
            { label: "Insights", href: "/insights" },
            { label: insight.category, href: `/insights` },
            { label: insight.title },
          ]}
        />
      </Container>

      {/* Article Header Section */}
      <section className="pb-12 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-2.5 py-1 bg-brand-red text-white text-[10px] font-mono uppercase tracking-widest font-semibold">
                {insight.category}
              </span>
              <span className="text-brand-muted font-mono">{insight.monthYear}</span>
              <span className="text-brand-muted">•</span>
              <div className="flex items-center gap-1 text-brand-muted font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{insight.readTime}</span>
              </div>
            </div>

            <h1 className="font-editorial text-clamp-heading text-brand-primary leading-tight">
              {insight.title}
            </h1>

            {/* Author Meta */}
            <div className="flex items-center gap-4 pt-2 border-t border-[#E7E5E1]">
              <div className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-editorial text-base">
                {insight.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-brand-primary">
                  {insight.author.name}
                </div>
                <div className="text-xs text-brand-muted">
                  {insight.author.role} • Taxmetryx DIFC
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Hero Architectural Image */}
      <section className="py-10 border-b border-[#E7E5E1] bg-white">
        <Container>
          <div className="relative aspect-[21/9] w-full overflow-hidden border border-[#E7E5E1] bg-brand-dark">
            <Image
              src={insight.image || "/images/insights-architecture.jpg"}
              alt={insight.title}
              fill
              priority
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {/* Main Body Grid: 8 Cols Content / 4 Cols Sidebar */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Article Content (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Executive Lead */}
              <div className="p-6 sm:p-8 bg-white border-l-4 border-brand-red border-y border-r border-[#E7E5E1] text-base sm:text-lg font-editorial text-brand-primary leading-relaxed">
                {insight.lead || insight.excerpt}
              </div>

              {/* Key Takeaways Box */}
              {insight.keyTakeaways && insight.keyTakeaways.length > 0 && (
                <div className="p-6 sm:p-8 bg-white border border-[#E7E5E1] space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-red flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    <span>Executive Takeaways & Risk Factors</span>
                  </div>
                  <ul className="space-y-3">
                    {insight.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-brand-charcoal">
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Editorial Sections */}
              <div className="space-y-12 bg-white p-8 sm:p-12 border border-[#E7E5E1]">
                {insight.sections.map((section, idx) => (
                  <div key={idx} id={`section-${idx}`} className="space-y-4">
                    <h2 className="font-editorial text-2xl sm:text-3xl text-brand-primary border-b border-[#E7E5E1] pb-3">
                      {section.heading}
                    </h2>
                    <div className="space-y-4 text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
                      {section.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="p-8 bg-white border border-[#E7E5E1] space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-muted block">
                  ABOUT THE AUTHOR
                </span>
                <div className="font-editorial text-xl text-brand-primary">
                  {insight.author.name}
                </div>
                <div className="text-xs font-semibold text-brand-red uppercase tracking-wider">
                  {insight.author.role}
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {insight.author.bio ||
                    "Specialist advisor representing multinational enterprises before the UAE Federal Tax Authority and overseas competent authorities."}
                </p>
              </div>

              {/* Back to archive link */}
              <div className="pt-4">
                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-brand-primary hover:text-brand-red transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to all Technical Publications</span>
                </Link>
              </div>
            </div>

            {/* Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8 sticky top-28">
              {/* Table of Contents */}
              {insight.tableOfContents && insight.tableOfContents.length > 0 && (
                <div className="p-6 bg-white border border-[#E7E5E1] space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal border-b border-[#E7E5E1] pb-2">
                    Table of Contents
                  </div>
                  <ul className="space-y-2.5 text-xs text-brand-muted">
                    {insight.tableOfContents.map((item, idx) => (
                      <li key={item.id}>
                        <a
                          href={`#section-${idx}`}
                          className="hover:text-brand-red transition-colors block py-0.5"
                        >
                          <span className="font-mono text-brand-red mr-2">
                            0{idx + 1}.
                          </span>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Consultation Box */}
              <div className="p-6 bg-brand-dark text-white border border-white/10 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">
                  ADVISORY MANDATES
                </span>
                <h3 className="font-editorial text-xl">
                  Facing a similar compliance or controversy matter?
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Our DIFC practice conducts rapid diagnostic reviews to determine corporate tax and transfer pricing exposure.
                </p>
                <CTAButton href="/contact" variant="primary" size="sm" icon className="w-full justify-center">
                  Request Technical Review
                </CTAButton>
              </div>

              {/* Tags Box */}
              <div className="p-6 bg-white border border-[#E7E5E1] space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                  Related Tags
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {insight.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#F8F7F4] border border-[#E7E5E1] text-[11px] text-brand-charcoal font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Insights Row */}
      <section className="py-16 bg-white border-t border-[#E7E5E1]">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <SectionLabel>FURTHER READING</SectionLabel>
              <h3 className="font-editorial text-2xl sm:text-3xl text-brand-primary">
                Related Advisory Articles
              </h3>
            </div>
            <Link
              href="/insights"
              className="text-xs uppercase tracking-wider font-semibold text-brand-red hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="p-6 border border-[#E7E5E1] bg-[#F8F7F4]/60 hover:border-brand-red hover:bg-[#F8F7F4] transition-all duration-300 space-y-3 group block"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted">
                  <span className="text-brand-red uppercase font-semibold">
                    {item.category}
                  </span>
                  <span>{item.readTime}</span>
                </div>
                <h4 className="font-editorial text-lg text-brand-primary group-hover:text-brand-red transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-brand-muted line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-brand-red">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
