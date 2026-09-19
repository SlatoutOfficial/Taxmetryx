import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getServices } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { Service } from "@/types/service";

const SERVICES_FILE = path.join(process.cwd(), "src", "data", "services.json");
const NAVIGATION_FILE = path.join(process.cwd(), "src", "data", "navigation.json");

function updateNavigationServices(slug: string, title: string, summary?: string) {
  try {
    if (fs.existsSync(NAVIGATION_FILE)) {
      const content = fs.readFileSync(NAVIGATION_FILE, "utf-8");
      const nav = JSON.parse(content);
      if (Array.isArray(nav.servicesDropdown)) {
        const item = nav.servicesDropdown.find((s: { slug: string }) => s.slug === slug);
        if (item) {
          item.title = title;
          if (summary) item.summary = summary;
          fs.writeFileSync(NAVIGATION_FILE, JSON.stringify(nav, null, 2), "utf-8");
        }
      }
    }
  } catch (e) {
    console.error("Error updating navigation.json:", e);
  }
}

function readServicesFromFile(): Service[] {
  try {
    if (fs.existsSync(SERVICES_FILE)) {
      const content = fs.readFileSync(SERVICES_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading services.json:", e);
  }
  return getServices();
}

function writeServicesToFile(services: Service[]) {
  try {
    fs.writeFileSync(SERVICES_FILE, JSON.stringify(services, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing services.json:", e);
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  // 1. Prisma (Supabase)
  try {
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      const fileServices = readServicesFromFile();
      if (slug) {
        const r = (await prisma.service.findUnique({ where: { slug } })) as any;
        if (r) {
          const fallback = fileServices.find((s) => s.slug === slug);
          const subservices = r.subservicesJson ? JSON.parse(r.subservicesJson) : (fallback?.subservices || []);
          const whenToInvolve = r.whenToInvolveJson ? JSON.parse(r.whenToInvolveJson) : (fallback?.whenToInvolve || []);
          const formatted = {
            id: r.id,
            slug: r.slug,
            number: r.number,
            title: r.title,
            eyebrow: r.eyebrow || fallback?.eyebrow || "",
            shortDescription: r.shortDescription || fallback?.shortDescription || "",
            description: r.description || fallback?.description || "",
            heroStatement: r.heroStatement || fallback?.heroStatement || "",
            heroImage: r.heroImage || r.hero_image || fallback?.heroImage || `/images/services/${r.slug}-hero.jpg`,
            contextImage: r.contextImage || r.context_image || fallback?.contextImage || `/images/services/${r.slug}-context.jpg`,
            lede: r.lede || fallback?.lede || "",
            overviewDescription: r.overviewDescription || fallback?.overviewDescription || "",
            whenToInvolve,
            subservices,
            subservicesCount: subservices.length,
            typicalOutputs: r.typicalOutputs || fallback?.typicalOutputs || "",
            services: JSON.parse(r.servicesJson || "[]"),
            capabilities: JSON.parse(r.capabilitiesJson || "[]"),
            approach: JSON.parse(r.approachJson || "[]"),
            whyItMatters: JSON.parse(r.whyItMattersJson || "{}"),
            keyDeliverables: JSON.parse(r.deliverablesJson || "[]"),
            applicableFrameworks: JSON.parse(r.frameworksJson || "[]"),
            icon: r.icon || fallback?.icon || "Scale",
            stats: JSON.parse(r.statsJson || "{}"),
            relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
            faqs: r.faqsJson ? JSON.parse(r.faqsJson) : (fallback?.faqs || []),
          };
          return successResponse(formatted, "Service retrieved from Supabase");
        }
      } else {
        const rows = (await prisma.service.findMany({
          orderBy: { number: "asc" },
        })) as any[];
        const formatted = rows.map((r) => {
          const fallback = fileServices.find((s) => s.slug === r.slug);
          const subservices = r.subservicesJson ? JSON.parse(r.subservicesJson) : (fallback?.subservices || []);
          const whenToInvolve = r.whenToInvolveJson ? JSON.parse(r.whenToInvolveJson) : (fallback?.whenToInvolve || []);
          return {
            id: r.id,
            slug: r.slug,
            number: r.number,
            title: r.title,
            eyebrow: r.eyebrow || fallback?.eyebrow || "",
            shortDescription: r.shortDescription || fallback?.shortDescription || "",
            description: r.description || fallback?.description || "",
            heroStatement: r.heroStatement || fallback?.heroStatement || "",
            heroImage: r.heroImage || r.hero_image || fallback?.heroImage || `/images/services/${r.slug}-hero.jpg`,
            contextImage: r.contextImage || r.context_image || fallback?.contextImage || `/images/services/${r.slug}-context.jpg`,
            lede: r.lede || fallback?.lede || "",
            overviewDescription: r.overviewDescription || fallback?.overviewDescription || "",
            whenToInvolve,
            subservices,
            subservicesCount: subservices.length,
            typicalOutputs: r.typicalOutputs || fallback?.typicalOutputs || "",
            services: JSON.parse(r.servicesJson || "[]"),
            capabilities: JSON.parse(r.capabilitiesJson || "[]"),
            approach: JSON.parse(r.approachJson || "[]"),
            whyItMatters: JSON.parse(r.whyItMattersJson || "{}"),
            keyDeliverables: JSON.parse(r.deliverablesJson || "[]"),
            applicableFrameworks: JSON.parse(r.frameworksJson || "[]"),
            icon: r.icon || fallback?.icon || "Scale",
            stats: JSON.parse(r.statsJson || "{}"),
            relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
            faqs: r.faqsJson ? JSON.parse(r.faqsJson) : (fallback?.faqs || []),
          };
        });
        return successResponse(formatted, "Services retrieved from Supabase (Prisma)");
      }
    }
  } catch (err) {
    console.warn("[Admin/Services] Prisma query failed, using static fallback:", err);
  }

  // 2. File fallback
  const allServices = readServicesFromFile();
  if (slug) {
    const found = allServices.find((s) => s.slug === slug);
    if (!found) return errorResponse("Service not found", 404);
    return successResponse(found, "Service loaded from fallback static file");
  }
  return successResponse(allServices, "Services loaded from fallback static cache");
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    if (!data.slug || !data.title) {
      return errorResponse("Slug and title are required", 400);
    }

    // Always update file as robust persistent fallback
    const fileServices = readServicesFromFile();
    const existingIndex = fileServices.findIndex((s) => s.slug === data.slug);
    if (existingIndex !== -1) {
      fileServices[existingIndex] = {
        ...fileServices[existingIndex],
        ...data,
      };
    } else {
      fileServices.push(data);
    }
    writeServicesToFile(fileServices);
    updateNavigationServices(data.slug, data.title, data.shortDescription);

    try {
      revalidatePath("/", "layout");
      revalidatePath("/services");
      revalidatePath(`/services/${data.slug}`);
    } catch {
      // ignore
    }

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        const updated = await (prisma.service as any).update({
          where: { slug: data.slug },
          data: {
            title: data.title,
            eyebrow: data.eyebrow,
            shortDescription: data.shortDescription,
            description: data.description,
            heroStatement: data.heroStatement,
            servicesJson: JSON.stringify(data.services || []),
            capabilitiesJson: JSON.stringify(data.capabilities || []),
            approachJson: JSON.stringify(data.approach || []),
            deliverablesJson: data.keyDeliverables ? JSON.stringify(data.keyDeliverables) : undefined,
            frameworksJson: data.applicableFrameworks ? JSON.stringify(data.applicableFrameworks) : undefined,
            whyItMattersJson: data.whyItMatters ? JSON.stringify(data.whyItMatters) : undefined,
            statsJson: data.stats ? JSON.stringify(data.stats) : undefined,
            icon: data.icon,
            whenToInvolveJson: data.whenToInvolve ? JSON.stringify(data.whenToInvolve) : undefined,
            subservicesJson: data.subservices ? JSON.stringify(data.subservices) : undefined,
            typicalOutputs: data.typicalOutputs,
            faqsJson: data.faqs ? JSON.stringify(data.faqs) : undefined,
            lede: data.lede,
            overviewDescription: data.overviewDescription,
            heroImage: data.heroImage,
            contextImage: data.contextImage,
          },
        });
        return successResponse(updated, "Service updated successfully in Supabase and local cache");
      }
    } catch (err) {
      console.warn("[Admin/Services] Prisma update error, persisted to file:", err);
    }

    return successResponse(data, "Service updated and saved successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Save error", 500);
  }
}
