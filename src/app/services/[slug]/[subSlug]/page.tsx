import ServiceHeadingText from "@/components/services/ServiceHeadingText";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileCheck2,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Container from "@/components/shared/Container";
import CTAButton from "@/components/shared/CTAButton";
import {
  getSubServiceBySlug,
  getAllSubServiceParams,
  slugifySubService,
} from "@/lib/json";
import { getServiceTheme } from "@/lib/serviceTheme";

interface SubServicePageProps {
  params: Promise<{ slug: string; subSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSubServiceParams();
}

export async function generateMetadata({
  params,
}: SubServicePageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const data = getSubServiceBySlug(slug, subSlug);

  if (!data) return { title: "Service Area Not Found" };

  return {
    title: `${data.subservice.title} | ${data.service.title} | Taxmetryx Global`,
    description: data.subservice.description,
  };
}

export default async function SubServiceDetailPage({
  params,
}: SubServicePageProps) {
  const { slug, subSlug } = await params;
  const data = getSubServiceBySlug(slug, subSlug);

  if (!data) notFound();

  const { service, subservice, index, total, prev, next } = data;
  const theme = getServiceTheme(service.slug);

  // Sibling areas for quick practice index
  const siblingAreas = (service.subservices || [])
    .filter((sub) => (sub.slug || slugifySubService(sub.title)) !== subSlug)
    .slice(0, 4);

  return (
    <div className="service-page bg-white text-[#17232c]">
      {/* 1. Breadcrumb Bar */}
      <section className="border-b border-[#e8e7e4] bg-[#fafaf9] py-3.5 text-xs text-brand-muted">
        <Container className="px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-[#e00019] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#e00019] transition-colors">
              Our Services
            </Link>
            <span>/</span>
            <Link
              href={`/services/${service.slug}`}
              className="hover:text-[#e00019] transition-colors font-medium"
            >
              {service.title}
            </Link>
            <span>/</span>
            <span className="text-brand-primary font-semibold truncate max-w-[280px] sm:max-w-none">
              {subservice.title}
            </span>
          </nav>
        </Container>
      </section>

      {/* 2. Hero Section */}
      <section className="service-subservice-hero border-b border-[#e8e7e4] bg-white">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14 items-start">
            <div className="space-y-6">
              {/* Eyebrow & Number Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#e00019] bg-[#e00019]/10 px-2.5 py-1 rounded hover:bg-[#e00019]/20 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {service.title} Practice
                </Link>
                <span className="text-xs font-mono text-brand-muted">
                  Area {subservice.number || String(index).padStart(2, "0")} of{" "}
                  {String(total).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[#111b23] service-hero-heading"><ServiceHeadingText text={subservice.title} /></h1>

              {/* Scope Description */}
              <p className="font-sans text-base sm:text-lg text-[#53606a] leading-relaxed max-w-2xl">
                {subservice.description}
              </p>

              {/* CTA Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <CTAButton
                  href={`/contact?service=${encodeURIComponent(
                    service.title
                  )}&area=${encodeURIComponent(subservice.title)}`}
                  variant="primary"
                  size="md"
                  icon
                >
                  Discuss This Matter
                </CTAButton>
                <Link
                  href={`/services/${service.slug}#areas-of-work`}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-brand-charcoal hover:text-[#e00019] px-4 py-3 border border-[#e8e7e4] rounded hover:border-[#e00019] transition-all bg-white"
                >
                  <Layers className="w-4 h-4" />
                  All {service.title} Areas
                </Link>
              </div>
            </div>

            {/* Context Sidebar Card */}
            <div className="bg-[#fafaf9] border border-[#e8e7e4] rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#e00019]" />

              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#e00019] block">
                  Practice Framework
                </span>
                <h3 className="text-xl text-[#111b23] service-card-heading"><ServiceHeadingText text={service.heroStatement || "Specialized Advisory"} /></h3>
              </div>

              {/* Parent Service Quick Stats */}
              <div className="divide-y divide-[#e8e7e4]/80 text-xs sm:text-sm">
                <div className="py-3 flex items-center justify-between">
                  <span className="text-brand-muted">Practice Area</span>
                  <span className="font-medium text-brand-primary">
                    {service.title}
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-brand-muted">Defined Work Area</span>
                  <span className="font-mono font-bold text-[#e00019]">
                    {subservice.number || String(index).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                  </span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="text-brand-muted">Engagement Type</span>
                  <span className="font-medium text-brand-primary">
                    Custom Advisory & Analysis
                  </span>
                </div>
              </div>

              {/* Deliverable preview chip */}
              {subservice.youReceive && (
                <div className="pt-2">
                  <div className="p-3 bg-white border border-[#e8e7e4] rounded-xl flex items-start gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-[#e00019] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#e00019] block">
                        Client Output
                      </span>
                      <span className="text-xs text-brand-primary font-medium line-clamp-2">
                        {subservice.youReceive}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* 3. In-Depth Practice & Methodology */}
      {subservice.inPractice && (
        <section className="py-14 sm:py-20 border-b border-[#e8e7e4] bg-[#fafaf9]">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 items-start">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#e00019]">
                  <Sparkles className="w-4 h-4" />
                  Practical Scope & Methodology
                </div>
                <h2 className="text-[#111b23] service-section-heading"><ServiceHeadingText text="How this work is executed in practice" /></h2>
                <p className="font-sans text-sm text-[#53606a] leading-relaxed">
                  Every Taxmetryx assignment is built from your specific records,
                  transactions, and facts — avoiding generic boilerplate templates.
                </p>
              </div>

              <div className="p-8 sm:p-10 bg-white border border-[#e8e7e4] rounded-2xl shadow-xs space-y-6">
                <div className="border-l-2 border-[#e00019] pl-5 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-neutral-500 block">
                    Execution Reality
                  </span>
                  <p className="font-sans text-base text-[#111b23] leading-relaxed">
                    {subservice.inPractice}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e8e7e4]">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#e00019] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold uppercase font-mono text-brand-primary">
                        Evidence-Based
                      </h4>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Rooted directly in underlying contracts and financial records.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#e00019] shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xs font-bold uppercase font-mono text-brand-primary">
                        Audit-Defensible
                      </h4>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Prepared to withstand scrutiny from authorities and auditors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. Client Deliverable Spotlight */}
      {subservice.youReceive && (
        <section className="py-14 sm:py-20 border-b border-[#e8e7e4] bg-white">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 bg-gradient-to-br from-[#111b23] to-[#091318] text-white rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#e00019]" />

              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] items-center">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#fca5a5]">
                    <FileCheck2 className="w-4 h-4" />
                    Core Deliverable
                  </div>
                  <h3 className="text-white service-card-heading"><ServiceHeadingText text="What You Receive" /></h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    A tangible, finalized output designed for immediate operational,
                    statutory, or board presentation.
                  </p>
                </div>

                <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-xs border border-white/15 rounded-xl space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#fca5a5] font-bold block">
                    Final Deliverable Package
                  </span>
                  <p className="font-sans text-base sm:text-lg text-white font-medium leading-relaxed">
                    {subservice.youReceive}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 5. Applicable Frameworks & Regulatory Context */}
      {service.applicableFrameworks && service.applicableFrameworks.length > 0 && (
        <section className="py-12 sm:py-16 border-b border-[#e8e7e4] bg-[#fafaf9]">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase font-bold text-[#e00019] tracking-wider block">
                  Regulatory Context
                </span>
                <h3 className="text-[#111b23] service-card-heading"><ServiceHeadingText text="Governing Frameworks & Standards" /></h3>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {service.applicableFrameworks.map((framework, fIdx) => (
                  <span
                    key={fIdx}
                    className="px-3 py-1.5 bg-white border border-[#e8e7e4] text-xs font-mono font-medium text-brand-charcoal rounded-md shadow-2xs"
                  >
                    {framework}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 6. Inter-Area Navigation (Prev / Next) */}
      <section className="py-10 border-b border-[#e8e7e4] bg-white">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/services/${service.slug}/${prev.slug}`}
                className="p-5 bg-[#fafaf9] border border-[#e8e7e4] rounded-xl hover:border-[#e00019]/60 hover:shadow-xs transition-all group flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full border border-[#e8e7e4] flex items-center justify-center shrink-0 group-hover:border-[#e00019] group-hover:text-[#e00019] transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase font-bold text-neutral-400 block">
                    Previous Area ({prev.number})
                  </span>
                  <span className="font-editorial text-sm sm:text-base text-brand-primary group-hover:text-[#e00019] transition-colors truncate block">
                    {prev.title}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="p-5 bg-transparent border border-dashed border-[#e8e7e4] rounded-xl text-neutral-400 text-xs flex items-center">
                First defined area in this practice
              </div>
            )}

            {next ? (
              <Link
                href={`/services/${service.slug}/${next.slug}`}
                className="p-5 bg-[#fafaf9] border border-[#e8e7e4] rounded-xl hover:border-[#e00019]/60 hover:shadow-xs transition-all group flex items-center justify-between gap-4 text-right"
              >
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] uppercase font-bold text-neutral-400 block">
                    Next Area ({next.number})
                  </span>
                  <span className="font-editorial text-sm sm:text-base text-brand-primary group-hover:text-[#e00019] transition-colors truncate block">
                    {next.title}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#e8e7e4] flex items-center justify-center shrink-0 group-hover:border-[#e00019] group-hover:text-[#e00019] transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ) : (
              <div className="p-5 bg-transparent border border-dashed border-[#e8e7e4] rounded-xl text-neutral-400 text-xs flex items-center justify-end">
                Final defined area in this practice
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* 7. Sibling Practice Areas Grid */}
      {siblingAreas.length > 0 && (
        <section className="py-14 sm:py-20 border-b border-[#e8e7e4] bg-[#fafaf9]">
          <Container className="px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase font-bold text-[#e00019] tracking-wider block">
                  Practice Portfolio
                </span>
                <h2 className="text-[#111b23] mt-1 service-section-heading">Other Defined Areas in <span className="text-[#e00019]">{service.title}</span></h2>
              </div>
              <Link
                href={`/services/${service.slug}#areas-of-work`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#e00019] hover:underline"
              >
                View all {total} areas
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {siblingAreas.map((item, idx) => {
                const itemSlug = item.slug || slugifySubService(item.title);
                return (
                  <Link
                    key={idx}
                    href={`/services/${service.slug}/${itemSlug}`}
                    className="p-5 bg-white border border-[#e8e7e4] rounded-xl hover:border-[#e00019]/60 hover:shadow-xs transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <span className="font-mono text-xs font-bold text-[#e00019]">
                        {item.number}
                      </span>
                      <h3 className="text-base text-[#111b23] group-hover:text-[#e00019] transition-colors line-clamp-2 service-card-heading"><ServiceHeadingText text={item.title} /></h3>
                      <p className="text-xs text-neutral-500 line-clamp-2 font-sans">
                        {item.description}
                      </p>
                    </div>
                    <span className="mt-4 pt-3 border-t border-[#e8e7e4]/60 text-[11px] font-mono uppercase font-semibold text-[#e00019] flex items-center gap-1">
                      Explore Area <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 8. Discussion / Contact Banner */}
      <section className="bg-[#f6f5f2] py-12 sm:py-16">
        <Container className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 border-l-2 border-[#c80016] pl-6 sm:pl-10 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <h2 className="text-[#111b23] service-section-heading">Discuss <span className="text-[#e00019]">{subservice.title}.</span></h2>
              <p className="mt-3 text-sm leading-relaxed text-[#53606a]">
                Share your transaction profile, current position, or question with
                our {service.title} partners to establish scope, methodology, and timing.
              </p>
            </div>
            <CTAButton
              href={`/contact?service=${encodeURIComponent(
                service.title
              )}&area=${encodeURIComponent(subservice.title)}`}
              variant="primary"
              size="md"
              icon
              className="shrink-0"
            >
              Contact Our Team
            </CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
