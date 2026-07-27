import Image from "next/image"
import { Star, ShieldCheck, Users, MapPin, Gauge } from "lucide-react"

import { STATS } from "@/lib/cabtourist-data"
import { BookingWidget } from "@/components/booking-widget"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-background" />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-12 sm:px-6 md:pt-16 md:pb-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Vintage badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-card px-3 py-1.5 text-xs font-medium text-foreground">
              <ShieldCheck className="size-3.5 text-copper" />
              Verified drivers · Transparent fares · 24/7 support
            </span>

            {/* Main heading */}
            <h1 className="mt-4 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight">
              Every journey,{" "}
              <span className="block text-copper">perfectly driven.</span>
            </h1>

            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Book outstation cabs, airport transfers, and curated tour packages
              with professional chauffeurs. Upfront pricing, live tracking, and
              free cancellation on every ride.
            </p>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3 text-sm text-foreground">
              <div className="flex items-center gap-0.5 text-cta">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <span className="font-display font-semibold text-lg">4.9/5</span>
              <span className="text-muted-foreground">
                from 120,000+ verified trips
              </span>
            </div>

            {/* Booking widget */}
            <div className="mt-10">
              <BookingWidget />
            </div>
          </div>

          {/* Right Column - Stats and Featured Packages */}
          <div className="lg:col-span-1">
            {/* Stats Cards */}
            <div className="space-y-3">
              {STATS.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/70 bg-card p-4 text-center shadow-sm"
                >
                  <div className="font-display text-2xl font-bold text-copper">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-muted-foreground capitalize">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Packages Section */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Featured Packages</h3>
              <div className="relative rounded-lg border-2 border-border bg-card p-4">
                {/* Cork board effect */}
                <div className="absolute -top-2 left-1/3 w-4 h-4 rounded-full bg-amber-900 shadow-md" />
                <div className="absolute -top-2 right-1/4 w-4 h-4 rounded-full bg-amber-900 shadow-md" />

                {/* Package cards */}
                <div className="space-y-3">
                  <div className="bg-background rounded p-3 text-center border border-dashed border-border">
                    <div className="text-xs font-semibold text-copper mb-1">Curated Trip</div>
                    <div className="text-sm font-bold text-foreground">Rajasthan Hills</div>
                    <div className="text-xs text-muted-foreground mt-1">3 Days</div>
                  </div>
                  <div className="bg-background rounded p-3 text-center border border-dashed border-border">
                    <div className="text-xs font-semibold text-copper mb-1">Curated Trip</div>
                    <div className="text-sm font-bold text-foreground">Kerala Backwaters</div>
                    <div className="text-xs text-muted-foreground mt-1">4 Days</div>
                  </div>
                  <div className="bg-background rounded p-3 text-center border border-dashed border-border">
                    <div className="text-xs font-semibold text-copper mb-1">Curated Trip</div>
                    <div className="text-sm font-bold text-foreground">Leh Adventure</div>
                    <div className="text-xs text-muted-foreground mt-1">5 Days</div>
                  </div>
                </div>
              </div>

              {/* Service Icons */}
              {/* <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Users className="size-6 mx-auto text-copper mb-1" />
                  <p className="text-xs font-medium text-muted-foreground">2M+<br/>Travelers</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <MapPin className="size-6 mx-auto text-copper mb-1" />
                  <p className="text-xs font-medium text-muted-foreground">450+<br/>Cities</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Gauge className="size-6 mx-auto text-copper mb-1" />
                  <p className="text-xs font-medium text-muted-foreground">11K+<br/>Drivers</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <Star className="size-6 mx-auto text-copper mb-1" />
                  <p className="text-xs font-medium text-muted-foreground">4.9<br/>Rating</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
