import type { Metadata } from "next"
import Image from "next/image"
import { Armchair, Luggage, Snowflake, Clock } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { CabAvailable } from "@/components/cab-available"
import { CAB_TYPES } from "@/lib/cabtourist-data"

export const metadata: Metadata = {
  title: "Our Taxi — Fleet & Cab Types | CabTourist",
  description:
    "Explore our fleet — Hatchback, Sedan, Ertiga, SUV and Innova Crysta. Transparent per-km pricing, AC comfort and verified drivers for every journey.",
}

const PERKS = [
  { icon: Snowflake, label: "Fully air-conditioned" },
  { icon: Clock, label: "On-time pickup" },
  { icon: Luggage, label: "Generous luggage space" },
  { icon: Armchair, label: "Comfortable seating" },
]

export default function OurTaxiPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Our taxi fleet"
          title="A cab for every kind of journey"
          description="Well-maintained, sanitized and fully air-conditioned vehicles with verified drivers and transparent per-kilometre pricing."
        />

        <CabAvailable heading={false} />

        {/* Fleet details */}
        <section className="border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-handwritten text-base text-copper">
                Fleet features
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Comfort you can count on
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                Every vehicle in our fleet is serviced regularly and inspected
                before each trip for your safety and comfort.
              </p>
            </div>

            <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PERKS.map((p) => {
                const Icon = p.icon
                return (
                  <li
                    key={p.label}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-sm"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cta/10 text-copper">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-sans text-sm font-semibold text-foreground">
                      {p.label}
                    </span>
                  </li>
                )
              })}
            </ul>

            {/* Detailed cards */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CAB_TYPES.map((cab) => (
                <article
                  key={cab.id}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={cab.image}
                      alt={cab.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {cab.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm text-muted-foreground">
                      {cab.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Armchair className="size-3.5 text-copper" />{" "}
                        {cab.seats} Seater
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Luggage className="size-3.5 text-copper" /> {cab.bags}{" "}
                        Bags
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                        <Snowflake className="size-3.5 text-sky-600" /> AC
                      </span>
                    </div>
                    <div className="mt-4 border-t border-border/60 pt-4">
                      <span className="font-sans text-xs text-muted-foreground">
                        Price per km
                      </span>
                      <p className="font-display text-2xl font-bold text-copper">
                        ₹{cab.perKm}
                        <span className="font-sans text-sm font-medium text-muted-foreground">
                          /km
                        </span>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
