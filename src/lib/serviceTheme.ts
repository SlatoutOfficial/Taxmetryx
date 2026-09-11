export interface ServiceTheme {
  slug: string;
  themeName: string;
  heroImage: string;
  contextImage: string;
  contextCaption: string;
  badgeLabel: string;
  primaryColor: string;
  accentColor: string;
  accentLight: string;
  accentBorder: string;
  accentBadgeBg: string;
  accentBadgeText: string;
  heroGradient: string;
  cardBorderHover: string;
  statBadgeBg: string;
  accentHighlightText: string;
  statCard: {
    number: string;
    label: string;
    sublabel: string;
  };
  highlightQuote: {
    quote: string;
    author: string;
    title: string;
  };
}

// Brand Homepage Palette Constants
const BRAND_RED = "#D90016";
const BRAND_DARK = "#061016";
const HERO_GRADIENT = "from-[#061016] via-[#0A161E] to-[#13222B]";

export const serviceThemes: Record<string, ServiceTheme> = {
  "transfer-pricing": {
    slug: "transfer-pricing",
    themeName: "Economic Valuation & Arm's Length Alignment",
    heroImage: "/images/services/transfer-pricing-hero.jpg",
    contextImage: "/images/services/transfer-pricing-context.jpg",
    contextCaption: "DIFC Econometric Interquartile Analysis & FAR Benchmarking Dossier",
    badgeLabel: "OECD & FTA STATUTORY ALIGNMENT",
    primaryColor: BRAND_DARK,
    accentColor: BRAND_RED,
    accentLight: "rgba(217, 0, 22, 0.12)",
    accentBorder: "border-[#D90016]/30",
    accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
    accentBadgeText: "text-[#D90016]",
    heroGradient: HERO_GRADIENT,
    cardBorderHover: "hover:border-[#D90016]",
    statBadgeBg: "bg-[#D90016]/10",
    accentHighlightText: "text-[#D90016]",
    statCard: {
      number: "450+",
      label: "Intercompany Benchmarks Completed",
      sublabel: "Moody's & TP Catalyst Datasets",
    },
    highlightQuote: {
      quote: "Defensible economics and rigorous FAR substantiation are the only insurmountable shields against FTA transfer pricing adjustments.",
      author: "Advisory Practice Head",
      title: "Transfer Pricing & Economics, DIFC",
    },
  },
  "corporate-tax": {
    slug: "corporate-tax",
    themeName: "UAE Federal Corporate Tax & Free Zone Governance",
    heroImage: "/images/services/corporate-tax-hero.jpg",
    contextImage: "/images/services/corporate-tax-context.jpg",
    contextCaption: "UAE Federal Corporate Tax Advisory & QFZP Substance Protocol",
    badgeLabel: "DECREE-LAW NO. 47 OF 2022",
    primaryColor: BRAND_DARK,
    accentColor: BRAND_RED,
    accentLight: "rgba(217, 0, 22, 0.12)",
    accentBorder: "border-[#D90016]/30",
    accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
    accentBadgeText: "text-[#D90016]",
    heroGradient: HERO_GRADIENT,
    cardBorderHover: "hover:border-[#D90016]",
    statBadgeBg: "bg-[#D90016]/10",
    accentHighlightText: "text-[#D90016]",
    statCard: {
      number: "100%",
      label: "QFZP Qualification Defensibility",
      sublabel: "Cabinet Decision No. 139/2023 Compliant",
    },
    highlightQuote: {
      quote: "In the UAE corporate tax regime, maintaining 0% Qualifying Free Zone status requires surgical precision across every invoice line item.",
      author: "Corporate Tax Partner",
      title: "Federal Tax Practice Group",
    },
  },
  "international-tax": {
    slug: "international-tax",
    themeName: "Global Structuring, Pillar Two & Treaty Architecture",
    heroImage: "/images/services/international-tax-hero.jpg",
    contextImage: "/images/services/international-tax-context.jpg",
    contextCaption: "Cross-Border Treaty Network & GloBE Top-Up Tax Analysis",
    badgeLabel: "OECD PILLAR TWO & 140+ DTAAs",
    primaryColor: BRAND_DARK,
    accentColor: BRAND_RED,
    accentLight: "rgba(217, 0, 22, 0.12)",
    accentBorder: "border-[#D90016]/30",
    accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
    accentBadgeText: "text-[#D90016]",
    heroGradient: HERO_GRADIENT,
    cardBorderHover: "hover:border-[#D90016]",
    statBadgeBg: "bg-[#D90016]/10",
    accentHighlightText: "text-[#D90016]",
    statCard: {
      number: "140+",
      label: "Bilateral Double Tax Treaties",
      sublabel: "Principal Purpose Test (PPT) Defended",
    },
    highlightQuote: {
      quote: "Cross-border tax planning without robust operational substance is an invitation to treaty denial and GloBE top-up liabilities.",
      author: "International Tax Lead",
      title: "Cross-Border Structuring Group",
    },
  },
  "vat-and-indirect-tax": {
    slug: "vat-and-indirect-tax",
    themeName: "Transactional Integrity & Supply Chain Certainty",
    heroImage: "/images/services/vat-and-indirect-tax-hero.jpg",
    contextImage: "/images/services/vat-and-indirect-tax-context.jpg",
    contextCaption: "Federal Tax Authority VAT Audit Dossier & Port Customs Reconciliation",
    badgeLabel: "DECREE-LAW NO. 8 OF 2017 & GCC FRAMEWORK",
    primaryColor: BRAND_DARK,
    accentColor: BRAND_RED,
    accentLight: "rgba(217, 0, 22, 0.12)",
    accentBorder: "border-[#D90016]/30",
    accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
    accentBadgeText: "text-[#D90016]",
    heroGradient: HERO_GRADIENT,
    cardBorderHover: "hover:border-[#D90016]",
    statBadgeBg: "bg-[#D90016]/10",
    accentHighlightText: "text-[#D90016]",
    statCard: {
      number: "100%",
      label: "Voluntary Disclosure Acceptance",
      sublabel: "Form 211 FTA Submissions & Approvals",
    },
    highlightQuote: {
      quote: "Supply chain indirect tax errors compound invisibly until an FTA audit notification transforms minor oversights into catastrophic liabilities.",
      author: "Indirect Tax Director",
      title: "GCC VAT & Customs Practice",
    },
  },
  "tax-regulatory-and-controversy": {
    slug: "tax-regulatory-and-controversy",
    themeName: "Dispute Defense, FTA Reconsideration & TDRC Advocacy",
    heroImage: "/images/services/tax-regulatory-and-controversy-hero.jpg",
    contextImage: "/images/services/tax-regulatory-and-controversy-context.jpg",
    contextCaption: "UAE Tax Disputes Resolution Committee (TDRC) Registered Petition",
    badgeLabel: "TAX PROCEDURES LAW (DECREE-LAW 28/2022)",
    primaryColor: BRAND_DARK,
    accentColor: BRAND_RED,
    accentLight: "rgba(217, 0, 22, 0.12)",
    accentBorder: "border-[#D90016]/30",
    accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
    accentBadgeText: "text-[#D90016]",
    heroGradient: HERO_GRADIENT,
    cardBorderHover: "hover:border-[#D90016]",
    statBadgeBg: "bg-[#D90016]/10",
    accentHighlightText: "text-[#D90016]",
    statCard: {
      number: "AED 120M+",
      label: "Disputed Assessments Defended",
      sublabel: "TDRC Hearings & Cabinet Res. 49 Waivers",
    },
    highlightQuote: {
      quote: "The statutory 40-day reconsideration window is unforgiving. Forensic documentation and legal precision during initial response dictate the final judicial outcome.",
      author: "Head of Tax Litigation",
      title: "Controversy & Appellate Practice",
    },
  },
  "global-tax-and-emerging-regulations": {
    slug: "global-tax-and-emerging-regulations",
    themeName: "Substance, Transparency & Next-Gen Tax Governance",
    heroImage: "/images/services/global-tax-and-emerging-regulations-hero.jpg",
    contextImage: "/images/services/global-tax-and-emerging-regulations-context.jpg",
    contextCaption: "ADGM & VARA Regulatory Matrix & Economic Substance Protocol",
    badgeLabel: "ESR, CbCR & CARF GLOBAL MATRIX",
    primaryColor: BRAND_DARK,
    accentColor: BRAND_RED,
    accentLight: "rgba(217, 0, 22, 0.12)",
    accentBorder: "border-[#D90016]/30",
    accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
    accentBadgeText: "text-[#D90016]",
    heroGradient: HERO_GRADIENT,
    cardBorderHover: "hover:border-[#D90016]",
    statBadgeBg: "bg-[#D90016]/10",
    accentHighlightText: "text-[#D90016]",
    statCard: {
      number: "100%",
      label: "Ministry of Finance Compliance",
      sublabel: "Automatic Exchange of Information Safe",
    },
    highlightQuote: {
      quote: "Digital platforms and Web3 ventures in UAE cannot rely on paper substance. Real CIGA execution on UAE soil is non-negotiable under international transparency treaties.",
      author: "Emerging Tech Tax Lead",
      title: "Digital Assets & ESG Tax Advisory",
    },
  },
};

