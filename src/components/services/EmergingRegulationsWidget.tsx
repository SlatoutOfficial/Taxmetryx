"use client";

import React, { useState } from "react";
import { Cpu, ShieldCheck, AlertOctagon, CheckCircle2, FileCheck, Layers } from "lucide-react";

interface RelevantActivity {
  id: string;
  name: string;
  category: string;
  mandatoryCiga: string[];
  boardRequirement: string;
  penaltyExposure: string;
  exchangeRisk: string;
}

const ACTIVITIES: RelevantActivity[] = [
  {
    id: "holding",
    name: "Pure Holding Company Business",
    category: "ESR Relevant Activity",
    mandatoryCiga: [
      "Submit annual Economic Substance Notification to Ministry of Finance",
      "Comply with UAE commercial company laws and license renewal",
      "Maintain adequate personnel and premises (reduced substance standard)",
    ],
    boardRequirement: "At least 1 resident director or active corporate secretary in UAE",
    penaltyExposure: "AED 50,000 for failure to file ESR report",
    exchangeRisk: "Spontaneous exchange of corporate info with parent jurisdiction tax authorities.",
  },
  {
    id: "ip",
    name: "High-Risk Intellectual Property (IP) Business",
    category: "High Scrutiny ESR Activity",
    mandatoryCiga: [
      "Conduct R&D and strategic IP management on UAE soil",
      "Direct supervision of marketing, branding, and distribution channels",
      "Rebuttable presumption of NON-compliance applies automatically",
    ],
    boardRequirement: "Physical board meetings with strategic decisions taken inside the UAE",
    penaltyExposure: "AED 400,000 + License suspension on second-year failure",
    exchangeRisk: "Mandatory automatic treaty exchange under OECD BEPS Action 5.",
  },
  {
    id: "hq",
    name: "Headquarters & Management Center",
    category: "ESR Relevant Activity",
    mandatoryCiga: [
      "Taking relevant management decisions for foreign group entities",
      "Incurring operating expenditure on behalf of connected group affiliates",
      "Coordinating group-wide activities and commercial strategy",
    ],
    boardRequirement: "Majority of directors physically present in UAE during strategic votes",
    penaltyExposure: "AED 50,000 to AED 400,000 escalation",
    exchangeRisk: "Subject to direct review by UAE National Assessing Authority (FTA).",
  },
  {
    id: "crypto",
    name: "Virtual Asset Service Provider (VARA / ADGM CARF)",
    category: "Digital Assets & Next-Gen Tax",
    mandatoryCiga: [
      "Crypto-Asset Reporting Framework (CARF) customer due diligence",
      "Automated tax information exchange with OECD jurisdictions",
      "On-chain transaction tax classification (Staking, Mining, Airdrops)",
    ],
    boardRequirement: "Local compliance officer and licensed key persons in UAE",
    penaltyExposure: "Regulatory sanctions + commercial license revocation",
    exchangeRisk: "Global automatic exchange via OECD CARF XML protocol.",
  },
];

