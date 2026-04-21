import { GlobeIcon, MapIcon, UsersIcon } from "lucide-react";
import { type FC } from "react";

import { WrapperComponent } from "@/app/shared/components/wrapper";
import { Link } from "@/pkg/locale";
import { Button } from "@/pkg/theme/ui/button";

const STATS = [
  { icon: GlobeIcon, value: "195", label: "Countries" },
  { icon: UsersIcon, value: "8B+", label: "People" },
  { icon: MapIcon, value: "7", label: "Continents" },
] as const;

// interface
interface IProps {}

const MainComponent: FC<Readonly<IProps>> = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <WrapperComponent
        type="main"
        className="flex flex-1 flex-col items-center justify-center gap-8 pb-24 pt-40 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <GlobeIcon className="h-3.5 w-3.5" />
          Explore the world
        </div>

        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Discover every{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              country
            </span>{" "}
            on Earth
          </h1>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground">
            Explore detailed information about all 195 countries — geography,
            culture, population, economy and much more in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-12 px-8 font-semibold">
            <Link href="/countries">Start exploring</Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-12">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-3xl font-bold text-foreground">
                  {value}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </WrapperComponent>
    </div>
  );
};

export default MainComponent;
