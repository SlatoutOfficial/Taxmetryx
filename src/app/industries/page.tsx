import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getIndustries } from "@/lib/json";
import { cn } from "@/lib/utils";
import {
  FadeIn,
  ScaleIn,
} from "@/components/shared/ScrollMotion";
import {
  ArrowUpRight,
  AlertTriangle,
  Target,
  Check,
  Building2,
  Cpu,
  Home,
  ShoppingBag,
  Factory,
  Zap,
  Users,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Advise | Sector-Specific Tax Advisory",
  description:
    "Tailored corporate tax, transfer pricing, and indirect tax advisory across Financial Services, Real Estate, Technology, Energy, Family Offices, and Manufacturing.",
};

const sectorIcons: Record<string, React.ReactNode> = {
  "financial-services": <Building2 className="w-3.5 h-3.5 text-brand-red" />,
  "technology-and-digital-assets": <Cpu className="w-3.5 h-3.5 text-brand-red" />,
  "real-estate-and-construction": <Home className="w-3.5 h-3.5 text-brand-red" />,
  "retail-and-consumer-products": <ShoppingBag className="w-3.5 h-3.5 text-brand-red" />,
  "manufacturing-and-industrials": <Factory className="w-3.5 h-3.5 text-brand-red" />,
  "energy-and-infrastructure": <Zap className="w-3.5 h-3.5 text-brand-red" />,
  "family-offices-and-conglomerates": <Users className="w-3.5 h-3.5 text-brand-red" />,
  "professional-and-corporate-services": <Briefcase className="w-3.5 h-3.5 text-brand-red" />,
};

