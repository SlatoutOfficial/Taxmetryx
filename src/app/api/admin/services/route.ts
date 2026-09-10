import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection } from "@/lib/db";
import { getSession } from "@/lib/admin-auth";
import { getServices } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const isOnline = await checkDbConnection();
  if (!isOnline) {
    return successResponse(getServices(), "Services loaded from fallback cache");
  }

  try {
    const p = getDbPool();
    const [rows] = await p.query<RowDataPacket[]>("SELECT * FROM services ORDER BY number ASC");
    const formatted = rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      number: r.number,
      title: r.title,
      eyebrow: r.eyebrow,
      shortDescription: r.short_description,
      description: r.description,
      heroStatement: r.hero_statement,
      services: JSON.parse(r.services_json || "[]"),
      capabilities: JSON.parse(r.capabilities_json || "[]"),
      approach: JSON.parse(r.approach_json || "[]"),
      whyItMatters: JSON.parse(r.why_it_matters_json || "{}"),
      keyDeliverables: JSON.parse(r.deliverables_json || "[]"),
      applicableFrameworks: JSON.parse(r.frameworks_json || "[]"),
      icon: r.icon,
      stats: JSON.parse(r.stats_json || "{}"),
      relatedSlugs: JSON.parse(r.related_slugs_json || "[]"),
    }));
    return successResponse(formatted, "Services retrieved from MySQL");
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
      return errorResponse("MySQL is not connected. Start MySQL to save changes.", 503);
    }

    const p = getDbPool();
    await p.query(
      `UPDATE services SET
        number = ?,
        title = ?,
        eyebrow = ?,
        short_description = ?,
        description = ?,
        hero_statement = ?,
        services_json = ?,
        capabilities_json = ?,
        approach_json = ?,
        why_it_matters_json = ?,
        deliverables_json = ?,
        frameworks_json = ?,
        icon = ?,
        stats_json = ?,
        related_slugs_json = ?
      WHERE slug = ?`,
      [
        data.number,
        data.title,
        data.eyebrow,
        data.shortDescription,
        data.description,
        data.heroStatement,
        JSON.stringify(data.services || []),
        JSON.stringify(data.capabilities || []),
        JSON.stringify(data.approach || []),
        JSON.stringify(data.whyItMatters || {}),
        JSON.stringify(data.keyDeliverables || []),
        JSON.stringify(data.applicableFrameworks || []),
        data.icon || "Scale",
        JSON.stringify(data.stats || {}),
        JSON.stringify(data.relatedSlugs || []),
        data.slug,
      ]
    );

    return successResponse(data, "Practice updated successfully in MySQL");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
