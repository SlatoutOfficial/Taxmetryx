import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getTypographyConfig, TypographyConfig } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

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
  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const row = await prisma.siteConfig.findUnique({
        where: { key: "typography" },
      });
      if (row && row.valueJson) {
        return successResponse(JSON.parse(row.valueJson), "Typography loaded from Supabase");
      }
    }
  } catch (err) {
    console.warn("[Admin/Typography] Prisma query failed, using file fallback:", err);
  }

  return successResponse(readTypographyFromFile(), "Typography loaded from file");
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

    const configToSave: TypographyConfig = {
      fontHeading: data.fontHeading,
      fontBody: data.fontBody,
      googleFontHeading: data.googleFontHeading || data.fontHeading,
      googleFontBody: data.googleFontBody || data.fontBody,
    };

    // 1. Write to local file
    writeTypographyToFile(configToSave);

    // 2. Write to Supabase DB if online
    try {
      const isOnline = await checkPrismaConnection();
      if (isOnline) {
        await prisma.siteConfig.upsert({
          where: { key: "typography" },
          update: { valueJson: JSON.stringify(configToSave) },
          create: { key: "typography", valueJson: JSON.stringify(configToSave) },
        });
      }
    } catch (dbErr) {
      console.warn("Could not save typography to Supabase, saved to file:", dbErr);
    }

    return successResponse(configToSave, "Font families updated successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Save error", 500);
  }
}
