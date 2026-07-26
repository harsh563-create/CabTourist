import { ArrowRight, Smartphone } from "lucide-react"

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20">
      <div className="burnt-edge relative overflow-hidden rounded-lg border border-leather/30 bg-leather p-8 text-primary-foreground sm:p-12">
        {/* Paper texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)',
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
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
            <a
              href="#top"
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-cta px-6 py-2.5 font-sans text-base font-semibold text-cta-foreground shadow-sm transition-all hover:bg-cta/90"
            >
              Book a cab <ArrowRight className="size-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary-foreground/30 bg-transparent px-6 py-2.5 font-sans text-base text-primary-foreground transition-all hover:bg-primary-foreground/10"
            >
              <Smartphone className="size-4" /> Get the app
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
