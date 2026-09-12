"use client";

import React, { useState } from "react";
import { ChevronDown, FileCheck } from "lucide-react";
import { SubService } from "@/types/service";

interface ServiceAreasAccordionProps {
  subservices: SubService[];
  serviceTitle: string;
}

export default function ServiceAreasAccordion({
  subservices,
}: ServiceAreasAccordionProps) {
  // Pair subservices into rows of 2
  const rows: SubService[][] = [];
  for (let i = 0; i < subservices.length; i += 2) {
    rows.push(subservices.slice(i, i + 2));
  }

  // Store set of open row indexes. Default first row open
  const [openRows, setOpenRows] = useState<Set<number>>(new Set([0]));

  const allOpen = openRows.size === rows.length;
  const allClosed = openRows.size === 0;

  const toggleRow = (rIdx: number) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(rIdx)) {
        next.delete(rIdx);
      } else {
        next.add(rIdx);
      }
      return next;
    });
  };

  const expandAll = () => {
    setOpenRows(new Set(rows.map((_, i) => i)));
  };

  const collapseAll = () => {
    setOpenRows(new Set());
  };

  return (
    <div className="space-y-5">
      {/* Header controls: Expand/Collapse all */}
      <div className="flex flex-wrap items-center justify-end gap-4 pb-3 border-b border-[#E7E5E1]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            disabled={allOpen}
            className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
              allOpen
                ? "border-[#E7E5E1] text-brand-muted/40 cursor-not-allowed bg-transparent"
                : "border-[#E7E5E1] text-brand-charcoal hover:border-[#EB0045] hover:text-[#EB0045] bg-white hover:shadow-xs cursor-pointer"
            }`}
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            disabled={allClosed}
            className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md border transition-all ${
              allClosed
                ? "border-[#E7E5E1] text-brand-muted/40 cursor-not-allowed bg-transparent"
                : "border-[#E7E5E1] text-brand-charcoal hover:border-[#EB0045] hover:text-[#EB0045] bg-white hover:shadow-xs cursor-pointer"
            }`}
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion rows (each row contains up to 2 items with synchronized opening & equal heights) */}
      <div className="space-y-4 lg:space-y-5">
        {rows.map((rowItems, rIdx) => {
          const isRowOpen = openRows.has(rIdx);

          return (
            <div
              key={rIdx}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch"
            >
              {rowItems.map((item, colIdx) => {
                const itemGlobalIdx = rIdx * 2 + colIdx;

                return (
                  <div
                    key={item.number || itemGlobalIdx}
                    className={`relative overflow-hidden rounded-2xl border transition-all duration-300 h-full flex flex-col ${
                      isRowOpen
                        ? "border-[#EB0045]/40 bg-white shadow-[0_6px_24px_rgba(235,0,69,0.06)] ring-1 ring-[#EB0045]/15"
                        : "border-[#E7E5E1] bg-white shadow-xs hover:border-neutral-400/80 hover:shadow-sm"
                    }`}
                  >
                    {/* Active top accent gradient strip */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EB0045] via-[#EB0045]/80 to-[#EB0045]/40 transition-opacity duration-300 ${
                        isRowOpen ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {/* Summary Trigger (clicking toggles entire row) */}
                    <button
                      type="button"
                      onClick={() => toggleRow(rIdx)}
                      aria-expanded={isRowOpen}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group select-none transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {item.number && (
                          <span
                            className={`font-mono text-xs font-bold px-2 py-0.5 rounded transition-all duration-200 shrink-0 ${
                              isRowOpen
                                ? "bg-[#EB0045] text-white shadow-xs"
                                : "bg-[#FAF9F5] text-neutral-500 border border-[#E7E5E1] group-hover:border-[#EB0045]/40 group-hover:text-[#EB0045]"
                            }`}
                          >
                            {item.number}
                          </span>
                        )}

                        {/* Title */}
                        <h3
                          className={`font-editorial text-base sm:text-lg font-semibold leading-snug transition-colors duration-200 ${
                            isRowOpen
                              ? "text-[#EB0045]"
                              : "text-brand-primary group-hover:text-[#EB0045]"
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      {/* Chevron icon button */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isRowOpen
                            ? "rotate-180 bg-[#EB0045]/10 border-[#EB0045]/30 text-[#EB0045]"
                            : "border-[#E7E5E1] text-neutral-400 group-hover:border-neutral-400 group-hover:text-neutral-700 group-hover:bg-[#FAF9F5]"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Body (Equal-height flex column) */}
                    {isRowOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 flex-1 flex flex-col justify-between">
                        <div className="border-t border-[#E7E5E1]/70 pt-4 space-y-4">
                          {/* Primary Scope Description */}
                          <p className="font-sans text-[0.9125rem] text-brand-charcoal/90 leading-relaxed">
                            {item.description}
                          </p>

                          {/* In Practice Paragraph */}
                          {item.inPractice && (
                            <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E1]/80 rounded-xl space-y-2">
                              <div className="flex items-center gap-2 text-neutral-600 font-mono text-[10px] uppercase font-bold tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EB0045]" />
                                Advisory In Practice
                              </div>
                              <p className="font-sans text-xs sm:text-[0.875rem] text-brand-charcoal/85 leading-relaxed">
                                {item.inPractice}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* You Receive Deliverable Box (Pinned to bottom for equal-height alignment) */}
                        {item.youReceive && (
                          <div className="mt-5 pt-2">
                            <div className="p-4 bg-gradient-to-br from-[#FAF9F5] to-[#F5F3EE] border border-[#E2DFD7] rounded-xl flex items-start gap-3">
                              <div className="p-1.5 rounded-lg bg-[#EB0045]/10 text-[#EB0045] shrink-0 mt-0.5">
                                <FileCheck className="w-4 h-4" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#EB0045] block">
                                  Key Deliverable
                                </span>
                                <span className="text-xs sm:text-[0.875rem] text-brand-primary font-medium leading-relaxed block">
                                  {item.youReceive}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
