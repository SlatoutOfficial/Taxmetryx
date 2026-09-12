"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import WorldGlobe from "@/components/ui/WorldGlobe";
import {
  FadeIn,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

export default function WhereWeServeSection() {
  const [activeRegion, setActiveRegion] = useState("Middle East");

  return (
    <section
      id="where-we-serve"
      className="reference-section reference-regions"
    >
      <Container>
        <div className="regions-composition">
          <div className="regions-intro">
            <FadeIn distance={20}>
              <SectionLabel>Where we work</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1} distance={28}>
              <h2 className="reference-heading">
                Connected across
                <br />
                <em>
                  the GCC,
                  <br />
                  Asia & Europe.
                </em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} distance={24}>
              <p className="reference-copy">
                With team members based in Dubai, Kerala and Bangalore, we support UAE businesses and cross-border engagements involving markets across the GCC, Asia and Europe. Where local laws or procedures require jurisdiction-specific input, we coordinate with the client’s appointed advisers in the relevant market.
              </p>
            </FadeIn>
            <FadeIn delay={0.28} distance={20}>
              <div className="region-callout">
                <p className="region-callout-primary">
                  Select a region to explore how we support cross-border business.
                </p>
                <p className="region-callout-secondary">
                  The regional descriptions reflect engagement coverage and do not indicate additional office locations. Stylised map for orientation only. Team locations: Dubai, Kerala and Bangalore.
                </p>
              </div>
            </FadeIn>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASE }}
          >
            <WorldGlobe
              activeRegion={activeRegion}
              onSelectRegion={setActiveRegion}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
