import { Skeleton } from "@/pkg/theme/ui/skeleton";

export default function CountryDetailLoading() {
  return (
    <div className="min-h-screen pb-12 pt-[calc(88px+2rem)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="mb-8 h-10 w-44" />

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Skeleton className="h-60 w-full sm:h-80" />

          <div className="p-6 sm:p-8">
            <div className="mb-6 flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20 rounded-full" />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Skeleton className="h-6 w-24" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
