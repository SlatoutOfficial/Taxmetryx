import { syncJsonToMysql, checkDbConnection } from "@/lib/db";
import { getSession } from "@/lib/admin-auth";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  const isOnline = await checkDbConnection();
  if (!isOnline) {
    return errorResponse(
      "Cannot seed: MySQL server is not connected on port 3306. Please start MySQL and try again.",
      503
    );
  }

  const result = await syncJsonToMysql();
  if (!result.success) {
    return errorResponse(result.message, 500);
  }

  return successResponse(result.counts, result.message);
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return errorResponse("Unauthorized", 401);
  }

  const isOnline = await checkDbConnection();
  return successResponse({ isOnline }, isOnline ? "MySQL is connected" : "MySQL is offline (using fallback)");
}
