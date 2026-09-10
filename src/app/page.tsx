import React from "react";
import HeroSection from "@/components/home/HeroSection";
import WhoWeAreSection from "@/components/home/WhoWeAreSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhereWeServeSection from "@/components/home/WhereWeServeSection";
import ExpertiseSection from "@/components/home/ExpertiseSection";
import ValuesSection from "@/components/home/ValuesSection";
import InsightsSection from "@/components/home/InsightsSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <div className="reference-home">
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <WhereWeServeSection />
      <ExpertiseSection />
      <ValuesSection />
      <InsightsSection />
      <ContactSection />
    </div>
  );
}
