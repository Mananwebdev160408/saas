import { PrismaClient } from "@prisma/client";

// ─── Singleton pattern ────────────────────────────────────────────────────────
// Prevents creating multiple PrismaClient instances during Next.js hot reloads.
// In production, a new instance is created once per process.

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma =
  global.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}
