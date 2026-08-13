"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Plus, Search, AlertTriangle, Loader2, RefreshCw, MapPin } from "lucide-react"

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
import type { TourPackage } from "@/lib/cabtourist-data"
import {
  createPackage,
  deletePackage,
  fetchPackages,
  updatePackage,
} from "@/lib/packages-api"

const TAGS = ["All", "Bestseller", "Heritage", "Weekend"] as const
type TagFilter = (typeof TAGS)[number]

export default function PackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<TagFilter>("All")
  const [query, setQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<TourPackage | null>(null)
  const [deleting, setDeleting] = useState<TourPackage | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPackages()
      setPackages(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load packages")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

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

  const handleSave = async (data: Omit<TourPackage, "id"> & { id?: string }) => {
    try {
      if (data.id) {
        const { id, ...rest } = data
        const updated = await updatePackage(id, rest)
        setPackages((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        )
      } else {
        const created = await createPackage(data)
        setPackages((prev) => [created, ...prev])
      }
      setFormOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save package")
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await deletePackage(deleting.id)
      setPackages((prev) => prev.filter((p) => p.id !== deleting.id))
      setDeleting(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete package")
      setDeleting(null)
    }
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
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2 className="size-6 animate-spin text-copper" />
                <p className="font-sans text-sm text-muted-foreground">
                  Loading packages…
                </p>
              </div>
            ) : error && packages.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load packages
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
              <PackagesTable
                packages={filtered}
                onEdit={openEdit}
                onDelete={(id) =>
                  setDeleting(packages.find((p) => p.id === id) ?? null)
                }
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <MapPin className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {packages.length === 0
                    ? "No packages yet. Add your first tour package to get started."
                    : "No packages match your filters."}
                </p>
              </div>
            )}
            {error && packages.length > 0 ? (
              <p className="border-t border-border/60 px-4 py-3 text-center font-sans text-xs text-destructive">
                {error}
              </p>
            ) : null}
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
