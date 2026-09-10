import { clearSession, getSession } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST() {
  await clearSession();
  return successResponse(null, "Logged out successfully");
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthenticated", 401);
  }
  return successResponse(session, "Session active");
}
