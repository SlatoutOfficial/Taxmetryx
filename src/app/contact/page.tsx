import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ContactSection from "@/components/home/ContactSection";
import CTAButton from "@/components/shared/CTAButton";
import { getSiteConfig } from "@/lib/json";
import {
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/shared/ScrollMotion";
import { MapPin, Phone, Mail, Clock, Building, ShieldCheck, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Tax Directors | Taxmetryx Dubai DIFC",
  description:
    "Direct confidential consultations with Taxmetryx partners. Level 14, Al Sa'ada Tower, Dubai International Financial Centre (DIFC).",
};

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <div className="pt-28 sm:pt-32 pb-16 bg-[#F8F7F4]">
      {/* Hero Header with Architectural Visual Frame */}
      <section className="pb-16 sm:pb-20 border-b border-[#E7E5E1] overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <FadeIn distance={15} delay={0.05}>
                <SectionLabel>DIRECT PARTNER ADVISORY</SectionLabel>
              </FadeIn>

              <FadeIn distance={25} delay={0.12}>
                <h1 className="font-editorial text-clamp-hero text-brand-primary">
                  Let&apos;s start <br />
                  <span className="text-brand-red">with the facts.</span>
                </h1>
              </FadeIn>

              <FadeIn distance={20} delay={0.18}>
                <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed font-sans max-w-xl">
                  Whether you require preliminary transfer pricing risk assessment, corporate tax group structuring, or urgent representation against an FTA audit notice, our senior partners are directly reachable.
                </p>
              </FadeIn>

              <FadeIn distance={15} delay={0.25}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <CTAButton href="#contact-form" variant="primary" size="lg" icon>
                    Submit Confidential Inquiry
                  </CTAButton>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-5 relative">
              <ScaleIn delay={0.15} duration={0.8}>
                <div className="relative p-2 bg-white border border-[#E7E5E1] shadow-lg">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-brand-dark group">
                    <Image
                      src="/images/contact-dubai.jpg"
                      alt="Taxmetryx Headquarters at Dubai International Financial Centre"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
                        DIFC GATE PRECINCT
                      </div>
                      <div className="font-editorial text-base sm:text-lg">
                        Level 14, Al Sa&apos;ada Tower • Dubai
                      </div>
                    </div>
                  </div>
                </div>
              </ScaleIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Office Hubs Grid with Images */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E7E5E1]">
        <Container>
          <FadeIn distance={20} delay={0.05}>
            <div className="max-w-2xl mb-12 space-y-3">
              <SectionLabel>PHYSICAL PRESENCE</SectionLabel>
              <h2 className="font-editorial text-clamp-heading text-brand-primary">
                <span className="text-[#eb0045]">Executive Advisory</span> Hubs
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted">
                Strategically positioned across the UAE&apos;s primary financial free zones.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dubai DIFC Headquarters */}
            <StaggerItem className="border border-[#E7E5E1] bg-[#F8F7F4]/50 overflow-hidden hover:border-brand-red transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-dark border-b border-[#E7E5E1]">
                  <Image
                    src="/images/contact-dubai.jpg"
                    alt="Dubai DIFC Practice"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-brand-red text-white text-[10px] font-mono uppercase tracking-widest font-semibold">
                      HEADQUARTERS
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-editorial text-2xl text-white">
                      Dubai (DIFC) Practice
                    </h3>
                    <p className="text-xs text-white/80 font-sans">
                      Dubai International Financial Centre, United Arab Emirates
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-4 text-xs text-brand-charcoal">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold">{site.headquarters.address}</div>
                      <div className="text-brand-muted">{site.headquarters.zone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-red shrink-0" />
                    <span>Main Line: {site.contact.phoneFormatted}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-red shrink-0" />
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="hover:text-brand-red underline"
                    >
                      {site.contact.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-red shrink-0" />
                    <span className="text-brand-muted">
                      Monday - Friday: 08:30 - 18:00 GST
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-white border-t border-[#E7E5E1] text-[11px] font-mono text-brand-muted flex items-center justify-between">
                <span>License: {site.legal.licenseNo}</span>
                <span className="text-brand-primary font-semibold">DIFC Gate District</span>
              </div>
            </StaggerItem>

            {/* Abu Dhabi Representative Office */}
            <StaggerItem className="border border-[#E7E5E1] bg-[#F8F7F4]/50 overflow-hidden hover:border-brand-primary transition-all group flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-dark border-b border-[#E7E5E1]">
                  <Image
                    src="/images/contact-adgm.jpg"
                    alt="Abu Dhabi ADGM Liaison"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-brand-primary text-white text-[10px] font-mono uppercase tracking-widest font-semibold">
                      CAPITAL OFFICE
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-editorial text-2xl text-white">
                      Abu Dhabi (ADGM) Liaison
                    </h3>
                    <p className="text-xs text-white/80 font-sans">
                      Abu Dhabi Global Market, Al Maryah Island
                    </p>
                  </div>
                </div>

                <div className="p-8 space-y-4 text-xs text-brand-charcoal">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold">Al Sila Tower, Level 21, ADGM Square</div>
                      <div className="text-brand-muted">Al Maryah Island, Abu Dhabi, UAE</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-red shrink-0" />
                    <span>Advisory Hotline: {site.contact.advisoryHotline}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-brand-red shrink-0" />
                    <span className="text-brand-muted">
                      Dedicated Sovereign & Financial Institution Practice
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-brand-red shrink-0" />
                    <span className="text-brand-muted">
                      Monday - Friday: 09:00 - 17:30 GST
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-8 py-4 bg-white border-t border-[#E7E5E1] text-[11px] font-mono text-brand-muted flex items-center justify-between">
                <span>Hub: ADGM Financial Center</span>
                <span className="text-brand-primary font-semibold">Capital Practice</span>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* Embed ContactSection Form */}
      <div id="contact-form" className="scroll-mt-24">
        <ContactSection />
      </div>
    </div>
  );
}

