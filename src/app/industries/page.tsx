import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getIndustries } from "@/lib/json";
import { ArrowUpRight, AlertTriangle, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Advise | Sector-Specific Tax Advisory",
  description:
    "Tailored corporate tax, transfer pricing, and indirect tax advisory across Financial Services, Real Estate, Technology, Energy, Family Offices, and Manufacturing.",
};

export default function IndustriesPage() {
  const industries = getIndustries();

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Industries" }]} />
      </Container>

      {/* Hero Section */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-6">
            <SectionLabel>INDUSTRY PRACTICES</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Sector-specific depth. <br />
              <span className="text-brand-red">Commercial intellect.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
              Tax law is not abstract—it applies through the prism of your industry&apos;s contractual frameworks, capital expenditures, supply chains, and regulatory licensing. We advise key commercial sectors across the UAE and global markets.
            </p>
          </div>
        </Container>
      </section>

      {/* Industries Editorial List */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-12">
            {industries.map((ind) => (
              <div
                key={ind.slug}
                id={ind.slug}
                className="p-8 sm:p-12 bg-white border border-[#E7E5E1] hover:border-brand-red/60 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-[#E7E5E1]">
                  <div className="lg:col-span-8 space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-brand-red">
                        {ind.number}
                      </span>
                      <h2 className="font-editorial text-2xl sm:text-3xl text-brand-primary">
                        {ind.name}
                      </h2>
                    </div>
                    <p className="text-sm text-brand-charcoal/80 leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex lg:flex-col items-end justify-between lg:justify-start gap-4">
                    {ind.stats && (
                      <div className="text-right">
                        <div className="font-editorial text-3xl text-brand-primary">
                          {ind.stats.value}
                        </div>
                        <div className="text-[10px] uppercase font-mono tracking-wider text-brand-muted">
                          {ind.stats.label}
                        </div>
                      </div>
                    )}

                    <CTAButton href="/contact" variant="primary" size="sm" icon>
                      Sector Inquiries
                    </CTAButton>
                  </div>
                </div>

                {/* Challenges vs Advisory Focus */}
                <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Sector Challenges */}
                  <div className="p-6 bg-[#F8F7F4]/60 border border-[#E7E5E1] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                      <AlertTriangle className="w-4 h-4 text-brand-red" />
                      <span>Key Regulatory & Tax Friction Points</span>
                    </div>
                    <ul className="space-y-2 text-xs text-brand-muted">
                      {ind.challenges.map((ch, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1 shrink-0" />
                          <span className="text-brand-charcoal/85">{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advisory Focus */}
                  <div className="p-6 bg-[#F8F7F4]/60 border border-[#E7E5E1] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                      <Target className="w-4 h-4 text-brand-red" />
                      <span>Taxmetryx Advisory Workstreams</span>
                    </div>
                    <ul className="space-y-2 text-xs text-brand-muted">
                      {ind.advisoryFocus.map((af, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal mt-1 shrink-0" />
                          <span className="text-brand-charcoal/85">{af}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Related Practice Slugs */}
                <div className="mt-6 pt-4 border-t border-[#E7E5E1] flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted mr-2">
                    Deployed Practices:
                  </span>
                  {ind.relatedServices.map((relSlug) => (
                    <Link
                      key={relSlug}
                      href={`/services/${relSlug}`}
                      className="px-2.5 py-1 bg-white border border-[#E7E5E1] hover:border-brand-red text-[11px] text-brand-charcoal font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <span className="capitalize">{relSlug.replace(/-/g, " ")}</span>
                      <ArrowUpRight className="w-3 h-3 text-brand-red" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
