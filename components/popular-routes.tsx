import { ArrowRight, Clock, MapPin, TrendingUp } from "lucide-react"

import { POPULAR_ROUTES } from "@/lib/cabtourist-data"

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export function PopularRoutes() {
  return (
    <section id="routes" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="text-sm font-semibold text-primary">
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
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Search any route <ArrowRight className="size-4" />
        </a>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {POPULAR_ROUTES.map((route) => (
          <li key={route.id}>
            <a
              href="#top"
              className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div>
                {route.popular ? (
                  <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-cta/15 px-2 py-0.5 text-xs font-semibold text-cta-foreground">
                    <TrendingUp className="size-3" /> Trending
                  </span>
                ) : null}
                <div className="flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  <MapPin className="size-4 shrink-0 text-primary" />
                  {route.from}
                  <ArrowRight className="size-4 text-muted-foreground" />
                  {route.to}
                </div>
                <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{route.distanceKm} km</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {route.durationHrs} hrs
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                <div>
                  <span className="text-xs text-muted-foreground">
                    Starts from
                  </span>
                  <p className="font-display text-xl font-bold text-foreground">
                    {inr.format(route.fromPrice)}
                  </p>
                </div>
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
