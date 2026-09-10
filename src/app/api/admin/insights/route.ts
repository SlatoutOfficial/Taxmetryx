import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection } from "@/lib/db";
import { getSession } from "@/lib/admin-auth";
import { getInsights } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const isOnline = await checkDbConnection();
  if (!isOnline) {
    return successResponse(getInsights(), "Insights loaded from fallback cache");
  }

  try {
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
      keyTakeaways: JSON.parse(r.key_takeaways_json || "[]"),
      sections: JSON.parse(r.sections_json || "[]"),
      tags: JSON.parse(r.tags_json || "[]"),
      relatedSlugs: JSON.parse(r.related_slugs_json || "[]"),
    }));
    return successResponse(formatted, "Insights retrieved from MySQL");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    if (!data.slug || !data.title) {
      return errorResponse("Slug and title are required", 400);
    }

    const isOnline = await checkDbConnection();
    if (!isOnline) {
      return errorResponse("MySQL is offline. Connect MySQL to create new publications.", 503);
    }

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
        data.monthYear || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase(),
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

    const isOnline = await checkDbConnection();
    if (!isOnline) {
      return errorResponse("MySQL is offline. Connect MySQL to update publications.", 503);
    }

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
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
