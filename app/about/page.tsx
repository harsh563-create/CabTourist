import type { Metadata } from "next"
import Image from "next/image"
import { CarFront, Headset, ShieldCheck, Star, Users } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "About Us — CabTourist",
  description:
    "CabTourist is a trusted cab booking and tour company helping travelers explore India with verified drivers, transparent fares and 24/7 support.",
}

const HIGHLIGHTS = [
  {
    icon: Users,
    value: "50K+",
    label: "Happy customers",
  },
  {
    icon: Star,
    value: "4.9★",
    label: "Google rating",
  },
  {
    icon: CarFront,
    value: "450+",
    label: "Cities covered",
  },
  {
    icon: Headset,
    value: "24×7",
    label: "Customer support",
  },
]

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Safety first",
    text: "Every driver is background-verified, trained and continuously rated by real travelers before every ride.",
  },
  {
    icon: CarFront,
    title: "Comfortable fleet",
    text: "From hatchbacks to Innova Crysta, our sanitized and well-maintained cabs are ready for any journey.",
  },
  {
    icon: Star,
    title: "Transparent fares",
    text: "The price you see is the price you pay — no surge pricing, no hidden charges, ever.",
  },
  {
    icon: Headset,
    title: "24/7 support",
    text: "Real humans on call, chat and WhatsApp, ready to help you before, during and after every trip.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="About CabTourist"
          title="Your trusted travel partner across India"
          description="From temple darshan in Ujjain to airport transfers and outstation trips — we make every journey safe, simple and comfortable."
        />

        {/* Stats */}
        <section className="border-y border-border/60 bg-muted/20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 lg:grid-cols-4">
            {HIGHLIGHTS.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm">
                  <span className="mx-auto flex size-11 items-center justify-center rounded-xl wood-block">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-3 font-display text-2xl font-bold text-copper">
                    {item.value}
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-border/60 shadow-lg">
                <Image
                  src="/images/hero-mahakal-1.jpg"
                  alt="Mahakaleshwar Temple, Ujjain"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-6 rounded-2xl border border-border/60 bg-card px-5 py-3 shadow-lg">
                <p className="font-display text-lg font-bold text-foreground">
                  Trusted by 50,000+ travelers
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  Since 2016 · Ujjain, Madhya Pradesh
                </p>
              </div>
            </div>

            <div>
              <span className="font-handwritten text-base text-copper">
                Our story
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Born on the banks of the Shipra
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                CabTourist started in Ujjain with a simple goal — to make
                pilgrimage travel to Mahakaleshwar Temple and the holy city of
                Ujjain effortless for every devotee. Today, we operate cabs and
                curated tour packages across the country, carrying the same
                warmth, honesty and care that shaped our first ride.
              </p>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                Every trip is backed by verified drivers, transparent pricing
                and round-the-clock support, so you can focus on the journey —
                we&apos;ll take care of the drive.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-handwritten text-base text-copper">
                What we stand for
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Travel the way it should be
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => {
                const Icon = v.icon
                return (
                  <div
                    key={v.title}
                    className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-colors hover:border-copper/40"
                  >
                    <span className="flex size-11 items-center justify-center rounded-xl wood-block">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-muted-foreground">
                      {v.text}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
