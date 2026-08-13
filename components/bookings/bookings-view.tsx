"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, CalendarCheck, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useUser } from "@/lib/use-user"
import { STATUS_STYLES } from "@/lib/admin-data"
import { fetchMyBookings, type Booking } from "@/lib/bookings-api"

const inrFull = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export function BookingsView() {
  const user = useUser()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchMyBookings(user.email, user.phone)
      .then((data) => {
        if (!cancelled) setBookings(data)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load bookings"
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [user])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-handwritten text-lg text-copper">My account</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          My bookings
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Track your cab rides and tour packages in one place.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 py-16">
          <Loader2 className="size-6 animate-spin text-copper" />
          <p className="font-sans text-sm text-muted-foreground">
            Loading your bookings…
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/50 px-6 py-16 text-center">
          <AlertTriangle className="size-8 text-destructive" />
          <div>
            <p className="font-sans text-sm font-semibold text-foreground">
              Could not load your bookings
            </p>
            <p className="mt-1 font-sans text-xs text-muted-foreground">
              {error}
            </p>
          </div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-copper/10">
            <CalendarCheck className="size-8 text-copper" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              No bookings yet
            </h2>
            <p className="mt-1.5 max-w-sm font-sans text-sm text-muted-foreground">
              When you book an outstation cab or a tour package, it will show up
              here with live status updates.
            </p>
          </div>
          <Button
            render={<Link href="/book" />}
            className="bg-leather font-sans font-semibold text-primary-foreground hover:bg-leather/90"
          >
            <CalendarCheck className="size-4" />
            Book your first trip
          </Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-medium text-copper">
                    {b.ref}
                  </p>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">
                    {b.route}
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-muted-foreground">
                    {b.cab} · {new Date(b.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {b.time ? ` · ${b.time}` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold capitalize",
                      STATUS_STYLES[b.status]
                    )}
                  >
                    {b.status}
                  </span>
                  <p className="font-display text-lg font-bold text-copper">
                    {inrFull.format(b.amount)}
                  </p>
                </div>
              </div>
              {b.driver ? (
                <p className="mt-3 border-t border-border/60 pt-3 font-sans text-sm text-muted-foreground">
                  Driver: <span className="font-medium text-foreground">{b.driver}</span>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
