import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
} from "lucide-react"

import { cn } from "@/lib/utils"

const CONTACTS = [
  {
    icon: Phone,
    label: "Call us",
    value: "+91 7828887888",
    href: "tel:+917828887888",
    sub: "Mon – Sun, 8 AM – 10 PM",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 7828887888",
    href: "https://wa.me/917828887888?text=Hi%20CabTourist%2C%20I%20need%20help",
    sub: "Quick replies, always available",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@cabtourist.com",
    href: "mailto:hello@cabtourist.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Ujjain, Madhya Pradesh",
    href: "https://maps.google.com/?q=Ujjain+Madhya+Pradesh",
    sub: "India",
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-handwritten text-base text-copper">
          Get in touch
        </span>
        <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tell us what you need
        </h2>
        <p className="mt-3 text-pretty text-muted-foreground">
          Have a question about bookings, pricing, or tour packages? Reach out
          through any channel — we&apos;re here to help.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CONTACTS.map((c) => {
          const Icon = c.icon
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(
                "group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center",
                "shadow-[0_1px_4px_rgba(58,46,31,0.04)]",
                "transition-all hover:-translate-y-0.5 hover:border-copper/40 hover:shadow-[0_4px_12px_rgba(58,46,31,0.08)]",
              )}
            >
              <span className="flex size-11 items-center justify-center rounded-lg wood-block">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-handwritten text-sm text-muted-foreground">
                  {c.label}
                </p>
                <p className="mt-0.5 font-sans text-sm font-semibold text-foreground group-hover:text-copper">
                  {c.value}
                </p>
                <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                  {c.sub}
                </p>
              </div>
            </a>
          )
        })}
      </div>

      {/* Business hours */}
      <div className="mx-auto mt-8 max-w-md rounded-lg border border-border/60 bg-muted/30 p-5">
        <div className="flex items-center justify-center gap-2">
          <Clock className="size-4 text-copper" />
          <p className="font-sans text-sm font-semibold text-foreground">
            Business hours
          </p>
        </div>
        <div className="mt-3 space-y-1.5 font-sans text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Monday – Friday</span>
            <span className="font-medium text-foreground">8:00 AM – 10:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday – Sunday</span>
            <span className="font-medium text-foreground">9:00 AM – 8:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Holidays</span>
            <span className="font-medium text-foreground">10:00 AM – 6:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  )
}
