import { NextRequest } from "next/server";
import { getInsights, getInsightBySlug, getInsightsByCategory } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    if (slug) {
      const insight = getInsightBySlug(slug);
      if (!insight) {
        return errorResponse("Insight not found", 404);
      }
      return successResponse(insight, "Insight retrieved successfully");
    }

    if (category) {
      const filtered = getInsightsByCategory(category);
      return successResponse(filtered, `Insights for category: ${category}`);
    }

    const insights = getInsights();
    return successResponse(insights, "Insights retrieved successfully");
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}
