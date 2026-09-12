"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export interface ButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  variant?:
    | "primary"
    | "secondary"
    | "secondary-light"
    | "outline"
    | "outline-light"
    | "dark";
  size?: "sm" | "md" | "lg";
  radius?: "unique" | "rounded" | "pill" | "square";
  icon?: boolean | React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
}

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  radius = "unique",
  icon = false,
  iconPosition = "right",
  children,
  className,
  type = "button",
  disabled = false,
  target,
  rel,
  fullWidth = false,
}: ButtonProps) {
  // Base classes with luxury micro-interactions & GPU-accelerated transforms
  const baseClasses =
    "group relative inline-flex items-center justify-center font-medium select-none cursor-pointer text-center overflow-hidden transition-all duration-300 ease-out active:scale-[0.98] active:translate-y-0";

  // Unique signature architectural border-radius styling
  const radiusClasses = {
    unique: "btn-unique-radius", // 14px 4px 14px 4px: asymmetric Dubai architectural aesthetic
    rounded: "rounded-xl",
    pill: "rounded-full",
    square: "rounded-xs",
  };

  // Multi-layered depth shades, ambient colored glow, and borders
  const variantClasses = {
    primary: "btn-shade-primary text-white",
    secondary: "btn-shade-secondary text-brand-primary",
    "secondary-light": "btn-shade-secondary-light text-white",
    dark: "btn-shade-dark text-white",
    outline: "btn-shade-outline text-brand-primary",
    "outline-light": "btn-shade-outline-light text-white",
  };

  // Precise sizing and typographical hierarchy
  const sizeClasses = {
    sm: "text-[11px] tracking-[0.1em] uppercase font-semibold px-4 py-2.5 gap-1.5",
    md: "text-xs tracking-[0.14em] uppercase font-semibold px-6 py-3.5 gap-2",
    lg: "text-[13px] tracking-[0.15em] uppercase font-bold px-8 py-4 gap-2.5",
  };

  // Render the icon node
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "boolean") {
      return (
        <ArrowUpRight
          aria-hidden="true"
          className="w-4 h-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      );
    }
    return (
      <span className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {icon}
      </span>
    );
  };

  const content = (
    <>
      {/* Dynamic light reflection sweep shimmer effect */}
      <span className="btn-shimmer" aria-hidden="true" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {icon && iconPosition === "left" && renderIcon()}
        <span className="transition-colors duration-300">{children}</span>
        {icon && iconPosition === "right" && renderIcon()}
      </span>
    </>
  );

  const combinedClasses = cn(
    baseClasses,
    radiusClasses[radius],
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none shadow-none transform-none",
    className
  );

  if (href) {
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        onClick(e);
      }
      if (href.startsWith("#")) {
        e.preventDefault();
        try {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            const lenis = (
              window as unknown as {
                __lenis?: { scrollTo: (target: Element | string, opts?: object) => void };
              }
            ).__lenis;
            if (lenis) {
              lenis.scrollTo(targetEl as HTMLElement, { offset: -80 });
            } else {
              targetEl.scrollIntoView({ behavior: "smooth" });
            }
            window.history.pushState(null, "", href);
          }
        } catch {
          // Fallback gracefully
        }
      }
    };

    return (
      <Link
        href={href}
        onClick={handleLinkClick}
        className={combinedClasses}
        target={target}
        rel={rel}
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
      className={combinedClasses}
    >
      {content}
    </button>
  );
}

export default Button;
export const CTAButton = Button;
