"use client"

import * as React from "react"
import {
  ArrowLeftRight,
  CalendarDays,
  Check,
  Clock,
  Loader2,
  MapPin,
  Search,
  Users,
  Luggage,
  BadgeCheck,
  PhoneCall,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  CAB_TYPES,
  CITIES,
  POPULAR_ROUTES,
  TRIP_TYPES,
  type CabType,
  type TripTypeId,
} from "@/lib/cabtourist-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const cityItems = Object.fromEntries(CITIES.map((c) => [c, c]))

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

function estimateDistance(from: string, to: string) {
  const known = POPULAR_ROUTES.find(
    (r) =>
      (r.from === from && r.to === to) || (r.from === to && r.to === from),
  )
  if (known) return known.distanceKm
  const seed = (from + to)
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return 80 + (seed % 420)
}

function computeFare(cab: CabType, distanceKm: number, roundTrip: boolean) {
  const km = roundTrip ? distanceKm * 2 : distanceKm
  return Math.round(cab.baseFare + cab.perKm * km)
}

type Step = "results" | "details" | "confirmed"

export function BookingWidget({ className }: { className?: string }) {
  const today = React.useMemo(() => new Date().toISOString().split("T")[0], [])

  const [tripType, setTripType] = React.useState<TripTypeId>("oneway")
  const [from, setFrom] = React.useState<string>("Mumbai")
  const [to, setTo] = React.useState<string>("Pune")
  const [date, setDate] = React.useState<string>(today)
  const [time, setTime] = React.useState<string>("09:00")
  const [returnDate, setReturnDate] = React.useState<string>("")
  const [error, setError] = React.useState<string | null>(null)

  const [open, setOpen] = React.useState(false)
  const [step, setStep] = React.useState<Step>("results")
  const [selectedCab, setSelectedCab] = React.useState<CabType | null>(null)
  const [submitting, setSubmitting] = React.useState(false)
  const [bookingId, setBookingId] = React.useState<string>("")
  const [passenger, setPassenger] = React.useState({
    name: "",
    phone: "",
    email: "",
  })

  const isRoundTrip = tripType === "roundtrip"
  const distanceKm = estimateDistance(from, to)

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (from === to) {
      setError("Pickup and drop-off cities can't be the same.")
      return
    }
    if (isRoundTrip && returnDate && returnDate < date) {
      setError("Return date must be after the pickup date.")
      return
    }
    setError(null)
    setStep("results")
    setSelectedCab(null)
    setBookingId("")
    setPassenger({ name: "", phone: "", email: "" })
    setOpen(true)
  }

  function chooseCab(cab: CabType) {
    setSelectedCab(cab)
    setStep("details")
  }

  function confirmBooking(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    window.setTimeout(() => {
      setBookingId(
        "CT" + Math.random().toString(36).slice(2, 8).toUpperCase(),
      )
      setSubmitting(false)
      setStep("confirmed")
    }, 1100)
  }

  const dialogTitle =
    step === "results"
      ? "Choose your ride"
      : step === "details"
        ? "Passenger details"
        : "Booking confirmed"

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-border bg-card p-6 sm:p-8",
        "shadow-[0_4px_16px_rgba(58,46,31,0.12)]",
        className,
      )}
    >
      {/* Trip type selector - premium tabs */}
      <div className="relative grid grid-cols-4 gap-2 rounded-lg bg-secondary/40 p-1.5">
        {TRIP_TYPES.map((t) => {
          const active = tripType === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTripType(t.id)}
              aria-pressed={active}
              className={cn(
                "rounded-lg px-3 py-2.5 font-sans text-sm font-semibold transition-all",
                active
                  ? "bg-cta text-cta-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
              )}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <form onSubmit={handleSearch} className="relative mt-5">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Pickup city */}
          <div className="relative md:col-span-1">
            <Field label="Pickup city" icon={<MapPin className="size-4" />}>
              <Select
                items={cityItems}
                value={from}
                onValueChange={(v: string | null) => v && setFrom(v)}
              >
                <SelectTrigger className="h-12 w-full rounded-lg border border-border bg-white text-base font-medium text-foreground">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          {/* Drop-off city with swap button */}
          <div className="relative md:col-span-1">
            <Field label="Drop-off city" icon={<MapPin className="size-4" />}>
              <Select
                items={cityItems}
                value={to}
                onValueChange={(v: string | null) => v && setTo(v)}
              >
                <SelectTrigger className="h-12 w-full rounded-lg border border-border bg-white text-base font-medium text-foreground">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <button
              type="button"
              onClick={swap}
              aria-label="Swap pickup and drop-off"
              className="absolute -right-5 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-copper bg-white text-copper shadow-md transition-all hover:bg-copper hover:text-white md:flex"
            >
              <ArrowLeftRight className="size-5" />
            </button>
          </div>

          {/* Pickup date */}
          <div className="md:col-span-1">
            <Field label="Pickup date" icon={<CalendarDays className="size-4" />}>
              <Input
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 rounded-lg border border-border bg-white text-base font-medium text-foreground"
              />
            </Field>
          </div>

          {/* Pickup time or Return date */}
          <div className="md:col-span-1">
            {isRoundTrip ? (
              <Field
                label="Return date"
                icon={<CalendarDays className="size-4" />}
              >
                <Input
                  type="date"
                  min={date || today}
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="h-12 rounded-lg border border-border bg-white text-base font-medium text-foreground"
                />
              </Field>
            ) : (
              <Field label="Pickup time" icon={<Clock className="size-4" />}>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12 rounded-lg border border-border bg-white text-base font-medium text-foreground"
                />
              </Field>
            )}
          </div>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>
        ) : null}

        <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm text-muted-foreground text-center sm:text-left">
            Approx.{" "}
            <span className="font-semibold text-foreground">
              {distanceKm} km
            </span>{" "}
            · fares shown before booking · free cancellation
          </p>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto h-12 rounded-lg bg-cta px-8 font-sans text-base font-bold text-cta-foreground hover:bg-cta/90 shadow-lg transition-all"
          >
            <Search className="size-5 mr-2" />
            Search cabs
          </Button>
        </div>
      </form>

      {/* Booking flow dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto rounded-lg border-border p-0 sm:max-w-lg">
          <DialogHeader className="border-b border-border bg-card/50 p-5">
            <DialogTitle className="font-display text-lg">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription>
              {from} → {to} · {distanceKm} km ·{" "}
              {new Date(date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })}{" "}
              · {isRoundTrip ? "Round trip" : "One way"}
            </DialogDescription>
          </DialogHeader>

          {step === "results" ? (
            <ul className="divide-y divide-border">
              {CAB_TYPES.map((cab) => {
                const fare = computeFare(cab, distanceKm, isRoundTrip)
                return (
                  <li key={cab.id}>
                    <button
                      type="button"
                      onClick={() => chooseCab(cab)}
                      className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-muted/60"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-copper/20 bg-copper/10 text-copper">
                        <CabGlyph id={cab.id} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-sans font-semibold text-foreground">
                          {cab.name}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {cab.description}
                        </p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Users className="size-3.5" /> {cab.seats}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Luggage className="size-3.5" /> {cab.bags}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="size-3.5" /> {cab.eta}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-lg font-bold text-copper">
                          {inr.format(fare)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          incl. all taxes
                        </p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : null}

          {step === "details" && selectedCab ? (
            <form onSubmit={confirmBooking} className="p-5">
              <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex size-9 items-center justify-center rounded-lg border border-copper/20 bg-copper/10 text-copper">
                    <CabGlyph id={selectedCab.id} />
                  </span>
                  <span className="font-sans font-medium text-foreground">
                    {selectedCab.name}
                  </span>
                </div>
                <span className="font-display text-lg font-bold text-copper">
                  {inr.format(
                    computeFare(selectedCab, distanceKm, isRoundTrip),
                  )}
                </span>
              </div>

              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="pax-name">Full name</Label>
                  <Input
                    id="pax-name"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={passenger.name}
                    onChange={(e) =>
                      setPassenger((p) => ({ ...p, name: e.target.value }))
                    }
                    className="h-11 rounded-md"
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="pax-phone">Phone</Label>
                    <Input
                      id="pax-phone"
                      required
                      type="tel"
                      inputMode="tel"
                      placeholder="+91 90000 00000"
                      value={passenger.phone}
                      onChange={(e) =>
                        setPassenger((p) => ({ ...p, phone: e.target.value }))
                      }
                      className="h-11 rounded-md"
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="pax-email">Email</Label>
                    <Input
                      id="pax-email"
                      required
                      type="email"
                      placeholder="you@email.com"
                      value={passenger.email}
                      onChange={(e) =>
                        setPassenger((p) => ({ ...p, email: e.target.value }))
                      }
                      className="h-11 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-11 flex-1 rounded-md"
                  onClick={() => setStep("results")}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-11 flex-[2] rounded-md bg-cta text-cta-foreground hover:bg-cta/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Confirming…
                    </>
                  ) : (
                    <>Confirm booking</>
                  )}
                </Button>
              </div>
            </form>
          ) : null}

          {step === "confirmed" && selectedCab ? (
            <div className="p-6 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-copper/30 bg-copper/10 text-copper">
                <Check className="size-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                You&apos;re all set, {passenger.name.split(" ")[0] || "traveler"}!
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Booking ID{" "}
                <span className="font-semibold text-foreground">
                  {bookingId}
                </span>{" "}
                confirmed. Driver details will be shared 2 hours before pickup.
              </p>

              <div className="mt-5 grid gap-2 rounded-lg border border-border bg-muted/40 p-4 text-left text-sm">
                <Row label="Route" value={`${from} → ${to}`} />
                <Row label="Cab" value={selectedCab.name} />
                <Row
                  label="Pickup"
                  value={`${new Date(date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}, ${time}`}
                />
                <Row
                  label="Total fare"
                  value={inr.format(
                    computeFare(selectedCab, distanceKm, isRoundTrip),
                  )}
                  strong
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <BadgeCheck className="size-4 text-copper" /> Verified driver
                </span>
                <span className="inline-flex items-center gap-1">
                  <PhoneCall className="size-4 text-copper" /> 24/7 support
                </span>
              </div>

              <Button
                size="lg"
                className="mt-5 h-11 w-full rounded-md"
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-1.5">
      <span className="flex items-center gap-1.5 font-sans text-xs font-medium text-muted-foreground">
        <span className="text-copper">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  )
}

function Row({
  label,
  value,
  strong,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-foreground",
          strong ? "font-display text-base font-bold" : "font-sans font-medium",
        )}
      >
        {value}
      </span>
    </div>
  )
}

function CabGlyph({ id }: { id: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <path d="M3 14a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1" />
      <path d="M6 18H4a1 1 0 0 1-1-1v-3" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
      {id === "premium" ? <path d="M9.5 17.5h5" /> : null}
    </svg>
  )
}
