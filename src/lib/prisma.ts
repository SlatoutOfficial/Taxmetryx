import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });
}

export const prisma = globalThis.prismaGlobal ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

let isConnected = false;
let lastCheckTime = 0;
const CHECK_INTERVAL_MS = 15000; // 15 seconds cache

export async function checkPrismaConnection(): Promise<boolean> {
  // If no DATABASE_URL configured, report offline immediately without hanging
  if (!process.env.DATABASE_URL) {
    return false;
  }

  const now = Date.now();
  if (now - lastCheckTime < CHECK_INTERVAL_MS) {
    return isConnected;
  }

  try {
    // Quick query to test connection
    await prisma.$queryRaw`SELECT 1`;
    isConnected = true;
    lastCheckTime = now;
    return true;
  } catch {
    isConnected = false;
    lastCheckTime = now;
    return false;
  }
}

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}
