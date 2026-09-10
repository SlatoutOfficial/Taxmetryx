"use client";

import React from "react";
import Container from "@/components/shared/Container";
import Link from "next/link";
import { ArrowUpRight, Scale, Building2, Globe2, Receipt, ShieldAlert, Cpu } from "lucide-react";
import { getServices } from "@/lib/json";

const iconMap: Record<string, React.ReactNode> = {
  Scale: <Scale className="w-4 h-4 text-brand-red" />,
  Building2: <Building2 className="w-4 h-4 text-brand-red" />,
  Globe2: <Globe2 className="w-4 h-4 text-brand-red" />,
  Receipt: <Receipt className="w-4 h-4 text-brand-red" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-brand-red" />,
  Cpu: <Cpu className="w-4 h-4 text-brand-red" />,
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const services = getServices();

  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-[#E7E5E1] shadow-xl py-10 z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2"
    >
      <Container>
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E7E5E1]">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-red block mb-1">
              PRACTICES & CAPABILITIES
            </span>
            <p className="font-editorial text-2xl text-brand-primary">
              Six Specialized Tax & Advisory Disciplines
            </p>
          </div>
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-brand-primary hover:text-brand-red transition-colors font-medium"
          >
            <span>View All Practices</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              onClick={onClose}
              className="group p-5 border border-transparent hover:border-[#E7E5E1] hover:bg-[#F8F7F4]/80 transition-all duration-200 block"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-brand-red font-semibold">
                    {service.number}
                  </span>
                  <div className="p-1.5 bg-brand-red/10 rounded-none">
                    {iconMap[service.icon] || <Scale className="w-4 h-4 text-brand-red" />}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-brand-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-brand-red" />
              </div>
              <h4 className="text-sm font-semibold text-brand-primary group-hover:text-brand-red transition-colors mb-1.5">
                {service.title}
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                {service.shortDescription}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#E7E5E1] flex flex-wrap items-center justify-between text-xs text-brand-muted gap-4">
          <div className="flex items-center gap-6">
            <span>DIFC Registered Advisory Firm</span>
            <span className="w-1 h-1 rounded-full bg-brand-red" />
            <span>UAE Corporate Tax Decree-Law No. 47 Compliant</span>
            <span className="w-1 h-1 rounded-full bg-brand-red" />
            <span>OECD Transfer Pricing Standards</span>
          </div>
          <Link
            href="/contact"
            onClick={onClose}
            className="text-brand-red font-medium hover:underline flex items-center gap-1.5"
          >
            <span>Request a Confidential Diagnostic</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    </div>
  );
}
