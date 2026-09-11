import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  hasDot?: boolean;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("inline-flex items-center mb-4", className)}>
      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
        {children}
      </span>
    </div>
  );
}
