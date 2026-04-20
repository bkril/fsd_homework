import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/pkg/auth/auth";

export const { GET, POST } = toNextJsHandler(auth);
