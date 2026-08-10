"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Headphones, Phone, ShieldCheck, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { HERO_SLIDES, TRUST_STATS } from "@/lib/cabtourist-data"
import { CONTACTS } from "@/lib/site-config"

const STAT_ICONS = [Users, Star, Headphones]

export function Hero() {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      {/* Slideshow background */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.image}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
            aria-hidden={i !== active}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <ShieldCheck className="size-3.5 text-copper" />
            Verified drivers · Transparent fares · 24/7 support
          </span>

          <h1 className="mt-6 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Explore India&apos;s Top Destinations with{" "}
            <span className="text-copper">CabTourist</span>
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
            Book Cabs for Temple Darshan, Airport Transfers, Outstation Trips,
            and Travel Anywhere in India.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-3 font-sans text-base font-bold text-cta-foreground shadow-lg transition-all hover:scale-[1.02] hover:bg-cta/90"
            >
              Book a Cab Now <ArrowRight className="size-4" />
            </Link>
            <a
              href={CONTACTS.phone1Href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 font-sans text-base font-semibold text-white backdrop-blur-md transition-all hover:scale-[1.02] hover:bg-white/20"
            >
              <Phone className="size-4" /> {CONTACTS.phone1Display}
            </a>
          </div>

          {/* Trust statistics */}
          <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {TRUST_STATS.map((stat, i) => {
              const Icon = STAT_ICONS[i]
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-md transition-transform hover:-translate-y-0.5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cta/90 text-cta-foreground shadow-md">
                    <Icon className="size-5" />
                  </span>
                  <div className="text-left">
                    <div className="font-display text-xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-white/80">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === active
                  ? "w-8 bg-copper"
                  : "w-2.5 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
