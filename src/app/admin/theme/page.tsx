"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Type,
  Save,
  RotateCcw,
  Sparkles,
  Check,
  Eye,
  ExternalLink,
} from "lucide-react";
import { TypographyConfig } from "@/lib/json";

const HEADING_FONT_OPTIONS = [
  { label: "Montserrat (Taxmetryx Standard)", value: "Montserrat" },
  { label: "DM Serif Display (Taxmetryx Classic)", value: "DM Serif Display" },
  { label: "Playfair Display (Prestige Editorial)", value: "Playfair Display" },
  { label: "Cormorant Garamond (High Luxury Heritage)", value: "Cormorant Garamond" },
  { label: "Bodoni Moda (Architectural Luxury)", value: "Bodoni Moda" },
  { label: "Prata (Bespoke Editorial Serif)", value: "Prata" },
  { label: "Cinzel (Monolithic Authority)", value: "Cinzel" },
  { label: "Merriweather (Academic Authority)", value: "Merriweather" },
  { label: "Inter (Pure Swiss Sans)", value: "Inter" },
  { label: "Plus Jakarta Sans (Modern Corporate)", value: "Plus Jakarta Sans" },
  { label: "Outfit (Geometric Precision)", value: "Outfit" },
  { label: "Syne (Avant-Garde Architectural)", value: "Syne" },
  { label: "Custom Google Font...", value: "__custom__" },
];

const BODY_FONT_OPTIONS = [
  { label: "Montserrat (Taxmetryx Standard)", value: "Montserrat" },
  { label: "Inter (High-Legibility Swiss Sans)", value: "Inter" },
  { label: "Plus Jakarta Sans (Contemporary Corporate)", value: "Plus Jakarta Sans" },
  { label: "Outfit (Clean Geometric Sans)", value: "Outfit" },
  { label: "DM Sans (Modern Balanced Sans)", value: "DM Sans" },
  { label: "Roboto (Universal Neutral Sans)", value: "Roboto" },
  { label: "Space Grotesk (Technical Precision)", value: "Space Grotesk" },
  { label: "Custom Google Font...", value: "__custom__" },
];

const CURATED_PAIRINGS = [
  {
    name: "Montserrat Unified (Taxmetryx Standard)",
    desc: "Unified clean modern geometric aesthetic across all headings and text",
    heading: "Montserrat",
    body: "Montserrat",
  },
  {
    name: "Classic Editorial",
    desc: "Heritage corporate prestige with high readability",
    heading: "DM Serif Display",
    body: "Inter",
  },
  {
    name: "Prestige Sovereign",
    desc: "Refined luxury serif paired with contemporary geometric sans",
    heading: "Playfair Display",
    body: "Plus Jakarta Sans",
  },
  {
    name: "Architectural Modernist",
    desc: "Clean high-contrast serif with technical modern typography",
    heading: "Bodoni Moda",
    body: "Inter",
  },
  {
    name: "Pure Swiss Corporate",
    desc: "Ultra-clean, crisp modernist corporate sans across all sections",
    heading: "Inter",
    body: "Inter",
  },
];

const DEFAULT_TYPOGRAPHY: TypographyConfig = {
  fontHeading: "Montserrat",
  fontBody: "Montserrat",
};

