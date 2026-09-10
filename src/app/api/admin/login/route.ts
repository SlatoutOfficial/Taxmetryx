import { NextRequest } from "next/server";
import { getDbPool, checkDbConnection } from "@/lib/db";
import { verifyPassword, createSession, hashPassword } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";
import { RowDataPacket } from "mysql2";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return errorResponse("Email and password are required", 400);
    }

    const isOnline = await checkDbConnection();

    if (isOnline) {
      const p = getDbPool();
      const [rows] = await p.query<RowDataPacket[]>(
        "SELECT * FROM admin_users WHERE email = ?",
        [email.toLowerCase().trim()]
      );

      if (rows.length === 0) {
        // Fallback default admin check
        if (email.toLowerCase().trim() === "admin@taxmetryx.com" && password === "Taxmetryx@2026") {
          await createSession({
            id: "admin-default",
            email: "admin@taxmetryx.com",
            name: "Senior Managing Partner",
            role: "super_admin",
          });
          return successResponse({ email }, "Authenticated successfully");
        }
        return errorResponse("Invalid credentials", 401);
      }

      const user = rows[0];
      const isValid = verifyPassword(password, user.password_hash);
      if (!isValid) {
        return errorResponse("Invalid credentials", 401);
      }

      await createSession({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return successResponse({ email: user.email, name: user.name }, "Authenticated successfully");
    } else {
      // Fallback auth when MySQL is offline or initializing
      if (email.toLowerCase().trim() === "admin@taxmetryx.com" && password === "Taxmetryx@2026") {
        await createSession({
          id: "admin-offline",
          email: "admin@taxmetryx.com",
          name: "Senior Managing Partner",
          role: "super_admin",
        });
        return successResponse(
          { email, mode: "offline-fallback" },
          "Authenticated successfully (Resilient fallback mode)"
        );
      }
      return errorResponse("Invalid credentials", 401);
    }
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Authentication error",
      500
    );
  }
}
