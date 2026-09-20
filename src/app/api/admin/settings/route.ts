import { NextRequest } from "next/server";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getSiteConfig } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const config = await prisma.siteConfig.findUnique({
        where: { key: "main" },
      });
      if (config && config.valueJson) {
        return successResponse(JSON.parse(config.valueJson), "Site config loaded from Supabase");
      }
    }
  } catch (err) {
    console.warn("[Admin/Settings] Prisma query failed, using static fallback:", err);
  }

  return successResponse(getSiteConfig(), "Site config loaded from fallback cache");
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const configData = await request.json();
    const isOnline = await checkPrismaConnection();
    if (!isOnline) {
      return errorResponse("Database is offline. Connect Supabase to save settings.", 503);
    }

    const updated = await prisma.siteConfig.upsert({
      where: { key: "main" },
      update: {
        valueJson: JSON.stringify(configData),
      },
      create: {
        key: "main",
        valueJson: JSON.stringify(configData),
      },
    });

    return successResponse(JSON.parse(updated.valueJson), "Site configuration updated successfully in Supabase");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
