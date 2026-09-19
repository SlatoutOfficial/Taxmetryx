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
  { label: "DM Serif Display (Classic Editorial)", value: "DM Serif Display" },
  { label: "Playfair Display (Luxury Editorial)", value: "Playfair Display" },
  { label: "Cormorant Garamond (Heritage Serif)", value: "Cormorant Garamond" },
  { label: "Bodoni Moda (Modern High-Contrast Serif)", value: "Bodoni Moda" },
  { label: "Prata (Elegant Editorial)", value: "Prata" },
  { label: "Cinzel (Classic Trajan Style)", value: "Cinzel" },
  { label: "Merriweather (Clean Serif)", value: "Merriweather" },
  { label: "Inter (Clean Modern Sans)", value: "Inter" },
  { label: "Plus Jakarta Sans (Contemporary Sans)", value: "Plus Jakarta Sans" },
  { label: "Outfit (Geometric Sans)", value: "Outfit" },
  { label: "Syne (Architectural Sans)", value: "Syne" },
  { label: "Custom Google Font...", value: "__custom__" },
];

const BODY_FONT_OPTIONS = [
  { label: "Montserrat (Taxmetryx Standard)", value: "Montserrat" },
  { label: "Inter (High-Legibility Modern Sans)", value: "Inter" },
  { label: "Plus Jakarta Sans (Contemporary Corporate)", value: "Plus Jakarta Sans" },
  { label: "Outfit (Clean Geometric)", value: "Outfit" },
  { label: "DM Sans (Balanced Sans)", value: "DM Sans" },
  { label: "Roboto (Neutral Sans)", value: "Roboto" },
  { label: "Space Grotesk (Tech Sans)", value: "Space Grotesk" },
  { label: "Custom Google Font...", value: "__custom__" },
];

