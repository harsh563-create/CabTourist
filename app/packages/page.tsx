import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { TourPackages } from "@/components/tour-packages"

export default function PackagesPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Ujjain taxi packages"
          title="Temples & trips from Ujjain, on your schedule"
          description="Book a private AC cab for darshan circuits, airport transfers, and outstation trips. Transparent fares, verified drivers."
        />
        <TourPackages heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
