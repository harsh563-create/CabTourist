"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarCheck, Menu, Phone, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { CONTACTS } from "@/lib/site-config"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useUser } from "@/lib/use-user"
import { UserMenu } from "@/components/auth/user-menu"
import { UserMenuMobile } from "@/components/auth/user-menu-mobile"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Taxi", href: "/our-taxi" },
  { label: "Hotel", href: "/hotel" },
  { label: "Pujan", href: "/pujan" },
  { label: "Tour Packages", href: "/packages" },
  { label: "Contact Us", href: "/contact" },
]

export function SiteHeader() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const user = useUser()
  const pathname = usePathname()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled
          ? "shadow-[0_2px_12px_rgba(58,46,31,0.12)]"
          : "shadow-none",
      )}
    >
      {/* Top contact bar */}
      <div
        className={cn(
          "overflow-hidden bg-leather text-primary-foreground transition-all duration-300",
          scrolled ? "max-h-0" : "max-h-12",
        )}
      >
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <a
            href={CONTACTS.whatsappLink(
              "Hi CabTourist, I need help with a cab booking.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.03]"
          >
            <WhatsAppIcon className="size-3.5" />
            Chat on WhatsApp
          </a>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href={CONTACTS.whatsappLink(
                "Hi CabTourist, I need help with a cab booking.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-[#25D366] transition-opacity hover:opacity-80"
            >
              <WhatsAppIcon className="size-3.5" />
              WhatsApp
            </a>
            <a
              href={CONTACTS.phone1Href}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="size-3.5" />
              {CONTACTS.phone1Display}
            </a>
            <a
              href={CONTACTS.phone2Href}
              className="hidden items-center gap-1.5 transition-opacity hover:opacity-80 sm:inline-flex"
            >
              <Phone className="size-3.5" />
              {CONTACTS.phone2Display}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" onClick={() => setOpen(false)} className="flex shrink-0 items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-cta text-cta-foreground font-bold shadow-sm">
              CT
            </span>
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Cab<span className="text-copper">Tourist</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-2 font-sans text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-cta/10 text-copper"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/book"
              className="hidden items-center gap-1.5 rounded-xl bg-leather px-5 py-2 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-leather/90 sm:inline-flex"
            >
              <CalendarCheck className="size-4" />
              Book Now
            </Link>
            {user ? (
              <UserMenu
                name={user.name}
                email={user.email}
                onNavigate={() => setOpen(false)}
              />
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-xl border-2 border-copper bg-card/70 px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:inline-flex"
              >
                Sign In
              </Link>
            )}
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {open ? (
          <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-foreground hover:bg-muted",
                    isActive(item.href) && "bg-cta/10 text-copper",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-2">
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cta px-4 py-2.5 text-sm font-bold text-cta-foreground shadow-md transition-all hover:bg-cta/90"
                >
                  <CalendarCheck className="size-4" />
                  Book Now
                </Link>
                <a
                  href={CONTACTS.whatsappLink("Hi CabTourist, I need help.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-11 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="size-5" />
                </a>
              </div>
              {user ? (
                <UserMenuMobile
                  name={user.name}
                  email={user.email}
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-1.5 rounded-xl border-2 border-copper bg-card/70 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
