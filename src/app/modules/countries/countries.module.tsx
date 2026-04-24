"use client";

import { Globe, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

import { useCountriesQuery } from "@/app/entities/api";
import { Badge } from "@/pkg/theme/ui/badge";
import { Button } from "@/pkg/theme/ui/button";
import { Input } from "@/pkg/theme/ui/input";
import { Skeleton } from "@/pkg/theme/ui/skeleton";

import { CountryCardComponent } from "./elements";

// constants
const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"] as const;
type Region = (typeof REGIONS)[number];

const ITEMS_PER_PAGE = 24;

// pagination helper
const getPageNumbers = (page: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];
  if (page > 3) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) {
    pages.push(i);
  }
  if (page < total - 2) pages.push("...");
  pages.push(total);

  return pages;
};

// component
const CountriesModule: FC = () => {
  const t = useTranslations("countries");
  const { data: countries, isLoading, isError } = useCountriesQuery();
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!countries) return [];
    return countries.filter((c) => {
      const matchSearch =
        c.name.common.toLowerCase().includes(search.toLowerCase()) ||
        c.name.official.toLowerCase().includes(search.toLowerCase()) ||
        c.capital?.some((cap) => cap.toLowerCase().includes(search.toLowerCase()));
      const matchRegion = selectedRegion === "All" || c.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [countries, search, selectedRegion]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedRegion]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const getRegionLabel = (region: Region) => {
    const key = region.toLowerCase() as "all" | "africa" | "americas" | "asia" | "europe" | "oceania" | "antarctic";
    return t(`regions.${key}`);
  };

  // render
  return (
    <section className="min-h-screen pb-12 pt-[calc(88px+2rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-blue-400">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">{t("page_label")}</span>
          </div>
          <h1 className="text-4xl font-bold text-white">{t("page_title")}</h1>
          <p className="mt-2 text-white/60">
            {countries
              ? t("page_subtitle", { filtered: filtered.length, total: countries.length })
              : t("page_loading")}
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder={t("search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-white/10 bg-white/5 pl-9 text-white placeholder:text-white/30 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {REGIONS.map((region) => (
              <Badge
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border-white/20 bg-transparent text-white/60 hover:border-white/40 hover:text-white"
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                {getRegionLabel(region)}
              </Badge>
            ))}
          </div>
        </div>

        {isError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">
            {t("error_load")}
          </div>
        )}

        {/* Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl border-white/10 bg-white/5" />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="py-20 text-center text-white/50">
            <Globe className="mx-auto mb-4 h-12 w-12 opacity-30" />
            <p className="text-lg">{t("empty_message")}</p>
          </div>
        )}

        {/* Grid + Pagination */}
        {!isLoading && !isError && paginated.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginated.map((country) => (
                <CountryCardComponent key={country.cca3} country={country} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {getPageNumbers(page, totalPages).map((p, i) =>
                  p === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-1 text-white/40">
                      …
                    </span>
                  ) : (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                      className={
                        p === page
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                      }
                      onClick={() => setPage(p as number)}
                    >
                      {p}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CountriesModule;
