import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Terms of Service — CabTourist",
  description:
    "Read the terms and conditions governing the use of CabTourist cab booking and tour services.",
}

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: `By accessing or using CabTourist services — including our website, mobile app, phone bookings and tour packages — you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our services immediately.`,
  },
  {
    title: "2. Services offered",
    body: `CabTourist provides cab booking, airport transfers, outstation trips, hourly rentals, curated tour packages, hotel bookings and temple darshan (pujan) services. Service availability may vary by city and season.`,
  },
  {
    title: "3. Booking and payment",
    body: `A confirmed booking is subject to vehicle and driver availability. Fares displayed on the website or quoted over the phone are inclusive of fuel, driver allowance and applicable taxes unless stated otherwise. Payment can be made via UPI, credit/debit card, net banking or cash directly to the driver. Advance payments for tour packages are non-refundable once the tour date is within 48 hours.`,
  },
  {
    title: "4. Cancellation and refund",
    body: `Cancellations made more than 24 hours before the scheduled pickup are eligible for a full refund. Cancellations within 24 hours may incur a cancellation fee of up to 25% of the fare. No-shows or mid-trip cancellations are not eligible for refunds. Tour package refunds are governed by the specific package terms shared at the time of booking.`,
  },
  {
    title: "5. User responsibilities",
    body: `You must provide accurate booking details including pickup location, destination, travel date, number of passengers and any special requirements. You are responsible for your luggage and personal belongings during the trip. CabTourist is not liable for loss or damage to personal items left in the vehicle.`,
  },
  {
    title: "6. Driver conduct and safety",
    body: `All CabTourist drivers are background-verified, trained and follow traffic rules at all times. In the event of a complaint regarding driver behavior, route deviation or safety concerns, please contact our 24/7 support line immediately. We investigate all reports and take appropriate action including driver suspension or termination.`,
  },
  {
    title: "7. Route and fare changes",
    body: `The fare quoted at the time of booking is calculated based on the estimated route and distance. If the actual route differs significantly due to road closures, diversions or passenger-requested detours, the fare may be adjusted accordingly. Any fare change will be communicated to the passenger before proceeding.`,
  },
  {
    title: "8. Tour packages",
    body: `Tour package inclusions and exclusions are clearly listed on each package page. CabTourist is not responsible for closures of monuments, temples or attractions due to government orders, natural events or festivals. Itinerary changes made for the safety or convenience of guests will be communicated promptly.`,
  },
  {
    title: "9. Limitation of liability",
    body: `CabTourist acts as a booking and coordination platform. We are not liable for delays caused by traffic, weather, road conditions or other circumstances beyond our reasonable control. Our total liability for any booking shall not exceed the fare paid for that specific trip.`,
  },
  {
    title: "10. Changes to terms",
    body: `CabTourist reserves the right to update these terms at any time. Changes take effect immediately upon posting on this page. Continued use of our services after changes constitutes acceptance of the revised terms.`,
  },
  {
    title: "11. Contact",
    body: `For questions about these Terms of Service, please reach out to us at hello@cabtourist.com or call +91 7828887888.`,
  },
]

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Terms of Service"
          description="Please read these terms carefully before using CabTourist services."
        />

        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          <p className="font-sans text-sm text-muted-foreground">
            Effective date: 1 August 2025
          </p>
          <div className="mt-8 space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {s.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
