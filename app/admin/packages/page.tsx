"use client"

import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
import { PackagesTable } from "@/components/admin/packages-table"
import { PackageForm } from "@/components/admin/package-form"
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
import { TOUR_PACKAGES, type TourPackage } from "@/lib/cabtourist-data"

const TAGS = ["All", "Bestseller", "Heritage", "Weekend"] as const
type TagFilter = (typeof TAGS)[number]

export default function PackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>(TOUR_PACKAGES)
  const [filter, setFilter] = useState<TagFilter>("All")
  const [query, setQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<TourPackage | null>(null)
  const [deleting, setDeleting] = useState<TourPackage | null>(null)

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      const matchesTag = filter === "All" || p.tag === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.tag ?? "").toLowerCase().includes(q)
      return matchesTag && matchesQuery
    })
  }, [packages, filter, query])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (pkg: TourPackage) => {
    setEditing(pkg)
    setFormOpen(true)
  }

  const handleSave = (data: Omit<TourPackage, "id"> & { id?: string }) => {
    if (data.id) {
      setPackages((prev) =>
        prev.map((p) =>
          p.id === data.id ? ({ ...data, id: data.id } as TourPackage) : p
        )
      )
    } else {
      const id = `p${Date.now()}`
      setPackages((prev) => [{ ...data, id } as TourPackage, ...prev])
    }
    setFormOpen(false)
  }

  const handleDelete = () => {
    if (!deleting) return
    setPackages((prev) => prev.filter((p) => p.id !== deleting.id))
    setDeleting(null)
  }

  return (
    <>
      <AdminTopbar title="Packages" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Tour packages
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {packages.length} packages
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, location or tag"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search packages"
              />
            </div>
            <Button
              onClick={openCreate}
              className="bg-leather font-semibold text-primary-foreground hover:bg-leather/90"
            >
              <Plus className="size-4" />
              Add package
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              className={cn(
                "rounded-md border px-3.5 py-1.5 font-sans text-sm font-medium transition-colors",
                filter === t
                  ? "border-leather bg-leather text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="px-0 py-2 sm:px-2">
            {filtered.length > 0 ? (
              <PackagesTable
                packages={filtered}
                onEdit={openEdit}
                onDelete={(id) =>
                  setDeleting(packages.find((p) => p.id === id) ?? null)
                }
              />
            ) : (
              <p className="py-12 text-center font-sans text-sm text-muted-foreground">
                No packages match your filters.
              </p>
            )}
          </div>
        </div>
      </main>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit package" : "Add package"}</DialogTitle>
          </DialogHeader>
          <PackageForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete package"
        description={`Are you sure you want to delete "${deleting?.title}"? This action cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
