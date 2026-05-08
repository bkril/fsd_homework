export type TPageItem = number | "...";

export const getPageNumbers = (page: number, total: number): TPageItem[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: TPageItem[] = [1];
  if (page > 3) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) {
    pages.push(i);
  }
  if (page < total - 2) pages.push("...");
  pages.push(total);

  return pages;
};
