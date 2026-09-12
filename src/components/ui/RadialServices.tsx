"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Globe2,
  Coins,
  ShieldCheck,
} from "lucide-react";
import { Service } from "@/types/service";
import BrandLogo from "@/components/shared/BrandLogo";

// Custom icons matching reference design
function BarChartIcon({ className }: { className?: string }) {
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

function NetworkIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <line x1="12" y1="9.5" x2="12" y2="7" />
      <line x1="10.2" y1="13.7" x2="6.8" y2="15.5" />
      <line x1="13.8" y1="13.7" x2="17.2" y2="15.5" />
    </svg>
  );
}

const summaries: Record<string, string> = {
  "transfer-pricing":
    "TP Advisory | Benchmarking | Documentation | Financial Transactions | Intercompany Pricing | TP Policy | APA | Implementation | Controversy",
  "corporate-tax":
    "Advisory | Compliance | QFZP | Tax Grouping | Restructuring | M&A Tax | Planning | Health Checks | Governance",
  "international-tax":
    "Tax Treaties | Permanent Establishment | Withholding Tax | Cross-border Transactions | Holding Structures | Inbound / Outbound | Foreign Tax Credit | Cross-border Business Models",
  "vat-and-indirect-tax":
    "VAT Advisory | Compliance | Health Checks | VAT Grouping | Cross-border VAT | Import / Export | Refunds | E-commerce | Real Estate | Excise",
  "tax-regulatory-and-controversy":
    "FTA Audits | Assessments | Reconsideration | TDRC | Litigation Support | MAP | Voluntary Disclosure | Penalty Mitigation | Clarifications | Regulatory Advisory",
  "global-tax-and-emerging-regulations":
    "Pillar Two / UAE DMTT | E-Invoicing | Tax Technology | Governance | Risk Management | Global Compliance | Tax Data & Reporting",
};

// Radial layout geometry (Canvas size: 960 x 600, Center: 480, 300)
// Node distance: 175px, Orbit distance: 124px, Hub radius: 74px
const practicesLayout = [
  {
    index: 0,
    slug: "transfer-pricing",
    number: "01",
    title: "Transfer Pricing",
    Icon: BarChartIcon,
    angleDeg: -128,
    nodeLeft: "38.8%",
    nodeTop: "27.0%",
    side: "left" as const,
    topOffset: "5%",
  },
  {
    index: 1,
    slug: "corporate-tax",
    number: "02",
    title: "Corporate Tax",
    Icon: FileText,
    angleDeg: -52,
    nodeLeft: "61.2%",
    nodeTop: "27.0%",
    side: "right" as const,
    topOffset: "5%",
  },
  {
    index: 2,
    slug: "international-tax",
    number: "03",
    title: "International Tax",
    Icon: Globe2,
    angleDeg: 0,
    nodeLeft: "68.2%",
    nodeTop: "50.0%",
    side: "right" as const,
    topOffset: "38%",
  },
  {
    index: 3,
    slug: "vat-and-indirect-tax",
    number: "04",
    title: "VAT & Indirect Tax",
    Icon: Coins,
    angleDeg: 52,
    nodeLeft: "61.2%",
    nodeTop: "73.0%",
    side: "right" as const,
    topOffset: "65%",
  },
  {
    index: 4,
    slug: "tax-regulatory-and-controversy",
    number: "05",
    title: "Tax Regulatory & Controversy",
    Icon: ShieldCheck,
    angleDeg: 128,
    nodeLeft: "38.8%",
    nodeTop: "73.0%",
    side: "left" as const,
    topOffset: "65%",
  },
  {
    index: 5,
    slug: "global-tax-and-emerging-regulations",
    number: "06",
    title: "Global Tax &\nEmerging Regulations",
    Icon: NetworkIcon,
    angleDeg: 180,
    nodeLeft: "31.8%",
    nodeTop: "50.0%",
    side: "left" as const,
    topOffset: "36%",
  },
];

