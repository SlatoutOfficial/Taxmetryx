import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  highlightWords?: string[];
  level?: "h1" | "h2" | "h3";
  className?: string;
  size?: "hero" | "section" | "sub";
}

export default function SectionHeading({
  title,
  highlightWords = [],
  level = "h2",
  className,
  size = "section",
}: SectionHeadingProps) {
  const Component = level;

  const sizeClasses = {
    hero: "text-clamp-hero font-normal tracking-[-0.03em] leading-[1.02]",
    section: "text-clamp-heading font-normal tracking-[-0.025em] leading-[1.06]",
    sub: "text-clamp-subheading font-normal tracking-[-0.02em] leading-[1.18]",
  };

  if (highlightWords.length === 0) {
    return (
      <Component className={cn("font-editorial text-brand-primary", sizeClasses[size], className)}>
        {title}
      </Component>
    );
  }

  // Regex split while preserving match
  const escapedWords = highlightWords.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");
  const parts = title.split(regex);

  return (
    <Component className={cn("font-editorial text-brand-primary", sizeClasses[size], className)}>
      {parts.map((part, index) => {
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === part.toLowerCase()
        );
        return isHighlight ? (
          <span key={index} className="text-brand-red">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </Component>
  );
}
