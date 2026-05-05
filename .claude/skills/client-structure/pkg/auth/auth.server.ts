// Template: src/pkg/auth/server/auth.server.ts
// authServer provides two methods: getSession for Node.js and getCacheSession for Edge runtime
import "server-only";

import { jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { auth } from "@/pkg/auth/auth";
import { envServer } from "@/config/env";

export const authServer = {
  // Node.js runtime — server components, server actions
  getSession: async () => {
    try {
      return await auth.api.getSession({ headers: await headers() });
    } catch {
      return { user: null, session: null };
    }
  },

  // Edge runtime — middleware (src/proxy.ts)
  getCacheSession: async () => {
    try {
      const cookieStore = await cookies();
      const token =
        cookieStore.get("better-auth.session_data")?.value ||
        cookieStore.get("__Secure-better-auth.session_data")?.value;

      const secret = new TextEncoder().encode(envServer.BETTER_AUTH_SECRET);
      const { payload } = await jwtVerify(token || "", secret);
      return payload;
    } catch {
      return { user: null, session: null };
    }
  },
};
