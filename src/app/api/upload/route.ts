import { NextRequest } from "next/server";
import { uploadFileBuffer } from "@/lib/upload";
import { isSupabaseConfigured, checkSupabaseStorage } from "@/lib/supabase";
import { successResponse, errorResponse } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const subfolder = (formData.get("subfolder") as string) || "general";

    if (!file) {
      return errorResponse("No file provided in form data ('file' field required)", 400);
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadFileBuffer(buffer, file.name, file.type, {
      subfolder,
    });

    return successResponse(result, result.message || "File uploaded successfully");
  } catch (error) {
    console.error("[API/Upload] Error:", error);
    return errorResponse(
      error instanceof Error ? error.message : "Failed to upload file",
      500
    );
  }
}

export async function GET() {
  const hasSupabase = isSupabaseConfigured();
  let bucketHealth: { ok: boolean; message: string } | null = null;

  if (hasSupabase) {
    bucketHealth = await checkSupabaseStorage();
  }

  return successResponse({
    supabaseConfigured: hasSupabase,
    storageBucket: bucketHealth || {
      ok: false,
      message: "Supabase not configured, local fallback active",
    },
    localUploadDir: "/uploads",
  }, "Upload service status");
}
