"use client";

import Container from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/ScrollMotion";

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="reference-section reference-about relative overflow-hidden py-14 lg:py-20">
      <Container className="max-w-[1520px]">
        {/* Main Grid: Left Intro + Right Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">
          {/* Left Column */}
          <div>
            <FadeIn distance={15}>
              <div className="flex items-center mb-5">
                <span className="text-[12px] font-mono font-bold tracking-[0.15em] text-[#e00019] uppercase">
                  WHO WE ARE
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} distance={20}>
              <h2 className="font-sans font-extrabold text-[2.75rem] sm:text-[3.25rem] lg:text-[4rem] leading-[1.05] tracking-tight text-[#222222]">
                Specialist support, <span className="text-[#e00019]">with
                <br />
                personal attention</span>
              </h2>
            </FadeIn>
          </div>

          {/* Right Column: Text with soft watermark */}
          <div className="relative lg:pl-10">
            {/* Subtle architectural watermark (Taxmetryx emblem) positioned behind description */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] xl:w-[1000px] pointer-events-none select-none z-0 opacity-10 grayscale mix-blend-multiply"
              aria-hidden="true"
            >
              <img 
                src="/taxmetryx.png" 
                alt="Taxmetryx Watermark" 
                className="w-full h-full object-contain"
              />
            </div>

            <FadeIn delay={0.2} distance={20}>
              <div className="text-[1.125rem] text-[#666666] leading-[1.6] relative z-10">
                <p>
                  Tax decisions depend on how a business actually operates. We
                  begin with your activities, transactions and priorities, then work
                  through the relevant requirements. Ajin Thomas and his team
                  combine detailed analysis with direct communication, so you
                  understand the advice and what needs to happen next.
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="group relative inline-flex items-center gap-2 font-sans font-bold text-[#e00019] transition-colors pb-1"
                  >
                    <span>About Taxmetryx</span> 
                    <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">&rarr;</span>
                    {/* Animated Underline */}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#e00019] transition-all duration-300 ease-out group-hover:w-full"></span>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}
