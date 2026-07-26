import {
  BadgeIndianRupee,
  CalendarCheck,
  CarFront,
  Headset,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

import { FEATURES } from "@/lib/cabtourist-data"

const ICONS: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  "badge-indian-rupee": BadgeIndianRupee,
  headset: Headset,
  "car-front": CarFront,
  "map-pin": MapPin,
  "calendar-check": CalendarCheck,
}

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold text-primary">
          Why travelers choose CabTourist
        </span>
        <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Built for safe, stress-free travel
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Everything you need for a dependable ride — from the first tap to the
          final drop-off.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => {
          const Icon = ICONS[f.icon] ?? ShieldCheck
          return (
            <li
              key={f.title}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
