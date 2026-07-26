import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { PopularRoutes } from "@/components/popular-routes"
import { TourPackages } from "@/components/tour-packages"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Reviews } from "@/components/reviews"
import { FaqSection } from "@/components/faq-section"
import { CtaBand } from "@/components/cta-band"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <PopularRoutes />
        <TourPackages />
        <WhyChooseUs />
        <Reviews />
        <FaqSection />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  )
}
