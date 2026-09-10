import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { getDbPool, checkDbConnection } from "@/lib/db";
import { getSession } from "@/lib/admin-auth";
import { getTypographyConfig, TypographyConfig } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";

const TYPOGRAPHY_FILE = path.join(process.cwd(), "src", "data", "typography.json");

function readTypographyFromFile(): TypographyConfig {
  try {
    if (fs.existsSync(TYPOGRAPHY_FILE)) {
      const content = fs.readFileSync(TYPOGRAPHY_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading typography.json:", e);
  }
  return getTypographyConfig();
}

function writeTypographyToFile(data: TypographyConfig) {
  try {
    fs.writeFileSync(TYPOGRAPHY_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing typography.json:", e);
  }
}

export async function GET() {
  const isOnline = await checkDbConnection();
  if (!isOnline) {
    return successResponse(readTypographyFromFile(), "Typography loaded from file");
  }

  try {
    const p = getDbPool();
    const [rows] = await p.query<RowDataPacket[]>(
      "SELECT config_value FROM site_config WHERE config_key = 'typography'"
    );
    if (rows.length === 0) {
      return successResponse(readTypographyFromFile(), "Default typography returned");
    }
    return successResponse(JSON.parse(rows[0].config_value), "Typography loaded from MySQL");
  } catch (err) {
    return successResponse(readTypographyFromFile(), "Fallback typography loaded from file");
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data: TypographyConfig = await request.json();

    // Validate
    if (!data.fontHeading || !data.fontBody) {
      return errorResponse("fontHeading and fontBody are required", 400);
    }

    // 1. Dual persistence: Write to file
    writeTypographyToFile(data);

    // 2. Dual persistence: Write to DB if online
    const isOnline = await checkDbConnection();
    if (isOnline) {
      try {
        const p = getDbPool();
        await p.query(
          `INSERT INTO site_config (config_key, config_value)
           VALUES ('typography', ?)
           ON DUPLICATE KEY UPDATE config_value = VALUES(config_value)`,
          [JSON.stringify(data)]
        );
      } catch (dbErr) {
        console.warn("Could not save typography to MySQL, saved to file:", dbErr);
      }
    }

    return successResponse(data, "Font families updated successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Save error", 500);
  }
}
