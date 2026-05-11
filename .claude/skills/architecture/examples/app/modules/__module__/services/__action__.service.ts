// Pure helper functions for this module. No React, no side effects.

export function getPageItems(page: number, perPage: number): number[] {
  const start = (page - 1) * perPage;
  return Array.from({ length: perPage }, (_, i) => start + i + 1);
}
