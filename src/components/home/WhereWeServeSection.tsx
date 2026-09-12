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
                Working across
                <br />
                <em>
                  the UAE
                  <br />
                  and India.
                </em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} distance={24}>
              <p className="reference-copy">
                With a team in Dubai, Kerala and Bangalore, we support UAE businesses and cross-border assignments involving India and other markets. Where local rules or procedures require it, the engagement can include coordination with the client's appointed advisers in the relevant jurisdiction.
              </p>
            </FadeIn>
            <FadeIn delay={0.28} distance={20}>
              <div className="region-callout">
                <p className="region-callout-primary">
                  Select a region to see how we support it. These are coverage
                  descriptions, not additional office claims.
                </p>
                <p className="region-callout-secondary">
                  Stylised map for orientation only. Team locations: Dubai,
                  Kerala and Bangalore.
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
