import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/pkg/theme/ui/card";
import { Badge } from "@/pkg/theme/ui/badge";
import { Users, MapPin } from "lucide-react";
import type { ICountry } from "@/app/entities/models";

interface IProps {
  country: ICountry;
}

const CountryCardComponent: FC<Readonly<IProps>> = ({ country }) => {
  const population = new Intl.NumberFormat("en-US").format(country.population);

  return (
    <Link href={`/countries/${country.cca3}`} className="group block h-full">
      <Card className="h-full overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-black/20 group-hover:-translate-y-1">
        <div className="relative h-40 w-full overflow-hidden bg-white/5">
          <Image
            src={country.flags.svg || country.flags.png}
            alt={country.flags.alt ?? `Flag of ${country.name.common}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="line-clamp-1 text-base font-semibold text-white">
            {country.name.common}
          </CardTitle>
          {country.name.official !== country.name.common && (
            <p className="line-clamp-1 text-xs text-white/50">
              {country.name.official}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-1.5 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <MapPin className="h-3 w-3 shrink-0 text-blue-400" />
            <span className="line-clamp-1">
              {country.capital?.join(", ") ?? "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-white/60">
            <Users className="h-3 w-3 shrink-0 text-emerald-400" />
            <span>{population}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <Badge
            variant="outline"
            className="border-white/20 bg-white/5 text-xs text-white/70"
          >
            {country.region}
          </Badge>
          {country.subregion && (
            <Badge
              variant="outline"
              className="ml-1.5 border-white/10 bg-transparent text-xs text-white/40"
            >
              {country.subregion}
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CountryCardComponent;
