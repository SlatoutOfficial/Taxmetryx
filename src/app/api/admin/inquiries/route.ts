import { NextRequest } from "next/server";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { getSession } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      const rows = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
      return successResponse(rows, "Inquiries loaded from Supabase");
    }
  } catch (err) {
    console.warn("[Admin/Inquiries] Prisma query failed, trying JSON fallback:", err);
  }

  // Fallback to JSON file
  try {
    const filePath = path.join(process.cwd(), "src", "data", "contact-submissions.json");
    const content = await fs.readFile(filePath, "utf-8");
    const submissions = JSON.parse(content || "[]");
    return successResponse(submissions, "Inquiries loaded from JSON storage");
  } catch {
    return successResponse([], "No inquiries yet");
  }
}

export async function PUT(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return errorResponse("Inquiry ID and new status required", 400);
    }

    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      await prisma.contactSubmission.update({
        where: { id },
        data: { status },
      });
    }

    // Also update JSON file if present
    const filePath = path.join(process.cwd(), "src", "data", "contact-submissions.json");
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const list = JSON.parse(content || "[]");
      const updated = list.map((item: { id: string; status?: string }) =>
        item.id === id ? { ...item, status } : item
      );
      await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");
    } catch {
      // Ignore file update if running serverless
    }

    return successResponse({ id, status }, "Inquiry status updated successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Error updating inquiry", 500);
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) return errorResponse("Unauthorized", 401);

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return errorResponse("ID required", 400);

    const isOnline = await checkPrismaConnection();
    if (isOnline) {
      await prisma.contactSubmission.delete({
        where: { id },
      });
    }

    const filePath = path.join(process.cwd(), "src", "data", "contact-submissions.json");
    try {
      const content = await fs.readFile(filePath, "utf-8");
      const list = JSON.parse(content || "[]");
      const filtered = list.filter((item: { id: string }) => item.id !== id);
      await fs.writeFile(filePath, JSON.stringify(filtered, null, 2), "utf-8");
    } catch {
      // Ignore
    }

    return successResponse({ id }, "Inquiry deleted successfully");
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Error deleting inquiry", 500);
  }
}
