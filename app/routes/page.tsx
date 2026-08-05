import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { PopularRoutes } from "@/components/popular-routes"

export default function RoutesPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Popular outstation routes"
          title="Loved routes at fixed, fair prices"
          description="Handpicked intercity trips travelers book again and again — with all-inclusive fares and top-rated drivers."
        />
        <PopularRoutes heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
