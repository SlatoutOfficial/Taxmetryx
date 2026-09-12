"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Cpu,
  Globe2,
  Receipt,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/shared/Button";

interface PracticeDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  icon: React.ReactNode;
}

const practices: PracticeDetail[] = [
  {
    slug: "transfer-pricing",
    title: "Transfer Pricing",
    tagline: "Arm's Length Structuring & Documentation",
    description:
      "Substantiate related-party transactions with defensible economic benchmarking aligned with OECD Guidelines and UAE Federal Tax Authority requirements.",
    highlights: [
      "OECD Local File & Master File documentation",
      "Economic benchmarking & comparable searches",
      "Intercompany financial transaction pricing",
    ],
    icon: <Scale className="w-4 h-4" />,
  },
  {
    slug: "corporate-tax",
    title: "Corporate Tax",
    tagline: "UAE Corporate Tax Law No. 47 Advisory",
    description:
      "Navigate UAE corporate tax obligations, qualify for the 0% Free Zone regime (QFZP), and structure tax groups to protect business value.",
    highlights: [
      "0% Qualifying Free Zone Person (QFZP) qualification",
      "Tax grouping & intra-group relief optimization",
      "Corporate tax impact diagnostics & filing support",
    ],
    icon: <Building2 className="w-4 h-4" />,
  },
  {
    slug: "international-tax",
    title: "International Tax",
    tagline: "Cross-Border Structuring & Treaties",
    description:
      "Strategic cross-border advisory addressing OECD Pillar Two global minimum tax, Double Tax Treaties (DTAA), and permanent establishment risks.",
    highlights: [
      "OECD Pillar Two 15% Global Minimum Tax analysis",
      "Double Tax Treaty (DTAA) network structuring",
      "Permanent Establishment (PE) mitigation",
    ],
    icon: <Globe2 className="w-4 h-4" />,
  },
  {
    slug: "vat-and-indirect-tax",
    title: "VAT & Indirect Tax",
    tagline: "GCC VAT Advisory & Compliance",
    description:
      "End-to-end VAT advisory and compliance across the UAE and GCC, covering transaction reviews, real estate structuring, and audit readiness.",
    highlights: [
      "GCC VAT compliance & transactional reviews",
      "FTA audit support & Voluntary Disclosures",
      "Real estate tax structuring & input tax recovery",
    ],
    icon: <Receipt className="w-4 h-4" />,
  },
  {
    slug: "tax-regulatory-and-controversy",
    title: "Tax Regulatory & Controversy",
    tagline: "FTA Audit Defense & Dispute Resolution",
    description:
      "Defend your tax position with rigorous technical representation in Federal Tax Authority audits, Reconsiderations, and dispute committees.",
    highlights: [
      "FTA audit defense & inquiries management",
      "Reconsideration requests & penalty waivers",
      "Tax Dispute Resolution Committee representation",
    ],
    icon: <ShieldAlert className="w-4 h-4" />,
  },
  {
    slug: "global-tax-and-emerging-regulations",
    title: "Global Tax & Emerging Regulations",
    tagline: "Economic Substance & Global Transparency",
    description:
      "Maintain proactive compliance with international transparency rules including Economic Substance Regulations (ESR), CbCR, and FATCA/CRS.",
    highlights: [
      "Economic Substance Regulations (ESR) compliance",
      "Country-by-Country Reporting (CbCR) filing",
      "FATCA & CRS transparency compliance",
    ],
    icon: <Cpu className="w-4 h-4" />,
  },
];

interface ServicesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter?: () => void;
}

