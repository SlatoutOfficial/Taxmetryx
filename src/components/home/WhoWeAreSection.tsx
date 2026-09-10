"use client";

import { Target, ShieldCheck } from "lucide-react";
import Container from "@/components/shared/Container";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/ScrollMotion";

// Custom chart icon matching the 3-column reference design
function ChartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  );
}

const principles = [
  {
    Icon: Target,
    title: "Business-Led Approach",
    text: "We start with your business, not just the tax rules.",
  },
  {
    Icon: ShieldCheck,
    title: "Technically Robust",
    text: "Positions that are compliant, defensible and commercially practical.",
  },
  {
    Icon: ChartIcon,
    title: "End-to-End Partnership",
    text: "From policy design to implementation, compliance and controversy.",
  },
];

const pillars = [
  {
    number: "01",
    title: "UAE",
    text: "Our base. Our perspective.",
  },
  {
    number: "02",
    title: "Global",
    text: "Our reach. Your advantage.",
  },
  {
    number: "03",
    title: "Long-Term",
    text: "Our commitment. Your confidence.",
  },
];

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="reference-section reference-about relative overflow-hidden py-14 lg:py-20">
      <Container className="max-w-[1520px]">
        {/* Main Grid: Left Intro + Right Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-20 items-start">
          {/* Left Column */}
          <div>
            <FadeIn distance={15}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-5 h-[2px] bg-[#e00019]" />
                <span className="text-[11px] font-mono tracking-[0.22em] text-[#53606a] uppercase">
                  WHO WE ARE
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} distance={20}>
              <h2 className="font-sans font-extrabold text-[2.75rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] tracking-tight text-[#111b23]">
                Facts first.
                <br />
                <span className="text-[#e00019]">Then the view.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2} distance={20}>
              <div className="space-y-4 text-[0.9375rem] text-[#55636e] leading-[1.7] max-w-[540px] mt-8">
                <p>
                  Taxmetryx advises UAE businesses, multinational groups and
                  family-owned enterprises on complex domestic and cross-border
                  tax matters.
                </p>
                <p>
                  We begin by understanding the business – the transaction, the
                  people involved, the commercial rationale and the value created.
                  We then translate complex tax and regulatory requirements into
                  positions that are technically robust, commercially practical
                  and capable of standing up to scrutiny.
                </p>
                <p>
                  From setting the right policy to defending the resulting
                  position, we remain involved throughout the complete tax
                  lifecycle.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Principles with soft watermark */}
          <div className="relative border-l border-[#e5e5e4] pl-8 lg:pl-14 pt-2">
            {/* Subtle architectural watermark (Taxmetryx emblem) */}
            <div
              className="absolute -right-6 xl:-right-12 top-0 w-[360px] xl:w-[440px] pointer-events-none select-none z-0 transform rotate-[10deg] opacity-[0.045]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 46 48" className="w-full h-full fill-[#14232e]">
                <path d="M2 29 14 20v11L2 35zm14-11 9-7v34l-9-6zm11-9 8-6v28l-8 6zm10-8 7-1v22l-7 7z" />
              </svg>
            </div>

            <FadeIn delay={0.15}>
              <p className="font-mono text-[10.5px] tracking-[0.24em] text-[#53606a] uppercase leading-relaxed mb-8">
                A CLEARER PERSPECTIVE
                <br />
                ON WHAT MATTERS
              </p>
            </FadeIn>

            <StaggerContainer staggerDelay={0.12} delayChildren={0.2} className="space-y-8 relative z-10">
              {principles.map(({ Icon, title, text }) => (
                <StaggerItem key={title} className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-full bg-white border border-[#eeece8] shadow-[0_3px_10px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#e00019] shrink-0">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </span>
                  <div>
                    <h3 className="font-sans font-semibold text-[1.0625rem] text-[#111b23]">
                      {title}
                    </h3>
                    <p className="text-[0.875rem] text-[#64748b] leading-[1.5] mt-1">
                      {text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* Bottom 3 Strategic Pillar Cards */}
        <StaggerContainer
          staggerDelay={0.1}
          delayChildren={0.15}
          className="grid grid-cols-1 md:grid-cols-3 border-t border-[#e5e5e4] mt-12 lg:mt-16 pt-8 gap-8 md:gap-0"
        >
          {pillars.map((pillar, i) => (
            <StaggerItem
              key={pillar.title}
              className={`flex flex-col ${
                i > 0 ? "md:border-l md:border-[#e5e5e4] md:pl-8 lg:pl-12" : "md:pr-8 lg:pr-12"
              }`}
            >
              <span className="font-mono text-xs font-semibold text-[#e00019]">
                {pillar.number}
              </span>
              <span className="w-5 h-[1.5px] bg-[#e00019] block mt-1 mb-3" />
              <h3 className="font-sans font-bold text-[1.75rem] text-[#111b23] tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-[0.9375rem] text-[#64748b] mt-1">
                {pillar.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Baseline Row: Left Label */}
        <FadeIn delay={0.3} distance={15}>
          <div className="pt-8 mt-8 border-t border-[#eeece8]/60">
            <div className="flex items-center gap-3">
              <span className="w-5 h-[1.5px] bg-[#a8b0b5]" />
              <span className="font-mono text-[10px] tracking-[0.24em] text-[#64748b] uppercase">
                PRECISION FOR A BORDERLESS TOMORROW
              </span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
