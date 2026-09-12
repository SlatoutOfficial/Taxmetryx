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
    title: "Founder-led advice",
    text: "Ajin Thomas and his team stay close to every assignment, from scoping to delivery",
  },
  {
    Icon: Users,
    title: "Six connected service areas",
    text: "Direct, indirect, international and emerging-regulation work under one discipline.",
  },
  {
    Icon: Globe2,
    title: "UAE & cross-border reach",
    text: "A team across Dubai, Kerala and Bangalore for UAE and India-linked assignments.",
  },
    {
    Icon: FileCheck2,
    title: "End-to-End Support",
    text: "From Strategy to Resolution",
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
        <div className="hero-text-block">
          <FadeIn delay={0.1} distance={20}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#cfd3d6] bg-white/50 backdrop-blur-sm text-[11px] font-mono tracking-[0.15em] text-[#53606a] uppercase mb-6 shadow-sm">
              Transfer Pricing <span className="mx-2 text-[#eb0045] font-bold">&bull;</span> Corporate Tax <span className="mx-2 text-[#eb0045] font-bold">&bull;</span> International Tax
            </div>
          </FadeIn>

          <FadeIn delay={0.2} distance={30}>
            <h1 id="hero-heading">
              Tax advice for
              <br />
              <span>your business.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.35} distance={24}>
            <div className="hero-copy">
              <p>
                Taxmetryx Global advises businesses on Transfer Pricing, Corporate Tax and cross-border tax matters. We help you assess the implications, prepare the supporting documentation and put the right processes in place.
              </p>
            </div>
          </FadeIn>
        </div>

        <div className="hero-bottom-row flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-8">
          <FadeIn delay={0.5} distance={20} className="hero-actions-wrapper !mt-0">
            <div className="hero-actions">
              <CTAButton href="/services" icon>
                Explore Our Services
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" icon>
                Speak to Our Experts
              </CTAButton>
            </div>
          </FadeIn>


        </div>
      </Container>



      <div className="hero-trust relative z-10">
        {/* Floating Location Badge */}
        <div className="absolute bottom-full right-6 lg:right-12 mb-6 z-20 hidden md:block">
          <FadeIn delay={0.6} distance={20}>
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-2 rounded-full bg-white/35 hover:bg-white/50 backdrop-blur-md border border-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(235,0,69,0.12)] hover:border-white/80 hover:-translate-y-0.5 group select-none max-w-full">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-xs font-semibold tracking-wider text-[#14181b] uppercase whitespace-nowrap">
                <span className="hover:text-[#eb0045] transition-colors cursor-default">Dubai</span>
                <span className="text-[#eb0045] font-bold">&bull;</span>
                <span className="hover:text-[#eb0045] transition-colors cursor-default">Kerala</span>
                <span className="text-[#eb0045] font-bold">&bull;</span>
                <span className="hover:text-[#eb0045] transition-colors cursor-default">Bangalore</span>
              </div>
            </div>
          </FadeIn>
        </div>

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
