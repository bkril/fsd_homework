import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/rest-api";
import { fetchAllCountries, COUNTRIES_QUERY_KEY } from "@/app/entities/api";
import { CountriesModule } from "@/app/modules/countries";

export const revalidate = 3600;

export const metadata = {
  title: "Countries of the World",
  description:
    "Explore all countries of the world with detailed information about geography, population, languages, and more.",
};

export default async function CountriesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: fetchAllCountries,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CountriesModule />
    </HydrationBoundary>
  );
}
