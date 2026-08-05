"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Vendor, VendorStatus } from "@/lib/admin-data"

const STATUSES: VendorStatus[] = ["active", "pending", "suspended"]

export function VendorForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Vendor | null
  onSave: (data: Omit<Vendor, "id"> & { id?: string }) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    city: initial?.city ?? "",
    fleet: initial?.fleet ?? 1,
    drivers: initial?.drivers ?? 1,
    rating: initial?.rating ?? 4.5,
    revenue: initial?.revenue ?? 0,
    status: initial?.status ?? "active",
    joined: initial?.joined ?? new Date().toISOString().slice(0, 10),
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const num = (v: string) => (v === "" ? 0 : Number(v))

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSave({ ...form, id: initial?.id })
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="vendor-name">Vendor name</Label>
        <Input
          id="vendor-name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Skyline Travels"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vendor-city">City</Label>
        <Input
          id="vendor-city"
          required
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder="Mumbai"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Status</Label>
        <Select
          value={form.status}
          onValueChange={(v) => v && set("status", v as VendorStatus)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vendor-fleet">Fleet size</Label>
        <Input
          id="vendor-fleet"
          required
          type="number"
          min={0}
          value={form.fleet}
          onChange={(e) => set("fleet", num(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vendor-drivers">Drivers</Label>
        <Input
          id="vendor-drivers"
          required
          type="number"
          min={0}
          value={form.drivers}
          onChange={(e) => set("drivers", num(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vendor-rating">Rating (0–5)</Label>
        <Input
          id="vendor-rating"
          required
          type="number"
          min={0}
          max={5}
          step={0.1}
          value={form.rating}
          onChange={(e) => set("rating", Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vendor-revenue">Revenue (₹)</Label>
        <Input
          id="vendor-revenue"
          required
          type="number"
          min={0}
          value={form.revenue}
          onChange={(e) => set("revenue", num(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vendor-joined">Joined date</Label>
        <Input
          id="vendor-joined"
          required
          type="date"
          value={form.joined}
          onChange={(e) => set("joined", e.target.value)}
        />
      </div>

      <div className="mt-2 flex justify-end gap-2 sm:col-span-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-leather font-semibold text-primary-foreground hover:bg-leather/90"
        >
          {initial ? "Save changes" : "Add vendor"}
        </Button>
      </div>
    </form>
  )
}
