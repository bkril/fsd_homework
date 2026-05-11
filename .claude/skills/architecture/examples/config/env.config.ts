// Centralized environment variables.
// Replace this with your validation library of choice (zod, valibot, etc.).
// The shape below is just a starting point.

export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  // ...add more vars here
};

// For validation, a common pattern is:
//
//   import { z } from "zod";
//
//   const schema = z.object({
//     DATABASE_URL: z.string().url(),
//     NEXT_PUBLIC_API_URL: z.string().url(),
//   });
//
//   export const env = schema.parse(process.env);
