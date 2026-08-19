"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Plus, Search, AlertTriangle, Loader2, RefreshCw, Car } from "lucide-react"

import { AdminTopbar } from "@/components/admin/admin-topbar"
import { VehiclesTable } from "@/components/admin/vehicles-table"
import { VehicleForm } from "@/components/admin/vehicle-form"
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
import type { Vehicle } from "@/lib/vehicles-api"
import {
  createVehicle,
  deleteVehicle,
  fetchAllVehicles,
  updateVehicle,
} from "@/lib/vehicles-api"

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Vehicle | null>(null)
  const [deleting, setDeleting] = useState<Vehicle | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllVehicles()
      setVehicles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load vehicles")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return vehicles
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    )
  }, [vehicles, query])

  const openCreate = () => {
    setEditing(null)
    setFormOpen(true)
  }

  const openEdit = (vehicle: Vehicle) => {
    setEditing(vehicle)
    setFormOpen(true)
  }

  const handleSave = async (data: Omit<Vehicle, "id"> & { id?: string }) => {
    try {
      if (data.id) {
        const { id, ...rest } = data
        const updated = await updateVehicle(id, rest)
        setVehicles((prev) =>
          prev.map((v) => (v.id === updated.id ? updated : v))
        )
      } else {
        const created = await createVehicle(data)
        setVehicles((prev) => [created, ...prev])
      }
      setFormOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save vehicle")
    }
  }

  const handleDelete = async () => {
    if (!deleting) return
    try {
      await deleteVehicle(deleting.id)
      setVehicles((prev) => prev.filter((v) => v.id !== deleting.id))
      setDeleting(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete vehicle")
      setDeleting(null)
    }
  }

  return (
    <>
      <AdminTopbar title="Vehicles" />
      <main className="space-y-5 p-4 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Fleet vehicles
            </h2>
            <p className="font-sans text-sm text-muted-foreground">
              {filtered.length} of {vehicles.length} vehicles
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name or description"
                className="h-9 rounded-md pl-9 sm:w-64"
                aria-label="Search vehicles"
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
              Add vehicle
            </Button>
          </div>
        </div>

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="px-0 py-2 sm:px-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16">
                <Loader2 className="size-6 animate-spin text-copper" />
                <p className="font-sans text-sm text-muted-foreground">
                  Loading vehicles…
                </p>
              </div>
            ) : error && vehicles.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <AlertTriangle className="size-8 text-destructive" />
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    Could not load vehicles
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
              <VehiclesTable
                vehicles={filtered}
                onEdit={openEdit}
                onDelete={(id) =>
                  setDeleting(vehicles.find((v) => v.id === id) ?? null)
                }
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <Car className="size-8 text-muted-foreground" />
                <p className="font-sans text-sm text-muted-foreground">
                  {vehicles.length === 0
                    ? "No vehicles yet. Add your first vehicle to get started."
                    : "No vehicles match your search."}
                </p>
              </div>
            )}
            {error && vehicles.length > 0 ? (
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
            <DialogTitle>{editing ? "Edit vehicle" : "Add vehicle"}</DialogTitle>
          </DialogHeader>
          <VehicleForm
            initial={editing}
            onSave={handleSave}
            onCancel={() => setFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleting !== null}
        title="Delete vehicle"
        description={`Are you sure you want to delete "${deleting?.name}"? This action cannot be undone.`}
        onOpenChange={(open) => !open && setDeleting(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
