import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1).optional(),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET should be at least 32 characters")
    .optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const parsedEnv = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV,
});

const devJwtSecret = "medibridge-dev-secret-change-me-32chars";

export const env = {
  ...parsedEnv,
  JWT_SECRET: parsedEnv.JWT_SECRET ?? devJwtSecret,
};

export function requireDatabaseUrl() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for database operations.");
  }

  return env.DATABASE_URL;
}

export function assertProductionEnv() {
  if (env.NODE_ENV !== "production") return;

  if (!parsedEnv.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in production.");
  }

  requireDatabaseUrl();
}