export default function EmergingRegulationsWidget() {
  const [selectedActivity, setSelectedActivity] = useState<RelevantActivity>(ACTIVITIES[0]);
  const [residentDirectors, setResidentDirectors] = useState<boolean>(true);
  const [physicalBoardMeetings, setPhysicalBoardMeetings] = useState<boolean>(true);
  const [localOpex, setLocalOpex] = useState<boolean>(true);

  const substanceScore =
    (residentDirectors ? 35 : 0) + (physicalBoardMeetings ? 35 : 0) + (localOpex ? 30 : 0);

  const isFullyCompliant = substanceScore === 100;

  return (
    <div className="bg-[#0B0F19] text-white border border-[#8B5CF6]/30 shadow-2xl p-6 sm:p-8 rounded-none">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#8B5CF6]">
            Cabinet Resolution No. 57 / OECD CARF &amp; CbCR Matrix
          </span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl text-white mt-1">
          Economic Substance (ESR) &amp; CARF Readiness Scanner
        </h3>
        <p className="text-xs text-white/70 max-w-2xl mt-1">
          Evaluate Core Income Generating Activities (CIGA), physical board presence on UAE soil, and digital asset tax reporting under Ministry of Finance mandates.
        </p>
      </div>

      <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Activity Selection */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80 block">
            Select Regulatory Perimeter Activity:
          </span>

          <div className="space-y-2.5">
            {ACTIVITIES.map((act) => (
              <div
                key={act.id}
                onClick={() => setSelectedActivity(act)}
                className={`p-3.5 border cursor-pointer transition-all ${selectedActivity.id === act.id
                    ? "bg-white/[0.08] border-[#8B5CF6] shadow-sm"
                    : "bg-white/[0.02] border-white/10 hover:bg-white/[0.05]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8B5CF6] uppercase tracking-wider">
                    {act.category}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    {selectedActivity.id === act.id ? "ACTIVE" : "SELECT"}
                  </span>
                </div>
                <h4 className="font-editorial text-base text-white mt-1">{act.name}</h4>
              </div>
            ))}
          </div>

          {/* Mandatory CIGA requirements list */}
          <div className="p-4 bg-white/[0.03] border border-white/10 space-y-2.5">
            <span className="text-xs font-mono font-bold text-[#8B5CF6] uppercase block">
              Mandatory CIGA on UAE Soil:
            </span>
            <ul className="text-xs text-white/80 space-y-1.5 font-sans">
              {selectedActivity.mandatoryCiga.map((ciga, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#8B5CF6] mt-0.5">•</span>
                  <span>{ciga}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Substance Audit Scorecard */}
        <div className="lg:col-span-6 p-6 border bg-black/40 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono uppercase text-white/50">Substance Verification</span>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 border ${isFullyCompliant
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-red-500/20 border-red-500/40 text-red-300"
                }`}
            >
              Score: {substanceScore}/100
            </span>
          </div>

          {/* Toggle Switches */}
          <div className="space-y-3">
            {[
              {
                state: residentDirectors,
                setter: setResidentDirectors,
                label: "Resident Directors / Key Personnel in UAE",
                sub: selectedActivity.boardRequirement,
              },
              {
                state: physicalBoardMeetings,
                setter: setPhysicalBoardMeetings,
                label: "Physical Board Meetings Convened in UAE",
                sub: "Quorum physically present inside UAE during strategic resolutions.",
              },
              {
                state: localOpex,
                setter: setLocalOpex,
                label: "Adequate Local Operating Expenditure (OPEX)",
                sub: "Proportionate operating spend incurred in UAE relative to activity level.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => item.setter(!item.state)}
                className={`p-3 border cursor-pointer flex items-center justify-between gap-3 transition-all ${item.state
                    ? "bg-white/[0.04] border-[#8B5CF6]/50"
                    : "bg-red-950/20 border-red-500/30"
                  }`}
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold flex items-center gap-2 text-white">
                    <span className={item.state ? "text-[#8B5CF6]" : "text-red-400"}>
                      {item.state ? "✓" : "✕"}
                    </span>
                    {item.label}
                  </div>
                  <p className="text-[10px] text-white/50 font-sans">{item.sub}</p>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 border shrink-0 ${item.state
                      ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/40 text-[#8B5CF6]"
                      : "bg-red-500/20 border-red-500/40 text-red-400"
                    }`}
                >
                  {item.state ? "MET" : "DEFICIT"}
                </span>
              </div>
            ))}
          </div>

          {/* Status Alert */}
          {isFullyCompliant ? (
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                ECONOMIC SUBSTANCE TEST (EST) SATISFIED
              </div>
              <p className="text-[11px] text-white/70 font-sans">
                Full compliance with Ministry of Finance ESR directives. Zero penalty exposure and treaty exchange risk mitigated.
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-950/30 border border-red-500/50 space-y-1.5">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                SUBSTANCE GAP DETECTED
              </div>
              <p className="text-[11px] text-white/70 font-sans leading-relaxed">
                Risk Penalty: {selectedActivity.penaltyExposure}. {selectedActivity.exchangeRisk}
              </p>
            </div>
          )}

          <div className="pt-1 text-[11px] text-white/50 flex items-center gap-1.5 italic">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
            Taxmetryx drafts statutory ESR dossiers and manages Ministry of Finance portal submissions.
          </div>
        </div>
      </div>
    </div>
  );
}
