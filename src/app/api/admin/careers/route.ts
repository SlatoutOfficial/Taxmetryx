import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { getCareers } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";
import { JobOpening, CareersData } from "@/types/career";
import crypto from "crypto";

const CAREERS_FILE = path.join(process.cwd(), "src", "data", "careers.json");

function readCareersDataFromFile(): CareersData {
  try {
    if (fs.existsSync(CAREERS_FILE)) {
      const content = fs.readFileSync(CAREERS_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("Error reading careers.json:", e);
  }
  return getCareers();
}

function writeCareersDataToFile(data: CareersData) {
  try {
    fs.writeFileSync(CAREERS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing careers.json:", e);
  }
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // 1. Prisma (Supabase)
  try {
    const isPrismaOnline = await checkPrismaConnection();
    if (isPrismaOnline) {
      if (id) {
        const r = await prisma.career.findUnique({ where: { id } });
        if (r) {
          const formatted = {
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
          };
          return successResponse(formatted, "Career loaded from Supabase");
        }
      } else {
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
    }
  } catch (err) {
    console.warn("[Admin/Careers] Prisma query failed, using static fallback:", err);
  }

  // 2. Static fallback
  const careersData = readCareersDataFromFile();
  if (id) {
    const found = careersData.openings.find((o) => o.id === id);
    if (!found) return errorResponse("Career opening not found", 404);
    return successResponse(found, "Career loaded from fallback cache");
  }
  return successResponse(careersData.openings, "Careers loaded from fallback cache");
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    const id = data.id || `job-${crypto.randomUUID().slice(0, 8)}`;

    const newOpening: JobOpening = {
      id,
      title: data.title,
      department: data.department || "Transfer Pricing",
      location: data.location || "Dubai, UAE",
      type: data.type || "Full-Time",
      experience: data.experience || "5-8 Years",
      overview: data.overview || "",
      responsibilities: data.responsibilities || [],
      requirements: data.requirements || [],
      postedDate: data.postedDate || new Date().toISOString().split("T")[0],
    };

    // Always persist to local file
    const fileData = readCareersDataFromFile();
    fileData.openings.unshift(newOpening);
    writeCareersDataToFile(fileData);

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        const created = await prisma.career.create({
          data: {
            id,
            title: newOpening.title,
            department: newOpening.department,
            location: newOpening.location,
            type: newOpening.type,
            experience: newOpening.experience,
            overview: newOpening.overview,
            responsibilitiesJson: JSON.stringify(newOpening.responsibilities),
            requirementsJson: JSON.stringify(newOpening.requirements),
            postedDate: newOpening.postedDate,
            status: data.status || "ACTIVE",
          },
        });
        return successResponse(created, "Career position created successfully in Supabase");
      }
    } catch (err) {
      console.warn("[Admin/Careers] Prisma create failed, saved to file:", err);
    }

    return successResponse(newOpening, "Career position created successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const data = await request.json();
    if (!data.id || !data.title) {
      return errorResponse("ID and title are required", 400);
    }

    // Always persist to local file
    const fileData = readCareersDataFromFile();
    const existingIndex = fileData.openings.findIndex((o) => o.id === data.id);
    const updatedOpening: JobOpening = {
      ...(existingIndex !== -1 ? fileData.openings[existingIndex] : { id: data.id, title: data.title }),
      ...data,
    };

    if (existingIndex !== -1) {
      fileData.openings[existingIndex] = updatedOpening;
    } else {
      fileData.openings.unshift(updatedOpening);
    }
    writeCareersDataToFile(fileData);

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        const updated = await prisma.career.update({
          where: { id: data.id },
          data: {
            title: data.title,
            department: data.department,
            location: data.location,
            type: data.type,
            experience: data.experience,
            overview: data.overview,
            responsibilitiesJson: JSON.stringify(data.responsibilities || []),
            requirementsJson: JSON.stringify(data.requirements || []),
            status: data.status || "ACTIVE",
          },
        });
        return successResponse(updated, "Career position updated successfully in Supabase");
      }
    } catch (err) {
      console.warn("[Admin/Careers] Prisma update failed, saved to file:", err);
    }

    return successResponse(updatedOpening, "Career position updated successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return errorResponse("ID parameter is required", 400);
    }

    // Always delete from local file
    const fileData = readCareersDataFromFile();
    fileData.openings = fileData.openings.filter((o) => o.id !== id);
    writeCareersDataToFile(fileData);

    // Prisma (Supabase) if online
    try {
      const isPrismaOnline = await checkPrismaConnection();
      if (isPrismaOnline) {
        await prisma.career.delete({ where: { id } });
        return successResponse(null, "Career deleted successfully from Supabase");
      }
    } catch (err) {
      console.warn("[Admin/Careers] Prisma delete failed:", err);
    }

    return successResponse(null, "Career opening deleted successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Database error", 500);
  }
}
