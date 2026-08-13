"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Search,
  AlertTriangle,
  Loader2,
  RefreshCw,
  CalendarCheck,
} from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
import { BookingsTable } from "@/components/admin/bookings-table"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { AdminBooking, BookingStatus } from "@/lib/admin-data"
import {
  deleteBooking,
  fetchBookings,
  updateBooking,
  type Booking,
} from "@/lib/bookings-api"

const FILTERS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "ongoing", label: "Ongoing" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
]

function toAdminBooking(b: Booking): AdminBooking {
  return {
    id: b.id,
    ref: b.ref,
    customer: b.customer,
    route: b.route,
    cab: b.cab,
    date: b.date,
    amount: b.amount,
    status: b.status,
    driver: b.driver ?? "",
  }
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<BookingStatus | "all">("all")
  const [query, setQuery] = useState("")
  const [deleting, setDeleting] = useState<AdminBooking | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchBookings()
      setBookings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchesStatus = filter === "all" || b.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        b.customer.toLowerCase().includes(q) ||
        (b.ref ?? "").toLowerCase().includes(q) ||
        b.route.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [bookings, filter, query])

  const handleStatusChange = async (id: string, status: BookingStatus) => {
    try {
      const updated = await updateBooking(id, { status })
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      )
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status")
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await deleteBooking(deleting.id)
      setBookings((prev) => prev.filter((b) => b.id !== deleting.id))
      setDeleting(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete booking")
      setDeleting(null)
    }
  }

  return (
    <>
      <AdminTopbar title="Bookings" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              All bookings
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {bookings.length} bookings
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, ID or route"
                className="h-9 rounded-md pl-9 sm:w-72"
                aria-label="Search bookings"
              />
            </div>
            <Button
              variant="outline"
              onClick={load}
              disabled={loading}
              className="h-9 gap-2"
            >
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-md border px-3.5 py-1.5 font-sans text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-leather bg-leather text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="px-0 py-2 sm:px-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2 className="size-6 animate-spin text-copper" />
                <p className="font-sans text-sm text-muted-foreground">
                  Loading bookings…
                </p>
              </div>
            ) : error && bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load bookings
                  </p>
                  <p className="mt-1 font-sans text-xs text-muted-foreground">
                    {error}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={load}>
                  Try again
                </Button>
              </div>
            ) : filtered.length > 0 ? (
              <BookingsTable
                bookings={filtered.map(toAdminBooking)}
                onStatusChange={handleStatusChange}
                onDelete={(id) =>
                  setDeleting(
                    filtered.find((b) => b.id === id)
                      ? toAdminBooking(
                          filtered.find((b) => b.id === id) as Booking
                        )
                      : null
                  )
                }
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <CalendarCheck className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {bookings.length === 0
                    ? "No bookings yet. New bookings will appear here."
                    : "No bookings match your filters."}
                </p>
              </div>
            )}
            {error && bookings.length > 0 ? (
              <p className="border-t border-border/60 px-4 py-3 text-center font-sans text-xs text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete booking"
        description={`Are you sure you want to delete booking "${deleting?.ref ?? deleting?.id}"? This action cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