export default function AdminTypographyPage() {
  const [config, setConfig] = useState<TypographyConfig>(DEFAULT_TYPOGRAPHY);
  const [customHeadingInput, setCustomHeadingInput] = useState("");
  const [customBodyInput, setCustomBodyInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load from API
  useEffect(() => {
    fetch("/api/admin/typography")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const cfg = data.data;
          setConfig(cfg);
          const isKnownHeading = HEADING_FONT_OPTIONS.some((o) => o.value === cfg.fontHeading);
          if (!isKnownHeading) setCustomHeadingInput(cfg.fontHeading);

          const isKnownBody = BODY_FONT_OPTIONS.some((o) => o.value === cfg.fontBody);
          if (!isKnownBody) setCustomBodyInput(cfg.fontBody);
        }
      })
      .catch(() => {
        toast.error("Failed to load typography settings.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleHeadingSelect = (val: string) => {
    if (val === "__custom__") {
      if (customHeadingInput.trim()) {
        setConfig({ ...config, fontHeading: customHeadingInput.trim() });
      }
    } else {
      setConfig({ ...config, fontHeading: val });
    }
  };

  const handleCustomHeadingBlur = () => {
    if (customHeadingInput.trim()) {
      setConfig({ ...config, fontHeading: customHeadingInput.trim() });
    }
  };

  const handleBodySelect = (val: string) => {
    if (val === "__custom__") {
      if (customBodyInput.trim()) {
        setConfig({ ...config, fontBody: customBodyInput.trim() });
      }
    } else {
      setConfig({ ...config, fontBody: val });
    }
  };

  const handleCustomBodyBlur = () => {
    if (customBodyInput.trim()) {
      setConfig({ ...config, fontBody: customBodyInput.trim() });
    }
  };

  const applyPairing = (heading: string, body: string) => {
    setConfig({ fontHeading: heading, fontBody: body });
    const isKnownHeading = HEADING_FONT_OPTIONS.some((o) => o.value === heading);
    if (!isKnownHeading) setCustomHeadingInput(heading);
    const isKnownBody = BODY_FONT_OPTIONS.some((o) => o.value === body);
    if (!isKnownBody) setCustomBodyInput(body);

    toast.info(`Applied pairing: ${heading} + ${body}`);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/typography", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Font families updated successfully!");
        try {
          localStorage.setItem("taxmetryx_typography", JSON.stringify(config));
        } catch {
          // ignore
        }
        window.dispatchEvent(
          new CustomEvent("taxmetryx:fonts-updated", { detail: config })
        );
      } else {
        toast.error(data.message || "Failed to save typography settings.");
      }
    } catch {
      toast.error("Network error while saving typography.");
    } finally {
      setIsSaving(false);
    }
  };

  const isCustomHeadingSelected =
    !HEADING_FONT_OPTIONS.some((o) => o.value === config.fontHeading && o.value !== "__custom__");

  const isCustomBodySelected =
    !BODY_FONT_OPTIONS.some((o) => o.value === config.fontBody && o.value !== "__custom__");

  // Dynamic preview font stylesheet injection
  const previewFontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    config.fontHeading
  ).replace(/%20/g, "+")}:ital,wght@0,400;0,600;0,700;1,400&family=${encodeURIComponent(
    config.fontBody
  ).replace(/%20/g, "+")}:wght@400;500;600;700&display=swap`;

  return (
    <div className="space-y-8 max-w-6xl pb-16">
      {/* Load preview Google Fonts */}
      <link rel="stylesheet" href={previewFontUrl} key={previewFontUrl} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold">
            PLATFORM TYPOGRAPHY
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-white mt-1">
            Font Family Customization
          </h1>
          <p className="text-xs text-white/60 mt-1 max-w-2xl">
            Select or enter any Google Font family for headings and body text. The site's official brand colors and layouts remain clean and protected.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setConfig(DEFAULT_TYPOGRAPHY);
              setCustomHeadingInput("");
              setCustomBodyInput("");
              toast.info("Reset to default Taxmetryx typography.");
            }}
            className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-6 py-2.5 bg-brand-red hover:bg-[#b80012] text-white text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Fonts"}</span>
          </button>
        </div>
      </div>

      {/* Curated Typography Pairings */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-brand-red" />
          <span>Curated Font Pairings</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {CURATED_PAIRINGS.map((pairing) => {
            const isActive =
              config.fontHeading === pairing.heading && config.fontBody === pairing.body;
            return (
              <button
                key={pairing.name}
                type="button"
                onClick={() => applyPairing(pairing.heading, pairing.body)}
                className={`p-4 text-left border transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-red/10 border-brand-red text-white ring-1 ring-brand-red"
                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-xs text-white">{pairing.name}</strong>
                  {isActive && <Check className="w-3.5 h-3.5 text-brand-red" />}
                </div>
                <div className="text-[11px] text-white/50 mb-2 leading-relaxed">{pairing.desc}</div>
                <div className="text-[11px] font-mono text-brand-red/90">
                  {pairing.heading} + {pairing.body}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Heading Font */}
        <div className="p-6 bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
              <Type className="w-4 h-4 text-brand-red" />
              <span>Heading Font Family (Titles & h1-h3)</span>
            </div>
            <span className="text-[10px] font-mono text-brand-red font-semibold">
              Current: {config.fontHeading}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-white/70 block mb-1 font-semibold uppercase text-[10px] tracking-wider">
                Select Headings Font
              </label>
              <select
                value={isCustomHeadingSelected ? "__custom__" : config.fontHeading}
                onChange={(e) => handleHeadingSelect(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0a151d] border border-white/15 text-white focus:outline-hidden focus:border-brand-red cursor-pointer"
              >
                {HEADING_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0a151d] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Google Font Input */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-white/70 text-[10px] uppercase font-semibold tracking-wider">
                  Or Type Any Custom Google Font
                </label>
                <a
                  href="https://fonts.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-brand-red hover:underline inline-flex items-center gap-1"
                >
                  Browse Google Fonts <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Cinzel, Lora, Syne, Fraunces..."
                  value={customHeadingInput}
                  onChange={(e) => setCustomHeadingInput(e.target.value)}
                  onBlur={handleCustomHeadingBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCustomHeadingBlur();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-hidden focus:border-brand-red text-xs"
                />
                <button
                  type="button"
                  onClick={handleCustomHeadingBlur}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-white/40">Try:</span>
                {["Bodoni Moda", "Cinzel", "Syne", "Prata", "Cormorant Garamond", "Playfair Display"].map(
                  (sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        setCustomHeadingInput(sample);
                        setConfig({ ...config, fontHeading: sample });
                      }}
                      className="text-[10px] px-2 py-0.5 bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      +{sample}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Body Font */}
        <div className="p-6 bg-white/5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider">
              <Type className="w-4 h-4 text-brand-red" />
              <span>Body Font Family (Paragraphs & Copy)</span>
            </div>
            <span className="text-[10px] font-mono text-brand-red font-semibold">
              Current: {config.fontBody}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-white/70 block mb-1 font-semibold uppercase text-[10px] tracking-wider">
                Select Body Font
              </label>
              <select
                value={isCustomBodySelected ? "__custom__" : config.fontBody}
                onChange={(e) => handleBodySelect(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0a151d] border border-white/15 text-white focus:outline-hidden focus:border-brand-red cursor-pointer"
              >
                {BODY_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0a151d] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Google Font Input */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-white/70 text-[10px] uppercase font-semibold tracking-wider">
                  Or Type Any Custom Google Font
                </label>
                <a
                  href="https://fonts.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-brand-red hover:underline inline-flex items-center gap-1"
                >
                  Browse Google Fonts <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Outfit, Space Grotesk, Manrope, Nunito..."
                  value={customBodyInput}
                  onChange={(e) => setCustomBodyInput(e.target.value)}
                  onBlur={handleCustomBodyBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCustomBodyBlur();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-hidden focus:border-brand-red text-xs"
                />
                <button
                  type="button"
                  onClick={handleCustomBodyBlur}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Apply
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-white/40">Try:</span>
                {["Inter", "Plus Jakarta Sans", "Outfit", "Space Grotesk", "DM Sans", "Roboto"].map(
                  (sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => {
                        setCustomBodyInput(sample);
                        setConfig({ ...config, fontBody: sample });
                      }}
                      className="text-[10px] px-2 py-0.5 bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      +{sample}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Interactive Typography Preview */}
      <div className="p-8 bg-[#f8f7f4] text-[#414042] border border-white/20 space-y-6">
        <div className="flex items-center justify-between border-b border-[#e7e5e1] pb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#eb0045]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#646464]">
              Live Typography Specimen
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[#646464] font-mono">
            <span>Heading: <strong>{config.fontHeading}</strong></span>
            <span>•</span>
            <span>Body: <strong>{config.fontBody}</strong></span>
          </div>
        </div>

        {/* Specimen Heading 1 */}
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#646464] block mb-2">
            • UAE | TRANSFER PRICING | CORPORATE TAX | GLOBAL
          </span>
          <h1
            style={{ fontFamily: `"${config.fontHeading}", sans-serif` }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-[#414042] leading-[1.08]"
          >
            Complexity. <span className="text-[#eb0045]">Measured. Resolved.</span>
          </h1>
        </div>

        {/* Specimen Heading 2 */}
        <div>
          <h2
            style={{ fontFamily: `"${config.fontHeading}", sans-serif` }}
            className="text-2xl sm:text-3xl font-bold text-[#414042] mb-2"
          >
            Facts first. <span className="text-[#eb0045]">Then the view.</span>
          </h2>
          <p
            style={{ fontFamily: `"${config.fontBody}", sans-serif` }}
            className="text-sm sm:text-base text-[#53606a] leading-relaxed max-w-3xl"
          >
            Taxmetryx is a premier UAE-based specialist corporate tax and transfer pricing advisory firm operating from DIFC Dubai. We deliver defensible, commercially grounded solutions across Corporate Tax, Transfer Pricing policies, Qualifying Free Zone Person assessments, and FTA controversy management.
          </p>
        </div>

        {/* Specimen Micro Typography */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e7e5e1]">
          <div className="p-4 bg-white border border-[#e7e5e1]">
            <span className="text-[10px] font-mono text-[#eb0045] uppercase font-bold block mb-1">
              PRACTICE 01
            </span>
            <h3
              style={{ fontFamily: `"${config.fontHeading}", sans-serif` }}
              className="text-base font-bold text-[#414042] mb-1"
            >
              Corporate Tax Structuring
            </h3>
            <p
              style={{ fontFamily: `"${config.fontBody}", sans-serif` }}
              className="text-xs text-[#53606a] leading-relaxed"
            >
              Qualifying Free Zone Person regime, business restructurings, and Pillar Two GloBE compliance.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#e7e5e1]">
            <span className="text-[10px] font-mono text-[#eb0045] uppercase font-bold block mb-1">
              PRACTICE 02
            </span>
            <h3
              style={{ fontFamily: `"${config.fontHeading}", sans-serif` }}
              className="text-base font-bold text-[#414042] mb-1"
            >
              Transfer Pricing Execution
            </h3>
            <p
              style={{ fontFamily: `"${config.fontBody}", sans-serif` }}
              className="text-xs text-[#53606a] leading-relaxed"
            >
              Master file, local file, country-by-country reporting, and intercompany value chain design.
            </p>
          </div>

          <div className="p-4 bg-white border border-[#e7e5e1]">
            <span className="text-[10px] font-mono text-[#eb0045] uppercase font-bold block mb-1">
              PRACTICE 03
            </span>
            <h3
              style={{ fontFamily: `"${config.fontHeading}", sans-serif` }}
              className="text-base font-bold text-[#414042] mb-1"
            >
              Cross-Border Controversy
            </h3>
            <p
              style={{ fontFamily: `"${config.fontBody}", sans-serif` }}
              className="text-xs text-[#53606a] leading-relaxed"
            >
              Tax dispute resolution committee appeals, mutual agreement procedures, and audit defense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
