"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";


interface CTAButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "dark" | "secondary-light" | "outline-light";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function CTAButton({
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon = false,
  children,
  className,
  type = "button",
  disabled = false,
}: CTAButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium tracking-[0.04em] transition-all duration-300 select-none cursor-pointer text-center relative group";

  const variantClasses = {
    primary:
      "bg-brand-red text-white hover:bg-[#b80012] active:bg-[#9a000f] border border-transparent shadow-sm",
    secondary:
      "bg-white text-brand-primary border border-brand-charcoal hover:bg-brand-primary hover:!text-white active:bg-black shadow-xs",
    "secondary-light":
      "bg-transparent text-white border border-white/50 hover:bg-white hover:!text-brand-dark hover:border-white active:bg-white/90 shadow-sm",
    outline:
      "bg-transparent text-brand-primary border border-[#E7E5E1] hover:border-brand-charcoal hover:bg-brand-white",
    "outline-light":
      "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white/10",
    dark:
      "bg-brand-dark text-white border border-white/20 hover:bg-black hover:border-brand-red",
  };

  const sizeClasses = {
    sm: "text-xs px-4 py-2.5 gap-1.5",
    md: "text-xs uppercase tracking-[0.14em] px-6 py-3.5 gap-2",
    lg: "text-sm uppercase tracking-[0.15em] px-8 py-4 gap-2.5 font-semibold",
  };

  const content = (
    <>
      <span className="transition-colors duration-300">{children}</span>
      {icon && (
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
      )}
    </>
  );

  if (href) {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick();
      }
      if (href.startsWith("#")) {
        e.preventDefault();
        try {
          const target = document.querySelector(href);
          if (target) {
            const lenis = (
              window as unknown as {
                __lenis?: { scrollTo: (target: Element | string, opts?: object) => void };
              }
            ).__lenis;
            if (lenis) {
              lenis.scrollTo(target as HTMLElement, { offset: -80 });
            } else {
              target.scrollIntoView({ behavior: "smooth" });
            }
            window.history.pushState(null, "", href);
          }
        } catch {
          // Fallback
        }
      }
    };

    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed hover:bg-brand-red",
        className
      )}
    >
      {content}
    </button>
  );
}
