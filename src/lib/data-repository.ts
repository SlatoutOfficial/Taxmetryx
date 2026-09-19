import { prisma, checkPrismaConnection } from "./prisma";
import {
  getServices as getStaticServices,
  getServiceBySlug as getStaticServiceBySlug,
  getInsights as getStaticInsights,
  getInsightBySlug as getStaticInsightBySlug,
  getIndustries as getStaticIndustries,
  getIndustryBySlug as getStaticIndustryBySlug,
  getCareers as getStaticCareers,
  getSiteConfig as getStaticSiteConfig,
} from "./json";
import { Service } from "@/types/service";
import { Insight } from "@/types/insight";
import { Industry } from "@/types/industry";
import { CareersData, JobOpening } from "@/types/career";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

/**
 * Resilient Data Repository:
 * Primary: Prisma (Supabase PostgreSQL)
 * Guaranteed Fallback: High-fidelity static JSON data
 */

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export async function getServices(): Promise<Service[]> {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const rows = await prisma.service.findMany({
        orderBy: { number: "asc" },
      });
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          number: r.number,
          title: r.title,
          eyebrow: r.eyebrow || "",
          shortDescription: r.shortDescription || "",
          description: r.description || "",
          heroStatement: r.heroStatement || "",
          services: JSON.parse(r.servicesJson || "[]"),
          capabilities: JSON.parse(r.capabilitiesJson || "[]"),
          approach: JSON.parse(r.approachJson || "[]"),
          whyItMatters: JSON.parse(r.whyItMattersJson || "{}"),
          keyDeliverables: JSON.parse(r.deliverablesJson || "[]"),
          applicableFrameworks: JSON.parse(r.frameworksJson || "[]"),
          icon: r.icon || "landmark",
          stats: JSON.parse(r.statsJson || "{}"),
          relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
        })) as Service[];
      }
    }
  } catch (err) {
    console.warn("[DataRepo] Services DB query failed, using static fallback:", err);
  }
  return getStaticServices();
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const r = await prisma.service.findUnique({
        where: { slug },
      });
      if (r) {
        return {
          id: r.id,
          slug: r.slug,
          number: r.number,
          title: r.title,
          eyebrow: r.eyebrow || "",
          shortDescription: r.shortDescription || "",
          description: r.description || "",
          heroStatement: r.heroStatement || "",
          services: JSON.parse(r.servicesJson || "[]"),
          capabilities: JSON.parse(r.capabilitiesJson || "[]"),
          approach: JSON.parse(r.approachJson || "[]"),
          whyItMatters: JSON.parse(r.whyItMattersJson || "{}"),
          keyDeliverables: JSON.parse(r.deliverablesJson || "[]"),
          applicableFrameworks: JSON.parse(r.frameworksJson || "[]"),
          icon: r.icon || "landmark",
          stats: JSON.parse(r.statsJson || "{}"),
          relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
        } as Service;
      }
    }
  } catch (err) {
    console.warn(`[DataRepo] Service '${slug}' DB query failed, using static fallback:`, err);
  }
  return getStaticServiceBySlug(slug);
}

// -------------------------------------------------------------
// INSIGHTS
// -------------------------------------------------------------
export async function getInsights(): Promise<Insight[]> {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const rows = await prisma.insight.findMany({
        orderBy: { id: "desc" },
      });
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          publishedAt: r.publishedAt || "",
          readTime: r.readTime || "5 min read",
          day: r.day || "15",
          monthYear: r.monthYear || "MAR 2026",
          featured: r.featured,
          lead: r.leadText || "",
          excerpt: r.excerpt || "",
          image: r.image || "/images/insights-architecture.jpg",
          author: JSON.parse(r.authorJson || "{}"),
          tableOfContents: JSON.parse(r.tableOfContentsJson || "[]"),
          keyTakeaways: JSON.parse(r.keyTakeawaysJson || "[]"),
          sections: JSON.parse(r.sectionsJson || "[]"),
          tags: JSON.parse(r.tagsJson || "[]"),
          relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
        })) as Insight[];
      }
    }
  } catch (err) {
    console.warn("[DataRepo] Insights DB query failed, using static fallback:", err);
  }
  return getStaticInsights();
}

export async function getInsightBySlug(slug: string): Promise<Insight | undefined> {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const r = await prisma.insight.findUnique({
        where: { slug },
      });
      if (r) {
        return {
          id: r.id,
          slug: r.slug,
          title: r.title,
          category: r.category,
          publishedAt: r.publishedAt || "",
          readTime: r.readTime || "5 min read",
          day: r.day || "15",
          monthYear: r.monthYear || "MAR 2026",
          featured: r.featured,
          lead: r.leadText || "",
          excerpt: r.excerpt || "",
          image: r.image || "/images/insights-architecture.jpg",
          author: JSON.parse(r.authorJson || "{}"),
          tableOfContents: JSON.parse(r.tableOfContentsJson || "[]"),
          keyTakeaways: JSON.parse(r.keyTakeawaysJson || "[]"),
          sections: JSON.parse(r.sectionsJson || "[]"),
          tags: JSON.parse(r.tagsJson || "[]"),
          relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
        } as Insight;
      }
    }
  } catch (err) {
    console.warn(`[DataRepo] Insight '${slug}' DB query failed, using static fallback:`, err);
  }
  return getStaticInsightBySlug(slug);
}

