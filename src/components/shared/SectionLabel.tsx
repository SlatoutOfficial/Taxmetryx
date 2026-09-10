import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  hasDot?: boolean;
}

export default function SectionLabel({ children, className, hasDot = true }: SectionLabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-2.5 mb-4", className)}>
      {hasDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-brand-red inline-block shrink-0" />
      )}
      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
        {children}
      </span>
    </div>
  );
}
