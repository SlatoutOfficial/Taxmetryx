import { checkPrismaConnection } from "@/lib/prisma";
import { runPrismaSeed } from "../../../../../prisma/seed";
import { getSession } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  // Prisma (Supabase PostgreSQL)
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

  return errorResponse(
    "Supabase database connection is offline. Connect Supabase to run seed.",
    503
  );
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  const isPrismaOnline = await checkPrismaConnection();

  return successResponse(
    {
      prismaOnline: isPrismaOnline,
      activeSource: isPrismaOnline
        ? "Supabase (Prisma)"
        : "Static JSON Fallback",
    },
    isPrismaOnline
      ? "Supabase PostgreSQL connected via Prisma"
      : "Database offline - Serving static JSON fallback with 100% fidelity"
  );
}
