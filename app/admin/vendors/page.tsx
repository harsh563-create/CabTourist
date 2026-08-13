"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Plus, Search, AlertTriangle, Loader2, RefreshCw, Building2 } from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
import { VendorsTable } from "@/components/admin/vendors-table"
import { VendorForm } from "@/components/admin/vendor-form"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { Vendor, VendorStatus } from "@/lib/admin-data"
import {
  createVendor,
  deleteVendor,
  fetchVendors,
  updateVendor,
} from "@/lib/vendors-api"

const FILTERS: { id: VendorStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "suspended", label: "Suspended" },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<VendorStatus | "all">("all")
  const [query, setQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Vendor | null>(null)
  const [deleting, setDeleting] = useState<Vendor | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchVendors()
      setVendors(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load vendors")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    return vendors.filter((v) => {
      const matchesStatus = filter === "all" || v.status === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [vendors, filter, query])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (vendor: Vendor) => {
    setEditing(vendor)
    setFormOpen(true)
  }

  const handleSave = async (data: Omit<Vendor, "id"> & { id?: string }) => {
    try {
      if (data.id) {
        const { id, ...rest } = data
        const updated = await updateVendor(id, rest)
        setVendors((prev) =>
          prev.map((v) => (v.id === updated.id ? updated : v))
        )
      } else {
        const created = await createVendor(data)
        setVendors((prev) => [created, ...prev])
      }
      setFormOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save vendor")
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await deleteVendor(deleting.id)
      setVendors((prev) => prev.filter((v) => v.id !== deleting.id))
      setDeleting(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete vendor")
      setDeleting(null)
    }
  }

  return (
    <>
      <AdminTopbar title="Vendors" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Fleet vendors
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {vendors.length} vendors
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, city or ID"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search vendors"
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
            <Button
              onClick={openCreate}
              className="bg-leather font-semibold text-primary-foreground hover:bg-leather/90"
            >
              <Plus className="size-4" />
              Add vendor
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
                  Loading vendors…
                </p>
              </div>
            ) : error && vendors.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load vendors
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
              <VendorsTable
                vendors={filtered}
                onEdit={openEdit}
                onDelete={(id) =>
                  setDeleting(vendors.find((v) => v.id === id) ?? null)
                }
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <Building2 className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {vendors.length === 0
                    ? "No vendors yet. Add your first fleet vendor to get started."
                    : "No vendors match your filters."}
                </p>
              </div>
            )}
            {error && vendors.length > 0 ? (
              <p className="border-t border-border/60 px-4 py-3 text-center font-sans text-xs text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </main>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit vendor" : "Add vendor"}</DialogTitle>
          </DialogHeader>
          <VendorForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete vendor"
        description={`Are you sure you want to delete "${deleting?.name}"? This action cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
