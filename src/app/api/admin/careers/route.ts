import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection } from "@/lib/db";
import { getSession } from "@/lib/admin-auth";
import { getCareers } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const isOnline = await checkDbConnection();
  if (!isOnline) {
    return successResponse(getCareers().openings, "Careers loaded from fallback cache");
  }

  try {
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
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    const id = data.id || `job-${crypto.randomUUID().slice(0, 8)}`;

    const isOnline = await checkDbConnection();
    if (!isOnline) {
      return errorResponse("MySQL is offline. Connect MySQL to add roles.", 503);
    }

    const p = getDbPool();
    await p.query(
      `INSERT INTO careers (id, title, department, location, type, experience, overview, responsibilities_json, requirements_json, posted_date, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.title,
        data.department || "Transfer Pricing",
        data.location || "Dubai (DIFC), UAE",
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
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
