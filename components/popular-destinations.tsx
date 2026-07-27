"use client"

import * as React from "react"
import Image from "next/image"
import { X, MapPin, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

const DESTINATIONS = [
  {
    name: "Leh Ladakh",
    tagline: "Roof of the world",
    image: "/images/package-mountain.png",
    rotation: -2,
  },
  {
    name: "Rajasthan",
    tagline: "Royal heritage",
    image: "/images/package-heritage.png",
    rotation: 1.5,
  },
  {
    name: "Kerala",
    tagline: "God's own country",
    image: "/images/package-beach.png",
    rotation: -1,
  },
  {
    name: "Goa",
    tagline: "Sun, sand & soul",
    image: "/images/package-beach.png",
    rotation: 2,
  },
]

export function PopularDestinations() {
  const [active, setActive] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active])

  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <span className="font-handwritten text-base text-copper">
            Explore India
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Hand-picked places travelers love — click any destination to explore.
          </p>
        </div>
        <a
          href="#top"
          className="inline-flex items-center gap-1 font-sans text-sm font-medium text-copper hover:underline"
        >
          View all routes <ArrowRight className="size-4" />
        </a>
      </div>

      {/* Destination Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {DESTINATIONS.map((dest, i) => (
          <button
            key={dest.name}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "group relative cursor-pointer text-left",
            )}
            style={{ transform: `rotate(${dest.rotation}deg)` }}
          >
            {/* Polaroid frame */}
            <div
              className={cn(
                "relative overflow-hidden rounded-sm bg-card p-2 pb-8",
                "border border-border/60",
                "shadow-[0_2px_8px_rgba(58,46,31,0.08)]",
                "transition-all duration-300 ease-out",
                "group-hover:shadow-[0_8px_24px_rgba(184,115,51,0.15)]",
                "group-hover:-translate-y-1.5",
                "group-hover:border-copper/40",
              )}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className={cn(
                    "object-cover transition-all duration-500",
                    "saturate-[0.7] sepia-[0.15]",
                    "group-hover:scale-110 group-hover:saturate-100 group-hover:sepia-0",
                  )}
                />

                {/* Hover overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    "bg-gradient-to-t from-black/60 via-black/10 to-transparent",
                    "opacity-0 transition-opacity duration-300",
                    "group-hover:opacity-100",
                  )}
                >
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                    <MapPin className="size-3 text-copper" />
                    Explore
                  </span>
                </div>
              </div>

              {/* Handwritten label */}
              <p className="absolute bottom-2 left-3 font-handwritten text-base text-foreground">
                {dest.name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={DESTINATIONS[active].name}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>

          <div
            className={cn(
              "relative mx-4 w-full max-w-2xl",
              "animate-in fade-in zoom-in-95 duration-300",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox card */}
            <div className="overflow-hidden rounded-lg border border-white/10 bg-card shadow-2xl">
              <div className="relative aspect-[16/10]">
                <Image
                  src={DESTINATIONS[active].image}
                  alt={DESTINATIONS[active].name}
                  fill
                  sizes="(min-width: 768px) 600px, 90vw"
                  className="object-cover"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-5 text-copper" />
                    <span className="font-handwritten text-base text-white/80">
                      {DESTINATIONS[active].tagline}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-3xl font-bold text-white">
                    {DESTINATIONS[active].name}
                  </h3>
                  <a
                    href="#top"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-cta px-4 py-2 font-sans text-sm font-semibold text-cta-foreground transition-all hover:bg-cta/90"
                  >
                    Book a trip <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="mt-3 flex justify-center gap-2">
              {DESTINATIONS.map((d, i) => (
                <button
                  key={d.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative size-12 overflow-hidden rounded-sm border-2 transition-all",
                    i === active
                      ? "border-copper scale-110"
                      : "border-white/20 opacity-60 hover:opacity-100",
                  )}
                >
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
