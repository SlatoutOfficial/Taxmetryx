import React from "react";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Disclaimer | Taxmetryx Advisory Ltd.",
  description: "Statutory tax and legal disclaimer for Taxmetryx Advisory Ltd.",
};

export default function DisclaimerPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Disclaimer" }]} />
      </Container>

      <section className="pb-16 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <SectionLabel>LEGAL & REGULATORY NOTICE</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Disclaimer
            </h1>
            <p className="text-xs font-mono text-brand-muted">
              Important notice regarding tax interpretations, FTA regulations, and ministerial decisions.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">
                1. General Tax Information Only
              </h2>
              <p>
                The materials, commentaries, and summaries presented on taxmetryx.com do not constitute formal legal, accounting, tax, or financial advice. Tax laws, including UAE Federal Decree-Law No. 47 of 2022, Cabinet Decisions, Ministerial Decisions, and Federal Tax Authority (FTA) Public Clarifications, are subject to dynamic legislative amendment, judicial reinterpretation, and administrative evolution.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">
                2. Individual Facts and Case Specificity
              </h2>
              <p>
                Tax outcomes depend entirely on the specific factual matrix of each corporate structure, contractual terms, Free Zone licenses, intercompany cashflows, and historical tax positions. Readers must not act or refrain from acting on the basis of any material contained on this website without seeking tailored professional advice from a licensed tax advisor or legal counsel.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">
                3. Limitation of Liability
              </h2>
              <p>
                Taxmetryx Advisory Ltd., its partners, directors, and associates disclaim all liability and responsibility to any person or entity in respect of anything done, or omitted to be done, wholly or partly in reliance upon the whole or any part of the contents of this website.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
