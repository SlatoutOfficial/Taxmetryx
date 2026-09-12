"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ArrowUpRight } from "lucide-react";
import type { SubService } from "@/types/service";
import { slugifySubService } from "@/lib/json";

export default function ServiceAreasAccordion({
  subservices,
  serviceTitle,
  serviceSlug,
}: {
  subservices: SubService[];
  serviceTitle: string;
  serviceSlug?: string;
}) {
  const id = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));
  const toggle = (index: number) =>
    setOpenItems((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  const controlClass =
    "min-h-10 cursor-pointer px-2 text-xs font-semibold text-[#63717c] hover:text-[#eb0045] disabled:opacity-40 disabled:cursor-default focus-visible:outline-2 focus-visible:outline-[#eb0045]";

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#e8e7e4] pb-3">
        <span className="text-sm font-semibold text-[#17232c]">
          {subservices.length} areas of work
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            className={controlClass}
            disabled={openItems.size === subservices.length}
            onClick={() => setOpenItems(new Set(subservices.map((_, i) => i)))}
          >
            Expand all
          </button>
          <button
            type="button"
            className={controlClass}
            disabled={openItems.size === 0}
            onClick={() => setOpenItems(new Set())}
          >
            Collapse all
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {subservices.map((item, index) => {
          const open = openItems.has(index);
          const itemSlug = item.slug || slugifySubService(item.title);
          const pageHref = serviceSlug
            ? `/services/${serviceSlug}/${itemSlug}`
            : undefined;

          return (
            <div
              key={item.number}
              className={`overflow-hidden rounded-sm border bg-white transition-colors ${
                open ? "border-[#eb004530]" : "border-[#e8e7e4]"
              }`}
            >
              <h3>
                <button
                  id={`${id}-trigger-${index}`}
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${id}-panel-${index}`}
                  onClick={() => toggle(index)}
                  className="flex w-full cursor-pointer items-start gap-3 p-5 text-left hover:bg-[#fafaf9] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#eb0045] sm:gap-4 sm:p-6"
                >
                  <span className="pt-0.5 font-mono text-xs text-[#eb0045]">
                    {item.number}
                  </span>
                  <span className="flex-1 text-sm font-semibold leading-6 text-[#17232c] sm:text-base">
                    {item.title}
                  </span>
                  {open ? (
                    <Minus
                      className="mt-1 h-4 w-4 shrink-0 text-[#eb0045]"
                      aria-hidden="true"
                    />
                  ) : (
                    <Plus
                      className="mt-1 h-4 w-4 shrink-0 text-[#63717c]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </h3>
              <div
                id={`${id}-panel-${index}`}
                aria-labelledby={`${id}-trigger-${index}`}
                hidden={!open}
              >
                <div className="space-y-4 px-5 pb-6 text-sm leading-7 text-[#53606a] sm:px-6">
                  <p>{item.description}</p>
                  {item.inPractice && <p>{item.inPractice}</p>}
                  {item.youReceive && (
                    <p className="border-l-2 border-[#eb0045] bg-[#f6f5f2] px-4 py-3 text-[#17232c]">
                      <strong className="font-semibold">You receive: </strong>
                      {item.youReceive}
                    </p>
                  )}
                  {pageHref && (
                    <div className="pt-2">
                      <Link
                        href={pageHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#eb0045] hover:text-[#eb0045] hover:underline"
                      >
                        Open dedicated service page
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
