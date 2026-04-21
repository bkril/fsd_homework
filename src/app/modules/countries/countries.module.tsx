"use client";

import type { FC } from "react";
import { useState, useMemo } from "react";
import { useCountriesQuery } from "@/app/entities/api";
import { CountryCardComponent } from "./elements";
import { Input } from "@/pkg/theme/ui/input";
import { Badge } from "@/pkg/theme/ui/badge";
import { Search, Globe } from "lucide-react";
import { Skeleton } from "@/pkg/theme/ui/skeleton";

const REGIONS = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania", "Antarctic"];

const CountriesModule: FC = () => {
  const { data: countries, isLoading, isError } = useCountriesQuery();
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const filtered = useMemo(() => {
    if (!countries) return [];
    return countries.filter((c) => {
      const matchSearch =
        c.name.common.toLowerCase().includes(search.toLowerCase()) ||
        c.name.official.toLowerCase().includes(search.toLowerCase()) ||
        c.capital?.some((cap) =>
          cap.toLowerCase().includes(search.toLowerCase())
        );
      const matchRegion =
        selectedRegion === "All" || c.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [countries, search, selectedRegion]);

  return (
    <section className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-2 text-blue-400">
            <Globe className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Explore
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Countries of the World
          </h1>
          <p className="mt-2 text-white/60">
            {countries
              ? `${filtered.length} of ${countries.length} countries`
              : "Loading..."}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <Input
              placeholder="Search countries, capitals..."
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
                {region}
              </Badge>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isError && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-8 text-center text-red-400">
            Failed to load countries. Please try again later.
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-64 rounded-xl border-white/10 bg-white/5"
              />
            ))}
          </div>
        )}

        {!isLoading && !isError && filtered.length === 0 && (
          <div className="py-20 text-center text-white/50">
            <Globe className="mx-auto mb-4 h-12 w-12 opacity-30" />
            <p className="text-lg">No countries found matching your search.</p>
          </div>
        )}

        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((country) => (
              <CountryCardComponent key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CountriesModule;
