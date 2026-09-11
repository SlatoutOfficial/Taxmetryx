import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/shared/ScrollMotion";

export const metadata: Metadata = {
  title: "Disclaimer | Taxmetryx Advisory Ltd.",
  description: "Statutory tax and legal disclaimer for Taxmetryx Advisory Ltd.",
};

export default function DisclaimerPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      <section className="pb-16 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <FadeIn direction="up" className="lg:col-span-8 space-y-4">
              <SectionLabel>LEGAL & REGULATORY NOTICE</SectionLabel>
              <h1 className="font-editorial text-clamp-hero text-brand-primary">
                Disclaimer
              </h1>
              <p className="text-xs font-mono text-brand-muted">
                Important notice regarding tax interpretations, FTA regulations, and ministerial decisions.
              </p>
            </FadeIn>
            <ScaleIn delay={0.1} className="lg:col-span-4 relative aspect-[16/9] overflow-hidden border border-[#E7E5E1] bg-brand-dark hidden sm:block">
              <Image
                src="/images/expertise-architecture.jpg"
                alt="Taxmetryx Statutory & Regulatory Notice"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/80 uppercase">
                Statutory Regulatory Notice
              </div>
            </ScaleIn>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <StaggerContainer staggerDelay={0.06} className="max-w-3xl space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">
                1. General Tax Information Only
              </h2>
              <p>
                The materials, commentaries, and summaries presented on taxmetryx.com do not constitute formal legal, accounting, tax, or financial advice. Tax laws, including UAE Federal Decree-Law No. 47 of 2022, Cabinet Decisions, Ministerial Decisions, and Federal Tax Authority (FTA) Public Clarifications, are subject to dynamic legislative amendment, judicial reinterpretation, and administrative evolution.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">
                2. Individual Facts and Case Specificity
              </h2>
              <p>
                Tax outcomes depend entirely on the specific factual matrix of each corporate structure, contractual terms, Free Zone licenses, intercompany cashflows, and historical tax positions. Readers must not act or refrain from acting on the basis of any material contained on this website without seeking tailored professional advice from a licensed tax advisor or legal counsel.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">
                3. Limitation of Liability
              </h2>
              <p>
                Taxmetryx Advisory Ltd., its partners, directors, and associates disclaim all liability and responsibility to any person or entity in respect of anything done, or omitted to be done, wholly or partly in reliance upon the whole or any part of the contents of this website.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>
    </div>
  );
}
