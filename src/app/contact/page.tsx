import React from "react";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionLabel from "@/components/shared/SectionLabel";
import Breadcrumb from "@/components/shared/Breadcrumb";
import ContactSection from "@/components/home/ContactSection";
import { getSiteConfig } from "@/lib/json";
import { MapPin, Phone, Mail, Clock, Building, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Tax Directors | Taxmetryx Dubai DIFC",
  description:
    "Direct confidential consultations with Taxmetryx partners. Level 14, Al Sa'ada Tower, Dubai International Financial Centre (DIFC).",
};

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <div className="pt-28 sm:pt-32 pb-16 bg-[#F8F7F4]">
      {/* Breadcrumb Header */}
      <Container className="pb-8">
        <Breadcrumb items={[{ label: "Contact" }]} />
      </Container>

      {/* Hero Header */}
      <section className="pb-16 border-b border-[#E7E5E1]">
        <Container>
          <div className="max-w-3xl space-y-6">
            <SectionLabel>DIRECT PARTNER ADVISORY</SectionLabel>
            <h1 className="font-editorial text-clamp-hero text-brand-primary">
              Let&apos;s start <br />
              <span className="text-brand-red">with the facts.</span>
            </h1>
            <p className="text-sm sm:text-base text-brand-charcoal/85 leading-relaxed">
              Whether you require preliminary transfer pricing risk assessment, corporate tax group structuring, or urgent representation against an FTA audit notice, our senior partners are directly reachable.
            </p>
          </div>
        </Container>
      </section>

      {/* Office Hubs Grid */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E7E5E1]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dubai DIFC Headquarters */}
            <div className="p-8 border border-[#E7E5E1] bg-[#F8F7F4]/50 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
                  HEADQUARTERS
                </span>
                <span className="text-[11px] font-mono text-brand-muted">
                  License: {site.legal.licenseNo}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-editorial text-2xl text-brand-primary">
                  Dubai (DIFC) Practice
                </h3>
                <p className="text-xs text-brand-muted">
                  Dubai International Financial Centre, United Arab Emirates
                </p>
              </div>

              <div className="space-y-3 text-xs text-brand-charcoal pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                  <div>
                    <div>{site.headquarters.address}</div>
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
                    Monday — Friday: 08:30 – 18:00 GST
                  </span>
                </div>
              </div>
            </div>

            {/* Abu Dhabi Representative Office */}
            <div className="p-8 border border-[#E7E5E1] bg-[#F8F7F4]/50 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-charcoal font-semibold">
                  CAPITAL OFFICE
                </span>
                <span className="text-[11px] font-mono text-brand-muted">
                  ADGM Hub
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-editorial text-2xl text-brand-primary">
                  Abu Dhabi (ADGM) Liaison
                </h3>
                <p className="text-xs text-brand-muted">
                  Abu Dhabi Global Market, Al Maryah Island
                </p>
              </div>

              <div className="space-y-3 text-xs text-brand-charcoal pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                  <div>
                    <div>Al Sila Tower, Level 21, ADGM Square</div>
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
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Embed ContactSection Form */}
      <ContactSection />
    </div>
  );
}
