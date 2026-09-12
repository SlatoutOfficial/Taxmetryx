"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  LineReveal,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

const values = [
  {
    title: "Integrity",
    text: "We advise with honesty, independence and professional responsibility. Our positions are grounded in law, supported by facts and communicated transparently.",
  },
  {
    title: "Clarity",
    text: "Complexity should never stand in the way of a sound decision. We translate technical tax matters into clear positions and practical actions.",
  },
  {
    title: "Technical Excellence",
    text: "We approach every engagement with intellectual rigour, attention to detail and a commitment to producing technically robust and defensible outcomes.",
  },
  {
    title: "Specialisation",
    text: "We believe depth creates value. Our focused expertise allows us to address complex matters with precision and confidence.",
  },
  {
    title: "Collaboration",
    text: "The strongest advice is built together. We work closely with your teams and advisers to develop solutions that work in practice.",
  },
];

export default function ValuesSection() {
  return (
    <section id="values-section" className="reference-section reference-values">
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: LUXURY_EASE }}
      >
        <Image
          src="/images/values-reference.webp"
          alt=""
          fill
          sizes="100vw"
          className="values-backdrop"
        />
      </motion.div>

      <Container className="values-container relative z-10">
        <div className="values-composition">
          <div className="values-intro">
            <FadeIn distance={20}>
              <SectionLabel>OUR VALUES</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1} distance={28}>
              <h2 className="reference-heading">
                The principles
                <br />
                behind every
                <br />
                position <em>we take.</em>
              </h2>
            </FadeIn>
            <LineReveal delay={0.2} />
            <FadeIn delay={0.25} distance={24}>
              <p className="reference-copy">
                Our values guide how we think, how we work and how we support our
                clients—today and in the long term.
              </p>
            </FadeIn>
          </div>

          <motion.div
            className="values-sculpture"
            role="img"
            aria-label="Five balanced geometric stone forms with fine red seams, representing our five principles"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.2, ease: LUXURY_EASE }}
          />

          <StaggerContainer
            className="values-list"
            staggerDelay={0.1}
            delayChildren={0.15}
          >
            {values.map((v, i) => (
              <StaggerItem key={v.title} as="article">
                <span>0{i + 1}</span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <FadeIn delay={0.3} distance={15}>
          <div className="section-baseline">
            A STRONGER TOMORROW. BUILT ON PRINCIPLES.
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
