import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BedDouble, MapPin, Star, Users, Wifi } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Hotel Booking — Stays with CabTourist",
  description:
    "Book clean, comfortable and handpicked hotels, homestays and heritage stays across India. Cab transfers included with every booking.",
}

const HOTELS = [
  {
    name: "Heritage Courtyard Palace",
    location: "Ujjain · Near Mahakaleshwar Temple",
    image: "/images/hotel-heritage.jpg",
    rating: 4.8,
    price: 2499,
    tag: "Heritage Stay",
    perks: ["Free breakfast", "Temple shuttle", "AC rooms"],
  },
  {
    name: "Shipra Riverside Retreat",
    location: "Ujjain · Shipra Ghat Road",
    image: "/images/hotel-palace.jpg",
    rating: 4.6,
    price: 1899,
    tag: "Popular Pick",
    perks: ["Ghat view rooms", "Rooftop dining", "24/7 front desk"],
  },
  {
    name: "Regal Poolside Resort",
    location: "Ujjain · Ring Road",
    image: "/images/hotel-pool.jpg",
    rating: 4.7,
    price: 3299,
    tag: "Family Friendly",
    perks: ["Swimming pool", "Family suites", "Free parking"],
  },
]

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export default function HotelPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Handpicked stays"
          title="Comfortable hotels, wherever you go"
          description="From heritage palaces to cosy homestays — book verified stays near temples, ghats and city centres with cabs included."
        />

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HOTELS.map((hotel) => (
              <article
                key={hotel.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_2px_10px_rgba(58,46,31,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(58,46,31,0.14)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-leather px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow-sm">
                    {hotel.tag}
                  </span>
                  <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-bold text-foreground shadow-sm">
                    <Star className="size-3.5 fill-cta text-cta" />
                    {hotel.rating}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1 font-sans text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-copper" />
                    {hotel.location}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-foreground">
                    {hotel.name}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {hotel.perks.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 font-sans text-sm text-muted-foreground"
                      >
                        <span className="flex size-5 items-center justify-center rounded-full bg-cta/10 text-copper">
                          <Wifi className="size-3" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-end justify-between border-t border-border/60 pt-4 mt-4">
                    <div>
                      <span className="font-sans text-xs text-muted-foreground">
                        Starting at / night
                      </span>
                      <p className="font-display text-2xl font-bold text-copper">
                        {inr.format(hotel.price)}
                      </p>
                    </div>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-1.5 rounded-full bg-leather px-4 py-2 font-sans text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-leather/90"
                    >
                      <BedDouble className="size-3.5" /> Book Stay
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Amenities strip */}
          <div className="mt-10 grid gap-4 rounded-2xl border border-border/60 bg-muted/20 p-6 sm:grid-cols-3 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl wood-block">
                <BedDouble className="size-5" />
              </span>
              <div>
                <p className="font-sans text-sm font-bold text-foreground">
                  Verified stays
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Inspected rooms, real photos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl wood-block">
                <Users className="size-5" />
              </span>
              <div>
                <p className="font-sans text-sm font-bold text-foreground">
                  Family friendly
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Options for groups & families
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl wood-block">
                <Star className="size-5" />
              </span>
              <div>
                <p className="font-sans text-sm font-bold text-foreground">
                  Cab included
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Transfers arranged for every stay
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
