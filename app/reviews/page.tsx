import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { Reviews } from "@/components/reviews"

export default function ReviewsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Traveler stories"
          title="Rated 4.9 by travelers across India"
          description="Real reviews from verified trips — here&apos;s what travelers say about riding with CabTourist."
        />
        <Reviews heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
