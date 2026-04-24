import type { FC } from "react";
import Image from "next/image";
import { Link } from "@/pkg/locale";
import { ArrowLeft, Globe, Users, MapPin, Clock, DollarSign, Languages } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/pkg/theme/ui/badge";
import { Button } from "@/pkg/theme/ui/button";
import { Separator } from "@/pkg/theme/ui/separator";
import type { ICountryDetail } from "@/app/entities/models";

interface IProps {
  country: ICountryDetail;
}

const CountryDetailModule: FC<Readonly<IProps>> = async ({ country }) => {
  const t = await getTranslations("country_detail");

  const population = new Intl.NumberFormat("en-US").format(country.population);
  const area = new Intl.NumberFormat("en-US").format(country.area);
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : t("na");
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : t("na");

  return (
    <div className="min-h-screen pb-12 pt-[calc(88px+2rem)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Button
            asChild
            variant="outline"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/countries">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("back_button")}
            </Link>
          </Button>
        </div>

        {/* Hero */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {/* Flag */}
          <div className="relative h-60 w-full sm:h-80">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={country.flags.alt ?? t("flag_alt", { name: country.name.common })}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">
                {country.name.common}
              </h1>
              {country.name.official !== country.name.common && (
                <p className="mt-1 text-white/70">{country.name.official}</p>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8">
            {/* Badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">
                <Globe className="mr-1 h-3 w-3" />
                {country.region}
              </Badge>
              {country.subregion && (
                <Badge variant="outline" className="border-white/20 text-white/60">
                  {country.subregion}
                </Badge>
              )}
              {country.independent && (
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                  {t("independent")}
                </Badge>
              )}
              {country.unMember && (
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                  {t("un_member")}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Key facts */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">{t("key_facts")}</h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("capital")}</p>
                      <p className="text-sm text-white">
                        {country.capital?.join(", ") ?? t("na")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("population")}</p>
                      <p className="text-sm text-white">{population}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("area")}</p>
                      <p className="text-sm text-white">{area} km²</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("timezones")}</p>
                      <p className="text-sm text-white">
                        {country.timezones.slice(0, 3).join(", ")}
                        {country.timezones.length > 3 &&
                          ` ${t("timezones_more", { count: country.timezones.length - 3 })}`}
                      </p>
                    </div>
                  </div>

                  {country.tld && country.tld.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Globe className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      <div>
                        <p className="text-xs text-white/40">{t("tld")}</p>
                        <p className="text-sm text-white">{country.tld.join(", ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Culture & Economy */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">
                  {t("culture_economy")}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Languages className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("languages")}</p>
                      <p className="text-sm text-white">{languages}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="mt-0.5 h-4 w-4 shrink-0 text-orange-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("currencies")}</p>
                      <p className="text-sm text-white">{currencies}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("coordinates")}</p>
                      <p className="text-sm text-white">
                        {country.latlng[0].toFixed(2)}°,{" "}
                        {country.latlng[1].toFixed(2)}°
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                    <div>
                      <p className="text-xs text-white/40">{t("continents")}</p>
                      <p className="text-sm text-white">
                        {country.continents.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bordering countries */}
            {country.borders && country.borders.length > 0 && (
              <>
                <Separator className="my-6 bg-white/10" />
                <div>
                  <h2 className="mb-3 text-lg font-semibold text-white">
                    {t("bordering_countries")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {country.borders.map((border) => (
                      <Link key={border} href={`/countries/${border}`}>
                        <Badge
                          variant="outline"
                          className="cursor-pointer border-white/20 bg-white/5 text-white/70 transition-colors hover:border-blue-500/50 hover:bg-blue-600/10 hover:text-blue-300"
                        >
                          {border}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailModule;
