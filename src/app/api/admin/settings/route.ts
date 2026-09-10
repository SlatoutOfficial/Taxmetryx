import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection } from "@/lib/db";
import { getSession } from "@/lib/admin-auth";
import { getSiteConfig } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const isOnline = await checkDbConnection();
  if (!isOnline) {
    return successResponse(getSiteConfig(), "Site config loaded from fallback cache");
  }

  try {
    const p = getDbPool();
    const [rows] = await p.query<RowDataPacket[]>(
      "SELECT config_value FROM site_config WHERE config_key = 'main'"
    );
    if (rows.length === 0) {
      return successResponse(getSiteConfig(), "Default site config returned");
    }
    return successResponse(JSON.parse(rows[0].config_value), "Site config loaded from MySQL");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const configData = await request.json();
    const isOnline = await checkDbConnection();
    if (!isOnline) {
      return errorResponse("MySQL is offline. Connect MySQL to save settings.", 503);
    }

    const p = getDbPool();
    await p.query(
      `INSERT INTO site_config (config_key, config_value)
       VALUES ('main', ?)
       ON DUPLICATE KEY UPDATE config_value = VALUES(config_value)`,
      [JSON.stringify(configData)]
    );

    return successResponse(configData, "Site configuration updated successfully in MySQL");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
