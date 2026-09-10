import { getSiteConfig, getNavigation } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const site = getSiteConfig();
    const navigation = getNavigation();
    return successResponse({ site, navigation }, "Site data retrieved successfully");
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}
