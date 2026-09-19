import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import multer from "multer";
import {
  getSupabaseAdminClient,
  getSupabaseClient,
  DEFAULT_STORAGE_BUCKET,
} from "./supabase";
import { prisma, checkPrismaConnection } from "./prisma";

export interface UploadResult {
  success: boolean;
  url: string;
  provider: "supabase" | "local";
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  message?: string;
  error?: string;
}

export interface UploadOptions {
  subfolder?: string;
  bucketName?: string;
  allowedMimeTypes?: string[];
  maxSizeBytes?: number; // Default: 15MB
}

const DEFAULT_ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  // Documents
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
];

const DEFAULT_MAX_SIZE = 15 * 1024 * 1024; // 15MB

function sanitizeFileName(name: string): string {
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  const cleanBase = base
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 50);
  const uniqueSuffix = crypto.randomBytes(4).toString("hex");
  return `${cleanBase}-${uniqueSuffix}${ext.toLowerCase()}`;
}

/**
 * Configure Multer disk storage for local uploads
 */
export const multerDiskStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err as Error, uploadDir);
    }
  },
  filename: (_req, file, cb) => {
    cb(null, sanitizeFileName(file.originalname));
  },
});

export const multerUpload = multer({
  storage: multerDiskStorage,
  limits: { fileSize: DEFAULT_MAX_SIZE },
});

/**
 * Primary upload handler:
 * 1. Tries Supabase bucket
 * 2. If it fails or is unconfigured, falls back to local disk storage (Multer-equivalent)
 */
export async function uploadFileBuffer(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const {
    subfolder = "general",
    bucketName = DEFAULT_STORAGE_BUCKET,
    allowedMimeTypes = DEFAULT_ALLOWED_MIME_TYPES,
    maxSizeBytes = DEFAULT_MAX_SIZE,
  } = options;

  // 1. Validation
  if (buffer.length > maxSizeBytes) {
    throw new Error(
      `File size (${(buffer.length / (1024 * 1024)).toFixed(1)}MB) exceeds maximum limit of ${(maxSizeBytes / (1024 * 1024)).toFixed(0)}MB.`
    );
  }

  if (allowedMimeTypes.length > 0 && !allowedMimeTypes.includes(mimeType)) {
    throw new Error(`File type '${mimeType}' is not supported.`);
  }

  const safeName = sanitizeFileName(originalName);
  const storagePath = subfolder ? `${subfolder}/${safeName}` : safeName;

  // 2. Attempt Tier 1: Supabase Storage Bucket
  const supabase = getSupabaseAdminClient() || getSupabaseClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(storagePath, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (!error && data) {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(storagePath);

        // Record in DB if available
        await recordFileUpload({
          originalName,
          fileName: safeName,
          mimeType,
          size: buffer.length,
          storageProvider: "supabase",
          url: publicUrl,
          path: storagePath,
        });

        return {
          success: true,
          url: publicUrl,
          provider: "supabase",
          originalName,
          fileName: safeName,
          mimeType,
          size: buffer.length,
          message: "Uploaded successfully to Supabase Storage bucket.",
        };
      } else if (error) {
        console.warn(
          `[Upload] Supabase Storage returned error: "${error.message}". Falling back to local disk storage.`
        );
      }
    } catch (supabaseError) {
      console.warn(
        "[Upload] Supabase upload failed with exception. Falling back to local disk storage:",
        supabaseError instanceof Error ? supabaseError.message : supabaseError
      );
    }
  } else {
    console.info(
      "[Upload] Supabase Storage not configured. Proceeding directly with local disk storage fallback."
    );
  }

  // 3. Attempt Tier 2 (Fallback): Local Disk Storage
  try {
    const localDir = path.join(process.cwd(), "public", "uploads", subfolder);
    await fs.mkdir(localDir, { recursive: true });

    const localFilePath = path.join(localDir, safeName);
    await fs.writeFile(localFilePath, buffer);

    const publicUrl = `/uploads/${subfolder}/${safeName}`;

    // Record in DB if available
    await recordFileUpload({
      originalName,
      fileName: safeName,
      mimeType,
      size: buffer.length,
      storageProvider: "local",
      url: publicUrl,
      path: localFilePath,
    });

    return {
      success: true,
      url: publicUrl,
      provider: "local",
      originalName,
      fileName: safeName,
      mimeType,
      size: buffer.length,
      message: "Uploaded to local storage fallback.",
    };
  } catch (localError) {
    const errMessage =
      localError instanceof Error ? localError.message : "Disk write failed";
    console.error("[Upload] Local storage fallback failed:", localError);
    throw new Error(`Both Supabase and local storage failed: ${errMessage}`);
  }
}

/**
 * Safely record file upload metadata in Prisma if database is connected
 */
async function recordFileUpload(metadata: {
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  storageProvider: "supabase" | "local";
  url: string;
  path?: string;
}) {
  try {
    const isDbOnline = await checkPrismaConnection();
    if (isDbOnline) {
      await prisma.fileUpload.create({
        data: metadata,
      });
    }
  } catch (dbErr) {
    // Non-fatal: upload succeeded even if metadata logging fails
    console.warn("[Upload] Could not log file upload to database:", dbErr);
  }
}
