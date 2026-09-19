import { syncJsonToMysql, checkDbConnection as checkMysqlConnection } from "@/lib/db";
import { checkPrismaConnection } from "@/lib/prisma";
import { runPrismaSeed } from "../../../../../prisma/seed";
import { getSession } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  // 1. Try Prisma (Supabase PostgreSQL)
  const isPrismaOnline = await checkPrismaConnection();
  if (isPrismaOnline) {
    try {
      const result = await runPrismaSeed();
      return successResponse(
        result.counts,
        "Database seeded successfully via Prisma to Supabase PostgreSQL."
      );
    } catch (prismaErr) {
      console.error("[Seed API] Prisma seed failed:", prismaErr);
      return errorResponse(
        prismaErr instanceof Error ? prismaErr.message : "Prisma seed error",
        500
      );
    }
  }

  // 2. Try MySQL fallback
  const isMysqlOnline = await checkMysqlConnection();
  if (isMysqlOnline) {
    const result = await syncJsonToMysql();
    if (!result.success) {
      return errorResponse(result.message, 500);
    }
    return successResponse(result.counts, result.message);
  }

  return errorResponse(
    "No database connection available (both Supabase/Prisma and MySQL are offline). Using static JSON data fallback.",
    503
  );
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  const isPrismaOnline = await checkPrismaConnection();
  const isMysqlOnline = await checkMysqlConnection();

  return successResponse(
    {
      prismaOnline: isPrismaOnline,
      mysqlOnline: isMysqlOnline,
      activeSource: isPrismaOnline
        ? "Supabase (Prisma)"
        : isMysqlOnline
        ? "MySQL"
        : "Static JSON Fallback",
    },
    isPrismaOnline
      ? "Supabase PostgreSQL connected via Prisma"
      : isMysqlOnline
      ? "MySQL connected"
      : "Databases offline - Serving static JSON fallback with 100% fidelity"
  );
}
