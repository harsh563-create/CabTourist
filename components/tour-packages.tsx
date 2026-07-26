import Image from "next/image"
import { Check, MapPin, Star } from "lucide-react"

import { TOUR_PACKAGES } from "@/lib/cabtourist-data"
import { Button } from "@/components/ui/button"

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export function TourPackages() {
  return (
    <section id="packages" className="bg-muted/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Curated tour packages
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready-to-go trips with cabs included
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Multi-day getaways with private chauffeurs, handpicked stays, and
            local guides. Just pack and go.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {TOUR_PACKAGES.map((pkg) => (
            <li
              key={pkg.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={`${pkg.title} in ${pkg.location}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {pkg.tag ? (
                  <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                    {pkg.tag}
                  </span>
                ) : null}
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                  <Star className="size-3 fill-cta text-cta" />
                  {pkg.rating}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5 text-primary" />
                  {pkg.location}
                </div>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  {pkg.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {pkg.days} days · {pkg.nights} nights · {pkg.reviews} reviews
                </p>

                <ul className="mt-4 space-y-2">
                  {pkg.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Check className="size-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between border-t border-border pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground">
                      From / person
                    </span>
                    <p className="font-display text-2xl font-bold text-foreground">
                      {inr.format(pkg.fromPrice)}
                    </p>
                  </div>
                  <Button className="rounded-xl">View package</Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
