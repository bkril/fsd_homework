import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

// env server
export const envServer = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "production"])
      .optional()
      .default("development"),
    DATABASE_URL: z.string().nonempty({ message: "DATABASE_URL is required" }),
    BETTER_AUTH_SECRET: z
      .string()
      .nonempty({ message: "BETTER_AUTH_SECRET is required" }),
    REDIS_URL: z.string().optional(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    REDIS_URL: process.env.REDIS_URL,
  },
});
