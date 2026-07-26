import { ArrowRight, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-20">
      <div className="overflow-hidden rounded-3xl border border-primary/20 bg-primary p-8 text-primary-foreground sm:p-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Your next trip is one tap away
            </h2>
            <p className="mt-3 text-pretty text-primary-foreground/80">
              Book in under a minute, track your ride live, and travel with
              complete peace of mind. Available across 450+ cities.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-cta px-6 text-base font-semibold text-cta-foreground hover:bg-cta/90"
              nativeButton={false}
              render={<a href="#top" />}
            >
              Book a cab <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Smartphone className="size-4" /> Get the app
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
