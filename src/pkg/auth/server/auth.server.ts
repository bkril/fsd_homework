import "server-only";

import { jwtVerify } from "jose";
import { cookies, headers } from "next/headers";

import { envServer } from "@/config/env";
import { auth } from "@/pkg/auth/auth";

// auth server
export const authServer = {
  // get session (Node.js runtime — server components, server actions)
  getSession: async () => {
    try {
      const session = await auth.api.getSession({
        headers: await headers(),
      });

      return session;
    } catch {
      return { user: null, session: null };
    }
  },

  // get cached session from JWT cookie (Edge runtime — middleware)
  getCacheSession: async () => {
    try {
      const cookieStore = await cookies();

      const cacheToken =
        cookieStore.get("better-auth.session_data")?.value ||
        cookieStore.get("__Secure-better-auth.session_data")?.value;

      const secret = new TextEncoder().encode(envServer.BETTER_AUTH_SECRET);
      const { payload } = await jwtVerify(cacheToken || "", secret);

      return payload;
    } catch {
      return { user: null, session: null };
    }
  },
};