export function getServiceTheme(slug: string): ServiceTheme {
  return (
    serviceThemes[slug] || {
      slug,
      themeName: "Specialized Corporate Tax Advisory",
      heroImage: "/images/services/transfer-pricing-hero.jpg",
      contextImage: "/images/services/transfer-pricing-context.jpg",
      contextCaption: "Taxmetryx DIFC Technical Advisory Practice",
      badgeLabel: "UAE TAX STATUTE",
      primaryColor: BRAND_DARK,
      accentColor: BRAND_RED,
      accentLight: "rgba(217, 0, 22, 0.12)",
      accentBorder: "border-[#D90016]/30",
      accentBadgeBg: "bg-[#D90016]/10 text-[#D90016]",
      accentBadgeText: "text-[#D90016]",
      heroGradient: HERO_GRADIENT,
      cardBorderHover: "hover:border-[#D90016]",
      statBadgeBg: "bg-[#D90016]/10",
      accentHighlightText: "text-[#D90016]",
      statCard: {
        number: "DIFC",
        label: "Direct Partner Representation",
        sublabel: "UAE FTA Accredited Advisory",
      },
      highlightQuote: {
        quote: "Direct partner representation and unyielding technical rigor for enterprise groups across the UAE and GCC.",
        author: "Managing Partner",
        title: "Taxmetryx Advisory DIFC",
      },
    }
  );
}
