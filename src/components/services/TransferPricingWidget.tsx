"use client";

import React, { useState } from "react";
import { Sliders, ShieldCheck, AlertTriangle, CheckCircle2, TrendingUp, HelpCircle, Layers } from "lucide-react";

export default function TransferPricingWidget() {
  const [testedMargin, setTestedMargin] = useState<number>(6.5);
  const [activeTab, setActiveTab] = useState<"calculator" | "far">("calculator");

  // Interquartile benchmarks from peer group (Moody's / TP Catalyst)
  const min = 2.1;
  const q1 = 4.2;
  const median = 6.8;
  const q3 = 8.9;
  const max = 13.5;

  const isBelowQ1 = testedMargin < q1;
  const isAboveQ3 = testedMargin > q3;
  const isCompliant = !isBelowQ1 && !isAboveQ3;

  return (
    <div className="bg-[#0B1124] text-white border border-[#D4AF37]/30 shadow-2xl p-6 sm:p-8 rounded-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
              OECD BEPS Action 13 & FTA Article 34
            </span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
            Arm&apos;s Length Interquartile Benchmark Simulator
          </h3>
          <p className="text-xs text-white/70 max-w-xl mt-1">
            Simulate your tested party&apos;s Transactional Net Margin Method (TNMM) operating margin against defensible EMEA/GCC comparable data sets.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 self-start sm:self-center">
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-3 py-1.5 text-xs font-mono transition-all ${activeTab === "calculator"
                ? "bg-[#D4AF37] text-black font-semibold shadow-xs"
                : "text-white/70 hover:text-white"
              }`}
          >
            TNMM Range
          </button>
          <button
            onClick={() => setActiveTab("far")}
            className={`px-3 py-1.5 text-xs font-mono transition-all ${activeTab === "far"
                ? "bg-[#D4AF37] text-black font-semibold shadow-xs"
                : "text-white/70 hover:text-white"
              }`}
          >
            FAR Matrix
          </button>
        </div>
      </div>

      {activeTab === "calculator" ? (
        <div className="pt-6 space-y-8">
          {/* Slider & Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/80">Tested Entity Operating Margin (OM %):</span>
                <span className="text-xl font-bold font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 border border-[#D4AF37]/30">
                  {testedMargin.toFixed(1)}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="15"
                step="0.1"
                value={testedMargin}
                onChange={(e) => setTestedMargin(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
              />

              <div className="flex justify-between text-[11px] font-mono text-white/50">
                <span>0.0% (Loss / Breakeven)</span>
                <span>Median: 6.8%</span>
                <span>15.0% (Premium Return)</span>
              </div>
            </div>

            {/* Verdict Box */}
            <div className="lg:col-span-5 p-5 border bg-white/[0.03] transition-all duration-300">
              {isCompliant ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    Arm&apos;s Length Compliant
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Operating margin of {testedMargin.toFixed(1)}% falls inside the defensible interquartile range (4.2% - 8.9%). Lowest probability of FTA transfer pricing audit adjustment.
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-emerald-400/90 border-t border-white/10 flex items-center justify-between">
                    <span>Audit Exposure: Negligible</span>
                    <span>Safe Harbor Margin: Valid</span>
                  </div>
                </div>
              ) : isBelowQ1 ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#D9383A] font-mono text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Audit Exposure: Below Range
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Margin ({testedMargin.toFixed(1)}%) is below Lower Quartile (4.2%). The FTA may impute taxable profit up to the median (6.8%), creating tax liability and penalties.
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-[#D9383A] border-t border-white/10 flex items-center justify-between">
                    <span>Potential Tax Base Adjustment: +{(median - testedMargin).toFixed(1)}%</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    Super-Normal Return: Above Range
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">
                    Margin ({testedMargin.toFixed(1)}%) exceeds Upper Quartile (8.9%). Requires DEMPE proof for intangible development or valuable entrepreneurial IP nexus on UAE soil.
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-amber-400/90 border-t border-white/10 flex items-center justify-between">
                    <span>DEMPE Documentation: Mandatory</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visual Benchmark Distribution Bar */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/70">Empirical Comparable Range (Orbis / Moody&apos;s Set)</span>
              <span className="text-[#D4AF37]">Interquartile Range: 4.2% - 8.9%</span>
            </div>

            <div className="relative h-10 bg-white/10 border border-white/20 flex items-center overflow-hidden">
              {/* Min to Q1 (Risk Zone) */}
              <div
                style={{ width: `${(q1 / 15) * 100}%` }}
                className="h-full bg-red-950/40 border-r border-red-500/50 flex items-center justify-center text-[10px] font-mono text-red-300"
              >
                Min {min}%
              </div>

              {/* Interquartile Defensible Zone (Q1 to Q3) */}
              <div
                style={{ width: `${((q3 - q1) / 15) * 100}%` }}
                className="h-full bg-[#D4AF37]/20 border-r border-[#D4AF37]/50 relative flex items-center justify-center text-[11px] font-mono font-bold text-[#D4AF37]"
              >
                <span>Defensible Arm&apos;s Length Zone</span>

                {/* Median marker */}
                <div
                  style={{
                    left: `${((median - q1) / (q3 - q1)) * 100}%`,
                  }}
                  className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]"
                />
              </div>

              {/* Q3 to Max */}
              <div
                style={{ width: `${((15 - q3) / 15) * 100}%` }}
                className="h-full bg-amber-950/30 flex items-center justify-center text-[10px] font-mono text-amber-300"
              >
                Max {max}%
              </div>

              {/* Dynamic Tested Party Pointer */}
              <div
                style={{
                  left: `clamp(2%, ${(testedMargin / 15) * 100}%, 98%)`,
                }}
                className="absolute top-0 bottom-0 -ml-1.5 w-3 bg-white border border-black shadow-[0_0_12px_#ffffff] z-10 transition-all duration-150 flex items-center justify-center"
              >
                <div className="w-1 h-3 bg-[#0B1124]" />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-white/60 pt-1">
              <span>Min: {min}%</span>
              <span className="text-emerald-400 font-bold">Lower Quartile Q1: {q1}%</span>
              <span className="text-[#D4AF37] font-bold">Median (50th): {median}%</span>
              <span className="text-emerald-400 font-bold">Upper Quartile Q3: {q3}%</span>
              <span>Max: {max}%</span>
            </div>
          </div>
        </div>
      ) : (
        /* FAR Matrix Tab */
        <div className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/[0.04] border border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> 1. Functions (FAR)
              </div>
              <ul className="text-xs text-white/80 space-y-1.5 font-sans">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Strategic management & governance
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> DEMPE activities for intangibles
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Procurement & treasury pooling
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white/[0.04] border border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> 2. Assets Deployed
              </div>
              <ul className="text-xs text-white/80 space-y-1.5 font-sans">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Intellectual property / patents
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Proprietary software / algorithms
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Working capital & financial guarantees
                </li>
              </ul>
            </div>

            <div className="p-4 bg-white/[0.04] border border-white/10 space-y-2">
              <div className="text-xs font-mono font-bold text-[#D4AF37] uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 3. Risks Assumed
              </div>
              <ul className="text-xs text-white/80 space-y-1.5 font-sans">
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Market & commercial price volatility
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Counterparty credit & default risk
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-emerald-400">✓</span> Foreign currency / FX fluctuations
                </li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-white/60 italic pt-2">
            Taxmetryx conducts empirical FAR benchmarking studies across Moody&apos;s and TP Catalyst databases to insulate your intercompany pricing from FTA adjustments.
          </p>
        </div>
      )}
    </div>
  );
}
