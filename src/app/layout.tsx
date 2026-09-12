import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import "./home.css";
import SiteShell from "@/components/layout/SiteShell";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taxmetryx.com"),
  title: {
    default: "Taxmetryx | UAE Corporate Tax & Transfer Pricing Advisory",
    template: "%s | Taxmetryx Advisory",
  },
  description:
    "Taxmetryx is a premier UAE-based corporate tax and transfer pricing advisory firm operating from DIFC Dubai, delivering defensible solutions across Transfer Pricing, Corporate Tax, International Tax, and Controversy.",
  keywords: [
    "UAE Corporate Tax",
    "Transfer Pricing Dubai",
    "DIFC Tax Advisory",
    "International Tax UAE",
    "Qualifying Free Zone Person",
    "Pillar Two GloBE",
    "FTA Tax Controversy",
    "TDRC Appeals",
    "VAT Advisory UAE",
  ],
  authors: [{ name: "Taxmetryx Advisory Ltd." }],
  creator: "Taxmetryx Advisory Ltd.",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://taxmetryx.com",
    siteName: "Taxmetryx",
    title: "Taxmetryx | UAE Corporate Tax & Transfer Pricing Advisory",
    description:
      "Complexity. Measured. Resolved. Specialist UAE tax advisory firm operating at the intersection of Transfer Pricing, Corporate Tax, and Global Tax Regulation.",
    images: [
      {
        url: "/images/hero-dubai.jpg",
        width: 1200,
        height: 630,
        alt: "Taxmetryx Corporate Advisory Dubai DIFC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taxmetryx | UAE Corporate Tax & Transfer Pricing Advisory",
    description:
      "Complexity. Measured. Resolved. Premier UAE tax advisory firm.",
    images: ["/images/hero-dubai.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth antialiased ${montserrat.variable}`}>
      <body className={`${montserrat.className} min-h-full flex flex-col bg-[#F8F7F4] text-[#414042] font-sans selection:bg-[#eb0045] selection:text-white`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
