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
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "About Us" }]} />
      </Container>

      {/* Hero Section */}
      <section className="pb-16 sm:pb-24 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel>OUR FOUNDING ETHOS</SectionLabel>
              <h1 className="font-editorial text-clamp-hero text-brand-primary">
                Precision in an era of <br />
                <span className="text-brand-red">fiscal transformation.</span>
              </h1>
              <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed max-w-xl">
                Taxmetryx was founded in Dubai with a single purpose: to provide independent, intellectually rigorous tax advisory to multinational enterprises and family conglomerates navigating the UAE&apos;s new fiscal landscape.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <CTAButton href="/services" variant="primary" size="lg" icon>
                  Explore Our Practices
                </CTAButton>
                <CTAButton href="/contact" variant="secondary" size="lg">
                  Speak to Our Leadership
                </CTAButton>
              </div>
            </div>

            <div className="lg:col-span-5">
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
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E5E1]">
            <div className="py-4 sm:py-0 px-4 first:pl-0 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">
                <Counter end={15} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Years Combined Experience
              </div>
              <div className="text-[11px] text-brand-muted">Big-4 & Regulatory Pedigree</div>
            </div>

            <div className="py-4 sm:py-0 px-4 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">
                <Counter end={450} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Engagements Delivered
              </div>
              <div className="text-[11px] text-brand-muted">Across UAE & Key Corridors</div>
            </div>

            <div className="py-4 sm:py-0 px-4 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">
                <Counter end={6} />
              </div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Core Practices
              </div>
              <div className="text-[11px] text-brand-muted">Integrated Fiscal Advisory</div>
            </div>

            <div className="py-4 sm:py-0 px-4 space-y-1">
              <div className="font-editorial text-4xl text-brand-primary">100%</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-brand-charcoal">
                Independent Advisory
              </div>
              <div className="text-[11px] text-brand-muted">Zero Conflict of Interest</div>
            </div>
          </div>
        </Container>
      </section>

      {/* The Strategic Story */}
      <section className="py-20 sm:py-28 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <SectionLabel>THE MACRO CONTEXT</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                From a zero-tax haven to a <br />
                <span className="text-brand-red">global benchmark.</span>
              </h2>
              <p className="text-sm text-brand-charcoal/85 leading-relaxed">
                The introduction of UAE Federal Corporate Tax (Federal Decree-Law No. 47 of 2022) and OECD Pillar Two global minimum tax fundamentally transformed corporate governance in the Middle East.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6 text-sm text-brand-charcoal/80 leading-relaxed">
              <p>
                In the past, holding structures in the UAE could operate with minimal economic documentation. Today, Article 34 of the Corporate Tax Law demands rigorous arm&apos;s length proof for all domestic and cross-border connected person transactions. The Qualifying Free Zone Person (QFZP) regime enforces strict substance and de minimis revenue conditions.
              </p>
              <p>
                Taxmetryx was built specifically for this new reality. We do not recycle generic Western templates or deliver superficial tick-box compliance. Every functional analysis, economic benchmarking study, and legal memorandum is built from the ground up to withstand forensic audit by the UAE Federal Tax Authority and overseas competent authorities.
              </p>

              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 border border-[#E7E5E1] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-brand-red font-semibold text-xs uppercase tracking-wider">
                    <Scale className="w-4 h-4" />
                    <span>Judicial-Standard Defense</span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    We prepare every advisory file with the assumption that it may be scrutinized before the Tax Disputes Resolution Committee (TDRC).
                  </p>
                </div>

                <div className="p-5 border border-[#E7E5E1] bg-white space-y-2">
                  <div className="flex items-center gap-2 text-brand-red font-semibold text-xs uppercase tracking-wider">
                    <Globe2 className="w-4 h-4" />
                    <span>Cross-Border Synchronization</span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Harmonizing UAE positions with bilateral tax treaties across Europe, Asia-Pacific, and the GCC.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Leadership & Practice Pillars */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl mb-16 space-y-4">
            <SectionLabel>LEADERSHIP PHILOSOPHY</SectionLabel>
            <h2 className="font-editorial text-clamp-heading text-brand-primary">
              Why leading groups choose <br />
              <span className="text-brand-red">Taxmetryx Advisory.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipCredentials.map((cred, idx) => (
              <div
                key={cred.title}
                className="p-7 border border-[#E7E5E1] bg-[#F8F7F4]/50 hover:border-brand-red hover:bg-[#F8F7F4] transition-all duration-300 space-y-3 group"
              >
                <div className="font-mono text-xs font-bold text-brand-red">
                  0{idx + 1}
                </div>
                <h3 className="font-editorial text-xl text-brand-primary group-hover:text-brand-red transition-colors">
                  {cred.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {cred.text}
                </p>
              </div>
            ))}
          </div>

          {/* DIFC Presence Box */}
          <div className="mt-16 p-8 border border-[#E7E5E1] bg-[#F8F7F4] flex flex-col lg:flex-row items-center justify-between gap-8">
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

            <CTAButton href="/contact" variant="primary" size="lg" icon className="shrink-0">
              Arrange a Consultation
            </CTAButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
