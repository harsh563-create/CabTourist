import { Mail, MapPin, Phone, Compass } from "lucide-react"

import { CONTACTS, SITE } from "@/lib/site-config"

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our Taxi", href: "/our-taxi" },
      { label: "Hotel", href: "/hotel" },
      { label: "Pujan", href: "/pujan" },
      { label: "Blog", href: "/about" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Outstation cabs", href: "/book" },
      { label: "Airport transfers", href: "/book" },
      { label: "Hourly rentals", href: "/book" },
      { label: "Tour packages", href: "/packages" },
      { label: "Pujan & darshan", href: "/pujan" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/faq" },
      { label: "Cancellation policy", href: "/faq" },
      { label: "Terms of service", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-lg bg-leather text-primary-foreground">
                <Compass className="size-4" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                Cab<span className="text-copper">Tourist</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
              Premium cabs, hotels and temple darshan packages with verified
              drivers, transparent fares, and round-the-clock support.
            </p>
            <ul className="mt-5 space-y-2 font-sans text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-copper" />
                <a href={CONTACTS.phone1Href} className="transition-colors hover:text-copper">
                  {CONTACTS.phone1Display}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-copper" />
                <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-copper">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-copper" /> {SITE.address}
              </li>
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-sans text-sm text-muted-foreground transition-colors hover:text-copper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Vintage divider */}
        <div className="vintage-divider my-8">
          <span className="font-handwritten text-sm">✦</span>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
          <p className="font-sans">
            © {new Date().getFullYear()} CabTourist. All rights reserved.
          </p>
          <p className="font-handwritten text-base">
            Made for travelers, everywhere.
          </p>
        </div>
      </div>
    </footer>
  )
}
