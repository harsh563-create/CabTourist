import Image from "next/image"
import { Star, ShieldCheck } from "lucide-react"

import { STATS } from "@/lib/cabtourist-data"
import { BookingWidget } from "@/components/booking-widget"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-coastal-drive.png"
          alt="Luxury cab driving along a scenic coastal mountain highway at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 md:pt-20 md:pb-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
            <ShieldCheck className="size-3.5 text-primary" />
            Verified drivers · Transparent fares · 24/7 support
          </span>
          <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Every journey, <span className="text-primary">perfectly</span>{" "}
            driven.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Book outstation cabs, airport transfers, and curated tour packages
            with professional chauffeurs. Upfront pricing, live tracking, and
            free cancellation on every ride.
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-foreground">
            <div className="flex items-center gap-0.5 text-cta">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <span className="font-medium">4.9/5</span>
            <span className="text-muted-foreground">
              from 120,000+ verified trips
            </span>
          </div>
        </div>

        {/* Booking widget */}
        <div className="mt-8 md:mt-10">
          <BookingWidget />
        </div>

        {/* Stats */}
        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  {s.value}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
