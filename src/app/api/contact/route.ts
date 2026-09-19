import { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validations";
import { successResponse, errorResponse } from "@/lib/api-response";
import { saveContactSubmission } from "@/lib/data-repository";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const formattedErrors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path.join(".");
        if (!formattedErrors[key]) formattedErrors[key] = [];
        formattedErrors[key].push(issue.message);
      });
      return errorResponse("Validation failed", 422, formattedErrors);
    }

    const saved = await saveContactSubmission(result.data);

    return successResponse(
      { id: saved.id, name: result.data.name, email: result.data.email, persistedToDb: saved.dbSaved },
      "Thank you. Your advisory inquiry has been received. A Taxmetryx specialist will contact you shortly."
    );
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      500
    );
  }
}
