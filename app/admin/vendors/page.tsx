"use client"

import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"

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
import { VENDORS, type Vendor, type VendorStatus } from "@/lib/admin-data"

const FILTERS: { id: VendorStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "suspended", label: "Suspended" },
]

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS)
  const [filter, setFilter] = useState<VendorStatus | "all">("all")
  const [query, setQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Vendor | null>(null)
  const [deleting, setDeleting] = useState<Vendor | null>(null)

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

  const handleSave = (data: Omit<Vendor, "id"> & { id?: string }) => {
    if (data.id) {
      setVendors((prev) =>
        prev.map((v) => (v.id === data.id ? ({ ...data, id: data.id } as Vendor) : v))
      )
    } else {
      const id = `V-${Date.now().toString().slice(-4)}`
      setVendors((prev) => [{ ...data, id } as Vendor, ...prev])
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (!deleting) return
    setVendors((prev) => prev.filter((v) => v.id !== deleting.id))
    setDeleting(null)
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
            {filtered.length > 0 ? (
              <VendorsTable
                vendors={filtered}
                onEdit={openEdit}
                onDelete={(id) =>
                  setDeleting(vendors.find((v) => v.id === id) ?? null)
                }
              />
            ) : (
              <p className="py-12 text-center font-sans text-sm text-muted-foreground">
                No vendors match your filters.
              </p>
            )}
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
