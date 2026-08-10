import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Check, Clock, MapPin, Sparkles } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { UJJAIN_SIGHTS } from "@/lib/cabtourist-data"
import { CONTACTS } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Pujan & Temple Darshan — Ujjain | CabTourist",
  description:
    "Book Mahakaleshwar temple darshan, Bhasma Aarti, Bade Ganeshji and Kal Bhairav pujan in Ujjain with private cabs, guides and priority assistance.",
}

const PUJAN_SERVICES = [
  {
    name: "Mahakal Darshan",
    place: "Mahakaleshwar Temple",
    price: 1499,
    duration: "2–3 hours",
    includes: [
      "Private cab pickup & drop",
      "Priority darshan assistance",
      "Temple guide support",
    ],
    popular: true,
  },
  {
    name: "Bhasma Aarti (Mangal Aarti)",
    place: "Mahakaleshwar Temple",
    price: 3499,
    duration: "4:00 AM – 5:30 AM",
    includes: [
      "Early morning cab pickup",
      "Aarti slot arrangement",
      "Prasad & guidance",
    ],
    popular: false,
  },
  {
    name: "Bade Ganeshji Pujan",
    place: "Bade Ganeshji Ka Mandir",
    price: 999,
    duration: "1–2 hours",
    includes: [
      "Cab pickup & drop",
      "Pujan essentials",
      "Local guide",
    ],
    popular: false,
  },
  {
    name: "Kal Bhairav Darshan",
    place: "Kal Bhairav Temple",
    price: 1199,
    duration: "1–2 hours",
    includes: [
      "Cab pickup & drop",
      "Darshan assistance",
      "Boat ride to temple",
    ],
    popular: false,
  },
]

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export default function PujanPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Pujan & temple darshan"
          title="Sacred journeys to Mahakaleshwar, Ujjain"
          description="Arrive with peace of mind — we arrange your darshan, pujan essentials and comfortable cabs for the holy city of Ujjain."
        />

        {/* Banner */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-lg">
            <div className="relative aspect-[21/9] max-h-[420px] w-full">
              <Image
                src="/images/pujan-mahakal.jpg"
                alt="Mahakaleshwar Temple, Ujjain"
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cta px-3 py-1 text-xs font-semibold text-cta-foreground">
                  <Sparkles className="size-3.5" /> One of the 12 Jyotirlingas
                </span>
                <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold text-white sm:text-4xl">
                  Mahakaleshwar Temple
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-white/85 sm:text-base">
                  Bhasma Aarti · Rudrabhishek · Mangal Darshan — let us handle
                  the arrangements while you focus on the divine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Puja services */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-handwritten text-base text-copper">
              Pujan packages
            </span>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Darshan & pujan, arranged for you
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Every package includes cab transfers and local guidance, so your
              sacred visit stays effortless.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PUJAN_SERVICES.map((service) => (
              <article
                key={service.name}
                className="group relative flex flex-col rounded-2xl border border-border/70 bg-card p-6 shadow-[0_2px_10px_rgba(58,46,31,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(58,46,31,0.14)]"
              >
                {service.popular ? (
                  <span className="absolute -top-2.5 right-5 rounded-full bg-cta px-3 py-0.5 text-xs font-bold text-cta-foreground shadow-sm">
                    Most Popular
                  </span>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {service.name}
                    </h3>
                    <p className="mt-0.5 flex items-center gap-1 font-sans text-sm text-muted-foreground">
                      <MapPin className="size-3.5 text-copper" />
                      {service.place}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold text-copper">
                      {inr.format(service.price)}
                    </p>
                    <p className="flex items-center justify-end gap-1 font-sans text-xs text-muted-foreground">
                      <Clock className="size-3" /> {service.duration}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {service.includes.map((inc) => (
                    <li
                      key={inc}
                      className="flex items-center gap-2 font-sans text-sm text-muted-foreground"
                    >
                      <Check className="size-4 shrink-0 text-copper" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex gap-2 border-t border-border/60 pt-5">
                  <Link
                    href="/book"
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-full bg-leather font-sans text-sm font-bold text-primary-foreground shadow-sm transition-all hover:bg-leather/90"
                  >
                    Book Pujan
                  </Link>
                  <a
                    href={CONTACTS.whatsappLink(
                      `Hi CabTourist, I want to book ${service.name} in Ujjain.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full border-2 border-copper bg-card px-4 font-sans text-sm font-semibold text-copper transition-colors hover:bg-copper/10"
                  >
                    Enquire
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ujjain sights */}
        <section className="border-t border-border/60 bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-handwritten text-base text-copper">
                Explore Ujjain
              </span>
              <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Sacred sights to visit
              </h2>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {UJJAIN_SIGHTS.map((sight) => (
                <li
                  key={sight.name}
                  className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-copper/40"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl wood-block">
                    <MapPin className="size-4" />
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                    {sight.name}
                  </h3>
                  <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                    {sight.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
