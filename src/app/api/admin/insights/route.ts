import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection as checkMysqlConnection } from "@/lib/db";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getInsights } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";

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
    console.warn("[Admin/Insights] Prisma query failed, trying MySQL:", err);
  }

  // 2. MySQL fallback
  try {
    const isMysqlOnline = await checkMysqlConnection();
    if (isMysqlOnline) {
      const p = getDbPool();
      const [rows] = await p.query<RowDataPacket[]>("SELECT * FROM insights ORDER BY id DESC");
      const formatted = rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        title: r.title,
        category: r.category,
        publishedAt: r.published_at,
        readTime: r.read_time,
        day: r.day,
        monthYear: r.month_year,
        featured: Boolean(r.featured),
        lead: r.lead_text,
        excerpt: r.excerpt,
        image: r.image,
        author: JSON.parse(r.author_json || "{}"),
        tableOfContents: JSON.parse(r.table_of_contents_json || "[]"),
        keyTakeaways: JSON.parse(r.keyTakeaways_json || "[]"),
        sections: JSON.parse(r.sections_json || "[]"),
        tags: JSON.parse(r.tags_json || "[]"),
        relatedSlugs: JSON.parse(r.related_slugs_json || "[]"),
      }));
      return successResponse(formatted, "Insights retrieved from MySQL");
    }
  } catch (err) {
    console.warn("[Admin/Insights] MySQL query failed, using static fallback:", err);
  }

  // 3. Static fallback
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

    // 1. Prisma (Supabase)
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

    // 2. MySQL
    const isMysqlOnline = await checkMysqlConnection();
    if (isMysqlOnline) {
      const p = getDbPool();
      await p.query(
        `INSERT INTO insights (
          slug, title, category, published_at, read_time, day, month_year, featured,
          lead_text, excerpt, image, author_json, table_of_contents_json, key_takeaways_json,
          sections_json, tags_json, related_slugs_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.slug,
          data.title,
          data.category || "Corporate Tax",
          data.publishedAt || new Date().toISOString().split("T")[0],
          data.readTime || "7 min read",
          data.day || new Date().getDate().toString().padStart(2, "0"),
          data.monthYear ||
            new Date()
              .toLocaleDateString("en-US", { month: "short", year: "numeric" })
              .toUpperCase(),
          data.featured ? 1 : 0,
          data.lead || "",
          data.excerpt || "",
          data.image || "/images/insights-architecture.jpg",
          JSON.stringify(data.author || { name: "Taxmetryx Partner", role: "Advisory Leader" }),
          JSON.stringify(data.tableOfContents || []),
          JSON.stringify(data.keyTakeaways || []),
          JSON.stringify(data.sections || []),
          JSON.stringify(data.tags || []),
          JSON.stringify(data.relatedSlugs || []),
        ]
      );
      return successResponse(data, "Publication created successfully in MySQL");
    }

    return errorResponse(
      "Database offline. Connect Supabase or MySQL to persist new publications.",
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

    // 1. Prisma (Supabase)
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

    // 2. MySQL
    const isMysqlOnline = await checkMysqlConnection();
    if (isMysqlOnline) {
      const p = getDbPool();
      await p.query(
        `UPDATE insights SET
          title = ?,
          category = ?,
          read_time = ?,
          featured = ?,
          lead_text = ?,
          excerpt = ?,
          author_json = ?,
          key_takeaways_json = ?,
          sections_json = ?,
          tags_json = ?
        WHERE slug = ?`,
        [
          data.title,
          data.category,
          data.readTime,
          data.featured ? 1 : 0,
          data.lead,
          data.excerpt,
          JSON.stringify(data.author || {}),
          JSON.stringify(data.keyTakeaways || []),
          JSON.stringify(data.sections || []),
          JSON.stringify(data.tags || []),
          data.slug,
        ]
      );
      return successResponse(data, "Publication updated successfully in MySQL");
    }

    return errorResponse(
      "Database offline. Connect Supabase or MySQL to update publications.",
      503
    );
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
