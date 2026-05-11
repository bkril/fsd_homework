// API functions for __entity__.
// Pure async functions returning typed data. No React, no hooks.

import type { I__Entity__ } from "@/app/entities/models";

export async function fetchAll__Entity__s(): Promise<I__Entity__[]> {
  // Replace with your HTTP client (ky, axios, fetch, etc.)
  const response = await fetch("/api/__entity__s");
  if (!response.ok) throw new Error("Failed to fetch __entity__s");
  return response.json();
}

export async function fetch__Entity__ById(id: string): Promise<I__Entity__> {
  const response = await fetch(`/api/__entity__s/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch __entity__ ${id}`);
  return response.json();
}