// -------------------------------------------------------------
// INDUSTRIES
// -------------------------------------------------------------
export async function getIndustries(): Promise<Industry[]> {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const rows = await prisma.industry.findMany({
        orderBy: { number: "asc" },
      });
      if (rows && rows.length > 0) {
        return rows.map((r) => ({
          id: r.id,
          slug: r.slug,
          number: r.number,
          name: r.name,
          shortDescription: r.shortDescription || "",
          description: r.description || "",
          challenges: JSON.parse(r.challengesJson || "[]"),
          advisoryFocus: JSON.parse(r.advisoryFocusJson || "[]"),
          relatedServices: JSON.parse(r.relatedServicesJson || "[]"),
          stats: JSON.parse(r.statsJson || "{}"),
          image: r.image || "/images/industries-real-estate.jpg",
        })) as Industry[];
      }
    }
  } catch (err) {
    console.warn("[DataRepo] Industries DB query failed, using static fallback:", err);
  }
  return getStaticIndustries();
}

export async function getIndustryBySlug(slug: string): Promise<Industry | undefined> {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const r = await prisma.industry.findUnique({
        where: { slug },
      });
      if (r) {
        return {
          id: r.id,
          slug: r.slug,
          number: r.number,
          name: r.name,
          shortDescription: r.shortDescription || "",
          description: r.description || "",
          challenges: JSON.parse(r.challengesJson || "[]"),
          advisoryFocus: JSON.parse(r.advisoryFocusJson || "[]"),
          relatedServices: JSON.parse(r.relatedServicesJson || "[]"),
          stats: JSON.parse(r.statsJson || "{}"),
          image: r.image || "/images/industries-real-estate.jpg",
        } as Industry;
      }
    }
  } catch (err) {
    console.warn(`[DataRepo] Industry '${slug}' DB query failed, using static fallback:`, err);
  }
  return getStaticIndustryBySlug(slug);
}

// -------------------------------------------------------------
// CAREERS
// -------------------------------------------------------------
export async function getCareers(): Promise<CareersData> {
  const staticCareers = getStaticCareers();
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const rows = await prisma.career.findMany({
        where: { status: "ACTIVE" },
        orderBy: { updatedAt: "desc" },
      });
      if (rows && rows.length > 0) {
        const openings: JobOpening[] = rows.map((r) => ({
          id: r.id,
          title: r.title,
          department: r.department as JobOpening["department"],
          location: r.location as JobOpening["location"],
          type: r.type as JobOpening["type"],
          experience: r.experience || "",
          overview: r.overview || "",
          responsibilities: JSON.parse(r.responsibilitiesJson || "[]"),
          requirements: JSON.parse(r.requirementsJson || "[]"),
          postedDate: r.postedDate || "",
        }));
        return {
          ...staticCareers,
          openings,
        };
      }
    }
  } catch (err) {
    console.warn("[DataRepo] Careers DB query failed, using static fallback:", err);
  }
  return staticCareers;
}

// -------------------------------------------------------------
// APPLICATION & CONTACT SUBMISSIONS (Dual-Tier Persistence)
// -------------------------------------------------------------
export interface CareerApplicationInput {
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  coverLetter?: string;
  resumeUrl?: string;
  resumeFilename?: string;
}

export async function saveCareerApplication(data: CareerApplicationInput) {
  const submissionId = crypto.randomUUID();
  let dbSaved = false;

  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const record = await prisma.careerApplication.create({
        data: {
          id: submissionId,
          jobId: data.jobId,
          jobTitle: data.jobTitle,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          linkedin: data.linkedin,
          coverLetter: data.coverLetter,
          resumeUrl: data.resumeUrl,
          resumeFilename: data.resumeFilename,
        },
      });
      dbSaved = true;
      return { success: true, id: record.id, dbSaved: true };
    }
  } catch (err) {
    console.warn("[DataRepo] Career application DB save failed, saving to local fallback:", err);
  }

  // Fallback to local file record
  try {
    const filePath = path.join(process.cwd(), "src", "data", "career-applications.json");
    let existing: unknown[] = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(content || "[]");
    } catch {
      existing = [];
    }
    existing.push({ id: submissionId, ...data, submittedAt: new Date().toISOString() });
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("[DataRepo] Local file write failed (expected in read-only environments):", fsErr);
  }

  return { success: true, id: submissionId, dbSaved };
}

export interface ContactSubmissionInput {
  name: string;
  company: string;
  email: string;
  phone?: string;
  areaOfInterest?: string;
  message?: string;
}

export async function saveContactSubmission(data: ContactSubmissionInput) {
  const submissionId = crypto.randomUUID();
  let dbSaved = false;

  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const record = await prisma.contactSubmission.create({
        data: {
          id: submissionId,
          name: data.name,
          company: data.company,
          email: data.email,
          phone: data.phone,
          areaOfInterest: data.areaOfInterest,
          message: data.message,
        },
      });
      dbSaved = true;
      return { success: true, id: record.id, dbSaved: true };
    }
  } catch (err) {
    console.warn("[DataRepo] Contact inquiry DB save failed, saving to local fallback:", err);
  }

  // Fallback to local JSON file
  try {
    const filePath = path.join(process.cwd(), "src", "data", "contact-submissions.json");
    let existing: unknown[] = [];
    try {
      const content = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(content || "[]");
    } catch {
      existing = [];
    }
    existing.push({ id: submissionId, ...data, createdAt: new Date().toISOString() });
    await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
  } catch (fsErr) {
    console.warn("[DataRepo] Local file write failed (expected in read-only environments):", fsErr);
  }

  return { success: true, id: submissionId, dbSaved };
}

export async function getSiteConfig() {
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const config = await prisma.siteConfig.findUnique({
        where: { key: "main" },
      });
      if (config && config.valueJson) {
        return JSON.parse(config.valueJson);
      }
    }
  } catch (err) {
    console.warn("[DataRepo] SiteConfig DB query failed, using static fallback:", err);
  }
  return getStaticSiteConfig();
}
