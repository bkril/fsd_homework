import { Skeleton } from "@/pkg/theme/ui/skeleton";

export default function CountriesLoading() {
  return (
    <section className="min-h-screen pb-12 pt-[calc(88px+2rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Skeleton className="mb-2 h-4 w-20" />
          <Skeleton className="mb-2 h-10 w-80" />
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="h-10 w-full max-w-sm" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    </section>
  );
}
