import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { FleetVendors } from "@/components/fleet-vendors"

export const metadata: Metadata = {
  title: "Fleet Vendors — Trusted Partners | CabTourist",
  description:
    "Meet the verified fleet vendors behind CabTourist — rated drivers, well-maintained vehicles, and transparent pricing across India.",
}

export default function VendorsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Fleet vendors"
          title="Verified fleet partners across India"
          description="From city cabs to outstation fleets, our vendors are background-checked, rated by real travelers, and ready when you are."
        />
        <FleetVendors heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