export default function RadialServices({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);

  // SVG Geometry constants
  const cx = 480;
  const cy = 300;
  const rHub = 74;
  const rOrbit = 124;
  const rNode = 175;

  return (
    <div className="w-full overflow-hidden">
      {/* Desktop & Tablet Radial View (>= 1024px) */}
      <div className="hidden lg:block relative w-full max-w-[960px] h-[590px] mx-auto select-none">
        {/* SVG Orbit and Spokes Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 960 600"
          aria-hidden="true"
        >
          {/* Single Orbit Circle */}
          <circle
            cx={cx}
            cy={cy}
            r={rOrbit}
            fill="none"
            stroke="#e2dfd9"
            strokeWidth="1"
          />

          {/* Spokes and Red Dots for each practice */}
          {practicesLayout.map((item, idx) => {
            const rad = (item.angleDeg * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);

            const xHub = cx + rHub * cos;
            const yHub = cy + rHub * sin;

            const xOrbit = cx + rOrbit * cos;
            const yOrbit = cy + rOrbit * sin;

            const xNode = cx + rNode * cos;
            const yNode = cy + rNode * sin;

            const isActive = active === idx;

            return (
              <g key={item.slug}>
                {/* Spoke Line from Hub edge through orbit dot to node */}
                <line
                  x1={xHub}
                  y1={yHub}
                  x2={xNode}
                  y2={yNode}
                  stroke={isActive ? "#eb0045" : "#e0ddd7"}
                  strokeWidth={isActive ? "1.5" : "1"}
                  className="transition-colors duration-300"
                />

                {/* Red Dot on the Orbit Line */}
                <circle
                  cx={xOrbit}
                  cy={yOrbit}
                  r="3.5"
                  fill="#eb0045"
                  className={isActive ? "drop-shadow-[0_0_4px_rgba(235,0,69,0.6)]" : ""}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Hub Card */}
        <div
          className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-[156px] h-[156px] rounded-full bg-white border border-[#e8e6e1] shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-3 z-10"
        >
          <div className="scale-100 mb-0.5">
            <BrandLogo markOnly imgClassName="h-12" />
          </div>
        </div>

        {/* Icon Nodes (Floating White Circles) */}
        {practicesLayout.map((item, idx) => {
          const { Icon } = item;
          const isActive = active === idx;

          return (
            <Link
              key={`node-${item.slug}`}
              href={`/services/${item.slug}`}
              style={{ left: item.nodeLeft, top: item.nodeTop }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center transition-all duration-250 z-20 cursor-pointer ${isActive
                ? "border-2 border-[#eb0045] shadow-[0_6px_20px_rgba(235,0,69,0.18)] text-[#eb0045] scale-105"
                : "border border-[#eeece7] shadow-[0_4px_14px_rgba(0,0,0,0.06)] text-[#414042] hover:text-[#eb0045] hover:border-[#eb004560]"
                }`}
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              aria-label={item.title}
            >
              <Icon className="w-[21px] h-[21px] stroke-[1.4]" />
            </Link>
          );
        })}

        {/* 6 Practice Text Blocks - Guaranteed non-overlapping relative positioning */}
        {practicesLayout.map((item, idx) => {
          const isActive = active === idx;
          const serviceData = services.find((s) => s.slug === item.slug);
          const serviceTitle = serviceData?.title || item.title;
          const serviceSummary = summaries[item.slug] || serviceData?.shortDescription || "";

          // Exact position tied directly to node coordinate so they never collide
          const positionStyle =
            item.side === "right"
              ? {
                left: `calc(${item.nodeLeft} + 35px)`,
                top: item.topOffset,
                maxWidth: "245px",
              }
              : {
                right: `calc(100% - ${item.nodeLeft} + 35px)`,
                top: item.topOffset,
                maxWidth: "245px",
              };

          return (
            <Link
              key={`text-${item.slug}`}
              href={`/services/${item.slug}`}
              style={positionStyle}
              className="absolute group z-20 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1"
              onMouseEnter={() => setActive(idx)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Optional top red dash */}
              <span
                className={`w-4 h-[1.5px] block mb-1 transition-colors duration-200 ${isActive ? "bg-[#eb0045]" : "bg-[#dedad4] group-hover:bg-[#eb0045]"
                  }`}
              />
              {/* <span className="text-[10.5px] font-mono tracking-wider text-[#64748b]">
                {item.number}
              </span> */}
              <h3
                className={`font-sans text-[1.12rem] leading-tight font-bold mt-0.5 mb-1.5 transition-colors duration-200 ${isActive ? "text-[#eb0045]" : "text-[#414042] group-hover:text-[#eb0045]"
                  }`}
              >
                {serviceTitle}
              </h3>
              <p className="text-[10.5px] text-[#55636e] leading-[1.6]">
                {serviceSummary}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Mobile & Small Screen Stacking Layout (< 1024px) */}
      <div className="block lg:hidden space-y-6 pt-4">
        {practicesLayout.map((item) => {
          const { Icon } = item;
          const serviceData = services.find((s) => s.slug === item.slug);
          const serviceTitle = serviceData?.title || item.title;
          const serviceSummary = summaries[item.slug] || serviceData?.shortDescription || "";

          return (
            <Link
              key={`mobile-${item.slug}`}
              href={`/services/${item.slug}`}
              className="block p-5 bg-white rounded-lg border border-[#e8e6e1] shadow-sm hover:border-[#eb0045] transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-[#f8f7f5] flex items-center justify-center text-[#414042]">
                  <Icon className="w-5 h-5 stroke-[1.4]" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#64748b] block">{item.number}</span>
                  <h3 className="font-sans text-lg font-bold text-[#414042]">{serviceTitle}</h3>
                </div>
              </div>
              <p className="text-xs text-[#55636e] leading-relaxed pl-13">
                {serviceSummary}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

