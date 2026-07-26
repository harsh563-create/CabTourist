import { Mail, MapPin, Phone, Compass } from "lucide-react"

const COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Partners", "Blog"],
  },
  {
    title: "Services",
    links: [
      "Outstation cabs",
      "Airport transfers",
      "Hourly rentals",
      "Tour packages",
      "Corporate travel",
    ],
  },
  {
    title: "Support",
    links: ["Help center", "Cancellation policy", "Terms of service", "Privacy policy", "Contact"],
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
              Premium cabs and curated tour packages with verified drivers,
              transparent fares, and round-the-clock support.
            </p>
            <ul className="mt-5 space-y-2 font-sans text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-copper" /> 1800-000-000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-copper" /> hello@cabtourist.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-copper" /> Bengaluru, India
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
                  <li key={link}>
                    <a
                      href="#"
                      className="font-sans text-sm text-muted-foreground transition-colors hover:text-copper"
                    >
                      {link}
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
