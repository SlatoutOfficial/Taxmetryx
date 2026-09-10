import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-xs uppercase tracking-[0.14em] text-brand-muted", className)}
    >
      <Link href="/" className="hover:text-brand-primary transition-colors">
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-[#B0ADA8] shrink-0" />
            {isLast || !item.href ? (
              <span className="text-brand-red font-medium truncate max-w-[240px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-brand-primary transition-colors truncate">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