const CURATED_PAIRINGS = [
  {
    name: "Standard Modern",
    desc: "Clean, consistent geometric font across all headings and text.",
    heading: "Montserrat",
    body: "Montserrat",
  },
  {
    name: "Classic Editorial",
    desc: "Authoritative serif title paired with high-legibility body sans.",
    heading: "DM Serif Display",
    body: "Inter",
  },
  {
    name: "Prestige Luxury",
    desc: "Refined luxury serif paired with contemporary geometric sans.",
    heading: "Playfair Display",
    body: "Plus Jakarta Sans",
  },
  {
    name: "Clean Corporate",
    desc: "Ultra-clean modern sans across all titles and paragraphs.",
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

    toast.info(`Applied font pairing: ${heading} + ${body}`);
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
        toast.success("Website font settings saved!");
        try {
          localStorage.setItem("taxmetryx_typography", JSON.stringify(config));
        } catch {
          // ignore
        }
        window.dispatchEvent(
          new CustomEvent("taxmetryx:fonts-updated", { detail: config })
        );
      } else {
        toast.error(data.message || "Failed to save fonts.");
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Typography & Fonts
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Choose font families for your website headings and paragraphs with live preview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setConfig(DEFAULT_TYPOGRAPHY);
              setCustomHeadingInput("");
              setCustomBodyInput("");
              toast.info("Reset to default fonts.");
            }}
            className="px-3.5 py-2 border border-white/10 bg-[#0D1C26] hover:bg-[#152735] text-white/80 hover:text-white text-xs font-medium rounded-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-5 py-2 bg-[#eb0045] hover:bg-[#c9003b] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Fonts"}</span>
          </button>
        </div>
      </div>

      {/* Popular Font Combinations */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-white text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#eb0045]" />
          <span>Popular Font Combinations</span>
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
                className={`p-4 text-left border rounded-sm transition-all cursor-pointer bg-[#0D1C26] ${
                  isActive
                    ? "border-[#eb0045] ring-1 ring-[#eb0045] shadow-xs"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-xs text-white font-semibold">{pairing.name}</strong>
                  {isActive && <Check className="w-3.5 h-3.5 text-[#eb0045]" />}
                </div>
                <div className="text-xs text-white/50 mb-2 leading-relaxed line-clamp-2">{pairing.desc}</div>
                <div className="text-xs font-mono text-[#eb0045] font-medium">
                  {pairing.heading} + {pairing.body}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heading Font */}
        <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-xs">
              <Type className="w-4 h-4 text-[#eb0045]" />
              <span>Heading Font (Titles & Subtitles)</span>
            </div>
            <span className="text-xs font-medium text-[#eb0045]">
              Current: {config.fontHeading}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-white/80 block mb-1 text-xs font-medium">
                Choose a font
              </label>
              <select
                value={isCustomHeadingSelected ? "__custom__" : config.fontHeading}
                onChange={(e) => handleHeadingSelect(e.target.value)}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white rounded-sm focus:outline-hidden focus:border-[#eb0045] cursor-pointer"
              >
                {HEADING_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#071219] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Google Font Input */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-white/80 text-xs font-medium">
                  Or enter any Google Font name
                </label>
                <a
                  href="https://fonts.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#eb0045] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Browse Google Fonts <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Cinzel, Lora, Fraunces..."
                  value={customHeadingInput}
                  onChange={(e) => setCustomHeadingInput(e.target.value)}
                  onBlur={handleCustomHeadingBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCustomHeadingBlur();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white placeholder-white/30 rounded-sm focus:outline-hidden focus:border-[#eb0045] text-xs"
                />
                <button
                  type="button"
                  onClick={handleCustomHeadingBlur}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-sm cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Body Font */}
        <div className="p-6 bg-[#0D1C26] border border-white/10 rounded-sm shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-xs">
              <Type className="w-4 h-4 text-[#eb0045]" />
              <span>Body Font (Paragraphs & Copy)</span>
            </div>
            <span className="text-xs font-medium text-[#eb0045]">
              Current: {config.fontBody}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-white/80 block mb-1 text-xs font-medium">
                Choose a font
              </label>
              <select
                value={isCustomBodySelected ? "__custom__" : config.fontBody}
                onChange={(e) => handleBodySelect(e.target.value)}
                className="w-full px-3 py-2 bg-[#071219] border border-white/15 text-white rounded-sm focus:outline-hidden focus:border-[#eb0045] cursor-pointer"
              >
                {BODY_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#071219] text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Google Font Input */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-white/80 text-xs font-medium">
                  Or enter any Google Font name
                </label>
                <a
                  href="https://fonts.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#eb0045] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  Browse Google Fonts <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Outfit, Space Grotesk, Manrope..."
                  value={customBodyInput}
                  onChange={(e) => setCustomBodyInput(e.target.value)}
                  onBlur={handleCustomBodyBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleCustomBodyBlur();
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-[#071219] border border-white/15 text-white placeholder-white/30 rounded-sm focus:outline-hidden focus:border-[#eb0045] text-xs"
                />
                <button
                  type="button"
                  onClick={handleCustomBodyBlur}
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-sm cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="p-8 bg-[#0D1C26] text-white border border-white/10 rounded-sm shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#eb0045]" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Live Website Preview
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>Heading: <strong className="text-white">{config.fontHeading}</strong></span>
            <span>•</span>
            <span>Body: <strong className="text-white">{config.fontBody}</strong></span>
          </div>
        </div>

        {/* Preview Content */}
        <div>
          <span className="text-xs font-semibold text-[#eb0045] block mb-1 uppercase tracking-wider">
            • UAE Corporate Tax & Transfer Pricing Advisory
          </span>
          <h2
            style={{ fontFamily: `"${config.fontHeading}", sans-serif` }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2"
          >
            Complexity. <span className="text-[#eb0045]">Measured. Resolved.</span>
          </h2>
          <p
            style={{ fontFamily: `"${config.fontBody}", sans-serif` }}
            className="text-sm text-white/70 leading-relaxed max-w-2xl"
          >
            Taxmetryx provides specialist corporate tax and transfer pricing advisory services in the United Arab Emirates. We deliver defensible solutions for multinational enterprises and regional businesses.
          </p>
        </div>
      </div>
    </div>
  );
}
