"use client";

import React, { useEffect } from "react";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import CTAButton from "@/components/shared/CTAButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F7F4] pt-36 pb-24 flex items-center">
      <Container>
        <div className="max-w-2xl space-y-6">
          <SectionLabel>SYSTEM ERROR</SectionLabel>

          <h1 className="font-editorial text-clamp-hero text-brand-primary">
            An unexpected error <br />
            <span className="text-brand-red">has occurred.</span>
          </h1>

          <p className="text-sm sm:text-base text-brand-charcoal/80 leading-relaxed max-w-lg">
            Our advisory platform encountered an unexpected runtime exception. Our technical operations team has been notified.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <CTAButton onClick={() => reset()} variant="primary" size="lg">
              Retry Operation
            </CTAButton>
            <CTAButton href="/" variant="secondary" size="lg">
              Return Home
            </CTAButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
