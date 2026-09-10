"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ToastProvider from "@/components/ui/ToastProvider";
import { JurisdictionProvider } from "@/context/JurisdictionContext";

import DynamicFonts from "@/components/layout/DynamicFonts";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  if (isAdmin) {
    return (
      <JurisdictionProvider>
        <DynamicFonts />
        {children}
        <ToastProvider />
      </JurisdictionProvider>
    );
  }

  return (
    <JurisdictionProvider>
      <DynamicFonts />
      <SmoothScroll>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToastProvider />
      </SmoothScroll>
    </JurisdictionProvider>
  );
}

