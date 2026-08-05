import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { WhyChooseUs } from "@/components/why-choose-us"

export default function WhyUsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Why travelers choose CabTourist"
          title="Built for safe, stress-free travel"
          description="Everything you need for a dependable ride — from the first tap to the final drop-off."
        />
        <WhyChooseUs heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
