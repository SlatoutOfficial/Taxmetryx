import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  arrowColor?: "red" | "dark" | "white";
}

export default function ArrowLink({
  href,
  children,
  className,
  arrowColor = "red",
}: ArrowLinkProps) {
  const arrowColorClass = {
    red: "text-brand-red",
    dark: "text-brand-primary",
    white: "text-white",
  }[arrowColor];

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 group font-medium text-xs uppercase tracking-[0.16em] transition-colors duration-200",
        className
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full" />
      </span>
      <ArrowUpRight
        className={cn(
          "w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0",
          arrowColorClass
        )}
      />
    </Link>
  );
}
