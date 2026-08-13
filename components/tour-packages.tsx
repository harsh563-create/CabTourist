"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, MapPin, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { TOUR_PACKAGES, type TourPackage } from "@/lib/cabtourist-data"
import { fetchPackages } from "@/lib/packages-api"
import { Button } from "@/components/ui/button"

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

const CARD_ROTATIONS = ["rotate-[-0.5deg]", "rotate-[0.3deg]", "rotate-[-0.7deg]"]

export function TourPackages({ heading = true }: { heading?: boolean }) {
  const [packages, setPackages] = useState<TourPackage[]>(TOUR_PACKAGES)

  useEffect(() => {
    let cancelled = false
    fetchPackages()
      .then((data) => {
        if (!cancelled && data.length > 0) setPackages(data)
      })
      .catch(() => {
        // Keep the static fallback when the API is unreachable.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="packages" className="py-16 md:py-20">
      {/* Corkboard background */}
      <div className="cork-bg py-16 md:py-20 -my-16 md:-my-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {heading ? (
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-handwritten text-base text-copper">
                Ujjain taxi packages
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Temples & trips from Ujjain, on your schedule
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Book a private AC cab for darshan circuits, airport transfers,
                and outstation trips. Transparent fares, verified drivers.
              </p>
            </div>
          ) : null}

          <ul className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-3", heading ? "mt-10" : "mt-0")}>
            {packages.map((pkg, i) => (
              <li
                key={pkg.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-sm border border-border/60 bg-card",
                  "shadow-[0_3px_10px_rgba(58,46,31,0.12),0_1px_3px_rgba(58,46,31,0.08)]",
                  "transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(58,46,31,0.15)]",
                  CARD_ROTATIONS[i % CARD_ROTATIONS.length],
                )}
              >
                {/* Pushpin decoration */}
                <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <div className="size-3 rounded-full border border-white/30 bg-gradient-to-br from-amber-600 to-amber-800 shadow-md" />
                </div>

                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={`${pkg.title} in ${pkg.location}`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover saturate-[0.7] sepia-[0.15] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {pkg.tag ? (
                    <span className="absolute top-3 left-3 rounded-sm bg-leather/90 px-2.5 py-1 font-sans text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                      {pkg.tag}
                    </span>
                  ) : null}
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-sm bg-card/90 px-2 py-1 font-sans text-xs font-semibold text-foreground backdrop-blur-sm">
                    <Star className="size-3 fill-cta text-cta" />
                    {pkg.rating}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1 font-sans text-sm text-muted-foreground">
                    <MapPin className="size-3.5 text-copper" />
                    {pkg.location}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                    {pkg.title}
                  </h3>
                  <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                    {pkg.days} day{pkg.days > 1 ? "s" : ""}
                    {pkg.nights > 0 ? ` · ${pkg.nights} nights` : ""} ·{" "}
                    {pkg.reviews} reviews
                  </p>

                  <ul className="mt-4 space-y-2">
                    {pkg.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-center gap-2 font-sans text-sm text-foreground"
                      >
                        <Check className="size-4 shrink-0 text-copper" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-col gap-2.5 border-t border-border/60 pt-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="font-sans text-xs text-muted-foreground">
                          Starting from
                        </span>
                        <p className="font-display text-2xl font-bold text-copper">
                          {inr.format(pkg.fromPrice)}
                        </p>
                      </div>
                      <span className="font-sans text-xs text-muted-foreground">
                        per cab
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        render={<Link href="/packages" />}
                        variant="outline"
                        className="h-9 font-sans text-sm"
                      >
                        View Package
                      </Button>
                      <Button
                        render={<Link href="/book" />}
                        className="h-9 bg-leather font-sans text-sm font-semibold text-primary-foreground hover:bg-leather/90"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
