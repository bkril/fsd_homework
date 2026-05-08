import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

// Template: src/config/env/env.server.ts
export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).optional().default("development"),
    DATABASE_URL: z.string().nonempty({ message: "DATABASE_URL is required" }),
    BETTER_AUTH_SECRET: z.string().nonempty({ message: "BETTER_AUTH_SECRET is required" }),
    // Add new server env vars here
    // MY_SECRET: z.string().nonempty(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  },
});

// Template: src/config/env/env.client.ts
export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_CLIENT_WEB_URL: z.string().url(),
    // NEXT_PUBLIC_MY_VAR: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_CLIENT_WEB_URL: process.env.NEXT_PUBLIC_CLIENT_WEB_URL,
  },
});
