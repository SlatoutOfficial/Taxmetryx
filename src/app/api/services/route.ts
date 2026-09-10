import { NextRequest } from "next/server";
import { getServices, getServiceBySlug } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const service = getServiceBySlug(slug);
      if (!service) {
        return errorResponse("Service not found", 404);
      }
      return successResponse(service, "Service retrieved successfully");
    }

    const services = getServices();
    return successResponse(services, "Services retrieved successfully");
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}
