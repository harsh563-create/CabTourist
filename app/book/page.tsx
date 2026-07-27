"use client"

import {
  ShieldCheck,
  Clock,
  BadgeCheck,
  Headphones,
  CreditCard,
  MapPinned,
} from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { BookingWidget } from "@/components/booking-widget"

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: "Safe & Verified",
    desc: "All drivers are background-verified with government ID",
  },
  {
    icon: Clock,
    title: "On-Time Pickup",
    desc: "Real-time tracking and punctual arrival guaranteed",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    desc: "No hidden charges — fare shown before you confirm",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock assistance for any booking issues",
  },
]

export default function BookPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-14 md:py-18">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%236b4226' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%236b4226'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-handwritten text-base text-copper">
                Hassle-free travel
              </span>
              <h1 className="mt-2 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Book your cab in seconds
              </h1>
              <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
                Choose your route, pick a cab, and you&apos;re set. Transparent
                fares, verified drivers, and 24/7 support — every trip, every
                time.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Widget */}
        <section className="pb-10 md:pb-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <BookingWidget />
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-t border-border/60 bg-muted/20 py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST_POINTS.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4 shadow-[0_1px_3px_rgba(58,46,31,0.04)]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg wood-block text-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-sans text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-0.5 font-sans text-xs leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quick info strip */}
        <section className="border-t border-border/60 py-10 md:py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <InfoCard
                icon={<MapPinned className="size-5" />}
                title="14+ cities"
                desc="Cabs available across all major Indian cities"
              />
              <InfoCard
                icon={<BadgeCheck className="size-5" />}
                title="50,000+ trips"
                desc="Trusted by thousands of happy travelers"
              />
              <InfoCard
                icon={<ShieldCheck className="size-5" />}
                title="Free cancellation"
                desc="Cancel up to 1 hour before pickup — no charges"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}

function InfoCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode
  title: string
  desc: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-5">
      <span className="text-copper">{icon}</span>
      <div className="min-w-0">
        <p className="font-display text-base font-bold text-foreground">
          {title}
        </p>
        <p className="mt-1 font-sans text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}
