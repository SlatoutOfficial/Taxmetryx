import { NextRequest } from "next/server";
import { getInsights, getInsightBySlug } from "@/lib/data-repository";
import { getInsightsByCategory } from "@/lib/json";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    if (slug) {
      const insight = await getInsightBySlug(slug);
      if (!insight) {
        return errorResponse("Insight not found", 404);
      }
      return successResponse(insight, "Insight retrieved successfully");
    }

    if (category) {
      const allInsights = await getInsights();
      const filtered = category === "ALL" 
        ? allInsights 
        : allInsights.filter(i => i.category.toLowerCase() === category.toLowerCase());
      return successResponse(filtered, `Insights for category: ${category}`);
    }

    const insights = await getInsights();
    return successResponse(insights, "Insights retrieved successfully");
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}
