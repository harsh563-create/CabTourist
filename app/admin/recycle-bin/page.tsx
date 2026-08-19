"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Search,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Trash2,
  RotateCcw,
  Package,
  Car,
  Building2,
  Trash,
} from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
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
import type { RecycleBinItem } from "@/lib/admin-api"
import {
  fetchDeletedItems,
  restoreDeletedItem,
  permanentDeleteItem,
  emptyRecycleBin,
} from "@/lib/admin-api"

const COLLECTIONS = ["All", "packages", "vehicles", "vendors"] as const
type CollectionFilter = (typeof COLLECTIONS)[number]

const COLLECTION_LABELS: Record<string, string> = {
  packages: "Packages",
  vehicles: "Vehicles",
  vendors: "Vendors",
}

const COLLECTION_ICONS: Record<string, typeof Package> = {
  packages: Package,
  vehicles: Car,
  vendors: Building2,
}

function getItemLabel(item: RecycleBinItem): string {
  const d = item.data
  if (item.sourceCollection === "packages") return (d.title as string) || "Untitled"
  if (item.sourceCollection === "vehicles") return (d.name as string) || "Unnamed"
  if (item.sourceCollection === "vendors") return (d.name as string) || "Unnamed"
  return String(d._id ?? item.itemId)
}

function getItemSublabel(item: RecycleBinItem): string {
  const d = item.data
  if (item.sourceCollection === "packages") return (d.location as string) || ""
  if (item.sourceCollection === "vehicles") return (d.description as string) || ""
  if (item.sourceCollection === "vendors") return (d.city as string) || ""
  return ""
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function RecycleBinPage() {
  const [items, setItems] = useState<RecycleBinItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<CollectionFilter>("All")
  const [query, setQuery] = useState("")
  const [restoring, setRestoring] = useState<RecycleBinItem | null>(null)
  const [deleting, setDeleting] = useState<RecycleBinItem | null>(null)
  const [emptying, setEmptying] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchDeletedItems()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recycle bin")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesFilter =
        filter === "All" || item.sourceCollection === filter
      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        getItemLabel(item).toLowerCase().includes(q) ||
        getItemSublabel(item).toLowerCase().includes(q) ||
        item.sourceCollection.toLowerCase().includes(q)
      return matchesFilter && matchesQuery
    })
  }, [items, filter, query])

  const handleRestore = async () => {
    if (!restoring) return
    try {
      await restoreDeletedItem(restoring._id)
      setItems((prev) => prev.filter((i) => i._id !== restoring._id))
      setRestoring(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to restore")
      setRestoring(null)
    }
  }

  const handlePermanentDelete = async () => {
    if (!deleting) return
    try {
      await permanentDeleteItem(deleting._id)
      setItems((prev) => prev.filter((i) => i._id !== deleting._id))
      setDeleting(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete")
      setDeleting(null)
    }
  }

  const handleEmptyBin = async () => {
    try {
      const collection = filter === "All" ? undefined : filter
      await emptyRecycleBin(collection)
      if (collection) {
        setItems((prev) => prev.filter((i) => i.sourceCollection !== collection))
      } else {
        setItems([])
      }
      setEmptying(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to empty bin")
      setEmptying(false)
    }
  }

  return (
    <>
      <AdminTopbar title="Recycle Bin" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recycle Bin
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {items.length} deleted items
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search deleted items"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search deleted items"
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
            {items.length > 0 ? (
              <Button
                variant="destructive"
                onClick={() => setEmptying(true)}
                className="h-9 gap-2"
              >
                <Trash className="size-4" />
                Empty bin
              </Button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-md border px-3.5 py-1.5 font-sans text-sm font-medium transition-colors",
                filter === c
                  ? "border-leather bg-leather text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-foreground"
              )}
            >
              {c === "All" ? "All" : COLLECTION_LABELS[c] ?? c}
            </button>
          ))}
        </div>

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="px-0 py-2 sm:px-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2 className="size-6 animate-spin text-copper" />
                <p className="font-sans text-sm text-muted-foreground">
                  Loading recycle bin…
                </p>
              </div>
            ) : error && items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load recycle bin
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/60">
                      <th className="px-4 py-3 text-left font-sans text-sm font-medium text-muted-foreground">
                        Item
                      </th>
                      <th className="hidden md:table-cell px-4 py-3 text-left font-sans text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="hidden lg:table-cell px-4 py-3 text-left font-sans text-sm font-medium text-muted-foreground">
                        Deleted
                      </th>
                      <th className="px-4 py-3 text-right font-sans text-sm font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => {
                      const Icon = COLLECTION_ICONS[item.sourceCollection] ?? Package
                      return (
                        <tr
                          key={item._id}
                          className="border-b border-border/40 last:border-0"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <Icon className="size-4" />
                              </span>
                              <div className="min-w-0">
                                <p className="truncate font-sans font-semibold text-foreground">
                                  {getItemLabel(item)}
                                </p>
                                <p className="max-w-[250px] truncate font-sans text-xs text-muted-foreground">
                                  {getItemSublabel(item)}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden md:table-cell px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold",
                                item.sourceCollection === "packages"
                                  ? "bg-primary/15 text-primary"
                                  : item.sourceCollection === "vehicles"
                                    ? "bg-cta/15 text-cta"
                                    : "bg-emerald-500/15 text-emerald-500"
                              )}
                            >
                              {COLLECTION_LABELS[item.sourceCollection] ?? item.sourceCollection}
                            </span>
                          </td>
                          <td className="hidden lg:table-cell px-4 py-3 font-sans text-sm text-muted-foreground">
                            {formatDate(item.deletedAt)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Restore"
                                onClick={() => setRestoring(item)}
                                className="text-emerald-600 hover:bg-emerald-500/10"
                              >
                                <RotateCcw className="size-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Delete permanently"
                                className="text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleting(item)}
                              >
                                <Trash2 className="size-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <Trash2 className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {items.length === 0
                    ? "Recycle bin is empty. Deleted items will appear here."
                    : "No items match your filters."}
                </p>
              </div>
            )}
            {error && items.length > 0 ? (
              <p className="border-t border-border/60 px-4 py-3 text-center font-sans text-xs text-destructive">
                {error}
              </p>
            ) : null}
          </div>
        </div>
      </main>

      {/* Restore dialog */}
      <ConfirmDialog
        open={restoring !== null}
        title="Restore item"
        description={`Restore "${restoring ? getItemLabel(restoring) : ""}" back to ${restoring ? COLLECTION_LABELS[restoring.sourceCollection] ?? restoring.sourceCollection : ""}?`}
        confirmLabel="Restore"
        onOpenChange={(open) => !open && setRestoring(null)}
        onConfirm={handleRestore}
      />

      {/* Permanent delete dialog */}
      <ConfirmDialog
        open={deleting !== null}
        title="Delete permanently"
        description={`Permanently delete "${deleting ? getItemLabel(deleting) : ""}"? This cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handlePermanentDelete}
      />

      {/* Empty bin dialog */}
      <ConfirmDialog
        open={emptying}
        title="Empty recycle bin"
        description={
          filter === "All"
            ? "Permanently delete ALL items in the recycle bin? This cannot be undone."
            : `Permanently delete all ${COLLECTION_LABELS[filter] ?? filter} items? This cannot be undone.`
        }
        onOpenChange={(open) => !open && setEmptying(false)}
        onConfirm={handleEmptyBin}
      />
    </>
  )
}
