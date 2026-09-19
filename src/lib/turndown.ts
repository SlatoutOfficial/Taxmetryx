import TurndownService from "turndown";
// @ts-expect-error turndown-plugin-gfm lacks official TS declaration file
import { gfm } from "turndown-plugin-gfm";

export function getTurndownService(): TurndownService {
  const service = new TurndownService({
    headingStyle: "atx",
    hr: "---",
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "*",
  });

  service.use(gfm);
  return service;
}

/**
 * Converts HTML string into clean GitHub Flavored Markdown
 */
export function convertHtmlToMarkdown(html: string): string {
  if (!html || typeof html !== "string") return "";
  const service = getTurndownService();
  return service.turndown(html);
}

/**
 * Converts markdown text into structured insight sections for Taxmetryx articles
 */
export function parseMarkdownToSections(markdown: string): { heading: string; content: string[] }[] {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const sections: { heading: string; content: string[] }[] = [];
  let currentHeading = "Overview";
  let currentParagraphs: string[] = [];
  let currentBuffer: string[] = [];

  const flushBuffer = () => {
    if (currentBuffer.length > 0) {
      const text = currentBuffer.join(" ").trim();
      if (text) {
        currentParagraphs.push(text);
      }
      currentBuffer = [];
    }
  };

  const flushSection = () => {
    flushBuffer();
    if (currentParagraphs.length > 0) {
      sections.push({
        heading: currentHeading,
        content: currentParagraphs,
      });
      currentParagraphs = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ") || trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      flushSection();
      currentHeading = trimmed.replace(/^#+\s*/, "");
    } else if (trimmed === "") {
      flushBuffer();
    } else {
      currentBuffer.push(trimmed);
    }
  }

  flushSection();
  return sections;
}
