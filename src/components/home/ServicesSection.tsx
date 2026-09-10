"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import RadialServices from "@/components/ui/RadialServices";
import { getServices } from "@/lib/json";
import {
  FadeIn,
  LUXURY_EASE,
} from "@/components/shared/ScrollMotion";

export default function ServicesSection() {
  return (
    <section
      id="services-section"
      className="reference-section reference-services relative overflow-hidden py-14 lg:py-20"
    >
      <Container className="max-w-[1520px]">
        {/* Main Grid: Left Intro + Right Radial Orbit */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[330px_1fr] gap-6 xl:gap-10 items-center">
          <div className="services-intro relative z-10">
            {/* Section Tag */}
            <FadeIn distance={15}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-5 h-[2px] bg-[#e00019]" />
                <span className="text-[11px] font-mono tracking-[0.22em] text-[#53606a] uppercase">
                  OUR SERVICES
                </span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <FadeIn delay={0.1} distance={20}>
              <h2 className="font-serif text-[2.75rem] xl:text-[3.35rem] leading-[1.04] tracking-tight text-[#111b23]">
                Six practices.
                <br />
                <span className="text-[#e00019]">One discipline:</span>
              </h2>
              <p className="font-serif text-xl xl:text-[1.32rem] text-[#111b23] leading-snug mt-2.5">
                understand the facts before
                <br />
                forming the view.
              </p>
            </FadeIn>

            {/* Divider Line */}
            <FadeIn delay={0.2} distance={15}>
              <div className="w-12 h-[1.5px] bg-[#a8b0b5] my-6" />
            </FadeIn>

            {/* Body Copy */}
            <FadeIn delay={0.25} distance={15}>
              <p className="text-[0.9375rem] text-[#55636e] leading-[1.7] max-w-[340px]">
                From day-to-day compliance to complex cross-border structures, our
                services are built on a single discipline — a deep understanding of
                the facts, the business and the broader tax landscape.
              </p>
            </FadeIn>

            {/* Bottom Tagline with Red Bar */}
            <FadeIn delay={0.35} distance={15}>
              <div className="flex items-start gap-3 mt-8">
                <span className="w-6 h-[2px] bg-[#e00019] mt-2 shrink-0" />
                <div className="font-mono text-[10px] tracking-[0.22em] text-[#64748b] uppercase leading-relaxed">
                  PRACTICAL ADVICE.
                  <br />
                  LASTING IMPACT.
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Radial Interactive Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.15, ease: LUXURY_EASE }}
            className="w-full flex justify-center"
          >
            <RadialServices services={getServices()} />
          </motion.div>
        </div>

        {/* Bottom Baseline Row: Huge Watermark */}
        <div className="mt-8 lg:mt-12 pt-6 border-t border-[#eeece8]/60">
          <motion.div
            className="select-none pointer-events-none"
            aria-hidden="true"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: LUXURY_EASE }}
          >
            <span className="font-serif text-[2.75rem] sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.25rem] tracking-tight leading-[0.88] text-[#e3e1dc] font-normal block">
              BEYOND COMPLIANCE
              <br />
              TOWARDS OPPORTUNITY
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

