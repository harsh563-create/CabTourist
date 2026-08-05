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
import { CUSTOMER_TIERS, type Customer, type CustomerTier } from "@/lib/admin-data"

export function CustomerForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Customer | null
  onSave: (data: Omit<Customer, "id"> & { id?: string }) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    city: initial?.city ?? "",
    trips: initial?.trips ?? 0,
    spend: initial?.spend ?? 0,
    lastTrip: initial?.lastTrip ?? new Date().toISOString().slice(0, 10),
    tier: initial?.tier ?? "New",
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
        <Label htmlFor="customer-name">Full name</Label>
        <Input
          id="customer-name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Priya Sharma"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="customer-email">Email</Label>
        <Input
          id="customer-email"
          required
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="priya@email.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customer-city">City</Label>
        <Input
          id="customer-city"
          required
          value={form.city}
          onChange={(e) => set("city", e.target.value)}
          placeholder="Mumbai"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Tier</Label>
        <Select
          value={form.tier}
          onValueChange={(v) => v && set("tier", v as CustomerTier)}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CUSTOMER_TIERS.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customer-trips">Trips</Label>
        <Input
          id="customer-trips"
          required
          type="number"
          min={0}
          value={form.trips}
          onChange={(e) => set("trips", num(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customer-spend">Total spend (₹)</Label>
        <Input
          id="customer-spend"
          required
          type="number"
          min={0}
          value={form.spend}
          onChange={(e) => set("spend", num(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customer-last-trip">Last trip date</Label>
        <Input
          id="customer-last-trip"
          required
          type="date"
          value={form.lastTrip}
          onChange={(e) => set("lastTrip", e.target.value)}
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
          {initial ? "Save changes" : "Add customer"}
        </Button>
      </div>
    </form>
  )
}
