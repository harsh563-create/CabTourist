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
          eyebrow="Curated tour packages"
          title="Ready-to-go trips with cabs included"
          description="Multi-day getaways with private chauffeurs, handpicked stays, and local guides. Just pack and go."
        />
        <TourPackages heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
