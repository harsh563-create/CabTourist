import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"
import { FaqSection } from "@/components/faq-section"

export default function FaqPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Need answers?"
          title="Frequently asked questions"
          description="Everything you need to know about booking, pricing, and support. Can&apos;t find your answer? Our team is available 24/7 on 1800-000-000."
        />
        <FaqSection heading={false} />
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
