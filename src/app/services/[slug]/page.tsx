import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getServices, getServiceBySlug } from "@/lib/json";
import { getServiceTheme } from "@/lib/serviceTheme";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/ScrollMotion";
import {
  ArrowUpRight,
  Check,
  FileText,
  ShieldCheck,
  HelpCircle,
  Layers,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getServices();
  const canonicalParams = services.map((service) => ({
    slug: service.slug,
  }));
  const aliasParams = [
    { slug: "vat-indirect-tax" },
    { slug: "tax-regulatory-controversy" },
    { slug: "global-tax-emerging-regulations" },
  ];
  return [...canonicalParams, ...aliasParams];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} Advisory | Taxmetryx UAE`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.title} Advisory | Taxmetryx UAE`,
      description: service.shortDescription,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const canonicalSlug = service.slug;
  const theme = getServiceTheme(canonicalSlug);
  const allServices = getServices();
  const relatedServices = allServices.filter((s) =>
    service.relatedSlugs?.includes(s.slug)
  );



  return (
    <div className="bg-[#FAF9F5] text-brand-charcoal min-h-screen">
      {/* 1. Dynamic Hero Section */}
      <section className={`relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-gradient-to-b ${theme.heroGradient} text-white overflow-hidden border-b border-white/10`}>
        {/* Subtle grid pattern & ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
        <div
          style={{
            background: `radial-gradient(circle at 80% 20%, ${theme.accentLight} 0%, transparent 60%)`,
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <Container className="relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow & Number */}
              <FadeIn distance={15} delay={0.05}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 bg-white/5 border border-white/20 text-white/90">
                    {theme.badgeLabel}
                  </span>
                </div>
              </FadeIn>

              {/* Main Service Title */}
              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                  {service.title}
                </h1>
              </FadeIn>

              {/* Distinct Hero Statement */}
              <FadeIn distance={20} delay={0.18}>
                <div className="text-lg sm:text-xl font-editorial italic text-brand-red max-w-xl">
                  &ldquo;{service.heroStatement}&rdquo;
                </div>
              </FadeIn>

              {/* Short Description */}
              <FadeIn distance={15} delay={0.24}>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl font-sans">
                  {service.shortDescription}
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn distance={15} delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <CTAButton href="/contact" variant="primary" size="lg" icon>
                    Initiate Practice Advisory
                  </CTAButton>
                  <CTAButton href="#capabilities" variant="secondary-light" size="lg">
                    View Capabilities
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            {/* Right Visual Column with Bespoke Hero Image */}
            <div className="lg:col-span-5 relative">
              <ScaleIn delay={0.15} duration={0.8}>
                {/* Outer decorative frame */}
                <div className="relative p-2 bg-white/5 border border-white/15 backdrop-blur-xs shadow-2xl">
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border border-white/15 bg-black/40">
                    <Image
                      src={theme.heroImage}
                      alt={`${service.title} Executive Practice at Taxmetryx DIFC`}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <div className="mt-3 p-4 bg-black/60 backdrop-blur-md border border-white/15 grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-editorial text-2xl sm:text-3xl font-bold text-white">
                        {theme.statCard.number}
                      </div>
                      <div className="text-[10px] sm:text-xs font-mono text-white/70 uppercase tracking-wider mt-0.5">
                        {theme.statCard.label}
                      </div>
                    </div>
                    <div className="border-l border-white/15 pl-4 flex flex-col justify-center">
                      <div className="text-[10px] font-mono text-white/50 uppercase">Framework</div>
                      <div className="text-xs font-sans text-white/90 font-medium line-clamp-2 mt-0.5">
                        {theme.statCard.sublabel}
                      </div>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Practice Overview & Context (Split Layout with High-Res Context Photography) */}
      <section className="py-16 sm:py-24 border-b border-[#E7E5E1] bg-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <FadeIn distance={20} delay={0.05}>
                <div className="space-y-2">
                  <SectionLabel>PRACTICE OVERVIEW</SectionLabel>
                  <h2 className="font-editorial text-3xl sm:text-4xl text-brand-primary leading-tight">
                    Technical Context &amp; Statutory Reality
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-sans mt-4">
                  {service.description}
                </p>

                {/* Comprehensive Service Scope Badges */}
                <div className="pt-4 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-red" />
                    Comprehensive Service Scope:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.services.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1.5 bg-[#F8F7F4] hover:bg-[#F2EFE9] border border-[#E7E5E1] text-xs text-brand-charcoal font-medium transition-colors"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Partner Highlight Quote */}
                <div className="p-4 bg-[#F8F7F4] border-l-4 border-brand-red space-y-2 mt-6">
                  <p className="text-xs sm:text-sm font-editorial italic text-brand-charcoal">
                    &ldquo;{theme.highlightQuote.quote}&rdquo;
                  </p>
                  <div className="text-[11px] font-mono text-brand-muted">
                    <span className="font-bold text-brand-charcoal">{theme.highlightQuote.author}</span> | {theme.highlightQuote.title}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Context Image & Framework Box */}
            <div className="lg:col-span-6 space-y-4">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="relative border border-[#E7E5E1] bg-[#F8F7F4] p-3 shadow-md">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E7E5E1]">
                    <Image
                      src={theme.contextImage}
                      alt={theme.contextCaption}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between text-xs text-brand-muted">
                    <span className="font-mono text-[11px]">{theme.contextCaption}</span>
                    <span className="font-mono text-[10px] uppercase text-brand-charcoal font-semibold">Taxmetryx Archive</span>
                  </div>
                </div>

                {/* Statutory Frameworks Pill Box */}
                <div className="p-4 bg-[#F8F7F4] border border-[#E7E5E1] space-y-2 mt-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-charcoal flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-red" />
                    Governing Statutory Frameworks:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.applicableFrameworks.map((fw) => (
                      <div key={fw} className="flex items-center gap-2 text-xs text-brand-charcoal/80">
                        <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{fw}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Specialized Workstreams & Core Capabilities */}
      <section id="capabilities" className="py-16 sm:py-24 border-b border-[#E7E5E1] bg-white">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-3xl mb-14 space-y-3">
              <SectionLabel>SPECIALIZED WORKSTREAMS</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                Core Capabilities &amp; Workstreams
              </h2>
              <p className="text-sm text-brand-muted">
                Deep, focused workstreams tailored to enterprise corporate groups, Free Zone holding companies, and multinational structures.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            className={`grid gap-6 lg:gap-8 ${
              service.capabilities.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : service.capabilities.length === 1
                ? "grid-cols-1 max-w-2xl mx-auto"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {service.capabilities.map((cap, idx) => (
              <StaggerItem
                key={idx}
                className="p-6 sm:p-8 bg-[#FAF9F5] border border-[#E7E5E1] hover:border-brand-charcoal hover:shadow-lg transition-all duration-300 space-y-5 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b border-[#E7E5E1] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-brand-red">
                      {idx + 1}
                    </span>
                    <h3 className="font-editorial text-xl sm:text-2xl text-brand-primary group-hover:text-brand-red transition-colors">
                      {cap.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-red transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-sans">
                  {cap.description}
                </p>

                {cap.deliverables && cap.deliverables.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="text-[11px] font-mono uppercase text-brand-muted tracking-wider">
                      Target Deliverables:
                    </div>
                    <div className="space-y-1.5">
                      {cap.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-brand-charcoal">
                          <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 5. The Four-Phase Engagement Cycle */}
      <section className="py-16 sm:py-24 bg-[#F8F7F4] border-b border-[#E7E5E1]">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-3xl mb-14 space-y-3">
              <SectionLabel>OUR METHODOLOGY</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                The Four-Phase Engagement Cycle
              </h2>
              <p className="text-sm text-brand-muted">
                Structured advisory framework designed to deliver continuous statutory compliance and audit readiness.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.approach.map((step) => (
              <StaggerItem
                key={step.step}
                className="p-6 bg-white border border-[#E7E5E1] space-y-3 relative hover:border-brand-charcoal transition-all shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-brand-red">
                    {step.step.replace(/^0+/, "")}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-muted">
                    PHASE
                  </span>
                </div>
                <h4 className="font-editorial text-lg sm:text-xl text-brand-primary">
                  {step.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  {step.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 6. Why It Matters & Strategic Imperatives */}
      <section className="py-16 sm:py-24 border-b border-[#E7E5E1] bg-white">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-3xl mb-12 space-y-3">
              <SectionLabel>STRATEGIC IMPERATIVES</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                {service.whyItMatters.headline}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whyItMatters.points.map((pt, idx) => (
              <StaggerItem
                key={idx}
                className="p-7 bg-[#FAF9F5] border border-[#E7E5E1] hover:border-brand-red transition-all space-y-3 shadow-xs"
              >
                <div className="flex items-center gap-2 text-brand-red font-semibold text-xs uppercase tracking-wider font-mono">
                  <HelpCircle className="w-4 h-4" />
                  <span>Exposure Point {idx + 1}</span>
                </div>
                <h4 className="font-editorial text-lg text-brand-primary">
                  {pt.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed font-sans">
                  {pt.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 7. Key Deliverables & Connected Practices */}
      <section className="py-16 sm:py-20 bg-[#F8F7F4] border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Key Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={20} delay={0.05}>
                <SectionLabel>DOCUMENTATION &amp; OPINIONS</SectionLabel>
                <h3 className="font-editorial text-2xl sm:text-3xl text-brand-primary mt-2">
                  Formal Technical Deliverables
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  Every advisory engagement produces concrete, audit-ready documentation signed off by licensed UAE tax leaders.
                </p>

                <div className="space-y-3 mt-4">
                  {service.keyDeliverables.map((del, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white border border-[#E7E5E1] hover:border-brand-charcoal transition-all flex items-center justify-between gap-4 text-xs sm:text-sm text-brand-charcoal shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-brand-red shrink-0" />
                        <span className="font-medium">{del}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E1] text-brand-muted shrink-0">
                        Audit-Ready
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Connected Disciplines (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <FadeIn distance={20} delay={0.15}>
                <SectionLabel>CONNECTED DISCIPLINES</SectionLabel>
                <h3 className="font-editorial text-2xl sm:text-3xl text-brand-primary mt-2">
                  Related Advisory Practices
                </h3>
                <p className="text-xs text-brand-muted mt-1">
                  Seamlessly integrated tax practices operating under unified partner direction.
                </p>

                <div className="space-y-3 mt-4">
                  {relatedServices.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/services/${rel.slug}`}
                      className="p-4 border border-[#E7E5E1] bg-white hover:border-brand-red hover:bg-[#FAF9F5] transition-all flex items-center justify-between group block shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-brand-red font-bold">
                            {rel.number.replace(/^0+/, "")}
                          </span>
                          <h4 className="text-sm font-semibold text-brand-primary group-hover:text-brand-red transition-colors">
                            {rel.title}
                          </h4>
                        </div>
                        <p className="text-xs text-brand-muted line-clamp-1">
                          {rel.shortDescription}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-red shrink-0 ml-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. Closing Confidential Consultation Banner */}
      <section className="py-16 sm:py-24 bg-brand-dark text-white border-t border-white/10">
        <Container>
          <ScaleIn initialScale={0.96} duration={0.8}>
            <div className="relative p-8 sm:p-14 bg-gradient-to-r from-black/60 to-white/5 border border-white/15 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-2xl">
              <div className="space-y-3 max-w-2xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">
                    DIFC CONFIDENTIAL ENGAGEMENT
                  </span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-4xl text-white">
                  Initiate your {service.title} consultation
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans">
                  Direct engagement with our DIFC tax partners. We conduct preliminary diagnostic assessments to identify exposures under UAE law and formulate defensible technical positions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0 w-full sm:w-auto">
                <CTAButton href="/contact" variant="primary" size="lg" icon className="w-full sm:w-auto text-center">
                  Schedule Partner Briefing
                </CTAButton>
              </div>
            </div>
          </ScaleIn>
        </Container>
      </section>
    </div>
  );
}
