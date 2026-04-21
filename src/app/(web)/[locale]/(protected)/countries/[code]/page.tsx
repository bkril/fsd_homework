import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchCountryByCode } from "@/app/entities/api";
import { CountryDetailModule } from "@/app/modules/country-detail";

interface IProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { code } = await params;

  try {
    const country = await fetchCountryByCode(code);
    return {
      title: `${country.name.common} — Country Details`,
      description: `Learn about ${country.name.common}: population, capital, languages, currencies, and more.`,
    };
  } catch {
    return {
      title: "Country Not Found",
      description: "The requested country could not be found.",
    };
  }
}

export default async function CountryDetailPage({ params }: IProps) {
  const { code } = await params;

  let country;
  try {
    const result = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`,
      { cache: "no-store" }
    );
    if (!result.ok) notFound();
    const data = await result.json();
    country = Array.isArray(data) ? data[0] : data;
  } catch {
    notFound();
  }

  if (!country) notFound();

  return <CountryDetailModule country={country} />;
}
