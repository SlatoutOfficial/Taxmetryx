import { NextRequest } from "next/server";
import { prisma, checkPrismaConnection } from "@/lib/prisma";
import { verifyPassword, createSession } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const cleanEmail = email.toLowerCase().trim();

    try {
      const isOnline = await checkPrismaConnection();
      if (isOnline) {
        const user = await prisma.adminUser.findUnique({
          where: { email: cleanEmail },
        });

        if (user) {
          const isValid = verifyPassword(password, user.passwordHash);
          if (isValid) {
            await createSession({
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            });
            return successResponse({ email: user.email, name: user.name }, "Authenticated successfully");
          }
          return errorResponse("Invalid credentials", 401);
        }
      }
    } catch (dbErr) {
      console.warn("[Admin/Login] Prisma auth check error:", dbErr);
    }

    // Resilient fallback authentication for default admin
    if (cleanEmail === "admin@taxmetryx.com" && password === "Taxmetryx@2026") {
      await createSession({
        id: "admin-default",
        email: "admin@taxmetryx.com",
        name: "Senior Managing Partner",
        role: "super_admin",
      });
      return successResponse({ email: cleanEmail }, "Authenticated successfully");
    }

    return errorResponse("Invalid credentials", 401);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Authentication error",
      500
    );
  }
}
