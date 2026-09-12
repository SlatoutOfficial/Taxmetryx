"use client";

import React, { useEffect, useState, useMemo } from "react";
import { TypographyConfig } from "@/lib/json";

const defaultFonts: TypographyConfig = {
  fontHeading: "Montserrat",
  fontBody: "Montserrat",
};

function getGoogleFontUrl(fontNames: string[]): string {
  const localFonts = new Set([
    "system-ui",
    "Arial",
    "Georgia",
    "Times New Roman",
    "sans-serif",
    "serif",
  ]);

  const families = fontNames
    .filter((f) => f && !localFonts.has(f.trim()))
    .map((name) => `family=${encodeURIComponent(name.trim()).replace(/%20/g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700`)
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
        const parsed = JSON.parse(cached);
        if (
          parsed.fontHeading === "DM Serif Display" ||
          parsed.fontHeading === "Taxmetryx Serif" ||
          parsed.fontHeading === "Inter"
        ) {
          parsed.fontHeading = "Montserrat";
        }
        if (parsed.fontBody === "Inter") {
          parsed.fontBody = "Montserrat";
        }
        localStorage.setItem("taxmetryx_typography", JSON.stringify(parsed));
        setFonts(parsed);
      }
    } catch {
      // ignore
    }

    // Fetch latest typography from API
    fetch("/api/admin/typography")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          const freshData = data.data;
          if (
            freshData.fontHeading === "DM Serif Display" ||
            freshData.fontHeading === "Taxmetryx Serif" ||
            freshData.fontHeading === "Inter"
          ) {
            freshData.fontHeading = "Montserrat";
          }
          if (freshData.fontBody === "Inter") {
            freshData.fontBody = "Montserrat";
          }
          setFonts(freshData);
          try {
            localStorage.setItem("taxmetryx_typography", JSON.stringify(freshData));
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

  const headingFont = fonts.fontHeading || "Montserrat";
  const bodyFont = fonts.fontBody || "Montserrat";

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
              --font-serif: "${headingFont}", "Montserrat", var(--font-sans), sans-serif;
              --font-sans: "${bodyFont}", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }

            /* Apply typography consistently across all pages */
            body, button, input, textarea, select {
              font-family: var(--font-sans), "Montserrat", sans-serif;
            }

            h1, h2, h3, h4, h5, h6, .font-editorial {
              font-family: var(--font-sans), "Montserrat", sans-serif;
              letter-spacing: -0.025em;
            }

            .reference-heading {
              font-family: var(--font-sans), "Montserrat", sans-serif;
              letter-spacing: -0.03em;
            }

            .reference-sans-heading {
              font-family: var(--font-sans), "Montserrat", sans-serif;
            }

            .reference-copy {
              font-family: var(--font-sans), "Montserrat", sans-serif;
            }
          `,
        }}
      />
    </>
  );
}
