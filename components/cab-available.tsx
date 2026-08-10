import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Armchair, Snowflake } from "lucide-react"

import { CAB_TYPES } from "@/lib/cabtourist-data"

export function CabAvailable({ heading = true }: { heading?: boolean }) {
  return (
    <section id="our-car" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
      {heading ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="font-handwritten text-base text-copper uppercase tracking-wide">
              Our Car
            </span>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Choose Your Cab
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              A clean, comfortable and well-maintained fleet for every journey —
              from quick city hops to long outstation trips.
            </p>
          </div>
          <Link
            href="/our-taxi"
            className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-copper transition-colors hover:underline"
          >
            All Vehicles <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : null}

      <ul
        className={
          heading
            ? "mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
            : "grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
        }
      >
        {CAB_TYPES.map((cab) => (
          <li
            key={cab.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_2px_10px_rgba(58,46,31,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(58,46,31,0.14)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <Image
                src={cab.image}
                alt={cab.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {cab.ac ? (
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
                  <Snowflake className="size-3.5 text-sky-600" />
                  AC
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <h3 className="font-display text-lg font-bold text-foreground">
                {cab.name}
              </h3>
              <p className="mt-0.5 line-clamp-1 font-sans text-xs text-muted-foreground">
                {cab.description}
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
                <div>
                  <span className="font-sans text-[11px] text-muted-foreground">
                    Price per km
                  </span>
                  <p className="font-display text-xl font-bold text-copper">
                    ₹{cab.perKm}
                    <span className="font-sans text-xs font-medium text-muted-foreground">
                      /km
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Armchair className="size-3.5 text-copper" />
                  {cab.seats} Seater
                </div>
              </div>

              <Link
                href="/book"
                className="mt-4 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-leather px-4 font-sans text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-leather/90"
              >
                Book Now <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
