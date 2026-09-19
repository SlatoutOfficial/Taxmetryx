import { NextRequest } from "next/server";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getServices } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  // 1. Prisma (Supabase)
  try {
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      const rows = await prisma.service.findMany({
        orderBy: { number: "asc" },
      });
      const formatted = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        number: r.number,
        title: r.title,
        eyebrow: r.eyebrow,
        shortDescription: r.shortDescription,
        description: r.description,
        heroStatement: r.heroStatement,
        services: JSON.parse(r.servicesJson || "[]"),
        capabilities: JSON.parse(r.capabilitiesJson || "[]"),
        approach: JSON.parse(r.approachJson || "[]"),
        whyItMatters: JSON.parse(r.whyItMattersJson || "{}"),
        keyDeliverables: JSON.parse(r.deliverablesJson || "[]"),
        applicableFrameworks: JSON.parse(r.frameworksJson || "[]"),
        icon: r.icon,
        stats: JSON.parse(r.statsJson || "{}"),
        relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
      }));
      return successResponse(formatted, "Services retrieved from Supabase (Prisma)");
    }
  } catch (err) {
    console.warn("[Admin/Services] Prisma query failed, using static fallback:", err);
  }

  // 2. Static fallback
  return successResponse(getServices(), "Services loaded from fallback static cache");
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    if (!data.slug || !data.title) {
      return errorResponse("Slug and title are required", 400);
    }

    // Prisma (Supabase)
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      const updated = await prisma.service.update({
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
          icon: data.icon,
        },
      });
      return successResponse(updated, "Service updated successfully in Supabase");
    }

    return errorResponse(
      "Database offline. Connect Supabase to update services.",
      503
    );
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
