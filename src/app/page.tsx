import React from "react";
import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhereWeServeSection from "@/components/home/WhereWeServeSection";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import ValuesSection from "@/components/home/ValuesSection";
import InsightsSection from "@/components/home/InsightsSection";
import ContactSection from "@/components/home/ContactSection";
import { getInsights } from "@/lib/data-repository";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const insights = await getInsights();

  return (
    <div className="reference-home">
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <WhereWeServeSection />
      <ExpertiseSection />
      <ValuesSection />
      <InsightsSection initialInsights={insights} />
      <ContactSection />
    </div>
  );
}