export default function IndustriesPage() {
  const industries = getIndustries();

  return (
    <div className="bg-[#FAF9F5] text-brand-charcoal min-h-screen">
      {/* 1. Light, Elegant Hero Section */}
      <section className="pt-28 sm:pt-32 pb-16 sm:pb-20 border-b border-[#E7E5E1] bg-[#F8F7F4] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={15} delay={0.05}>
                <SectionLabel>INDUSTRY PRACTICES & SECTORS</SectionLabel>
              </FadeIn>

              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-clamp-hero text-brand-primary leading-tight">
                  Sector-specific depth. <br />
                  <span className="text-brand-red">Commercial intellect.</span>
                </h1>
              </FadeIn>

              <FadeIn distance={20} delay={0.18}>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-sans max-w-xl">
                  Tax law is never abstract—it operates through the prism of your industry&apos;s contractual frameworks, capital expenditures, supply chains, and regulatory licensing. We advise the foremost commercial sectors across the UAE and global markets.
                </p>
              </FadeIn>

              {/* Fast Facts Bar */}
              <FadeIn distance={20} delay={0.25}>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E7E5E1] max-w-lg">
                  <div>
                    <div className="font-editorial text-2xl sm:text-3xl text-brand-primary font-bold">8</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                      Key Sectors
                    </div>
                  </div>
                  <div className="border-l border-[#E7E5E1] pl-4">
                    <div className="font-editorial text-2xl sm:text-3xl text-brand-primary font-bold">AED 45B+</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                      Advised Asset Value
                    </div>
                  </div>
                  <div className="border-l border-[#E7E5E1] pl-4">
                    <div className="font-editorial text-2xl sm:text-3xl text-brand-red font-bold">0% / 9%</div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                      CT Optimization
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Hero Visual Frame */}
            <div className="lg:col-span-5 relative">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="relative p-2 bg-white border border-[#E7E5E1] shadow-md">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-brand-dark group">
                    <Image
                      src="/images/industries/industries-hero.jpg"
                      alt="Taxmetryx Sector Advisory Practice - Dubai DIFC Skyline"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
                          PRACTICE FOOTPRINT
                        </div>
                        <div className="font-editorial text-base sm:text-lg">
                          Dubai DIFC • ADGM • Mainland UAE
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase text-white">
                        UAE Corporate Tax
                      </span>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Industries Alternating Presentation (Consistent Height, Clean Image Fit, Count 1) */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="space-y-10">
            {industries.map((ind, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <FadeIn key={ind.slug} distance={28} delay={0.05}>
                  <div
                    id={ind.slug}
                    className="scroll-mt-28 bg-white border border-[#E7E5E1] shadow-2xs hover:border-brand-red/60 transition-all duration-300 overflow-hidden group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[460px] lg:h-[450px]">
                      {/* Clean Image Column - Alternates Left (even) / Right (odd), Full Height Fit */}
                      <div
                        className={cn(
                          "lg:col-span-5 relative w-full h-64 sm:h-72 lg:h-full min-h-[240px] overflow-hidden bg-brand-dark",
                          isEven
                            ? "lg:order-1 border-b lg:border-b-0 lg:border-r border-[#E7E5E1]"
                            : "lg:order-2 border-b lg:border-b-0 lg:border-l border-[#E7E5E1]"
                        )}
                      >
                        <Image
                          src={ind.image || "/images/industries/industries-hero.jpg"}
                          alt={`${ind.name} advisory practice`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Content Column - Alternates Right (even) / Left (odd) */}
                      <div
                        className={cn(
                          "lg:col-span-7 p-6 sm:p-7 lg:p-8 flex flex-col justify-between h-full space-y-4",
                          isEven ? "lg:order-2" : "lg:order-1"
                        )}
                      >
                        {/* Top Header: Count 1, Sector Practice, Title & Stat */}
                        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#E7E5E1]">
                          <div className="space-y-1 max-w-md">
                            <h3 className="font-editorial text-xl sm:text-2xl text-brand-primary leading-tight">
                              {ind.name}
                            </h3>
                          </div>

                          {ind.stats && (
                            <div className="text-right shrink-0">
                              <div className="font-editorial text-xl sm:text-2xl font-bold text-brand-primary">
                                {ind.stats.value}
                              </div>
                              <div className="text-[10px] font-mono uppercase tracking-wider text-brand-muted">
                                {ind.stats.label}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Narrative description */}
                        <p className="text-xs sm:text-sm text-brand-charcoal/85 leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                          {ind.description}
                        </p>

                        {/* Compact Dual Panels */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          {/* Friction Points */}
                          <div className="p-3 bg-[#FAF9F5] border-l-2 border-brand-red border-y border-r border-[#E7E5E1] space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                              <AlertTriangle className="w-3.5 h-3.5 text-brand-red shrink-0" />
                              <span>Regulatory Friction</span>
                            </div>
                            <ul className="space-y-1 text-xs text-brand-muted">
                              {ind.challenges.slice(0, 3).map((ch, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-brand-red font-bold shrink-0">•</span>
                                  <span className="text-brand-charcoal/90 leading-snug line-clamp-1">{ch}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Workstreams */}
                          <div className="p-3 bg-[#FAF9F5] border-l-2 border-brand-primary border-y border-r border-[#E7E5E1] space-y-1.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand-primary">
                              <Target className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                              <span>Advisory Workstreams</span>
                            </div>
                            <ul className="space-y-1 text-xs text-brand-muted">
                              {ind.advisoryFocus.slice(0, 3).map((af, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
                                  <span className="text-brand-charcoal/90 leading-snug line-clamp-1">{af}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Bottom Row: Deployed Practices with High-Contrast Hover & CTA */}
                        <div className="pt-3 border-t border-[#E7E5E1] flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted mr-1">
                              Practices:
                            </span>
                            {ind.relatedServices.map((relSlug) => (
                              <Link
                                key={relSlug}
                                href={`/services/${relSlug}`}
                                className="px-2.5 py-1 bg-white hover:border-brand-red hover:text-brand-red border border-[#E7E5E1] text-[11px] font-mono text-brand-charcoal inline-flex items-center gap-1 transition-all duration-200 group/badge cursor-pointer"
                              >
                                <span className="capitalize">{relSlug.replace(/-/g, " ")}</span>
                                <ArrowUpRight className="w-3 h-3 text-brand-red transition-transform duration-200 group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5" />
                              </Link>
                            ))}
                          </div>

                          <CTAButton href="/contact" variant="primary" size="sm" icon>
                            Sector Inquiries
                          </CTAButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3. Fully Visible High-Impact Consultation Banner */}
      <section className="pb-24">
        <Container>
          <ScaleIn initialScale={0.97} duration={0.8}>
            <div className="relative overflow-hidden bg-[#061016] text-white border border-[#061016] p-8 sm:p-14 shadow-xl">
              {/* Subtle architectural background */}
              <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-15 pointer-events-none hidden md:block">
                <Image
                  src="/images/expertise-architecture.jpg"
                  alt="Taxmetryx Executive Practice"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="relative z-10 max-w-2xl space-y-6">
                <div className="inline-block px-3 py-1 bg-brand-red text-white text-[10px] font-mono uppercase tracking-widest font-semibold">
                  SECTOR FISCAL REVIEWS
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-white leading-tight">
                  Request an industry-specific corporate tax or transfer pricing benchmark.
                </h2>
                <p className="text-sm text-white/85 leading-relaxed font-sans">
                  Our sector directors formulate bespoke position papers, economic analyses, and FTA qualification assessments tailored to your exact industry license.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CTAButton href="/contact" variant="primary" size="lg" icon>
                    Schedule Partner Consultation
                  </CTAButton>
                  <CTAButton href="/services" variant="secondary-light" size="lg">
                    View All Practices
                  </CTAButton>
                </div>
              </div>
            </div>
          </ScaleIn>
        </Container>
      </section>
    </div>
  );
}


