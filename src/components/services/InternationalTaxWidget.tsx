"use client";

import React, { useState } from "react";
import { Globe2, ShieldAlert, CheckCircle2, ArrowRightLeft, Percent } from "lucide-react";

interface TreatyCountry {
  country: string;
  code: string;
  dividendWht: string;
  interestWht: string;
  royaltyWht: string;
  domesticStandardWht: string;
  mliPptStatus: string;
}

const TREATY_DATA: TreatyCountry[] = [
  {
    country: "United Kingdom",
    code: "GB",
    dividendWht: "0% / 15%",
    interestWht: "0%",
    royaltyWht: "0%",
    domesticStandardWht: "20%",
    mliPptStatus: "Covered by MLI (PPT Active)",
  },
  {
    country: "Netherlands",
    code: "NL",
    dividendWht: "0% / 5%",
    interestWht: "0%",
    royaltyWht: "0%",
    domesticStandardWht: "15%",
    mliPptStatus: "Covered by MLI (PPT Active)",
  },
  {
    country: "Singapore",
    code: "SG",
    dividendWht: "0%",
    interestWht: "0%",
    royaltyWht: "5%",
    domesticStandardWht: "10% - 15%",
    mliPptStatus: "Covered by MLI (PPT Active)",
  },
  {
    country: "Germany",
    code: "DE",
    dividendWht: "5% / 10%",
    interestWht: "0%",
    royaltyWht: "10%",
    domesticStandardWht: "26.375%",
    mliPptStatus: "Bilateral Protocol Active",
  },
  {
    country: "India",
    code: "IN",
    dividendWht: "10%",
    interestWht: "5% / 12.5%",
    royaltyWht: "10%",
    domesticStandardWht: "20% + Surcharge",
    mliPptStatus: "Covered by MLI (Strict PPT)",
  },
  {
    country: "Switzerland",
    code: "CH",
    dividendWht: "0% / 5%",
    interestWht: "0%",
    royaltyWht: "0%",
    domesticStandardWht: "35%",
    mliPptStatus: "Bilateral Protocol Active",
  },
];

