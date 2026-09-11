import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getServices } from "@/lib/json";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/ScrollMotion";
import { ArrowUpRight, Check, Scale, Building2, Globe2, Receipt, ShieldAlert, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Practices & Capabilities | Specialist Tax Advisory",
  description:
    "Explore Taxmetryx's 6 core practices: Transfer Pricing, Corporate Tax, International Tax, VAT & Indirect Tax, Controversy & Regulatory Defense, and Global Emerging Tax Regulations.",
};

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-5 h-5 text-brand-red" />,
  Building2: <Building2 className="w-5 h-5 text-brand-red" />,
  Globe2: <Globe2 className="w-5 h-5 text-brand-red" />,
  Receipt: <Receipt className="w-5 h-5 text-brand-red" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-brand-red" />,
  Cpu: <Cpu className="w-5 h-5 text-brand-red" />,
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Hero Section with Architectural Showcase */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={15} delay={0.05}>
                <SectionLabel>OUR PRACTICES</SectionLabel>
              </FadeIn>

              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-clamp-hero text-brand-primary">
                  Six practices. <br />
                  One discipline: <br />
                  <span className="text-brand-red">Real impact.</span>
                </h1>
              </FadeIn>

              <FadeIn distance={20} delay={0.18}>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-sans max-w-xl">
                  We provide deep, partner-led technical advisory across every substantive discipline of modern corporate taxation. Each practice area combines statutory precision under UAE Federal Decree-Laws with global OECD standards.
                </p>
              </FadeIn>

              <FadeIn distance={15} delay={0.25}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CTAButton href="/contact" variant="primary" size="lg" icon>
                    Practice Inquiries
                  </CTAButton>
                  <CTAButton href="/industries" variant="secondary" size="lg">
                    Explore by Industry
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5 relative">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="relative p-2 bg-white border border-[#E7E5E1] shadow-lg">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-brand-dark group">
                    <Image
                      src="/images/services-hero.jpg"
                      alt="Taxmetryx specialized tax practices in Dubai DIFC"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
                        TECHNICAL COMPETENCIES
                      </div>
                      <div className="font-editorial text-base sm:text-lg">
                        6 Core Practice Areas • DIFC Gateway
                      </div>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Comprehensive Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-12">
            {services.map((service) => (
              <FadeIn key={service.slug} distance={28} delay={0.05}>
                <div
                  id={service.slug}
                  className="p-8 sm:p-12 bg-white border border-[#E7E5E1] hover:border-brand-red/60 transition-all duration-300 relative group"
                >
                  {/* Top Row: Number, Icon, Title, Eyebrow */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-8 border-b border-[#E7E5E1]">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-brand-red">
                          {service.number}
                        </span>
                        <div className="p-2 bg-brand-red/5 border border-brand-red/20">
                          {iconMap[service.icon] || <Scale className="w-5 h-5 text-brand-red" />}
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-widest text-brand-muted">
                          {service.eyebrow}
                        </span>
                      </div>

                      <Link href={`/services/${service.slug}`}>
                        <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-brand-primary group-hover:text-brand-red transition-colors">
                          {service.title}
                        </h2>
                      </Link>

                      <p className="text-xs sm:text-sm text-brand-charcoal/85 leading-relaxed max-w-2xl">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Right Image & Action Column */}
                    <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between items-start sm:items-center lg:items-end gap-4">
                      <Link
                        href={`/services/${service.slug}`}
                        className="relative w-full sm:w-64 lg:w-full aspect-[16/9] overflow-hidden border border-[#E7E5E1] group/img block"
                      >
                        <Image
                          src={`/images/services/${service.slug}-hero.jpg`}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                      </Link>

                      <div className="flex items-center justify-between w-full pt-1">
                        {service.stats && (
                          <div>
                            <div className="font-editorial text-2xl text-brand-primary">
                              {service.stats.value}
                            </div>
                            <div className="text-[10px] uppercase font-mono tracking-wider text-brand-muted">
                              {service.stats.label}
                            </div>
                          </div>
                        )}

                        <CTAButton
                          href={`/services/${service.slug}`}
                          variant="primary"
                          size="sm"
                          icon
                        >
                          Explore Practice
                        </CTAButton>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Capabilities & Subservices */}
                  <div className="pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {service.capabilities.slice(0, 3).map((cap, idx) => (
                      <div key={idx} className="space-y-2 p-4 bg-[#F8F7F4]/60 border border-[#E7E5E1]">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
                          {cap.title}
                        </h4>
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {cap.description}
                        </p>
                        {cap.deliverables && (
                          <div className="pt-2 border-t border-[#E7E5E1] space-y-1">
                            {cap.deliverables.map((del, dIdx) => (
                              <div key={dIdx} className="flex items-center gap-1.5 text-[11px] text-brand-charcoal/80">
                                <Check className="w-3 h-3 text-brand-red shrink-0" />
                                <span>{del}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sub-services tags bar */}
                  <div className="mt-6 pt-4 border-t border-[#E7E5E1] flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-muted mr-2">
                      Scope of Work:
                    </span>
                    {service.services.map((sub) => (
                      <span
                        key={sub}
                        className="px-2.5 py-1 bg-white border border-[#E7E5E1] text-[11px] text-brand-charcoal"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Engagement Models Box */}
          <FadeIn distance={25} delay={0.1}>
            <div className="mt-20 p-8 sm:p-12 bg-white border border-[#E7E5E1] space-y-8">
              <div>
                <SectionLabel>ENGAGEMENT MODELS</SectionLabel>
                <h3 className="font-editorial text-2xl sm:text-3xl text-brand-primary">
                  Flexible structures tailored to corporate governance
                </h3>
              </div>

              <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StaggerItem className="p-6 border border-[#E7E5E1] bg-[#F8F7F4] space-y-2">
                  <div className="font-mono text-xs font-bold text-brand-red">01</div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                    Annual Advisory Retainer
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Continuous on-call tax counsel for C-suite and finance teams, reviewing everyday contracts, intercompany billing, and FTA announcements.
                  </p>
                </StaggerItem>

                <StaggerItem className="p-6 border border-[#E7E5E1] bg-[#F8F7F4] space-y-2">
                  <div className="font-mono text-xs font-bold text-brand-red">02</div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                    Project-Based Restructuring
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Discrete mandates such as group reorganization relief under Articles 27/28, benchmark studies, Local/Master files, or Pillar Two modeling.
                  </p>
                </StaggerItem>

                <StaggerItem className="p-6 border border-[#E7E5E1] bg-[#F8F7F4] space-y-2">
                  <div className="font-mono text-xs font-bold text-brand-red">03</div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                    Controversy & Dispute Defense
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Time-critical representation during FTA tax audits, penalty objections, Reconsideration Requests, and TDRC tribunal hearings.
                  </p>
                </StaggerItem>
              </StaggerContainer>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E7E5E1]">
                <span className="text-xs text-brand-muted">
                  Need advice on which practice corresponds to your entity&apos;s structure?
                </span>
                <CTAButton href="/contact" variant="primary" size="md" icon>
                  Request Practice Consultation
                </CTAButton>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
