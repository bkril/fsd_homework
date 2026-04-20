import "server-only";

import { Pool } from "pg";

import { envServer } from "@/config/env";

const globalForDb = globalThis as unknown as { pool?: Pool };

export const db =
  globalForDb.pool ??
  new Pool({
    connectionString: envServer.DATABASE_URL,
  });

if (envServer.NODE_ENV !== "production") {
  globalForDb.pool = db;
}
