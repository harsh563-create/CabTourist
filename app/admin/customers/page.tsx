"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, UsersRound, AlertTriangle, Loader2, RefreshCw } from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
import { CustomersTable } from "@/components/admin/customers-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  adminFetch,
  locationLabel,
  deviceLabel,
  type AdminCustomer,
} from "@/lib/admin-api"

const FILTERS: { id: "all" | "desktop" | "mobile" | "tablet"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "desktop", label: "Desktop" },
  { id: "mobile", label: "Mobile" },
  { id: "tablet", label: "Tablet" },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all")
  const [query, setQuery] = useState("")

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await adminFetch<{ customers: AdminCustomer[] }>(
        "/api/admin/customers"
      )
      setCustomers(data.customers)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load customers"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesDevice = filter === "all" || c.device.type === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q) ||
        (c.phone ?? "").includes(q) ||
        locationLabel(c.location).toLowerCase().includes(q) ||
        deviceLabel(c.device).toLowerCase().includes(q)
      return matchesDevice && matchesQuery
    })
  }, [customers, filter, query])

  return (
    <>
      <AdminTopbar title="Customers" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Customer accounts
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {customers.length} customers · tracked on
              login
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email or location"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search customers"
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
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
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
                  Loading customers…
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load customers
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
              <CustomersTable customers={filtered} />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <UsersRound className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {customers.length === 0
                    ? "No logins yet. When someone signs in on the website they will appear here."
                    : "No customers match your filters."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
