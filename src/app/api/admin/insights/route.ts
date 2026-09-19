import { NextRequest } from "next/server";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getInsights } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  // 1. Prisma (Supabase)
  try {
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      const rows = await prisma.insight.findMany({
        orderBy: { id: "desc" },
      });
      const formatted = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category,
        publishedAt: r.publishedAt,
        readTime: r.readTime,
        day: r.day,
        monthYear: r.monthYear,
        featured: r.featured,
        lead: r.leadText,
        excerpt: r.excerpt,
        image: r.image,
        author: JSON.parse(r.authorJson || "{}"),
        tableOfContents: JSON.parse(r.tableOfContentsJson || "[]"),
        keyTakeaways: JSON.parse(r.keyTakeawaysJson || "[]"),
        sections: JSON.parse(r.sectionsJson || "[]"),
        tags: JSON.parse(r.tagsJson || "[]"),
        relatedSlugs: JSON.parse(r.relatedSlugsJson || "[]"),
      }));
      return successResponse(formatted, "Insights retrieved from Supabase (Prisma)");
    }
  } catch (err) {
    console.warn("[Admin/Insights] Prisma query failed, using static fallback:", err);
  }

  // 2. Static fallback
  return successResponse(getInsights(), "Insights loaded from fallback static cache");
}

export async function POST(request: NextRequest) {
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
      const created = await prisma.insight.create({
        data: {
          slug: data.slug,
          title: data.title,
          category: data.category || "Corporate Tax",
          publishedAt: data.publishedAt || new Date().toISOString().split("T")[0],
          readTime: data.readTime || "7 min read",
          day: data.day || new Date().getDate().toString().padStart(2, "0"),
          monthYear:
            data.monthYear ||
            new Date()
              .toLocaleDateString("en-US", { month: "short", year: "numeric" })
              .toUpperCase(),
          featured: Boolean(data.featured),
          leadText: data.lead || "",
          excerpt: data.excerpt || "",
          image: data.image || "/images/insights-architecture.jpg",
          authorJson: JSON.stringify(
            data.author || { name: "Taxmetryx Partner", role: "Advisory Leader" }
          ),
          tableOfContentsJson: JSON.stringify(data.tableOfContents || []),
          keyTakeawaysJson: JSON.stringify(data.keyTakeaways || []),
          sectionsJson: JSON.stringify(data.sections || []),
          tagsJson: JSON.stringify(data.tags || []),
          relatedSlugsJson: JSON.stringify(data.relatedSlugs || []),
        },
      });
      return successResponse(created, "Publication created successfully in Supabase");
    }

    return errorResponse(
      "Database offline. Connect Supabase to persist new publications.",
      503
    );
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
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
      const updated = await prisma.insight.update({
        where: { slug: data.slug },
        data: {
          title: data.title,
          category: data.category,
          readTime: data.readTime,
          featured: Boolean(data.featured),
          leadText: data.lead,
          excerpt: data.excerpt,
          image: data.image,
          authorJson: JSON.stringify(data.author || {}),
          keyTakeawaysJson: JSON.stringify(data.keyTakeaways || []),
          sectionsJson: JSON.stringify(data.sections || []),
          tagsJson: JSON.stringify(data.tags || []),
        },
      });
      return successResponse(updated, "Publication updated successfully in Supabase");
    }

    return errorResponse(
      "Database offline. Connect Supabase to update publications.",
      503
    );
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return errorResponse("Slug parameter is required", 400);
    }

    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      await prisma.insight.delete({
        where: { slug },
      });
      return successResponse(null, "Publication deleted successfully from database");
    }

    return errorResponse("Database offline.", 503);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

