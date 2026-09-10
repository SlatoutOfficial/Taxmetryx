"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, ArrowUpRight, Globe } from "lucide-react";
import { getServices, getNavigation } from "@/lib/json";
import CTAButton from "@/components/shared/CTAButton";
import BrandLogo from "@/components/shared/BrandLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const navigation = getNavigation();
  const services = getServices();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#061016] text-white flex flex-col justify-between overflow-y-auto p-6 sm:p-10 transition-all duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <BrandLogo light />
        </Link>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="p-2.5 text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Nav Links */}
      <nav className="py-8 space-y-4">
        {navigation.mainNav.map((item) => {
          if (item.hasDropdown) {
            return (
              <div key={item.title} className="border-b border-white/10 pb-4">
                <button
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  className="flex items-center justify-between w-full text-left py-2 font-editorial text-2xl text-white/90 hover:text-white"
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      servicesExpanded ? "rotate-180 text-brand-red" : ""
                    }`}
                  />
                </button>
                {servicesExpanded && (
                  <div className="mt-3 pl-4 space-y-3 border-l border-brand-red/40 py-2">
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={onClose}
                        className="block text-sm text-white/70 hover:text-brand-red transition-colors py-1"
                      >
                        <span className="font-mono text-xs text-brand-red mr-2">
                          {service.number}
                        </span>
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-brand-red pt-2 font-medium"
                    >
                      <span>All Practices Overview</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={item.title} className="border-b border-white/10 pb-4">
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2 font-editorial text-2xl text-white/90 hover:text-white hover:translate-x-1 transition-all"
              >
                {item.title}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom info & CTA */}
      <div className="pt-6 border-t border-white/10 space-y-5">
        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-red" />
            <span>Region: United Arab Emirates (UAE)</span>
          </div>
          <span>DIFC, Dubai</span>
        </div>

        <CTAButton
          href="/contact"
          onClick={onClose}
          variant="primary"
          size="lg"
          icon
          className="w-full justify-center"
        >
          Speak to Our Experts
        </CTAButton>

        <div className="text-[11px] text-white/40 text-center tracking-wider pt-2">
          © {new Date().getFullYear()} Taxmetryx Advisory Ltd. All rights
          reserved.
        </div>
      </div>
    </div>
  );
}
