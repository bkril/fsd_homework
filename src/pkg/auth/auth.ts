import "server-only";

import { betterAuth } from "better-auth";

import { envClient, envServer } from "@/config/env";
import { db } from "@/pkg/db";

export const auth = betterAuth({
  baseURL: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
  secret: envServer.BETTER_AUTH_SECRET,
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24,
    },
  },
});

export type Session = typeof auth.$Infer.Session;
