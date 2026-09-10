export interface InsightAuthor {
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export interface InsightSection {
  heading: string;
  content: string[];
}

export interface Insight {
  id: number;
  slug: string;
  title: string;
  category: "Transfer Pricing" | "Corporate Tax" | "International Tax" | "VAT & Indirect Tax" | "Tax Regulation" | "Global Tax";
  jurisdiction?: "UAE" | "KSA" | "UK & EU" | "APAC";
  publishedAt: string;
  readTime: string;
  day: string;
  monthYear: string;
  featured?: boolean;
  lead: string;
  excerpt: string;
  image: string;
  author: InsightAuthor;
  tableOfContents?: { id: string; title: string }[];
  keyTakeaways: string[];
  sections: InsightSection[];
  tags: string[];
  relatedSlugs: string[];
}
