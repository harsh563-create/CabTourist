"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { TourPackage } from "@/lib/cabtourist-data"

const TAG_OPTIONS = ["", "Bestseller", "Heritage", "Weekend"]

export function PackageForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: TourPackage | null
  onSave: (data: Omit<TourPackage, "id"> & { id?: string }) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    location: initial?.location ?? "",
    image: initial?.image ?? "/placeholder.svg",
    days: initial?.days ?? 3,
    nights: initial?.nights ?? 2,
    rating: initial?.rating ?? 4.5,
    reviews: initial?.reviews ?? 0,
    fromPrice: initial?.fromPrice ?? 9999,
    tag: initial?.tag ?? "",
    highlights: initial?.highlights.join(", ") ?? "",
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const num = (v: string) => (v === "" ? 0 : Number(v))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const highlights = form.highlights
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean)
    onSave({
      title: form.title,
      location: form.location,
      image: form.image || "/placeholder.svg",
      days: form.days,
      nights: form.nights,
      rating: form.rating,
      reviews: form.reviews,
      fromPrice: form.fromPrice,
      tag: form.tag || undefined,
      highlights,
      id: initial?.id,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="package-title">Package title</Label>
        <Input
          id="package-title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Himalayan Escape"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="package-location">Location</Label>
        <Input
          id="package-location"
          required
          value={form.location}
          onChange={(e) => set("location", e.target.value)}
          placeholder="Manali & Shimla"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="package-image">Image path</Label>
        <Input
          id="package-image"
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="/images/package-mountain.png"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="package-days">Days</Label>
          <Input
            id="package-days"
            required
            type="number"
            min={1}
            value={form.days}
            onChange={(e) => set("days", num(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="package-nights">Nights</Label>
          <Input
            id="package-nights"
            required
            type="number"
            min={0}
            value={form.nights}
            onChange={(e) => set("nights", num(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="package-rating">Rating (0–5)</Label>
          <Input
            id="package-rating"
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
          <Label htmlFor="package-reviews">Reviews</Label>
          <Input
            id="package-reviews"
            required
            type="number"
            min={0}
            value={form.reviews}
            onChange={(e) => set("reviews", num(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="package-price">From price (₹)</Label>
        <Input
          id="package-price"
          required
          type="number"
          min={0}
          value={form.fromPrice}
          onChange={(e) => set("fromPrice", num(e.target.value))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="package-tag">Tag</Label>
        <select
          id="package-tag"
          value={form.tag}
          onChange={(e) => set("tag", e.target.value)}
          className={cn(
            "h-9 rounded-md border border-input bg-transparent px-3 font-sans text-sm outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          )}
        >
          {TAG_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t === "" ? "None" : t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="package-highlights">Highlights (comma separated)</Label>
        <textarea
          id="package-highlights"
          rows={3}
          value={form.highlights}
          onChange={(e) => set("highlights", e.target.value)}
          placeholder="Snow point sightseeing, Private cab throughout, Handpicked stays"
          className={cn(
            "rounded-md border border-input bg-transparent px-3 py-2.5 font-sans text-sm",
            "placeholder:text-muted-foreground",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
            "outline-none transition-colors"
          )}
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
          {initial ? "Save changes" : "Add package"}
        </Button>
      </div>
    </form>
  )
}
