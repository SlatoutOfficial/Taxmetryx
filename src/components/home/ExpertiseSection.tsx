"use client";

import { useState } from "react";
import {
  ChartNoAxesCombined,
  Users,
  Building2,
  Target,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  LineReveal,
} from "@/components/shared/ScrollMotion";

const expertise = [
  {
    title: "15+ Years of Combined Experience",
    text: "Our team brings together more than 15 years of combined experience across Transfer Pricing, Corporate Tax, International Tax and tax controversy.",
    Icon: ChartNoAxesCombined,
  },
  {
    title: "Transfer Pricing Specialists",
    text: "Transfer Pricing is not an ancillary service for us. It is a core practice supported by deep experience across policy setting, economic analysis, documentation, implementation, audits and litigation.",
    Icon: Users,
  },
  {
    title: "Industry Understanding",
    text: "We understand that a tax position cannot be developed in isolation. Our advice considers the client's industry, business model, value chain, transaction flows and commercial realities.",
    Icon: Building2,
  },
  {
    title: "Tailored Solutions",
    text: "We do not begin with templates. Every solution is developed around the client's facts, operating structure, risk profile and business objectives.",
    Icon: Target,
  },
  {
    title: "End-to-End Support",
    text: "From designing the policy and implementing the arrangement to meeting compliance obligations and defending the position, we support clients at every stage.",
    Icon: Settings,
  },
];

export default function ExpertiseSection() {
  const [activeLayer, setActiveLayer] = useState(0);

  const handlePrev = () => {
    setActiveLayer((prev) => (prev > 0 ? prev - 1 : expertise.length - 1));
  };

  const handleNext = () => {
    setActiveLayer((prev) => (prev < expertise.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="expertise-section"
      className="reference-section reference-expertise relative overflow-hidden"
    >
      <Container>
        <div className="expertise-composition relative">
          <div className="expertise-intro">
            <FadeIn distance={20}>
              <SectionLabel>OUR EXPERTISE</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1} distance={28}>
              <h2 className="reference-heading">
                Specialist
                <br />
                knowledge.
                <br />
                <em>
                  Commercial
                  <br />
                  perspective.
                </em>
              </h2>
            </FadeIn>
            <LineReveal delay={0.2} />
            <FadeIn delay={0.25} distance={24}>
              <p className="reference-copy">
                We combine deep technical expertise with a clear understanding of
                business and commercial realities — to deliver tax solutions that
                create lasting value.
              </p>
            </FadeIn>
            <FadeIn delay={0.35} distance={20}>
              <div className="expertise-stat">
                <strong>15+</strong>
                <span className="micro-copy">
                  YEARS OF
                  <br />
                  COMBINED
                  <br />
                  EXPERIENCE
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.4} distance={20}>
              <p className="reference-copy">
                Our team brings together more than 15 years of combined experience
                across Transfer Pricing, Corporate Tax, International Tax and tax
                controversy.
              </p>
            </FadeIn>
          </div>

          <div className="relative">
            {/* Architectural curved drafting arc with red dots as in reference design */}
            <div className="hidden xl:flex absolute -left-20 top-0 bottom-0 w-28 flex-col items-center justify-center z-10 pointer-events-none select-none">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 112 500"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 100 20 C 10 160, 10 340, 100 480"
                  stroke="#cfd3d6"
                  strokeWidth="1"
                />
                <circle cx="85" cy="50" r="3.5" fill="#e00019" />
                <circle cx="28" cy="250" r="3.5" fill="#e00019" />
                <circle cx="85" cy="450" r="3.5" fill="#e00019" />
              </svg>
              <div className="text-center font-mono text-[9px] tracking-[0.24em] text-[#53606a] uppercase leading-[1.8] pl-2 z-10 bg-[#fafaf9]/80 py-2 backdrop-blur-[2px]">
                INSIGHTS
                <br />
                THAT
                <br />
                MOVE
                <br />
                BUSINESS
                <br />
                FORWARD
                <div className="w-4 h-[1.5px] bg-[#e00019] mx-auto mt-2" />
              </div>
            </div>

            <StaggerContainer
              className="expertise-stack"
              staggerDelay={0.08}
              delayChildren={0.12}
            >
              {expertise.map(({ title, text, Icon }, i) => (
                <StaggerItem key={title} className="w-full">
                  <article
                    className={`expertise-layer ${activeLayer === i ? "is-active" : ""}`}
                    onClick={() => setActiveLayer(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveLayer(i);
                      }
                    }}
                    style={{ "--layer": i } as React.CSSProperties}
                  >
                    <span className="layer-number">0{i + 1}</span>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        <FadeIn delay={0.3} distance={15}>
          <div className="section-baseline flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[#e5e4e0] mt-8">
            <span className="text-[10px] tracking-[0.22em] text-[#6d7a83] uppercase">
              COMPLEX TAX. CLEARER OUTCOMES.
            </span>

            <div className="flex items-center gap-6 ml-auto">
              <div className="flex items-center gap-3 text-xs font-mono text-[#53606a]">
                <span className="tracking-wider">
                  0{activeLayer + 1} / 0{expertise.length}
                </span>
                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-1 text-[#6a747b] hover:text-[#e00019] transition-colors cursor-pointer"
                    aria-label="Previous layer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-1 text-[#6a747b] hover:text-[#e00019] transition-colors cursor-pointer"
                    aria-label="Next layer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-[9px] font-mono tracking-[0.22em] text-[#74808a] uppercase text-right leading-tight hidden sm:block">
                PARTNERS
                <br />
                IN A MORE
                <br />
                CERTAIN TOMORROW.
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
