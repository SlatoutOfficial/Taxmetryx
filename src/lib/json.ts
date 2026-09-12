import { Service, SubService } from "@/types/service";
import { Insight } from "@/types/insight";
import { Region } from "@/types/region";
import { Industry } from "@/types/industry";
import { CareersData } from "@/types/career";
import { SiteConfig, ValueItem, ExpertiseLayer } from "@/types/common";

import siteData from "@/data/site.json";
import navigationData from "@/data/navigation.json";
import servicesData from "@/data/services.json";
import expertiseData from "@/data/expertise.json";
import valuesData from "@/data/values.json";
import regionsData from "@/data/regions.json";
import insightsData from "@/data/insights.json";
import industriesData from "@/data/industries.json";
import careersData from "@/data/careers.json";

import typographyData from "@/data/typography.json";

export interface TypographyConfig {
  fontHeading: string;
  fontBody: string;
  googleFontHeading?: string;
  googleFontBody?: string;
}

export function getTypographyConfig(): TypographyConfig {
  return typographyData as TypographyConfig;
}

export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getNavigation() {
  return navigationData;
}

export function getServices(): Service[] {
  return servicesData as Service[];
}

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  "vat-indirect-tax": "vat-and-indirect-tax",
  "tax-regulatory-controversy": "tax-regulatory-and-controversy",
  "global-tax-emerging-regulations": "global-tax-and-emerging-regulations",
};

export function getServiceBySlug(slug: string): Service | undefined {
  const normalizedSlug = SERVICE_SLUG_ALIASES[slug] || slug;
  const services = getServices();
  return services.find((s) => s.slug === normalizedSlug);
}

export function slugifySubService(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export interface SubServiceDetail {
  service: Service;
  subservice: SubService;
  index: number;
  total: number;
  prev?: { title: string; slug: string; number: string };
  next?: { title: string; slug: string; number: string };
}

export function getSubServiceBySlug(serviceSlug: string, subSlug: string): SubServiceDetail | undefined {
  const service = getServiceBySlug(serviceSlug);
  if (!service || !service.subservices) return undefined;

  const index = service.subservices.findIndex((sub) => {
    const slug = sub.slug || slugifySubService(sub.title);
    return slug === subSlug;
  });

  if (index === -1) return undefined;

  const subservice = service.subservices[index];
  const total = service.subservices.length;

  const prevSub = index > 0 ? service.subservices[index - 1] : undefined;
  const nextSub = index < total - 1 ? service.subservices[index + 1] : undefined;

  return {
    service,
    subservice: {
      ...subservice,
      slug: subservice.slug || slugifySubService(subservice.title),
    },
    index: index + 1,
    total,
    prev: prevSub
      ? {
          title: prevSub.title,
          slug: prevSub.slug || slugifySubService(prevSub.title),
          number: prevSub.number,
        }
      : undefined,
    next: nextSub
      ? {
          title: nextSub.title,
          slug: nextSub.slug || slugifySubService(nextSub.title),
          number: nextSub.number,
        }
      : undefined,
  };
}

export function getAllSubServiceParams(): { slug: string; subSlug: string }[] {
  const services = getServices();
  const params: { slug: string; subSlug: string }[] = [];

  for (const service of services) {
    if (!service.subservices) continue;
    for (const sub of service.subservices) {
      params.push({
        slug: service.slug,
        subSlug: sub.slug || slugifySubService(sub.title),
      });
    }
  }

  return params;
}

export function getInsights(): Insight[] {
  return insightsData as Insight[];
}

export function getFeaturedInsight(): Insight | undefined {
  const insights = getInsights();
  return insights.find((i) => i.featured) || insights[0];
}

export function getInsightBySlug(slug: string): Insight | undefined {
  const insights = getInsights();
  return insights.find((i) => i.slug === slug);
}

export function getInsightsByCategory(category: string): Insight[] {
  const insights = getInsights();
  if (!category || category === "ALL") return insights;
  return insights.filter(
    (i) => i.category.toLowerCase() === category.toLowerCase()
  );
}

export function getRegions(): Region[] {
  return regionsData as Region[];
}

export function getValues(): ValueItem[] {
  return valuesData as ValueItem[];
}

export function getExpertise(): ExpertiseLayer[] {
  return expertiseData as ExpertiseLayer[];
}

export function getIndustries(): Industry[] {
  return industriesData as Industry[];
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  const industries = getIndustries();
  return industries.find((ind) => ind.slug === slug);
}

export function getCareers(): CareersData {
  return careersData as CareersData;
}
