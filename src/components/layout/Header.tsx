"use client";
import BrandLogo from "@/components/shared/BrandLogo";
import Container from "@/components/shared/Container";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import ServicesDropdown from "@/components/layout/ServicesDropdown";
import MobileMenu from "@/components/layout/MobileMenu";
import CTAButton from "@/components/shared/CTAButton";
import { getNavigation } from "@/lib/json";

import { useJurisdiction, JURISDICTIONS } from "@/context/JurisdictionContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUaeDropdownOpen, setIsUaeDropdownOpen] = useState(false);
  const { jurisdiction, setJurisdiction } = useJurisdiction();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const navigation = getNavigation();

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
      servicesTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  useEffect(() => {
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUaeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-40 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-[#E7E5E1] py-3.5"
            : "bg-white/95 border-b border-[#E7E5E1] py-4 lg:py-5",
        )}
      >
        <Container className="flex items-center justify-between gap-2">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1.5 group select-none"
          >
            <BrandLogo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-5 xl:space-x-7">
            {navigation.mainNav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.title}
                    className="relative py-2"
                    onMouseEnter={handleServicesEnter}
                    onMouseLeave={handleServicesLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-sm tracking-[0.02em] font-medium transition-colors hover:text-brand-red cursor-pointer",
                        isActive || isServicesOpen
                          ? "text-brand-red font-semibold"
                          : "text-brand-primary",
                      )}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          isServicesOpen
                            ? "rotate-180 text-brand-red"
                            : "text-brand-muted",
                        )}
                      />
                    </button>

                    <ServicesDropdown
                      isOpen={isServicesOpen}
                      onClose={() => setIsServicesOpen(false)}
                      onMouseEnter={handleServicesEnter}
                    />
                  </div>
                );
              }

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "text-sm tracking-[0.02em] font-medium transition-colors hover:text-brand-red relative py-1",
                    isActive
                      ? "text-brand-red font-semibold"
                      : "text-brand-primary",
                  )}
                >
                  {item.title}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-brand-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden xl:flex items-center space-x-5">
            {/* Jurisdiction Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsUaeDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary hover:text-brand-red px-3 py-1.5 border border-[#E7E5E1] bg-white/80 hover:bg-white transition-all rounded-[8px_2px_8px_2px] shadow-xs cursor-pointer"
                aria-expanded={isUaeDropdownOpen}
                aria-haspopup="listbox"
              >
                <Globe className="w-3.5 h-3.5 text-brand-red" />
                <span>{jurisdiction.code}</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 text-brand-muted transition-transform duration-200",
                    isUaeDropdownOpen && "rotate-180 text-brand-red",
                  )}
                />
              </button>

              {isUaeDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-[#E7E5E1] shadow-xl p-1.5 text-xs z-50 animate-in fade-in slide-in-from-top-1"
                  role="listbox"
                >
                  <div className="px-3 py-2 text-[10px] font-semibold tracking-widest text-brand-muted uppercase border-b border-[#E7E5E1]">
                    Jurisdiction Focus
                  </div>
                  <div className="py-1">
                    {JURISDICTIONS.map((j) => {
                      const isSelected = jurisdiction.code === j.code;
                      return (
                        <button
                          key={j.code}
                          type="button"
                          onClick={() => {
                            setJurisdiction(j);
                            setIsUaeDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3 py-2.5 flex items-center justify-between transition-colors rounded-sm cursor-pointer",
                            isSelected
                              ? "font-semibold text-brand-red bg-brand-red/5"
                              : "text-[#555e65] hover:text-brand-primary hover:bg-[#f6f5f2]",
                          )}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <span>{j.name}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-brand-red" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Red CTA Button */}
            <CTAButton href="/contact" variant="primary" size="md" icon>
              Speak to Our Experts
            </CTAButton>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex xl:hidden items-center gap-2">
            <CTAButton href="/contact" size="sm">
              Consult
            </CTAButton>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 border border-[#E7E5E1] bg-white text-brand-primary hover:text-brand-red transition-all rounded-[8px_2px_8px_2px] shadow-xs cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
