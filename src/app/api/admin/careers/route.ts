import { NextRequest } from "next/server";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getCareers } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import crypto from "crypto";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  // 1. Prisma (Supabase)
  try {
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      const rows = await prisma.career.findMany({
        orderBy: { updatedAt: "desc" },
      });
      const formatted = rows.map((r) => ({
        id: r.id,
        title: r.title,
        department: r.department,
        location: r.location,
        type: r.type,
        experience: r.experience,
        overview: r.overview,
        responsibilities: JSON.parse(r.responsibilitiesJson || "[]"),
        requirements: JSON.parse(r.requirementsJson || "[]"),
        postedDate: r.postedDate,
        status: r.status,
      }));
      return successResponse(formatted, "Careers loaded from Supabase (Prisma)");
    }
  } catch (err) {
    console.warn("[Admin/Careers] Prisma query failed, using static fallback:", err);
  }

  // 2. Static fallback
  return successResponse(getCareers().openings, "Careers loaded from fallback cache");
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    const id = data.id || `job-${crypto.randomUUID().slice(0, 8)}`;

    // Prisma (Supabase)
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      const created = await prisma.career.create({
        data: {
          id,
          title: data.title,
          department: data.department || "Transfer Pricing",
          location: data.location || "Dubai, UAE",
          type: data.type || "Full-Time",
          experience: data.experience || "5-8 Years",
          overview: data.overview || "",
          responsibilitiesJson: JSON.stringify(data.responsibilities || []),
          requirementsJson: JSON.stringify(data.requirements || []),
          postedDate: data.postedDate || new Date().toISOString().split("T")[0],
          status: data.status || "ACTIVE",
        },
      });
      return successResponse(created, "Career position created successfully in Supabase");
    }

    return errorResponse(
      "Database offline. Connect Supabase to add roles.",
      503
    );
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
