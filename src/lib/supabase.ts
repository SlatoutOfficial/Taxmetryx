import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "";
const supabaseServiceKey = supabaseAnonKey;

export const DEFAULT_STORAGE_BUCKET =
  process.env.SUPABASE_STORAGE_BUCKET || "taxmetryx-uploads";

let supabaseClient: SupabaseClient | null = null;
let supabaseAdminClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));
}

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });
  }
  return supabaseClient;
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!supabaseAdminClient) {
    const key = supabaseServiceKey || supabaseAnonKey;
    supabaseAdminClient = createClient(supabaseUrl, key, {
      auth: { persistSession: false },
    });
  }
  return supabaseAdminClient;
}

export async function checkSupabaseStorage(
  bucketName = DEFAULT_STORAGE_BUCKET
): Promise<{ ok: boolean; message: string }> {
  const client = getSupabaseAdminClient() || getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      message: "Supabase credentials are not configured in environment variables.",
    };
  }

  try {
    const { data: buckets, error } = await client.storage.listBuckets();
    if (error) {
      return { ok: false, message: error.message };
    }

    const bucketExists = buckets?.some((b) => b.name === bucketName);
    if (!bucketExists) {
      // Try to create bucket if service role key has permissions
      const { error: createError } = await client.storage.createBucket(
        bucketName,
        {
          public: true,
          fileSizeLimit: 25 * 1024 * 1024, // 25MB
        }
      );
      if (createError) {
        // Bucket might exist or creation failed, check read access
        return {
          ok: false,
          message: `Bucket '${bucketName}' not found and auto-creation returned: ${createError.message}`,
        };
      }
    }

    return { ok: true, message: `Bucket '${bucketName}' is operational.` };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Unknown Supabase storage error",
    };
  }
}
