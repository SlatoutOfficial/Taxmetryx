"use client";

import React, { useState } from "react";
import { ShieldAlert, Scale, Clock, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";

interface ControversyStage {
  step: string;
  name: string;
  forum: string;
  statutoryLimit: string;
  riskLevel: string;
  depositRequirement: string;
  strategy: string;
}

const DISPUTE_STAGES: ControversyStage[] = [
  {
    step: "1",
    name: "Tax Assessment Notification (TAN)",
    forum: "FTA Audit Division",
    statutoryLimit: "Immediate Notification",
    riskLevel: "Initial Exposure",
    depositRequirement: "No initial deposit required",
    strategy: "Immediate forensic audit of auditor calculation worksheets, factual discrepancies, and evidence exclusion grounds.",
  },
  {
    step: "2",
    name: "Statutory Reconsideration Request",
    forum: "FTA Legal Affairs Department",
    statutoryLimit: "Strict 40 Business Days (Non-Negotiable)",
    riskLevel: "Critical Deadline",
    depositRequirement: "No judicial deposit required",
    strategy: "Draft comprehensive legal memorial citing UAE Federal Tax Procedures Law (Decree-Law No. 28/2022) with contemporary evidentiary exhibits.",
  },
  {
    step: "3",
    name: "TDRC Judicial Appeal",
    forum: "Tax Disputes Resolution Committee (Ministry of Justice)",
    statutoryLimit: "30 Calendar Days from Reconsideration Decision",
    riskLevel: "Tribunal Adjudication",
    depositRequirement: "Full tax & 50% penalty deposit or explicit exemption request",
    strategy: "Independent judicial committee chaired by certified judges. Oral presentation and expert witness testimony on accounting reality.",
  },
  {
    step: "4",
    name: "Federal Court of Appeal & Cassation",
    forum: "UAE Federal Judiciary (Court of Appeal & Supreme Court)",
    statutoryLimit: "30 Calendar Days from TDRC Ruling (Disputes > AED 100k)",
    riskLevel: "Final Judicial Resolution",
    depositRequirement: "Statutory court filing fees and security",
    strategy: "Constitutional and treaty statutory defense coordinated with licensed UAE Supreme Court litigation advocates.",
  },
];

export default function RegulatoryControversyWidget() {
  const [selectedStage, setSelectedStage] = useState<ControversyStage>(DISPUTE_STAGES[1]);
  const [disputedAmount, setDisputedAmount] = useState<number>(3500000);
  const [penaltyShare, setPenaltyShare] = useState<number>(40); // 40% penalties

  // Calculate potential Cabinet Res 49 waiver
  const penaltyAmount = (disputedAmount * penaltyShare) / 100;
  const potentialWaiver = penaltyAmount * 0.7; // 70% relief

  return (
    <div className="bg-[#171412] text-white border border-[#D62828]/30 shadow-2xl p-6 sm:p-8 rounded-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#D62828] rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#D62828]">
            Federal Decree-Law No. 28 of 2022 (Tax Procedures)
          </span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
          40-Day Statutory Controversy &amp; TDRC Defense Roadmap
        </h3>
        <p className="text-xs text-white/70 max-w-2xl mt-1">
          Navigate the four sequential levels of UAE tax controversy, enforce mandatory statutory timeframes, and model penalty relief under Cabinet Resolution No. 49.
        </p>
      </div>

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 4-Stage Dispute Pipeline */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80 block">
            Statutory Escalation Pipeline:
          </span>

          <div className="space-y-2.5">
            {DISPUTE_STAGES.map((st) => (
              <div
                key={st.step}
                onClick={() => setSelectedStage(st)}
                className={`p-4 border cursor-pointer transition-all ${selectedStage.step === st.step
                    ? "bg-white/[0.08] border-[#D62828] shadow-md"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#D62828]">{st.step}</span>
                    <h4 className="font-editorial text-base text-white">{st.name}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 border border-white/20 text-white/70">
                    {st.forum}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-white/60 mt-2">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Clock className="w-3.5 h-3.5" /> {st.statutoryLimit}
                  </span>
                  <span className="text-red-400">{st.riskLevel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Stage Dossier Card */}
          <div className="p-5 bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#D62828] uppercase">
                Stage {selectedStage.step} Defense Protocol
              </span>
              <span className="text-[10px] font-mono text-white/50">{selectedStage.depositRequirement}</span>
            </div>
            <p className="text-xs text-white/90 leading-relaxed font-sans">
              {selectedStage.strategy}
            </p>
          </div>
        </div>

        {/* Right: Penalty Relief Estimator */}
        <div className="lg:col-span-5 p-6 border bg-white/[0.03] space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-[#D62828] flex items-center gap-1.5">
            <Scale className="w-4 h-4" /> Cabinet Resolution No. 49 Relief Model
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-white/70 block mb-1">Disputed Tax Assessment (AED):</label>
              <input
                type="number"
                value={disputedAmount}
                onChange={(e) => setDisputedAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-black/40 border border-white/20 px-3 py-2 text-white font-mono text-xs focus:border-[#D62828] outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-white/70 mb-1">
                <span>Administrative Penalty Exposure (%):</span>
                <span className="text-red-400 font-bold">{penaltyShare}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={penaltyShare}
                onChange={(e) => setPenaltyShare(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D62828]"
              />
            </div>

            <div className="p-4 border bg-black/40 space-y-2">
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/60">Estimated Penalty Levy:</span>
                <span className="text-red-400 font-bold">AED {penaltyAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/10">
                <span className="text-white/60">Potential 70% Statutory Waiver:</span>
                <span className="text-emerald-400 font-bold">AED {potentialWaiver.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-white/60">Estimated Net Savings:</span>
                <span className="text-[#D62828] font-bold">AED {potentialWaiver.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[11px] text-white/60 leading-relaxed italic font-sans">
              *Under Cabinet Decision No. 49 of 2021, qualifying taxpayers can secure up to 70% reduction in administrative penalties upon timely settlement of principal tax.
            </p>

            <div className="pt-2 text-[11px] text-white/80 flex items-center gap-2 border-t border-white/10">
              <ShieldAlert className="w-4 h-4 text-[#D62828] shrink-0" />
              <span>Taxmetryx has successfully defended over AED 120M in disputed FTA assessments.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
