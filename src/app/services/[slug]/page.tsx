import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getServices, getServiceBySlug } from "@/lib/json";
import { ArrowUpRight, Check, CheckCircle2, FileText, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
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

  const allServices = getServices();
  const relatedServices = allServices.filter((s) =>
    service.relatedSlugs?.includes(s.slug)
  );

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb
          items={[
            { label: "Our Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </Container>

      {/* Hero Section */}
      <section className="pb-16 sm:pb-24 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold text-brand-red">
                  {service.number}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-brand-muted">
                  {service.eyebrow}
                </span>
              </div>

              <h1 className="font-editorial text-clamp-hero text-brand-primary">
                {service.title}
              </h1>

              <div className="text-base sm:text-lg font-editorial text-brand-red italic">
                &ldquo;{service.heroStatement}&rdquo;
              </div>

              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed max-w-2xl">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <CTAButton href="/contact" variant="primary" size="lg" icon>
                  Consult on {service.title}
                </CTAButton>
                <CTAButton href="#capabilities" variant="secondary" size="lg">
                  View Capabilities
                </CTAButton>
              </div>
            </div>

            {/* Right Meta Card */}
            <div className="lg:col-span-4 p-7 bg-white border border-[#E7E5E1] space-y-6 shadow-xs">
              {service.stats && (
                <div className="pb-6 border-b border-[#E7E5E1]">
                  <div className="font-editorial text-4xl text-brand-primary">
                    {service.stats.value}
                  </div>
                  <div className="text-xs uppercase font-mono tracking-wider text-brand-muted mt-1">
                    {service.stats.label}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal">
                  Applicable Statutory Frameworks:
                </div>
                <div className="space-y-1.5">
                  {service.applicableFrameworks.map((fw) => (
                    <div key={fw} className="flex items-center gap-2 text-xs text-brand-muted">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-red shrink-0" />
                      <span>{fw}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E7E5E1] text-xs text-brand-muted">
                DIFC Practice Head Lead • Direct Partner Representation
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-16 sm:py-24 border-b border-[#E7E5E1] bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-3">
              <SectionLabel>PRACTICE OVERVIEW</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                Technical Context & Scope
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
              <p>{service.description}</p>

              {/* Sub-services tags */}
              <div className="pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
                  Comprehensive Service Scope:
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.services.map((sub) => (
                    <span
                      key={sub}
                      className="px-3 py-1.5 bg-[#F8F7F4] border border-[#E7E5E1] text-xs text-brand-charcoal font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="py-16 sm:py-24 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl mb-14 space-y-3">
            <SectionLabel>SPECIALIZED WORKSTREAMS</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              Core Capabilities
            </h2>
            <p className="text-sm text-brand-muted">
              Deep, focused workstreams tailored to enterprise corporate groups and international holding structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-8 bg-white border border-[#E7E5E1] hover:border-brand-red transition-all duration-300 space-y-4 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brand-red">
                    0{idx + 1}
                  </span>
                  <h3 className="font-editorial text-xl sm:text-2xl text-brand-primary">
                    {cap.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed">
                  {cap.description}
                </p>

                {cap.deliverables && (
                  <div className="pt-3 border-t border-[#E7E5E1] space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted block">
                      Target Deliverables:
                    </span>
                    {cap.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-brand-charcoal">
                        <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our 4-Step Approach */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl mb-14 space-y-3">
            <SectionLabel>OUR METHODOLOGY</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              The Four-Phase Engagement Cycle
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E5E1]">
            {service.approach.map((step) => (
              <div key={step.step} className="p-6 first:pl-0 space-y-3">
                <span className="font-mono text-2xl font-bold text-brand-red">
                  {step.step}
                </span>
                <h4 className="font-editorial text-xl text-brand-primary">
                  {step.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why It Matters */}
      <section className="py-16 sm:py-24 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3">
            <SectionLabel>STRATEGIC IMPERATIVES</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              {service.whyItMatters.headline}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whyItMatters.points.map((pt, idx) => (
              <div key={idx} className="p-7 bg-white border border-[#E7E5E1] space-y-3">
                <div className="flex items-center gap-2 text-brand-red font-semibold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Risk Point 0{idx + 1}</span>
                </div>
                <h4 className="font-editorial text-lg text-brand-primary">
                  {pt.title}
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {pt.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Deliverables & Related Services */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Deliverables (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel>DOCUMENTATION & OPINIONS</SectionLabel>
              <h3 className="font-editorial text-2xl text-brand-primary">
                Key Technical Deliverables
              </h3>
              <div className="space-y-3">
                {service.keyDeliverables.map((del, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8F7F4] border border-[#E7E5E1] flex items-center gap-3 text-xs sm:text-sm text-brand-charcoal"
                  >
                    <FileText className="w-4 h-4 text-brand-red shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Services (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <SectionLabel>CONNECTED DISCIPLINES</SectionLabel>
              <h3 className="font-editorial text-2xl text-brand-primary">
                Related Advisory Practices
              </h3>
              <div className="space-y-3">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/services/${rel.slug}`}
                    className="p-4 border border-[#E7E5E1] bg-white hover:border-brand-red hover:bg-[#F8F7F4] transition-all flex items-center justify-between group block"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-brand-red font-bold">
                          {rel.number}
                        </span>
                        <h4 className="text-sm font-semibold text-brand-primary group-hover:text-brand-red transition-colors">
                          {rel.title}
                        </h4>
                      </div>
                      <p className="text-xs text-brand-muted line-clamp-1">
                        {rel.shortDescription}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-brand-muted group-hover:text-brand-red shrink-0 ml-3" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="py-16 sm:py-20 bg-[#F8F7F4]">
        <Container>
          <div className="p-8 sm:p-12 bg-brand-dark text-white border border-white/15 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red">
                CONFIDENTIAL ENGAGEMENT
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl">
                Ready to review your {service.title} posture?
              </h3>
              <p className="text-xs text-white/70">
                Direct engagement with our DIFC tax partners. We conduct preliminary diagnostic assessments to identify exposures under UAE law.
              </p>
            </div>

            <CTAButton href="/contact" variant="primary" size="lg" icon className="shrink-0">
              Initiate Discussion
            </CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
