import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection as checkMysqlConnection } from "@/lib/db";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getCareers } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";
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
    console.warn("[Admin/Careers] Prisma query failed, trying MySQL:", err);
  }

  // 2. MySQL fallback
  try {
    const isMysqlOnline = await checkMysqlConnection();
    if (isMysqlOnline) {
      const p = getDbPool();
      const [rows] = await p.query<RowDataPacket[]>("SELECT * FROM careers ORDER BY updated_at DESC");
      const formatted = rows.map((r) => ({
        id: r.id,
        title: r.title,
        department: r.department,
        location: r.location,
        type: r.type,
        experience: r.experience,
        overview: r.overview,
        responsibilities: JSON.parse(r.responsibilities_json || "[]"),
        requirements: JSON.parse(r.requirements_json || "[]"),
        postedDate: r.posted_date,
        status: r.status,
      }));
      return successResponse(formatted, "Careers loaded from MySQL");
    }
  } catch (err) {
    console.warn("[Admin/Careers] MySQL query failed, using static fallback:", err);
  }

  // 3. Static fallback
  return successResponse(getCareers().openings, "Careers loaded from fallback cache");
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    const id = data.id || `job-${crypto.randomUUID().slice(0, 8)}`;

    // 1. Prisma (Supabase)
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

    // 2. MySQL
    const isMysqlOnline = await checkMysqlConnection();
    if (isMysqlOnline) {
      const p = getDbPool();
      await p.query(
        `INSERT INTO careers (id, title, department, location, type, experience, overview, responsibilities_json, requirements_json, posted_date, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          data.title,
          data.department || "Transfer Pricing",
          data.location || "Dubai, UAE",
          data.type || "Full-Time",
          data.experience || "5-8 Years",
          data.overview || "",
          JSON.stringify(data.responsibilities || []),
          JSON.stringify(data.requirements || []),
          data.postedDate || new Date().toISOString().split("T")[0],
          data.status || "ACTIVE",
        ]
      );
      return successResponse({ id, ...data }, "Career position created successfully in MySQL");
    }

    return errorResponse(
      "Database offline. Connect Supabase or MySQL to add roles.",
      503
    );
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
