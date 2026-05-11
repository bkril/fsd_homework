"use client";

import { useEffect, useState } from "react";

// Reusable client hook. No domain knowledge.
// Domain-specific hooks belong in `features/<feature>/use-<feature>.hook.ts`.

export function use__Hook__() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    // example: read from a browser API
    setValue(window.location.hostname);
  }, []);

  return value;
}
