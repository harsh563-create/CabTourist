"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { BookingsTable } from "@/components/admin/bookings-table"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { BOOKINGS, type BookingStatus } from "@/lib/admin-data"

const FILTERS: { id: BookingStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ongoing", label: "Ongoing" },
  { id: "confirmed", label: "Confirmed" },
  { id: "pending", label: "Pending" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
]

export default function BookingsPage() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    return BOOKINGS.filter((b) => {
      const matchesStatus = filter === "all" || b.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        b.customer.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.route.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [filter, query])

  return (
    <>
      <AdminTopbar title="Bookings" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">All bookings</h2>
            <p className="text-sm text-muted-foreground">
              {filtered.length} of {BOOKINGS.length} bookings
            </p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, ID or route"
              className="h-9 pl-9 sm:w-72"
              aria-label="Search bookings"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <Card>
          <CardContent className="px-0 sm:px-2 py-2">
            {filtered.length > 0 ? (
              <BookingsTable bookings={filtered} />
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No bookings match your filters.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  )
}
