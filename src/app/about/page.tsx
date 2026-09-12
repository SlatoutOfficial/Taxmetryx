import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/shared/Container";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/shared/ScrollMotion";
import {
  Diamond, Users, FileCheck, BarChart3,
  BookOpen, Users2, Target,
  Building2, Palmtree, MapPin
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Specialist UAE Corporate Tax & Transfer Pricing Advisory",
  description: "Learn about Taxmetryx, a founder-led tax advisory practice focused on technical quality and practical advice."
};

export default function AboutPage() {
  return (
    <div className="bg-[#f8f9fa] overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col pt-24 lg:pt-0 border-b border-[#E7E5E1]">
        {/* Full Background with Left Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about-hero.png"
            alt="Taxmetryx Office"
            fill
            className="object-cover object-right"
            priority
          />
          {/* White gradient overlay on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fa] via-[#f8f9fa]/90 to-transparent w-full md:w-[70%] lg:w-[60%]" />

          {/* <div className="absolute top-24 right-12 text-right hidden lg:block">
            <h2 className="text-[#53606a] font-mono text-xs tracking-[0.3em] uppercase leading-relaxed font-semibold">
              Clarity<br />Beyond<br />Borders
            </h2>
            <div className="w-6 h-[1.5px] bg-[#e00019] ml-auto mt-4" />
          </div> */}
        </div>

        <Container className="relative z-10 flex-grow flex flex-col justify-center py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Content */}
            <div className="space-y-8 pr-0 lg:pr-12">
              <FadeIn distance={20} delay={0.05}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-[1.5px] bg-[#e00019]" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                    ABOUT US
                  </span>
                </div>
                <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#111b23] tracking-tight leading-[1.1] mb-8">
                  About <br />
                  <span className="text-[#e00019]">Taxmetryx</span>
                </h1>
                <p className="text-lg sm:text-xl text-[#53606a] leading-relaxed max-w-lg font-light mb-16">
                  A founder-led tax advisory practice focused on technical quality, practical advice and the way clients are treated throughout an engagement.
                </p>

                <div className="flex items-center gap-4 mt-auto pt-8 border-t border-[#e5e5e5]">
                  <span className="w-8 h-[1.5px] bg-[#e00019]" />
                  <span className="text-[9px] font-mono tracking-[0.2em] text-[#8b98a5] uppercase">
                    PEOPLE | INSIGHTS | BETTER OUTCOMES
                  </span>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>

      </section>

      {/* 1.5 Core Principles */}
      <section className="pt-16 pb-12 bg-white">
        <Container>
          <FadeIn distance={20}>
            <div className="bg-[#f8f9fa] rounded-2xl p-8 lg:p-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#e5e5e5] pb-6 mb-10 gap-4">
                <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#111b23] uppercase">
                  BUILT ON OUR CORE PRINCIPLES
                </h3>
                <h3 className="text-[10px] font-mono tracking-[0.2em] text-[#8b98a5] uppercase hidden md:block">
                  THE VALUES THAT DRIVE US
                </h3>
              </div>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 divide-y sm:divide-y-0 sm:divide-x divide-[#e5e5e5]">
                {[
                  { icon: Diamond, text: "Deliver meaningful value to every client" },
                  { icon: Users, text: "Ensure timely and dependable execution" },
                  { icon: FileCheck, text: "Provide solutions tailored to each client's specific business requirements" },
                  { icon: BarChart3, text: "Offer technically sound advice that remains practical and commercially relevant" }
                ].map((item, i) => (
                  <StaggerItem key={i} className="pt-6 sm:pt-0 pl-0 sm:pl-8 lg:pl-10 first:pl-0 flex flex-col gap-5">
                    <item.icon className="w-8 h-8 text-[#e00019] shrink-0" strokeWidth={1.5} />
                    <p className="text-[14.5px] font-medium text-[#111b23] leading-relaxed pr-2">
                      {item.text}
                    </p>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 2. Our Story Section */}
      <section className="py-24 bg-white relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 mb-16">
            <FadeIn distance={20}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1.5px] bg-[#e00019]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                  OUR STORY
                </span>
              </div>
              <h2 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#111b23] tracking-tight leading-[1.1]">
                A practice built around the client experience
              </h2>
            </FadeIn>

            <FadeIn distance={20} delay={0.1}>
              <div className="space-y-6 text-[15px] text-[#53606a] leading-[1.8] font-light max-w-2xl pt-2 lg:pt-14">
                <p>Taxmetryx Global was founded by Ajin Thomas with the support and encouragement of those who believed in his vision for the firm.</p>
                <p>His aim was to build a specialist practice where careful technical work and attentive service were part of the same commitment.</p>
                <p>Before founding Taxmetryx, Ajin worked in Transfer Pricing at BDO, supporting assignments involving structuring, benchmarking and documentation. That professional experience forms part of the foundation of the firm&apos;s work today.</p>
              </div>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stage: "STAGE 01",
                title: "Professional foundation",
                text: "Transfer Pricing experience at BDO across structuring, benchmarking and documentation.",
                icon: BookOpen
              },
              {
                stage: "STAGE 02",
                title: "Supporting UAE assignments",
                text: "Serving UAE consultants and businesses from India, building working relationships across borders.",
                icon: Users2
              },
              {
                stage: "STAGE 03",
                title: "A connected team",
                text: "Ajin and his team working across Dubai, Kerala and Bangalore with one standard of work.",
                icon: Target
              }
            ].map((card, i) => (
              <StaggerItem key={i} className="border border-[#e5e5e5] rounded-xl bg-white relative flex flex-col overflow-hidden group hover:border-[#e00019]/40 transition-colors">
                <div className="p-8 pr-24 flex-1">
                  <div className="text-[10px] font-bold text-[#e00019] uppercase tracking-widest mb-4">{card.stage}</div>
                  <h3 className="font-sans font-bold text-[17px] text-[#111b23] mb-3">{card.title}</h3>
                  <p className="text-[14px] text-[#7a7a7a] leading-relaxed font-light">{card.text}</p>
                </div>
                <div className="absolute top-0 right-0 bottom-0 w-[72px] bg-[#f8f9fa] border-l border-[#e5e5e5] flex items-center justify-center transition-colors group-hover:bg-[#fff5f6]">
                  <card.icon className="w-6 h-6 text-[#e00019]/60 group-hover:text-[#e00019] transition-colors" strokeWidth={1.5} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 3. Meet Ajin Thomas */}
      <section className="py-24 bg-gradient-to-r from-[#f8f9fa] to-white overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20 items-center max-w-[1300px] mx-auto">
            {/* Left: Custom Portrait & Quote */}
            <div className="relative flex justify-center lg:justify-end pr-0 lg:pr-12">
              <FadeIn distance={20} className="relative w-full max-w-[500px]">
                
                {/* Custom Red Geometric Shapes */}
                <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] bg-[#fbe5e8] rounded-[30px] transform rotate-12 -z-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-[#e00019] rounded-[30px] transform -rotate-12 -z-10" />
                
                {/* Floating Quote (No Box) */}
                <div className="absolute top-1/4 -left-12 lg:-left-24 z-20 hidden md:block">
                  <div className="text-6xl text-[#e00019] font-serif leading-none h-8 mb-4 tracking-tighter">&ldquo;</div>
                  <p className="text-[17px] font-bold text-[#111b23] leading-snug mb-8">
                    Better questions.<br />Clearer answers.<br />Stronger businesses.
                  </p>
                  
                  {/* Signature Block */}
                  <div className="font-editorial text-4xl text-[#111b23] mb-3 transform -rotate-2">
                    Ajin Thomas
                  </div>
                  <div className="text-[9px] font-bold tracking-widest text-[#53606a] uppercase">
                    AJIN THOMAS<br />
                    <span className="font-normal text-[#8b98a5]">Founder, Taxmetryx Global</span>
                  </div>
                </div>

                <div className="relative z-10 h-[550px] w-[400px] mx-auto">
                  <Image
                    src="/images/ajin-thomos.webp"
                    alt="Ajin Thomas"
                    fill
                    className="object-contain object-bottom drop-shadow-xl"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Right: Text */}
            <div className="w-full pl-0 lg:pl-12 mt-16 lg:mt-0">
              <FadeIn distance={20} delay={0.2}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-[1.5px] bg-[#e00019]" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                    LEADERSHIP
                  </span>
                </div>
                <h2 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#111b23] tracking-tight leading-[1.1] mb-8">
                  Meet Ajin Thomas
                </h2>
                <div className="space-y-6 text-[15px] text-[#53606a] leading-[1.8] font-light mb-12">
                  <p>Ajin Thomas is a Chartered Accountant whose work focuses on Transfer Pricing, Corporate Tax and International Taxation. His experience includes the analysis of related-party arrangements, economic benchmarking and the preparation of supporting documentation.</p>
                  <p>At Taxmetryx, Ajin&apos;s approach is to stay close to the client&apos;s requirements and maintain a clear link between technical analysis and practical recommendations. He works with his team to build a practice in which quality, responsiveness and responsibility are reflected in the day-to-day client experience.</p>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-3">
                  {["Chartered Accountant", "Transfer Pricing", "Corporate Tax", "International Taxation"].map(tag => (
                    <span key={tag} className="px-5 py-2.5 bg-white border border-[#e5e5e5] rounded-full text-[12px] font-semibold text-[#111b23] shadow-sm tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. How We Think */}
      <section className="bg-white border-b border-[#E7E5E1]">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: Image Placeholder (since we don't have the exact image) */}
          <div className="relative bg-[#111b23] h-[400px] lg:h-auto overflow-hidden">
            {/* Fallback pattern/color if image is missing */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2530] to-[#0a1015]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center opacity-30 pointer-events-none">
              <div className="text-4xl lg:text-6xl font-extrabold text-white uppercase tracking-widest leading-none mb-2">PEOPLE</div>
              <div className="text-4xl lg:text-6xl font-extrabold text-white uppercase tracking-widest leading-none mb-2">PERSPECTIVE</div>
              <div className="text-4xl lg:text-6xl font-extrabold text-white uppercase tracking-widest leading-none">PROGRESS</div>
            </div>
            {/* Try to load the image if it exists, otherwise it falls back to the gradient */}
            <Image
              src="/images/who-we-are.jpg" // Using an existing image as placeholder
              alt="People Perspective Progress"
              fill
              className="object-cover opacity-50 mix-blend-overlay grayscale"
            />
          </div>

          {/* Right: Text */}
          <div className="flex flex-col justify-center p-12 lg:p-24">
            <FadeIn distance={20}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1.5px] bg-[#e00019]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                  HOW WE THINK
                </span>
              </div>
              <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#111b23] tracking-tight leading-[1.1] mb-8">
                A young team with a<br />business-focused approach
              </h2>
              <div className="space-y-6 text-[15px] text-[#53606a] leading-[1.8] font-light max-w-xl">
                <p>Being a young entrepreneurial practice shapes how we work. We ask questions early, learn how the business earns revenue and makes decisions, and use technology to organise information and manage the assignment efficiently. This helps us get to the relevant issues quickly while maintaining the care needed for technical analysis.</p>
                <p>Our aim is not simply to respond quickly, but to respond with an understanding of what matters to the business.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. How We Work */}
      <section className="py-24 bg-[#f8f9fa] border-b border-[#E7E5E1]">
        <Container>
          <div className="mb-16">
            <FadeIn distance={20}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1.5px] bg-[#e00019]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                  HOW WE WORK
                </span>
              </div>
              <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#111b23] tracking-tight leading-[1.1] mb-6">
                Four steps, every engagement
              </h2>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Understand the business", text: "We discuss the activities, transaction flows, available information and decision-makers to..." },
              { num: "02", title: "Agree the scope", text: "We set out the work, information required, responsibilities and deliverables..." },
              { num: "03", title: "Analyse and explain", text: "We assess the facts, develop our position and discuss the implications with..." },
              { num: "04", title: "Deliver and support", text: "We provide the agreed output and help clarify the practical next steps..." }
            ].map(step => (
              <StaggerItem key={step.num} className="p-10 border border-[#e5e5e5] rounded-xl bg-white flex flex-col h-full hover:border-[#e00019] hover:shadow-lg transition-all duration-300">
                <div className="text-3xl font-black text-[#e00019] mb-6">{step.num}</div>
                <h3 className="font-sans font-bold text-[17px] text-[#111b23] mb-4">{step.title}</h3>
                <p className="text-[14px] text-[#7a7a7a] leading-relaxed font-light mt-auto">{step.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* 6. Service Approach (Dark Red Section) */}
      <section className="relative py-24 bg-[#7a000e] overflow-hidden">
        {/* Faint Skyline Background */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <Image
            src="/images/hero-reference.webp"
            alt="Dubai Skyline"
            fill
            className="object-cover object-bottom"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#940011] to-[#60000a] opacity-90" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8">
              <FadeIn distance={20}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-8 h-[1.5px] bg-[#ff4d5e]" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ff4d5e] uppercase">
                    OUR APPROACH TO SERVICE
                  </span>
                </div>
                <h2 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.1] mb-8">
                  Good service is <span className="text-[#ff4d5e]">everything.</span>
                </h2>
                <div className="space-y-6 text-[15px] text-white/80 leading-[1.8] font-light max-w-xl">
                  <p>For us, this means being accessible, treating questions seriously and communicating clearly. It also means being candid about uncertainty, identifying information gaps early and keeping clients informed when an issue needs further work.</p>
                  <p>A report is part of the service. The discussion that helps a client understand and use it is just as important.</p>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn distance={20} delay={0.2}>
                <div className="p-10 lg:p-12 border border-[#b20014] rounded-2xl bg-[#4a0009]/40 backdrop-blur-sm">
                  <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#ff4d5e] uppercase mb-8">
                    BUSINESS AND PROFESSIONAL CONNECTIONS
                  </h3>
                  <div className="space-y-6 text-[15px] text-white/80 leading-[1.8] font-light">
                    <p>Through Ajin&apos;s participation in the BNI network, Taxmetryx stays connected with business owners and entrepreneurs. These relationships provide opportunities to listen, exchange knowledge and better understand the practical concerns of growing businesses.</p>
                    <p>We value relationships built through consistent work, mutual support and professional trust.</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. Team Locations */}
      <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 mb-12 items-center">
            <FadeIn distance={20}>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[1.5px] bg-[#e00019]" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#e00019] uppercase">
                  WHERE WE ARE
                </span>
              </div>
              <h2 className="font-sans text-4xl sm:text-5xl font-extrabold text-[#111b23] tracking-tight leading-[1.1] mb-6">
                Team locations
              </h2>
              <p className="text-[15px] text-[#53606a] leading-[1.8] font-light max-w-xl">
                Ajin and his team work across these locations to coordinate assignments and maintain continuity of communication.
              </p>
            </FadeIn>

            {/* Outline 02 Watermark */}
            <FadeIn distance={20} delay={0.2} className="hidden lg:flex justify-end pr-12 relative">
              <div className="text-[180px] font-sans font-extrabold leading-none select-none text-transparent" style={{ WebkitTextStroke: '2px #e5e5e5' }}>
                02
              </div>
            </FadeIn>
          </div>

          {/* Grid of locations */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Dubai", country: "United Arab Emirates" },
              { name: "Kerala", country: "India" },
              { name: "Bangalore", country: "India" }
            ].map((loc, i) => (
              <StaggerItem key={loc.name} className="p-8 border-x border-b border-[#e5e5e5] border-t-[3px] border-t-[#e00019] rounded-b-lg rounded-t-sm bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow duration-300">
                <h3 className="font-sans font-bold text-xl text-[#111b23] leading-tight mb-2">{loc.name}</h3>
                <p className="text-[13px] text-[#7a7a7a] font-light">{loc.country}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn distance={20} delay={0.3}>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#e00019] text-white rounded-full font-medium text-[15px] transition-all hover:bg-[#b80015] hover:shadow-[0_0_20px_rgba(224,0,25,0.4)]">
              Speak with our team
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
