import React from "react";
import Link from "next/link";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import CTAButton from "@/components/shared/CTAButton";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-36 pb-24 flex items-center">
      <Container>
        <div className="max-w-2xl space-y-6">
          <SectionLabel>ERROR 404</SectionLabel>

          <h1 className="font-editorial text-clamp-hero text-brand-primary">
            Statutory page <br />
            <span className="text-brand-red">not found.</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed max-w-lg">
            The advisory publication or practice route you requested cannot be located. It may have been archived or restructured under updated regulatory taxonomies.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <CTAButton href="/" variant="primary" size="lg" icon>
              Return to Homepage
            </CTAButton>
            <CTAButton href="/services" variant="secondary" size="lg">
              Explore Our Services
            </CTAButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
