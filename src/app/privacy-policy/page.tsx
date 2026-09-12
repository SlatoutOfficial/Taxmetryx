import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/shared/ScrollMotion";

export const metadata: Metadata = {
  title: "Privacy Policy | Taxmetryx Advisory Ltd.",
  description: "DIFC Data Protection Law No. 5 of 2020 privacy policy for Taxmetryx Advisory Ltd.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      <section className="pb-16 border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <FadeIn direction="up" className="lg:col-span-8 space-y-4">
              <SectionLabel>REGULATORY COMPLIANCE</SectionLabel>
              <h1 className="font-editorial text-clamp-hero text-brand-primary">
                Privacy Policy
              </h1>
              <p className="text-xs font-mono text-brand-muted">
                Last Updated: August 2026 • Governed under DIFC Data Protection Law No. 5 of 2020
              </p>
            </FadeIn>
            <ScaleIn delay={0.1} className="lg:col-span-4 relative aspect-[16/9] overflow-hidden border border-[#E7E5E1] bg-brand-dark hidden sm:block">
              <Image
                src="/images/values-sculpture.jpg"
                alt="Taxmetryx Data Protection & Governance"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-white/80 uppercase">
                DIFC Commissioner of Data Protection
              </div>
            </ScaleIn>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <StaggerContainer staggerDelay={0.06} className="max-w-3xl space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">1. Overview & Data Controller</h2>
              <p>
                Taxmetryx Advisory Ltd. (&ldquo;Taxmetryx&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates as a registered corporate and tax advisory firm within the Dubai International Financial Centre (DIFC), registered under Commercial License No. DIFC-CL-89240. We are committed to safeguarding personal data in accordance with DIFC Data Protection Law No. 5 of 2020 and global privacy benchmarks.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">2. Information We Collect</h2>
              <p>
                In providing advisory, transfer pricing benchmarking, and dispute resolution services, we may collect:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-brand-muted">
                <li>Professional identity data (full name, corporate title, passport/Emirates ID details for statutory declarations).</li>
                <li>Corporate and financial records necessary to substantiate arm&apos;s length pricing and corporate tax filings.</li>
                <li>Inquiry metadata submitted via our website contact or career portals.</li>
              </ul>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">3. Legal Basis for Processing</h2>
              <p>
                We process your personal information exclusively for: fulfilling contractual advisory obligations, complying with UAE Federal Tax Authority (FTA) statutory disclosures, and screening for mandatory anti-money laundering (AML) and counter-terrorist financing (CFT) requirements.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">4. Data Confidentiality & Cross-Border Transfers</h2>
              <p>
                Client data is strictly protected under DIFC professional legal privilege. We do not sell or monetize personal information. Data shared with foreign associate tax counsel for multi-jurisdictional treaty matters is governed by standard contractual data transfer clauses approved by the DIFC Commissioner of Data Protection.
              </p>
            </StaggerItem>

            <StaggerItem className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">5. Contacting the Data Protection Officer</h2>
              <p>
                For inquiries regarding data retention, rectification, or withdrawal of consent, contact:
                <br />
                <strong>Data Protection Office</strong>
                <br />
                Taxmetryx Advisory Ltd. • Level 14, Al Sa&apos;ada Tower, DIFC, PO Box 507211, Dubai, UAE
                <br />
                Email: <span className="text-brand-red">dpo@taxmetryx.com</span>
              </p>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>
    </div>
  );
}
