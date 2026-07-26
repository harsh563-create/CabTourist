import { ArrowRight, Clock, MapPin, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { POPULAR_ROUTES } from "@/lib/cabtourist-data"

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

const ROTATIONS = ["rotate-[-1deg]", "rotate-[0.5deg]", "rotate-[-0.8deg]", "rotate-[1.2deg]"]

export function PopularRoutes() {
  return (
    <section id="routes" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="font-handwritten text-base text-copper">
            Popular outstation routes
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved routes at fixed, fair prices
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Handpicked intercity trips travelers book again and again — with
            all-inclusive fares and top-rated drivers.
          </p>
        </div>
        <a
          href="#top"
          className="inline-flex items-center gap-1 font-sans text-sm font-medium text-copper hover:underline"
        >
          Search any route <ArrowRight className="size-4" />
        </a>
      </div>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {POPULAR_ROUTES.map((route, i) => (
          <li key={route.id}>
            <a
              href="#top"
              className={cn(
                "group flex h-full flex-col rounded-sm bg-card p-4 transition-all",
                "border border-border/60",
                "shadow-[0_2px_6px_rgba(58,46,31,0.06),0_1px_2px_rgba(58,46,31,0.04)]",
                "hover:shadow-[0_4px_12px_rgba(58,46,31,0.1)]",
                ROTATIONS[i % ROTATIONS.length],
              )}
            >
              <div>
                {route.popular ? (
                  <span className="mb-3 inline-flex items-center gap-1 rounded-sm bg-cta/15 px-2 py-0.5 font-sans text-xs font-semibold text-cta">
                    <TrendingUp className="size-3" /> Trending
                  </span>
                ) : null}

                {/* Polaroid-style route name */}
                <div className="mb-3 rounded-sm border border-border/40 bg-muted/30 p-3">
                  <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                    <MapPin className="size-4 shrink-0 text-copper" />
                    {route.from}
                    <ArrowRight className="size-3 text-muted-foreground" />
                    {route.to}
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 font-sans text-sm text-muted-foreground">
                    <span>{route.distanceKm} km</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {route.durationHrs} hrs
                    </span>
                  </div>
                </div>

                {/* Handwritten label */}
                <p className="font-handwritten text-lg text-muted-foreground">
                  {route.from} → {route.to}
                </p>
              </div>

              <div className="mt-auto flex items-end justify-between border-t border-border/60 pt-3">
                <div>
                  <span className="font-sans text-xs text-muted-foreground">
                    Starts from
                  </span>
                  <p className="font-display text-xl font-bold text-copper">
                    {inr.format(route.fromPrice)}
                  </p>
                </div>
                <span className="inline-flex size-8 items-center justify-center rounded-full border border-copper/20 bg-copper/10 text-copper transition-colors group-hover:bg-copper group-hover:text-primary-foreground">
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
