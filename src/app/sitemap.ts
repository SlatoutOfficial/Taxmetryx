import { MetadataRoute } from "next";
import { getServices, getInsights, getIndustries } from "@/lib/json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://taxmetryx.com";

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/insights",
    "/careers",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const services = getServices().map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const insights = getInsights().map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    lastModified: new Date(i.publishedAt).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...services, ...insights];
}
