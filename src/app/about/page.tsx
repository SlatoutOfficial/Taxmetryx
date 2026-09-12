import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTAButton from "@/components/shared/CTAButton";
import Counter from "@/components/shared/Counter";
import Reveal from "@/components/shared/Reveal";
import { ShieldCheck, Scale, Globe2, Building, CheckCircle2 } from "lucide-react";
import { getSiteConfig } from "@/lib/json";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/ScrollMotion";

export const metadata: Metadata = {
  title: "About Us | Specialist UAE Corporate Tax & Transfer Pricing Advisory",
  description:
    "Learn about Taxmetryx, our founding ethos, independent technical advisory philosophy, and our DIFC-based practice serving global multinational enterprises.",
};

export default function AboutPage() {
  const site = getSiteConfig();

  const leadershipCredentials = [
    {
      title: "Former Big-4 & Global Law Leaders",
      text: "Our senior partners previously headed regional transfer pricing and tax controversy practices across EMEA.",
    },
    {
      title: "Direct C-Suite & Board Access",
      text: "Every substantive position paper and economic benchmark is personally reviewed and signed off by senior practice leaders.",
    },
    {
      title: "Uncompromising Objectivity",
      text: "As an independent specialist firm, we carry zero audit conflicts of interest, allowing us to represent taxpayers assertively against regulatory bodies.",
    },
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      {/* Hero Section */}
      <section className="pb-16 sm:pb-24 border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={15} delay={0.05}>
                <SectionLabel>OUR FOUNDING ETHOS</SectionLabel>
              </FadeIn>

              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-clamp-hero text-brand-primary">
                  Precision in an era of <br />
                  <span className="text-brand-red">fiscal transformation.</span>
                </h1>
              </FadeIn>

              <FadeIn distance={20} delay={0.18}>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed max-w-xl">
                  Taxmetryx was founded in Dubai with a single purpose: to provide independent, intellectually rigorous tax advisory to multinational enterprises and family conglomerates navigating the UAE&apos;s new fiscal landscape.
                </p>
              </FadeIn>

              <FadeIn distance={15} delay={0.25}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CTAButton href="/services" variant="primary" size="lg" icon>
                    Explore Our Practices
                  </CTAButton>
                  <CTAButton href="/contact" variant="secondary" size="lg" icon>
                    Speak to Our Leadership
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#E7E5E1] bg-brand-dark shadow-sm">
                  <Image
                    src="/images/who-we-are.jpg"
                    alt="Taxmetryx headquarters in Dubai DIFC"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-4 left-4 bg-brand-dark/95 text-white px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase">
                    DIFC Gate Precinct • Dubai
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b border-[#E7E5E1]">
        <Container>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E5E1]">
            <StaggerItem className="py-4 sm:py-0 px-4 first:pl-0 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">
                <Counter end={15} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Years Combined Experience
              </div>
              <div className="text-[11px] text-brand-muted">Big-4 & Regulatory Pedigree</div>
            </StaggerItem>

            <StaggerItem className="py-4 sm:py-0 px-4 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">
                <Counter end={450} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Engagements Delivered
              </div>
              <div className="text-[11px] text-brand-muted">Across UAE & Key Corridors</div>
            </StaggerItem>

            <StaggerItem className="py-4 sm:py-0 px-4 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">
                <Counter end={6} />
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Core Practices
              </div>
              <div className="text-[11px] text-brand-muted">Integrated Fiscal Advisory</div>
            </StaggerItem>

            <StaggerItem className="py-4 sm:py-0 px-4 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">100%</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Independent Advisory
              </div>
              <div className="text-[11px] text-brand-muted">Zero Conflict of Interest</div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* The Strategic Story */}
      <section className="py-20 sm:py-28 border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <FadeIn distance={20} delay={0.05}>
                <SectionLabel>THE MACRO CONTEXT</SectionLabel>
                <h2 className="font-editorial text-clamp-heading text-brand-primary mt-2">
                  From a zero-tax haven to a <br />
                  <span className="text-brand-red">global benchmark.</span>
                </h2>
                <p className="text-sm text-brand-charcoal/85 leading-relaxed mt-3">
                  The introduction of UAE Federal Corporate Tax (Federal Decree-Law No. 47 of 2022) and OECD Pillar Two global minimum tax fundamentally transformed corporate governance in the Middle East.
                </p>

                {/* Architectural Visual Anchor */}
                <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E7E5E1] bg-brand-dark group mt-4">
                  <Image
                    src="/images/values-sculpture.jpg"
                    alt="Taxmetryx Institutional Standards in Dubai"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[9px] font-mono uppercase tracking-widest text-brand-red">
                      FOUNDING PRINCIPLE
                    </div>
                    <div className="font-editorial text-sm">
                      Uncompromising Technical Discipline
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-brand-charcoal/80 leading-relaxed">
              <FadeIn distance={20} delay={0.15}>
                <p>
                  In the past, holding structures in the UAE could operate with minimal economic documentation. Today, Article 34 of the Corporate Tax Law demands rigorous arm&apos;s length proof for all domestic and cross-border connected person transactions. The Qualifying Free Zone Person (QFZP) regime enforces strict substance and de minimis revenue conditions.
                </p>
                <p className="mt-4">
                  Taxmetryx was built specifically for this new reality. We do not recycle generic Western templates or deliver superficial tick-box compliance. Every functional analysis, economic benchmarking study, and legal memorandum is built from the ground up to withstand forensic audit by the UAE Federal Tax Authority and overseas competent authorities.
                </p>

                <StaggerContainer className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <StaggerItem className="p-5 border border-[#E7E5E1] bg-white space-y-2">
                    <div className="flex items-center gap-2 text-brand-red font-semibold text-xs uppercase tracking-wider">
                      <Scale className="w-4 h-4" />
                      <span>Judicial-Standard Defense</span>
                    </div>
                    <p className="text-xs text-brand-muted">
                      We prepare every advisory file with the assumption that it may be scrutinized before the Tax Disputes Resolution Committee (TDRC).
                    </p>
                  </StaggerItem>

                  <StaggerItem className="p-5 border border-[#E7E5E1] bg-white space-y-2">
                    <div className="flex items-center gap-2 text-brand-red font-semibold text-xs uppercase tracking-wider">
                      <Globe2 className="w-4 h-4" />
                      <span>Cross-Border Synchronization</span>
                    </div>
                    <p className="text-xs text-brand-muted">
                      Harmonizing UAE positions with bilateral tax treaties across Europe, Asia-Pacific, and the GCC.
                    </p>
                  </StaggerItem>
                </StaggerContainer>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Meet the Founder Section - Premium */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden border-b border-[#E7E5E1]">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-brand-red/[0.03] to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 max-w-6xl mx-auto">
            {/* Left Column: Image Card */}
            <div className="w-full max-w-[420px] shrink-0 relative group">
              <FadeIn distance={30} duration={1.2}>
                <div className="relative w-full rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#e00019] to-[#a30012] aspect-[4/5] shadow-[0_20px_60px_rgba(224,0,25,0.25)] transition-transform duration-700 hover:-translate-y-2">
                  {/* Animated Background Circles */}
                  <div className="absolute top-0 right-0 w-[150%] h-[150%] -translate-y-1/4 translate-x-1/4 opacity-30 animate-[spin_40s_linear_infinite] pointer-events-none">
                    <div className="absolute inset-0 border-[40px] border-white/20 rounded-full" />
                    <div className="absolute inset-[15%] border-[20px] border-white/10 rounded-full" />
                  </div>
                  
                  {/* Portrait Image */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    <img
                      src="/images/ajin-thomos.webp"
                      alt="Ajin Thomas"
                      className="w-full h-auto max-h-[95%] object-contain object-bottom drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlay Gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
                
                {/* Name / Title */}
                <div className="mt-8 text-center">
                  <h3 className="font-editorial text-3xl text-brand-primary tracking-tight">Ajin Thomas</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-red mt-2">Founder & Managing Partner</p>
                </div>
              </FadeIn>
            </div>

            {/* Right Column: Text Content */}
            <div className="w-full max-w-2xl relative">
              <FadeIn distance={20} delay={0.2}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-12 h-[2px] bg-[#e00019]" />
                  <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                    Leadership Profile
                  </span>
                </div>
                
                <h2 className="font-editorial text-5xl sm:text-6xl text-brand-primary mb-8 leading-tight">
                  Meet the <br />
                  <span className="text-brand-red italic">Architect.</span>
                </h2>
                
                <div className="relative">
                  {/* Large decorative quote mark */}
                  <div className="absolute -top-10 -left-8 text-[10rem] text-[#f8f7f4] font-editorial leading-none select-none z-0">
                    &ldquo;
                  </div>
                  
                  <div className="relative z-10 space-y-6 text-[15px] text-brand-charcoal/80 leading-relaxed font-light">
                    <p>
                      Ajin Thomas is a Chartered Accountant whose work focuses on Transfer Pricing, Corporate Tax and International Taxation. His experience includes the meticulous analysis of related-party arrangements, rigorous economic benchmarking, and the preparation of bulletproof supporting documentation.
                    </p>
                    <p>
                      At Taxmetryx, Ajin&apos;s approach is fundamentally different: stay intimately close to the client&apos;s operational realities and maintain an unbreakable link between deep technical analysis and highly practical recommendations. He works alongside his team to build a boutique practice where institutional quality, elite responsiveness, and absolute responsibility define the day-to-day client experience.
                    </p>
                  </div>
                </div>

                {/* Tag Pills */}
                <div className="mt-10">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-brand-muted mb-4">
                    Areas of Expertise
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "Chartered Accountant",
                      "Transfer Pricing",
                      "Corporate Tax",
                      "International Taxation"
                    ].map((tag) => (
                      <span 
                        key={tag}
                        className="px-5 py-2.5 bg-[#f8f7f4] border border-[#e8e6e1] rounded-full text-xs font-medium text-brand-primary transition-all duration-300 hover:border-brand-red hover:text-brand-red hover:shadow-md cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership & Practice Pillars */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E7E5E1]">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-3xl mb-16 space-y-4">
              <SectionLabel>LEADERSHIP PHILOSOPHY</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                Why leading groups choose <br />
                <span className="text-brand-red">Taxmetryx Advisory.</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipCredentials.map((cred, idx) => (
              <StaggerItem
                key={cred.title}
                className="p-7 border border-[#E7E5E1] bg-[#F8F7F4]/50 hover:border-brand-red hover:bg-[#F8F7F4] transition-all duration-300 space-y-3 group"
              >
                <div className="font-mono text-xs font-bold text-brand-red">
                  {idx + 1}
                </div>
                <h3 className="font-editorial text-xl text-brand-primary group-hover:text-brand-red transition-colors">
                  {cred.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {cred.text}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* DIFC Presence Box with Visual Integration */}
          <FadeIn distance={25} delay={0.15}>
            <div className="mt-16 p-8 border border-[#E7E5E1] bg-[#F8F7F4] flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden border border-[#E7E5E1] bg-brand-dark">
                  <Image
                    src="/images/expertise-architecture.jpg"
                    alt="DIFC Gate Precinct Headquarters"
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-red">
                    <Building className="w-4 h-4" />
                    <span>Operating from the Heart of DIFC</span>
                  </div>
                  <h3 className="font-editorial text-2xl text-brand-primary">
                    Dubai International Financial Centre Headquarters
                  </h3>
                  <p className="text-xs text-brand-muted max-w-xl">
                    {site.headquarters.address}, {site.headquarters.zone}, Dubai, United Arab Emirates. Licensed and regulated under DIFC Authority license {site.legal.licenseNo}.
                  </p>
                </div>
              </div>

              <CTAButton href="/contact" variant="primary" size="lg" icon className="shrink-0">
                Arrange a Consultation
              </CTAButton>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
