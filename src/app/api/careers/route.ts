import { NextRequest } from "next/server";
import { getCareers, saveCareerApplication } from "@/lib/data-repository";
import { careerApplicationSchema } from "@/lib/validations";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function GET() {
  try {
    const careers = await getCareers();
    return successResponse(careers, "Careers data retrieved successfully");
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = careerApplicationSchema.safeParse(body);

    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        if (!formattedErrors[key]) formattedErrors[key] = [];
        formattedErrors[key].push(issue.message);
      });
      return errorResponse("Validation failed", 422, formattedErrors);
    }

    const saved = await saveCareerApplication(result.data);

    return successResponse(
      { id: saved.id, ...result.data, dbSaved: saved.dbSaved },
      "Your application has been received by Taxmetryx Talent Advisory. We review profiles within 5 business days."
    );
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}
