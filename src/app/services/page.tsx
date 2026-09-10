import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import { getServices } from "@/lib/json";
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
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Our Services" }]} />
      </Container>

      {/* Hero Section */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-6">
            <SectionLabel>OUR PRACTICES</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Six practices. <br />
              One discipline: <br />
              <span className="text-brand-red">Real impact.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
              We provide deep, partner-led technical advisory across every substantive discipline of modern corporate taxation. Each practice area combines statutory precision under UAE Federal Decree-Laws with global OECD standards.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Comprehensive Grid */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="space-y-12">
            {services.map((service) => (
              <div
                key={service.slug}
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

                  {/* Right Action Column */}
                  <div className="lg:col-span-4 flex lg:flex-col items-end justify-between lg:justify-start gap-4">
                    {service.stats && (
                      <div className="text-right">
                        <div className="font-editorial text-2xl sm:text-3xl text-brand-primary">
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
                      Practice Details
                    </CTAButton>
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
            ))}
          </div>

          {/* Engagement Models Box */}
          <div className="mt-20 p-8 sm:p-12 bg-white border border-[#E7E5E1] space-y-8">
            <div>
              <SectionLabel>ENGAGEMENT MODELS</SectionLabel>
              <h3 className="font-editorial text-2xl sm:text-3xl text-brand-primary">
                Flexible structures tailored to corporate governance
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-[#E7E5E1] bg-[#F8F7F4] space-y-2">
                <div className="font-mono text-xs font-bold text-brand-red">01</div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                  Annual Advisory Retainer
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Continuous on-call tax counsel for C-suite and finance teams, reviewing everyday contracts, intercompany billing, and FTA announcements.
                </p>
              </div>

              <div className="p-6 border border-[#E7E5E1] bg-[#F8F7F4] space-y-2">
                <div className="font-mono text-xs font-bold text-brand-red">02</div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                  Project-Based Restructuring
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Discrete mandates such as group reorganization relief under Articles 27/28, benchmark studies, Local/Master files, or Pillar Two modeling.
                </p>
              </div>

              <div className="p-6 border border-[#E7E5E1] bg-[#F8F7F4] space-y-2">
                <div className="font-mono text-xs font-bold text-brand-red">03</div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
                  Controversy & Dispute Defense
                </h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Time-critical representation during FTA tax audits, penalty objections, Reconsideration Requests, and TDRC tribunal hearings.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E7E5E1]">
              <span className="text-xs text-brand-muted">
                Need advice on which practice corresponds to your entity&apos;s structure?
              </span>
              <CTAButton href="/contact" variant="primary" size="md" icon>
                Request Practice Consultation
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
