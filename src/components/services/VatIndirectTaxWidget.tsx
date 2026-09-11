"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, AlertTriangle, FileCheck, Layers } from "lucide-react";

interface VatScenario {
  id: string;
  title: string;
  category: string;
  taxRate: string;
  rateColor: string;
  form201Box: string;
  legalBasis: string;
  evidentiaryRule: string;
  auditRisk: string;
}

const VAT_SCENARIOS: VatScenario[] = [
  {
    id: "export-services",
    title: "Export of Services to Non-Resident Customer",
    category: "Cross-Border Services",
    taxRate: "0% Zero-Rated",
    rateColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
    form201Box: "Box 4 (Zero-Rated Supplies)",
    legalBasis: "Executive Regulations Article 31(1)",
    evidentiaryRule: "Recipient must have no fixed place of residence or branch in UAE related to supply.",
    auditRisk: "CRITICAL: FTA routinely challenges 0% if foreign customer has a UAE affiliate or liaison office.",
  },
  {
    id: "designated-zone-goods",
    title: "Supply of Goods Within a UAE Designated Zone",
    category: "Designated Zone Transactions",
    taxRate: "Out of Scope (0%)",
    rateColor: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40",
    form201Box: "Box 14 (Supplies Out of Scope / Suspended)",
    legalBasis: "Executive Regulations Article 51",
    evidentiaryRule: "Goods must physically remain within the fenced customs-controlled perimeter.",
    auditRisk: "HIGH: If goods are consumed or used internally in the DZ, 5% standard rate applies retroactively.",
  },
  {
    id: "import-rcm",
    title: "Import of Cross-Border Services (Reverse Charge)",
    category: "Reverse Charge Mechanism (RCM)",
    taxRate: "5% Reverse Charge (Self-Accounted)",
    rateColor: "text-amber-300 border-amber-500/40 bg-amber-950/40",
    form201Box: "Box 3 (Supplies Subject to Reverse Charge) & Box 10 (Input Tax)",
    legalBasis: "Federal Decree-Law No. 8 of 2017 Article 48",
    evidentiaryRule: "Foreign invoice, proof of payment, and proof of receipt of services by registered entity.",
    auditRisk: "MODERATE: Omission in Box 3 triggers administrative penalties even if net tax payable is zero.",
  },
  {
    id: "commercial-property",
    title: "Commercial Property Lease or Secondary Sale",
    category: "Real Estate & Construction",
    taxRate: "5% Standard Rated",
    rateColor: "text-rose-400 border-rose-500/40 bg-rose-950/40",
    form201Box: "Box 1 (Standard Rated Supplies)",
    legalBasis: "Executive Regulations Article 38",
    evidentiaryRule: "Tax invoice with Ejari contract and FTA compliant TRN disclosure.",
    auditRisk: "HIGH: Misclassifying commercial units as residential creates substantial back-taxes and late-payment fees.",
  },
];

export default function VatIndirectTaxWidget() {
  const [selectedScenario, setSelectedScenario] = useState<VatScenario>(VAT_SCENARIOS[0]);

  return (
    <div className="bg-[#1C1D21] text-white border border-[#E63946]/30 shadow-2xl p-6 sm:p-8 rounded-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#E63946] rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#E63946]">
            Federal Decree-Law No. 8 &amp; Cabinet Decision No. 52
          </span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
          Supply Chain &amp; Designated Zone VAT Flowchart
        </h3>
        <p className="text-xs text-white/70 max-w-2xl mt-1">
          Validate the legal treatment, statutory tax rate, and mandatory evidentiary documentation for complex UAE and GCC indirect tax transactions.
        </p>
      </div>

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Transaction Scenario Selector */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80 block">
            Select Commercial Supply Chain Scenario:
          </span>

          <div className="space-y-2.5">
            {VAT_SCENARIOS.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => setSelectedScenario(scenario)}
                className={`p-3.5 border cursor-pointer transition-all ${selectedScenario.id === scenario.id
                    ? "bg-white/[0.08] border-[#E63946] shadow-sm"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-[#E63946] tracking-wider">
                    {scenario.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 border ${scenario.rateColor}`}>
                    {scenario.taxRate}
                  </span>
                </div>
                <h4 className="font-editorial text-base text-white mt-1">{scenario.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Statutory Evidentiary & Filing Output */}
        <div className="lg:col-span-6 p-6 border bg-black/40 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-white/50">Statutory Tax Treatment</span>
              <h4 className="font-editorial text-xl text-white">{selectedScenario.title}</h4>
            </div>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 border ${selectedScenario.rateColor}`}>
              {selectedScenario.taxRate}
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Statutory Legal Article:</span>
              <span className="text-white font-bold">{selectedScenario.legalBasis}</span>
            </div>

            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/60">Form 201 VAT Return Box:</span>
              <span className="text-[#E63946] font-bold">{selectedScenario.form201Box}</span>
            </div>

            <div className="space-y-1 py-1">
              <span className="text-white/60 block">Evidentiary Requirement:</span>
              <p className="text-xs text-white/90 font-sans leading-relaxed">
                {selectedScenario.evidentiaryRule}
              </p>
            </div>
          </div>

          <div className="p-4 bg-red-950/30 border border-[#E63946]/40 space-y-1.5">
            <div className="flex items-center gap-2 text-[#E63946] text-xs font-mono font-bold uppercase">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              FTA Audit Defense Focus
            </div>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              {selectedScenario.auditRisk}
            </p>
          </div>

          <div className="pt-2 text-[11px] text-white/50 flex items-center gap-1.5 italic">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            Taxmetryx drafts formal Technical Position Papers and Voluntary Disclosures (Form 211).
          </div>
        </div>
      </div>
    </div>
  );
}
