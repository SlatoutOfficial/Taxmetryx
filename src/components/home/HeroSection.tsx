"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Landmark, Users, FileCheck2, Globe2, ArrowDown } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

const trust = [
  {
    Icon: Landmark,
    title: "UAE-Based",
    text: "Local Expertise. Global Perspective.",
  },
  {
    Icon: Users,
    title: "Trusted by Global Businesses",
    text: "Across Key Industries",
  },
  {
    Icon: FileCheck2,
    title: "End-to-End Support",
    text: "From Strategy to Resolution",
  },
  {
    Icon: Globe2,
    title: "International Outlook",
    text: "Cross-Border Tax Solutions",
  },
];

export default function HeroSection() {
  return (
    <section className="reference-hero" aria-labelledby="hero-heading">
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: LUXURY_EASE }}
      >
        <Image
          src="/images/hero-reference.webp"
          alt="Dubai skyline and Burj Khalifa from a sunlit architectural terrace"
          fill
          priority
          sizes="100vw"
          className="hero-backdrop"
        />
        <div className="hero-wash" />
      </motion.div>

      <Container className="hero-content relative z-10">
        <FadeIn delay={0.1} distance={20}>
          <SectionLabel>UAE | TRANSFER PRICING | TAX | GLOBAL</SectionLabel>
        </FadeIn>

        <FadeIn delay={0.2} distance={30}>
          <h1 id="hero-heading">
            Complexity.
            <br />
            <span>Measured. Resolved.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.35} distance={24}>
          <div className="hero-copy">
            <p>
              Taxmetryx is a UAE-based specialist tax advisory firm operating at
              the intersection of Transfer Pricing, Corporate Tax, International
              Tax and Tax Regulation.
            </p>
            <p>
              We help businesses navigate complex tax matters—from policy design
              and transaction structuring to compliance, implementation,
              controversy and litigation.
            </p>
            <strong className="hero-signoff">Your Tax Expert.</strong>
          </div>
        </FadeIn>

        <FadeIn delay={0.5} distance={20}>
          <div className="hero-actions">
            <CTAButton href="/services" icon>
              Explore Our Services
            </CTAButton>
            <CTAButton href="/contact" variant="secondary" icon>
              Speak to Our Experts
            </CTAButton>
          </div>
        </FadeIn>


      </Container>

      <div className="hero-trust relative z-10">
        <Container>
          <StaggerContainer
            className="trust-grid"
            staggerDelay={0.1}
            delayChildren={0.2}
          >
            {trust.map(({ Icon, title, text }) => (
              <StaggerItem className="trust-item" key={title}>
                <Icon aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              </StaggerItem>
            ))}
            <motion.a
              href="#who-we-are"
              className="hero-scroll"
              aria-label="Scroll to who we are"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: LUXURY_EASE }}
            >
              <span>
                Scroll
                <br />
                to explore
              </span>
              <ArrowDown />
            </motion.a>
          </StaggerContainer>
        </Container>
      </div>
    </section>
  );
}