export default function InternationalTaxWidget() {
  const [selectedCountry, setSelectedCountry] = useState<TreatyCountry>(TREATY_DATA[0]);
  const [revenueOver750M, setRevenueOver750M] = useState<boolean>(true);
  const [localEtr, setLocalEtr] = useState<number>(9.0);

  const globeThreshold = 15.0;
  const topUpTaxRate = revenueOver750M ? Math.max(0, globeThreshold - localEtr) : 0;

  return (
    <div className="bg-[#031926] text-white border border-[#00B4D8]/30 shadow-2xl p-6 sm:p-8 rounded-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#00B4D8] rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#00B4D8]">
            OECD Pillar Two GloBE Rules &amp; Bilateral DTAAs
          </span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
          Pillar Two (15% GloBE) &amp; Treaty Rate Navigator
        </h3>
        <p className="text-xs text-white/70 max-w-2xl mt-1">
          Explore treaty withholding relief across the UAE&apos;s 140+ DTAA network and compute GloBE Top-Up Tax liabilities under OECD Pillar Two standards.
        </p>
      </div>

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Treaty Matrix */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-white/80 font-semibold flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-[#00B4D8]" /> Select Treaty Partner Jurisdiction:
            </span>
          </div>

          {/* Country Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TREATY_DATA.map((t) => (
              <button
                key={t.country}
                onClick={() => setSelectedCountry(t)}
                className={`px-3 py-2 text-xs font-mono text-left border transition-all ${selectedCountry.country === t.country
                    ? "bg-[#00B4D8] text-black font-bold border-[#00B4D8]"
                    : "bg-white/[0.03] border-white/10 text-white/80 hover:bg-white/[0.08]"
                  }`}
              >
                {t.country}
              </button>
            ))}
          </div>

          {/* Treaty Detail Comparison Card */}
          <div className="p-5 bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs text-white/50 font-mono">Bilateral DTAA Profile</span>
                <h4 className="font-editorial text-xl text-white">UAE — {selectedCountry.country}</h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#00B4D8]/20 text-[#00B4D8] border border-[#00B4D8]/40">
                {selectedCountry.mliPptStatus}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-white/60 block uppercase">Dividends WHT</span>
                <span className="text-sm sm:text-base font-mono font-bold text-[#00B4D8] mt-1 block">
                  {selectedCountry.dividendWht}
                </span>
                <span className="text-[9px] text-white/40 block mt-0.5">Domestic: {selectedCountry.domesticStandardWht}</span>
              </div>

              <div className="p-3 bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-white/60 block uppercase">Interest WHT</span>
                <span className="text-sm sm:text-base font-mono font-bold text-[#00B4D8] mt-1 block">
                  {selectedCountry.interestWht}
                </span>
                <span className="text-[9px] text-white/40 block mt-0.5">Domestic: {selectedCountry.domesticStandardWht}</span>
              </div>

              <div className="p-3 bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono text-white/60 block uppercase">Royalties WHT</span>
                <span className="text-sm sm:text-base font-mono font-bold text-[#00B4D8] mt-1 block">
                  {selectedCountry.royaltyWht}
                </span>
                <span className="text-[9px] text-white/40 block mt-0.5">Domestic: {selectedCountry.domesticStandardWht}</span>
              </div>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed italic">
              *Withholding rates require satisfying the Principal Purpose Test (PPT), bona fide UAE tax residency certification (TRC), and commercial substance on UAE soil.
            </p>
          </div>
        </div>

        {/* Right: Pillar Two GloBE Top-Up Tax Simulator */}
        <div className="lg:col-span-5 p-6 border bg-white/[0.04] space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#00B4D8] flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5" /> Pillar Two GloBE 15% Top-Up Simulator
          </div>

          {/* Group Revenue Toggle */}
          <div className="space-y-2">
            <span className="text-xs text-white/80 block">Consolidated Annual Group Revenue:</span>
            <div className="flex gap-2 text-xs font-mono">
              <button
                onClick={() => setRevenueOver750M(true)}
                className={`flex-1 py-2 border transition-all ${revenueOver750M
                    ? "bg-[#00B4D8] text-black font-bold border-[#00B4D8]"
                    : "bg-white/[0.03] border-white/10 text-white/70"
                  }`}
              >
                &gt; EUR 750 Million (In Scope)
              </button>
              <button
                onClick={() => setRevenueOver750M(false)}
                className={`flex-1 py-2 border transition-all ${!revenueOver750M
                    ? "bg-[#00B4D8] text-black font-bold border-[#00B4D8]"
                    : "bg-white/[0.03] border-white/10 text-white/70"
                  }`}
              >
                &le; EUR 750M (Exempt)
              </button>
            </div>
          </div>

          {revenueOver750M ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/80">UAE Local Effective Tax Rate (ETR):</span>
                  <span className="text-sm font-bold text-[#00B4D8]">{localEtr.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={localEtr}
                  onChange={(e) => setLocalEtr(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
                />
                <div className="flex justify-between text-[10px] font-mono text-white/50">
                  <span>0% (Free Zone)</span>
                  <span>9% (Standard CT)</span>
                  <span>15% (GloBE Target)</span>
                </div>
              </div>

              <div className="p-4 border bg-black/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/70">Pillar Two Top-Up Tax Liability:</span>
                  <span
                    className={`font-bold px-2 py-0.5 border ${topUpTaxRate > 0
                        ? "bg-red-500/20 border-red-500/40 text-red-300"
                        : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      }`}
                  >
                    {topUpTaxRate > 0 ? `+${topUpTaxRate.toFixed(1)}% Top-Up Due` : "0.0% (Safe)"}
                  </span>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  {topUpTaxRate > 0
                    ? `Because your UAE ETR (${localEtr.toFixed(1)}%) is below 15%, the parent jurisdiction will collect a ${topUpTaxRate.toFixed(1)}% Top-Up Tax via the Income Inclusion Rule (IIR) unless QDMTT is utilized.`
                    : "Your local ETR satisfies the 15% GloBE minimum. No additional Top-Up Tax under OECD rules."}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 text-xs text-white/80 space-y-1">
              <span className="font-bold text-emerald-400 block font-mono">OUT OF SCOPE FOR PILLAR TWO</span>
              <p className="text-[11px] text-white/70">
                Groups with consolidated revenues below EUR 750M are exempt from GloBE top-up taxes and transitional CbCR safe-harbor filings.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
