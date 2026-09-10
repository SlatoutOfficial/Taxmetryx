import React from "react";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Use | Taxmetryx Advisory Ltd.",
  description: "Terms and conditions governing use of Taxmetryx Advisory Ltd. website and digital portals.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-[#F8F7F4]">
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Terms of Use" }]} />
      </Container>

      <section className="pb-16 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-4">
            <SectionLabel>LEGAL TERMS</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Terms of Use
            </h1>
            <p className="text-xs font-mono text-brand-muted">
              Effective: August 2026 • Governed by the Laws of the Dubai International Financial Centre (DIFC)
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl space-y-8 text-sm text-brand-charcoal/85 leading-relaxed">
            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">1. Acceptance of Terms</h2>
              <p>
                By accessing or browsing this website operated by Taxmetryx Advisory Ltd., you agree to be bound by these Terms of Use and all applicable laws and regulations of the Dubai International Financial Centre (DIFC) and the United Arab Emirates.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">2. No Advisory Relationship Created</h2>
              <p>
                The information published on this website—including insights, newsletters, statutory summaries, and benchmarks—is provided solely for general informational purposes. Transmission or receipt of information through this website does not constitute or create a client-advisor or attorney-client relationship. Formal advisory services require a written Engagement Letter signed by an authorized Taxmetryx partner.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">3. Intellectual Property Rights</h2>
              <p>
                All content, trademarks, diagrams, radial visualizations, and publication texts appearing on this site are the exclusive intellectual property of Taxmetryx Advisory Ltd. Unauthorized reproduction, scraping, or distribution without prior written consent is strictly prohibited.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-editorial text-2xl text-brand-primary">4. Governing Law & Dispute Resolution</h2>
              <p>
                These terms and any disputes arising out of your use of this website shall be governed by and construed in accordance with the laws of the Dubai International Financial Centre (DIFC). The DIFC Courts shall have exclusive jurisdiction.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