export default function ServicesDropdown({
  isOpen,
  onClose,
  onMouseEnter,
}: ServicesDropdownProps) {
  const [activeSlug, setActiveSlug] = useState<string>(practices[0].slug);

  if (!isOpen) return null;

  const active =
    practices.find((p) => p.slug === activeSlug) || practices[0];

  return (
    <div
      onMouseEnter={onMouseEnter}
      className="absolute top-full -left-32 pt-3 z-50 animate-in fade-in zoom-in-95 duration-150"
      role="menu"
      aria-orientation="vertical"
    >
      <div className="w-[820px] bg-white rounded-2xl border border-[#E5E2DA] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.14),0_0_0_1px_rgba(0,0,0,0.03)] overflow-hidden">
        {/* Subtle Top Accent */}
        <div className="h-[2.5px] bg-gradient-to-r from-brand-red/20 via-brand-red to-brand-red/20" />

        {/* Main 2-Pane Content */}
        <div className="grid grid-cols-[310px_1fr]">
          {/* LEFT PANE: Clean List of Practices */}
          <div className="p-3 bg-[#FCFCFA] border-r border-[#EFECE6] flex flex-col justify-between">
            <div>
              {/* Header Label - Clean, user-friendly, no number count */}
              <div className="px-3 pt-2 pb-2.5 flex items-center gap-2">
                <span className="text-[11px] font-medium tracking-[0.16em] text-[#55636e] uppercase">
                  Advisory Practices
                </span>
              </div>

              {/* Practices List */}
              <div className="space-y-1">
                {practices.map((practice) => {
                  const isSelected = practice.slug === active.slug;
                  return (
                    <Link
                      key={practice.slug}
                      href={`/services/${practice.slug}`}
                      onClick={onClose}
                      onMouseEnter={() => setActiveSlug(practice.slug)}
                      className={cn(
                        "group flex items-center justify-between px-3 py-2.5 rounded-[10px_3px_10px_3px] transition-all duration-150 cursor-pointer border text-left",
                        isSelected
                          ? "bg-white border-[#E0DDD5] shadow-xs"
                          : "border-transparent hover:bg-white/70",
                      )}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Icon */}
                        <div
                          className={cn(
                            "w-7 h-7 rounded-[7px_2px_7px_2px] flex items-center justify-center transition-colors shrink-0",
                            isSelected
                              ? "bg-brand-red/10 text-brand-red"
                              : "bg-[#F0EEE8] text-[#55636e] group-hover:bg-brand-red/5 group-hover:text-brand-red",
                          )}
                        >
                          {practice.icon}
                        </div>

                        {/* Title */}
                        <span
                          className={cn(
                            "text-[13px] font-semibold tracking-tight transition-colors truncate",
                            isSelected
                              ? "text-brand-red"
                              : "text-brand-primary group-hover:text-brand-red",
                          )}
                        >
                          {practice.title}
                        </span>
                      </div>

                      {/* Clean Arrow Indicator */}
                      <ArrowRight
                        className={cn(
                          "w-3.5 h-3.5 transition-all duration-150 shrink-0",
                          isSelected
                            ? "text-brand-red opacity-100 translate-x-0"
                            : "text-brand-muted opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0",
                        )}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Bottom Link */}
            <div className="px-3 pt-3 pb-1 border-t border-[#EFECE6] mt-2">
              <Link
                href="/services"
                onClick={onClose}
                className="text-[11.5px] font-semibold text-brand-primary hover:text-brand-red transition-colors flex items-center gap-1.5 group/link"
              >
                <span>View All Practices</span>
                <ArrowRight className="w-3 h-3 text-brand-red group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT PANE: Focused, Unbroken Practice Details */}
          <div className="p-6 bg-white flex flex-col justify-between">
            <div className="space-y-4">
              {/* Category Eyebrow & Title */}
              <div>
                <div className="mb-1.5">
                  <span className="text-[10.5px] font-medium uppercase tracking-wider text-brand-muted">
                    {active.tagline}
                  </span>
                </div>
                <h4 className="font-sans text-2xl text-brand-primary font-bold tracking-tight leading-tight">
                  {active.title}
                </h4>
              </div>

              {/* Natural, readable description without truncation */}
              <p className="text-[12.5px] text-[#55636e] leading-relaxed">
                {active.description}
              </p>

              {/* Key Capabilities Checklist */}
              <div className="pt-2">
                <span className="text-[10.5px] font-medium uppercase tracking-wider text-brand-muted block mb-2">
                  Key Focus Areas
                </span>
                <div className="space-y-2">
                  {active.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-[12px] text-[#333e48]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-[#F0EFEB] flex items-center">
              <Button
                href={`/services/${active.slug}`}
                onClick={onClose}
                variant="primary"
                size="sm"
                icon
              >
                Explore {active.title}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
