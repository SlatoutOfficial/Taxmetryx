"use client";

import React, { useState } from "react";
import { ShieldCheck, AlertOctagon, CheckCircle2, Calculator, Info } from "lucide-react";

export default function CorporateTaxWidget() {
  const [nonQualifyingRevenue, setNonQualifyingRevenue] = useState<number>(1800000);
  const [totalRevenue, setTotalRevenue] = useState<number>(50000000);

  // 5 Statutory tests state
  const [tests, setTests] = useState({
    substance: true,
    qualifyingIncome: true,
    armLength: true,
    auditedAccounts: true,
  });

  const toggleTest = (key: keyof typeof tests) => {
    setTests((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // De Minimis calculation
  const deMinimisPercentage = totalRevenue > 0 ? (nonQualifyingRevenue / totalRevenue) * 100 : 0;
  const deMinimisCapAED = 5000000;
  const deMinimis5PercentCap = totalRevenue * 0.05;
  const applicableThreshold = Math.min(deMinimis5PercentCap, deMinimisCapAED);
  const deMinimisPassed = nonQualifyingRevenue <= applicableThreshold;

  const allStatutoryTestsPassed =
    tests.substance &&
    tests.qualifyingIncome &&
    tests.armLength &&
    tests.auditedAccounts &&
    deMinimisPassed;

  return (
    <div className="bg-[#071E22] text-white border border-[#10B981]/30 shadow-2xl p-6 sm:p-8 rounded-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#10B981] rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#10B981]">
            Cabinet Decision No. 139 / Ministerial Decision No. 265
          </span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
          UAE Qualifying Free Zone Person (QFZP) Diagnostic
        </h3>
        <p className="text-xs text-white/70 max-w-2xl mt-1">
          Evaluate whether your UAE Free Zone entity qualifies for the 0% headline rate or is exposed to the standard 9% corporate tax regime and 5-year disqualification penalty.
        </p>
      </div>

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5 Statutory Requirements */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> 1. Statutory Substance &amp; Legal Pre-conditions
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: "substance",
                label: "Adequate Substance in UAE Free Zone",
                sub: "Adequate physical assets, qualified employees, and operating expenditure incurred in the Free Zone.",
              },
              {
                id: "qualifyingIncome",
                label: "Derives Qualifying Income from Eligible Activities",
                sub: "Transactions with Free Zone persons or manufacturing, logistics, treasury, and holding activities.",
              },
              {
                id: "armLength",
                label: "Complies with Transfer Pricing & Arm's Length",
                sub: "Maintains required local files, master files, and FAR substantiation under Article 34.",
              },
              {
                id: "auditedAccounts",
                label: "Prepares Audited Financial Statements (IFRS)",
                sub: "Statutory requirement under Article 18(1)(d) regardless of turnover volume.",
              },
            ].map((item) => {
              const active = tests[item.id as keyof typeof tests];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleTest(item.id as keyof typeof tests)}
                  className={`p-3.5 border transition-all cursor-pointer flex items-start justify-between gap-3 ${active
                      ? "bg-white/[0.04] border-[#10B981]/50 text-white"
                      : "bg-red-950/20 border-red-500/40 text-white/70"
                    }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold flex items-center gap-2">
                      <span className={active ? "text-[#10B981]" : "text-red-400"}>
                        {active ? "✓" : "✕"}
                      </span>
                      {item.label}
                    </div>
                    <p className="text-[11px] text-white/60 leading-normal">{item.sub}</p>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 border shrink-0 ${active
                        ? "bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981]"
                        : "bg-red-500/20 border-red-500/40 text-red-300"
                      }`}
                  >
                    {active ? "COMPLIANT" : "BREACH"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Interactive De Minimis Calculator */}
          <div className="p-4 bg-white/[0.03] border border-white/10 space-y-3 mt-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/90 font-semibold flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-[#10B981]" /> 2. De Minimis Rule (Art. 18(1)(e))
              </span>
              <span className="text-white/50 text-[11px]">Threshold: Lower of 5% or AED 5,000,000</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <label className="text-white/70 block mb-1">Non-Qualifying Revenue (AED):</label>
                <input
                  type="number"
                  value={nonQualifyingRevenue}
                  onChange={(e) => setNonQualifyingRevenue(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-black/40 border border-white/20 px-3 py-1.5 text-white font-mono text-xs focus:border-[#10B981] outline-none"
                />
              </div>
              <div>
                <label className="text-white/70 block mb-1">Total Revenue (AED):</label>
                <input
                  type="number"
                  value={totalRevenue}
                  onChange={(e) => setTotalRevenue(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-black/40 border border-white/20 px-3 py-1.5 text-white font-mono text-xs focus:border-[#10B981] outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] font-mono border-t border-white/10">
              <span className="text-white/60">Calculated De Minimis Ratio:</span>
              <span
                className={`font-bold px-2 py-0.5 border ${deMinimisPassed
                    ? "bg-[#10B981]/20 border-[#10B981]/40 text-[#10B981]"
                    : "bg-red-500/20 border-red-500/40 text-red-400"
                  }`}
              >
                {deMinimisPercentage.toFixed(2)}% (Cap: {(applicableThreshold / 1000000).toFixed(1)}M AED)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Status & Verdict Card */}
        <div className="lg:col-span-5 p-6 border bg-white/[0.04] space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white/60">
            Statutory Tax Classification
          </div>

          {allStatutoryTestsPassed ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/40 border border-[#10B981] space-y-2">
                <div className="flex items-center gap-2 text-[#10B981] font-mono text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  0% QUALIFYING FREE ZONE PERSON
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Your entity qualifies as a QFZP under Cabinet Decision No. 139/2023. Qualifying income is taxed at 0%, preserving full corporate tax exemption.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-white/80">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Qualifying Tax Rate:</span>
                  <span className="text-[#10B981] font-bold">0.0%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Non-Qualifying Tax Rate:</span>
                  <span className="text-white font-bold">9.0%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>5-Year Taint Penalty Risk:</span>
                  <span className="text-[#10B981] font-bold">Protected (0%)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-950/40 border border-red-500 space-y-2">
                <div className="flex items-center gap-2 text-red-400 font-mono text-sm font-bold">
                  <AlertOctagon className="w-5 h-5 shrink-0" />
                  TAINTED: 9% STANDARD TAX APPLIES
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Breach detected! Failure to satisfy all 5 criteria forfeits 0% status. Under Article 18, the entity loses QFZP status for the entire tax period and subsequent 4 tax periods.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-white/80">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Entity Tax Rate:</span>
                  <span className="text-red-400 font-bold">9.0% on ALL Income</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span>Disqualification Period:</span>
                  <span className="text-red-400 font-bold">Current + Next 4 Years</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 text-[11px] text-white/60 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
            <span>
              Taxmetryx provides statutory QFZP health-checks and restructuring relief filings under Articles 27 &amp; 28.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
