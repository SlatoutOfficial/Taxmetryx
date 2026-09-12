import React from "react";
import BrandLogo from "@/components/shared/BrandLogo";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col items-center justify-center p-6 select-none">
      <div className="space-y-6 text-center flex flex-col items-center">
        <div className="inline-flex items-center">
          <BrandLogo />
        </div>

        {/* Thin red progress line */}
        <div className="w-48 h-[2px] bg-[#E7E5E1] mx-auto overflow-hidden relative">
          <div className="absolute inset-0 bg-brand-red w-1/3 animate-[translateX_1.2s_ease-in-out_infinite]" />
        </div>

        <div className="text-[11px] font-mono uppercase tracking-[0.24em] text-brand-muted">
          Loading Advisory Intelligence...
        </div>
      </div>
    </div>
  );
}
