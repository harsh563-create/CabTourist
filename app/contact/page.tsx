"use client"

import * as React from "react"
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  Loader2,
  CheckCircle2,
  Clock,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { submitContactMessage } from "@/lib/contact-api"

const CONTACT_INFO = [
  {
    icon: Phone,
    label: "Call us",
    value: "+91 7828887888",
    href: "tel:+917828887888",
    description: "Mon – Sun, 8 AM – 10 PM",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 7828887888",
    href: "https://wa.me/917828887888?text=Hi%20CabTourist%2C%20I%20need%20help",
    description: "Quick replies, always available",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@cabtourist.com",
    href: "mailto:hello@cabtourist.com",
    description: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Ujjain, Madhya Pradesh",
    href: "https://maps.google.com/?q=Ujjain+Madhya+Pradesh",
    description: "India",
  },
]

export default function ContactPage() {
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [subject, setSubject] = React.useState("")
  const [message, setMessage] = React.useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await submitContactMessage({ name, email, phone: phone || undefined, subject, message })
      setSent(true)
    } catch {
      alert("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%236b4226' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%236b4226'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="font-handwritten text-base text-copper">
                Get in touch
              </span>
              <h1 className="mt-2 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
                Tell us what you need
              </h1>
              <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
                Whether you have a question about bookings, pricing, tour packages, or
                anything else — our team is ready to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards + Form */}
        <section className="pb-16 md:pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              {/* Left: Contact info cards */}
              <div className="flex flex-col gap-4">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group flex items-start gap-4 rounded-lg border border-border bg-card p-5",
                        "shadow-[0_1px_4px_rgba(58,46,31,0.04)]",
                        "transition-all hover:border-copper/40 hover:shadow-[0_2px_8px_rgba(58,46,31,0.08)]",
                      )}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg wood-block">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-handwritten text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-0.5 font-sans font-semibold text-foreground group-hover:text-copper">
                          {item.value}
                        </p>
                        <p className="mt-0.5 font-sans text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  )
                })}

                {/* Business hours */}
                <div className="rounded-lg border border-border/60 bg-muted/30 p-5">
                  <div className="flex items-center gap-2">
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
              </div>

              {/* Right: Contact form */}
              <div
                className={cn(
                  "rounded-lg border border-border bg-card p-6 sm:p-8",
                  "shadow-[0_2px_8px_rgba(58,46,31,0.06),0_8px_24px_rgba(58,46,31,0.04)]",
                )}
              >
                {/* Paper texture */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg opacity-[0.02]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139, 105, 20, 0.3) 3px, rgba(139, 105, 20, 0.3) 4px)",
                  }}
                />

                {sent ? (
                  <div className="relative flex flex-col items-center gap-3 py-12 text-center">
                    <CheckCircle2 className="size-14 text-green-600" />
                    <h3 className="mt-2 font-display text-xl font-bold text-foreground">
                      Message sent successfully!
                    </h3>
                    <p className="max-w-sm font-sans text-sm text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false)
                        setName("")
                        setEmail("")
                        setPhone("")
                        setSubject("")
                        setMessage("")
                      }}
                      className="mt-2 font-sans text-sm font-medium text-copper hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
                    <div>
                      <h3 className="font-display text-lg font-bold text-foreground">
                        Send us a message
                      </h3>
                      <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                        Fill out the form and we&apos;ll respond shortly.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="contact-name">Your name</Label>
                        <Input
                          id="contact-name"
                          required
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="h-11 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="contact-email">Email address</Label>
                        <Input
                          id="contact-email"
                          required
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="contact-phone">Phone (optional)</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          inputMode="tel"
                          placeholder="+91 7828887888"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="h-11 rounded-md"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Label htmlFor="contact-subject">Subject</Label>
                        <Input
                          id="contact-subject"
                          required
                          placeholder="Booking inquiry"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="h-11 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="contact-message">Message</Label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        placeholder="Tell us about your trip, questions, or feedback..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={cn(
                          "rounded-md border border-input bg-transparent px-3 py-2.5 font-sans text-sm",
                          "placeholder:text-muted-foreground",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                          "outline-none transition-colors",
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={cn(
                        "flex h-11 items-center justify-center gap-2 rounded-md",
                        "bg-leather font-sans text-sm font-semibold text-primary-foreground",
                        "transition-all hover:bg-leather/90",
                        "disabled:pointer-events-none disabled:opacity-50",
                      )}
                    >
                      {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Send className="size-4" />
                      )}
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
