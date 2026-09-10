"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import WorldGlobe from "@/components/ui/WorldGlobe";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

const REGION_ITEMS = [
  {
    key: "Middle East",
    title: "Middle East",
    text: "UAE | Saudi Arabia | Qatar | Oman | Bahrain | Kuwait",
  },
  {
    key: "Asia-Pacific",
    title: "Asia-Pacific",
    text: "India and key Asia-Pacific markets",
  },
  {
    key: "Europe",
    title: "Europe",
    text: "United Kingdom and key European markets",
  },
];

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
              <SectionLabel>WHERE WE SERVE</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1} distance={28}>
              <h2 className="reference-heading">
                Local depth.
                <br />
                <em>
                  Cross-border
                  <br />
                  perspective.
                </em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2} distance={24}>
              <p className="reference-copy">
                Based in the UAE, Taxmetryx advises on tax and Transfer Pricing
                matters that cross jurisdictions—supporting businesses across the
                Middle East, Asia-Pacific and Europe.
              </p>
            </FadeIn>
            <StaggerContainer
              className="region-list"
              staggerDelay={0.12}
              delayChildren={0.25}
            >
              {REGION_ITEMS.map(({ key, title, text }, i) => (
                <StaggerItem
                  key={key}
                  className={`region-item ${activeRegion === key ? "is-active" : ""}`}
                  onClick={() => setActiveRegion(key)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveRegion(key);
                    }
                  }}
                >
                  <span className="reference-number">0{i + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
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

        <StaggerContainer
          className="regions-baseline"
          staggerDelay={0.1}
          delayChildren={0.15}
        >
          <StaggerItem className="micro-copy">
            ONE TRANSACTION RARELY STAYS
            <br />
            IN ONE JURISDICTION.
            <br />
            <em>NEITHER DOES OUR THINKING.</em>
          </StaggerItem>
          {[
            ["3", "REGIONS"],
            ["10+", "KEY MARKETS"],
            ["1", "INTEGRATED PERSPECTIVE"],
          ].map(([value, label]) => (
            <StaggerItem key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </StaggerItem>
          ))}
          <StaggerItem className="micro-copy">
            A MORE
            <br />
            CONNECTED
            <br />
            TOMORROW.
          </StaggerItem>
        </StaggerContainer>
      </Container>
    </section>
  );
}
