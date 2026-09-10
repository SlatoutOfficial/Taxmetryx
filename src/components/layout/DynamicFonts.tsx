"use client";

import React, { useEffect, useState, useMemo } from "react";
import { TypographyConfig } from "@/lib/json";

const defaultFonts: TypographyConfig = {
  fontHeading: "DM Serif Display",
  fontBody: "Inter",
};

function getGoogleFontUrl(fontNames: string[]): string {
  const localFonts = new Set([
    "Taxmetryx Inter",
    "Taxmetryx Serif",
    "system-ui",
    "Arial",
    "Georgia",
    "Times New Roman",
    "sans-serif",
    "serif",
  ]);

  const families = fontNames
    .filter((f) => f && !localFonts.has(f.trim()))
    .map((name) => `family=${encodeURIComponent(name.trim()).replace(/%20/g, "+")}:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600`)
    .join("&");

  if (!families) return "";
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export default function DynamicFonts() {
  const [fonts, setFonts] = useState<TypographyConfig>(defaultFonts);

  useEffect(() => {
    // Check localStorage for quick hydration
    try {
      const cached = localStorage.getItem("taxmetryx_typography");
      if (cached) {
        setFonts(JSON.parse(cached));
      }
    } catch {
      // ignore
    }

    // Fetch latest typography from API
    fetch("/api/admin/typography")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFonts(data.data);
          try {
            localStorage.setItem("taxmetryx_typography", JSON.stringify(data.data));
          } catch {
            // ignore
          }
        }
      })
      .catch(() => {
        // use fallback defaultFonts
      });

    // Listen to custom font update events from admin
    const handleFontUpdate = (e: CustomEvent<TypographyConfig>) => {
      if (e.detail) {
        setFonts(e.detail);
      }
    };
    window.addEventListener("taxmetryx:fonts-updated" as any, handleFontUpdate);
    return () => {
      window.removeEventListener("taxmetryx:fonts-updated" as any, handleFontUpdate);
    };
  }, []);

  const headingFont = fonts.fontHeading || "DM Serif Display";
  const bodyFont = fonts.fontBody || "Inter";

  const fontUrl = useMemo(() => {
    return getGoogleFontUrl([headingFont, bodyFont]);
  }, [headingFont, bodyFont]);

  return (
    <>
      {fontUrl && (
        <link rel="stylesheet" href={fontUrl} key={fontUrl} />
      )}
      <style
        id="taxmetryx-dynamic-fonts"
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-serif: "${headingFont}", Georgia, serif;
              --font-sans: "${bodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }

            /* Apply typography without altering brand colors */
            body {
              font-family: var(--font-sans);
            }

            h1, h2, h3, .font-editorial {
              font-family: var(--font-serif);
            }

            .reference-heading {
              font-family: var(--font-serif);
            }

            .reference-sans-heading {
              font-family: var(--font-sans);
            }

            .reference-copy {
              font-family: var(--font-sans);
            }
          `,
        }}
      />
    </>
  );
}
