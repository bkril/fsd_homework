import { GlobeIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { type FC } from "react";

import { WrapperComponent } from "@/app/shared/components/wrapper";
import { Badge } from "@/pkg/theme/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/pkg/theme/ui/card";

// mock data
const STATS = [
  { label: "Countries explored", value: "12", icon: GlobeIcon, change: "+2 this week" },
  { label: "Continents visited", value: "3", icon: MapPinIcon, change: "+1 this month" },
  { label: "Total population read", value: "1.2B", icon: UsersIcon, change: "across saved" },
] as const;

const COUNTRIES = [
  { name: "Japan", continent: "Asia", capital: "Tokyo", population: "125M", flag: "🇯🇵", tag: "Island nation" },
  { name: "Brazil", continent: "South America", capital: "Brasília", population: "215M", flag: "🇧🇷", tag: "Largest in SA" },
  { name: "Germany", continent: "Europe", capital: "Berlin", population: "84M", flag: "🇩🇪", tag: "EU powerhouse" },
  { name: "Kenya", continent: "Africa", capital: "Nairobi", population: "54M", flag: "🇰🇪", tag: "Safari capital" },
  { name: "Canada", continent: "North America", capital: "Ottawa", population: "38M", flag: "🇨🇦", tag: "2nd largest" },
  { name: "Australia", continent: "Oceania", capital: "Canberra", population: "26M", flag: "🇦🇺", tag: "Continent-country" },
  { name: "India", continent: "Asia", capital: "New Delhi", population: "1.4B", flag: "🇮🇳", tag: "Most populous" },
  { name: "France", continent: "Europe", capital: "Paris", population: "68M", flag: "🇫🇷", tag: "Most visited" },
  { name: "Mexico", continent: "North America", capital: "Mexico City", population: "130M", flag: "🇲🇽", tag: "Rich culture" },
  { name: "Egypt", continent: "Africa", capital: "Cairo", population: "104M", flag: "🇪🇬", tag: "Ancient history" },
  { name: "South Korea", continent: "Asia", capital: "Seoul", population: "52M", flag: "🇰🇷", tag: "Tech hub" },
  { name: "Argentina", continent: "South America", capital: "Buenos Aires", population: "46M", flag: "🇦🇷", tag: "Tango & wine" },
] as const;

// interface
interface IProps {
  userName?: string | null;
}

// component
const DashboardComponent: FC<Readonly<IProps>> = ({ userName }) => {
  // render
  return (
    <div className="min-h-screen">
      <WrapperComponent type="main" className="py-32">

        {/* greeting */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back{userName ? `, ${userName.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            Continue exploring the world — 195 countries are waiting.
          </p>
        </div>

        {/* stats */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {STATS.map(({ label, value, icon: Icon, change }) => (
            <Card key={label} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* countries grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Countries</h2>
          <span className="text-sm text-muted-foreground">195 total</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COUNTRIES.map((country) => (
            <Card
              key={country.name}
              className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{country.flag}</span>
                  <Badge variant="secondary" className="text-xs">
                    {country.continent}
                  </Badge>
                </div>

                <h3 className="mb-3 text-lg font-semibold group-hover:text-primary transition-colors">
                  {country.name}
                </h3>

                <div className="space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Capital</span>
                    <span className="font-medium text-foreground">{country.capital}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Population</span>
                    <span className="font-medium text-foreground">{country.population}</span>
                  </div>
                </div>

                <div className="mt-3 border-t border-border/50 pt-3">
                  <span className="text-xs text-primary">{country.tag}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </WrapperComponent>
    </div>
  );
};

export default DashboardComponent;
