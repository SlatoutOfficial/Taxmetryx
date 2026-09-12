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

            <FadeIn delay={0.25} distance={24}>
              <p className="reference-copy">
                We combine deep technical expertise with a clear understanding of
                business and commercial realities - to deliver tax solutions that
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
      </Container>
    </section>
  );
}
