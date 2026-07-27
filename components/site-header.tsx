"use client"

import * as React from "react"
import { Menu, Phone, X, Compass } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { BrandLogo } from "@/components/brand-logo"

const NAV = [
  { label: "Routes", href: "#routes" },
  { label: "Packages", href: "#packages" },
  { label: "Why us", href: "#why" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/90 backdrop-blur-md shadow-[0_2px_12px_rgba(58,46,31,0.08)]"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-cta text-cta-foreground font-bold">
            CT
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Cab<span className="text-copper">Tourist</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+911800000000"
            className="hidden items-center gap-2 rounded-lg border-2 border-copper bg-card/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary lg:flex"
          >
            <Phone className="size-4 text-copper" />
            1800-000-000
          </a>
          <ThemeToggle />
          <a
            href="/login"
            className="hidden items-center gap-1.5 rounded-lg bg-cta px-5 py-2 text-sm font-bold text-cta-foreground shadow-md transition-all hover:bg-cta/90 sm:inline-flex"
          >
            Sign In
          </a>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-sans text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/login"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-leather px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-leather/90"
            >
              Sign in
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
