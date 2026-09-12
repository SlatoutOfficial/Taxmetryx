import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import CTAButton from "@/components/shared/CTAButton";
import { getServices } from "@/lib/json";
import {
  FadeIn,
  ScaleIn,
} from "@/components/shared/ScrollMotion";
import {
  ArrowUpRight,
  Check,
  Scale,
  Building2,
  Globe2,
  Receipt,
  ShieldAlert,
  Cpu,
  Layers,
  HelpCircle,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services | Taxmetryx Global",
  description:
    "Taxmetryx provides advisory, documentation and compliance support across six areas of tax — 65 defined areas in total.",
};

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-5 h-5 text-[#EB0045]" />,
  Building2: <Building2 className="w-5 h-5 text-[#EB0045]" />,
  Globe2: <Globe2 className="w-5 h-5 text-[#EB0045]" />,
  Receipt: <Receipt className="w-5 h-5 text-[#EB0045]" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#EB0045]" />,
  Cpu: <Cpu className="w-5 h-5 text-[#EB0045]" />,
};

export default function ServicesPage() {
  const services = getServices();

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Hero Section */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={15} delay={0.05}>
                <SectionLabel>OUR SERVICES</SectionLabel>
              </FadeIn>

              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-clamp-hero text-brand-primary">
                  Our services
                </h1>
              </FadeIn>

              <FadeIn distance={20} delay={0.18}>
                <p className="text-base sm:text-lg text-brand-charcoal/85 leading-relaxed font-sans max-w-2xl font-light">
                  Taxmetryx provides advisory, documentation and compliance support across six areas of tax. Whether you are reviewing a transaction, preparing a return or responding to an enquiry, we help identify the work required and the information needed to support it.
                </p>
              </FadeIn>

              <FadeIn distance={15} delay={0.25}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CTAButton href="#services-list" variant="primary" size="lg" icon>
                    Explore all 65 areas of work
                  </CTAButton>
                  <CTAButton href="/contact" variant="secondary" size="lg">
                    Ask our team
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            {/* Signature Hero Panel: Six areas, one discipline */}
            <div className="lg:col-span-5 relative">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="p-7 sm:p-9 bg-white border border-[#E7E5E1] shadow-lg relative overflow-hidden space-y-5">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#EB0045]" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB0045] font-bold">
                      THE DISCIPLINE
                    </span>
                    <h2 className="font-editorial text-2xl sm:text-3xl text-brand-primary">
                      Six areas, one discipline
                    </h2>
                  </div>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-brand-charcoal/85 font-sans leading-relaxed">
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#EB0045] shrink-0 mt-0.5" />
                      <span>Every engagement starts from your transactions and facts, not a template.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#EB0045] shrink-0 mt-0.5" />
                      <span>Each service below opens into its full scope of work — <strong>65 defined areas in total</strong>.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#EB0045] shrink-0 mt-0.5" />
                      <span>Related services connect, so cross-cutting matters are handled once, coherently.</span>
                    </li>
                  </ul>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Two-Column Service Index */}
      <section id="services-list" className="py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
            {/* Left Sidebar Navigation */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-white border border-[#E7E5E1] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-brand-muted font-bold pb-3 border-b border-[#E7E5E1]">
                  Service Areas
                </div>
                <nav className="space-y-1">
                  <a
                    href="#services-list"
                    className="flex items-center justify-between p-2.5 text-xs sm:text-sm font-medium text-[#EB0045] bg-[#EB0045]/5 border-l-2 border-[#EB0045] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold">00</span>
                      <span>All Services Overview</span>
                    </span>
                    <span className="text-[11px] font-mono text-brand-muted">65 areas</span>
                  </a>

                  {services.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="flex items-center justify-between p-2.5 text-xs sm:text-sm text-brand-charcoal hover:text-[#EB0045] hover:bg-[#FAF9F5] border-l-2 border-transparent hover:border-[#EB0045] transition-all group"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-brand-muted group-hover:text-[#EB0045]">
                          {svc.number}
                        </span>
                        <span className="group-hover:translate-x-0.5 transition-transform">
                          {svc.title}
                        </span>
                      </span>
                      <span className="text-[10px] font-mono uppercase text-brand-muted px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E1] group-hover:border-[#EB0045]/30 group-hover:text-[#EB0045]">
                        {svc.subservicesCount || svc.subservices?.length || 0} areas
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Side Help Card */}
              <div className="bg-white border border-[#E7E5E1] p-6 shadow-xs space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-[#EB0045]">
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Guidance
                  </span>
                </div>
                <h4 className="font-editorial text-lg text-brand-primary">
                  Not sure where your matter fits?
                </h4>
                <p className="text-xs text-brand-charcoal/80 leading-relaxed font-sans">
                  Describe the transaction or question and we will point you to the right starting place and required documentation.
                </p>
                <div className="pt-2">
                  <CTAButton href="/contact" variant="primary" size="sm" icon className="w-full text-center">
                    Ask our team
                  </CTAButton>
                </div>
              </div>
            </aside>

            {/* Right Column: Service Cards */}
            <div className="lg:col-span-8 space-y-10">
              {services.map((service) => (
                <FadeIn key={service.slug} distance={20} delay={0.05}>
                  <div
                    id={service.slug}
                    className="p-8 sm:p-10 bg-white border border-[#E7E5E1] hover:border-[#EB0045]/50 transition-all duration-300 relative group shadow-xs space-y-6"
                  >
                    {/* Header: Number, Icon, Title */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#E7E5E1]">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-[#EB0045]">
                            {service.number}
                          </span>
                          <div className="p-1.5 bg-[#EB0045]/5 border border-[#EB0045]/20">
                            {iconMap[service.icon] || <Scale className="w-4 h-4 text-[#EB0045]" />}
                          </div>
                          <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E1] text-brand-muted">
                            {service.subservicesCount || service.subservices?.length || 0} Areas of Work
                          </span>
                        </div>

                        <Link href={`/services/${service.slug}`}>
                          <h2 className="font-editorial text-2xl sm:text-3xl text-brand-primary group-hover:text-[#EB0045] transition-colors">
                            {service.title}
                          </h2>
                        </Link>

                        <p className="text-sm sm:text-base text-brand-charcoal font-medium font-sans max-w-xl">
                          {service.overviewDescription || service.shortDescription}
                        </p>
                      </div>

                      <div className="shrink-0 pt-1">
                        <CTAButton
                          href={`/services/${service.slug}`}
                          variant="primary"
                          size="sm"
                          icon
                        >
                          View Full Service Detail
                        </CTAButton>
                      </div>
                    </div>

                    {/* Lede text from prototype */}
                    <p className="text-xs sm:text-sm text-brand-charcoal/80 leading-relaxed font-sans">
                      {service.lede || service.description}
                    </p>

                    {/* When to involve us bullet points */}
                    {service.whenToInvolve && service.whenToInvolve.length > 0 && (
                      <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E1] space-y-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EB0045] block">
                          When to Involve Us:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.whenToInvolve.slice(0, 4).map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs text-brand-charcoal/85">
                              <Check className="w-3.5 h-3.5 text-[#EB0045] shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Subservices Scope pill list */}
                    {service.subservices && service.subservices.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <div className="flex items-center justify-between text-xs text-brand-muted">
                          <span className="font-mono uppercase tracking-wider font-semibold">
                            Defined Scope of Work ({service.subservices.length} areas):
                          </span>
                          <Link
                            href={`/services/${service.slug}#areas-of-work`}
                            className="text-[#EB0045] hover:underline font-medium text-xs flex items-center gap-1"
                          >
                            <span>Explore all</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {service.subservices.map((sub) => (
                            <span
                              key={sub.number}
                              className="px-2.5 py-1 bg-white border border-[#E7E5E1] text-[11px] text-brand-charcoal flex items-center gap-1.5"
                            >
                              <span className="font-mono text-[10px] text-[#EB0045] font-semibold">
                                {sub.number}
                              </span>
                              <span>{sub.title}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Typical Outputs Line */}
                    {service.typicalOutputs && (
                      <div className="pt-4 border-t border-[#E7E5E1] flex items-start gap-2 text-xs text-brand-muted">
                        <FileCheck className="w-4 h-4 text-[#EB0045] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-brand-charcoal font-semibold mr-1">Typical outputs:</strong>
                          <span>{service.typicalOutputs}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing Banner */}
      <section className="py-16 sm:py-20 bg-brand-dark text-white border-t border-white/10">
        <Container>
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#EB0045] font-bold">
              GET IN TOUCH
            </span>
            <h3 className="font-editorial text-2xl sm:text-4xl text-white">
              Not sure where your matter fits?
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans font-light">
              Describe the transaction or question and we will outline the work involved, the information needed, and a clear path forward.
            </p>
            <div className="pt-2">
              <CTAButton href="/contact" variant="primary" size="lg" icon>
                Ask our team
              </CTAButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
