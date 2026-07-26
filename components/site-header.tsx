"use client"

import * as React from "react"
import { Menu, Phone, X } from "lucide-react"

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
        "sticky top-0 z-50 w-full transition-colors",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <BrandLogo />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Cab<span className="text-primary">Tourist</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+911800000000"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground lg:flex"
          >
            <Phone className="size-4 text-primary" />
            1800-000-000
          </a>
          <ThemeToggle />
          <a href="/login" className="hidden rounded-full sm:inline-flex h-8 items-center justify-center gap-1.5 bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">
            Sign in
          </a>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <a href="/login" className="mt-2 flex h-8 items-center justify-center rounded-full bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80">Sign in</a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
