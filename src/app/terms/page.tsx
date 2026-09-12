import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/shared/ScrollMotion";

export const metadata: Metadata = {
  title: "Terms of Use | Taxmetryx Advisory Ltd.",
  description: "Terms and conditions governing use of Taxmetryx Advisory Ltd. website and digital portals.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      <section className="pb-16 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <FadeIn direction="up" className="lg:col-span-8 space-y-4">
              <SectionLabel>LEGAL TERMS</SectionLabel>
              <h1 className="font-editorial text-clamp-hero text-brand-primary">
                Terms of Use
              </h1>
              <p className="text-xs font-mono text-brand-muted">
                Effective: August 2026
              </p>
            </FadeIn>
            <ScaleIn delay={0.1} className="lg:col-span-4 relative aspect-[16/9] overflow-hidden border border-[#E7E5E1] bg-brand-dark hidden sm:block">
              <Image
                src="/images/expertise-architecture.jpg"
                alt="Taxmetryx Legal & Governance"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/80 uppercase">
                Website Terms of Use
              </div>
            </ScaleIn>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <StaggerContainer staggerDelay={0.06} className="max-w-3xl space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing or browsing this website operated by Taxmetryx Advisory Ltd., you agree to be bound by these Terms of Use and all applicable laws and regulations.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">2. No Advisory Relationship Created</h2>
              <p>
                The information published on this website - including insights, newsletters, statutory summaries, and benchmarks - is provided solely for general informational purposes. Transmission or receipt of information through this website does not constitute or create a client-advisor or attorney-client relationship. Formal advisory services require a written Engagement Letter signed by an authorized Taxmetryx partner.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">3. Intellectual Property Rights</h2>
              <p>
                All content, trademarks, diagrams, radial visualizations, and publication texts appearing on this site are the exclusive intellectual property of Taxmetryx Advisory Ltd. Unauthorized reproduction, scraping, or distribution without prior written consent is strictly prohibited.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">4. Questions & Disputes</h2>
              <p>
                For questions about these terms or to raise a dispute concerning this website, please contact Taxmetryx.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>
    </div>
  );
}
