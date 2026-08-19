"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Link2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { uploadImage } from "@/lib/admin-api"
import type { Vehicle } from "@/lib/vehicles-api"

export function VehicleForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Vehicle | null
  onSave: (data: Omit<Vehicle, "id"> & { id?: string }) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    image: initial?.image ?? "/images/car-sedan.jpg",
    seats: initial?.seats ?? 4,
    bags: initial?.bags ?? 2,
    perKm: initial?.perKm ?? 14,
    baseFare: initial?.baseFare ?? 350,
    eta: initial?.eta ?? "5 min",
    ac: initial?.ac ?? true,
    active: initial?.active ?? true,
  })

  const [imageMode, setImageMode] = useState<"link" | "upload">("link")
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const num = (v: string) => (v === "" ? 0 : Number(v))

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setUploadError(null)
    try {
      const url = await uploadImage(file)
      set("image", url)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: form.name,
      description: form.description,
      image: form.image || "/placeholder.svg",
      seats: form.seats,
      bags: form.bags,
      perKm: form.perKm,
      baseFare: form.baseFare,
      eta: form.eta,
      ac: form.ac,
      active: form.active,
      id: initial?.id,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="vehicle-name">Vehicle name</Label>
        <Input
          id="vehicle-name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Sedan"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="vehicle-description">Description</Label>
        <Input
          id="vehicle-description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Comfortable rides for small families"
        />
      </div>

      {/* Image field with toggle */}
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label>Vehicle Image</Label>

        {/* Toggle buttons */}
        <div className="flex gap-1 rounded-md border border-border p-0.5">
          <button
            type="button"
            onClick={() => setImageMode("link")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded px-3 py-1.5 font-sans text-sm font-medium transition-colors",
              imageMode === "link"
                ? "bg-leather text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Link2 className="size-3.5" />
            Paste Link
          </button>
          <button
            type="button"
            onClick={() => setImageMode("upload")}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded px-3 py-1.5 font-sans text-sm font-medium transition-colors",
              imageMode === "upload"
                ? "bg-leather text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Upload className="size-3.5" />
            Upload File
          </button>
        </div>

        {/* Link input */}
        {imageMode === "link" ? (
          <Input
            id="vehicle-image"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            placeholder="/images/car-sedan.jpg or https://..."
          />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
                id="vehicle-file-upload"
              />
              <Button
                type="button"
                variant="outline"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="h-9 gap-2"
              >
                <Upload className={cn("size-4", uploading && "animate-spin")} />
                {uploading ? "Uploading…" : "Choose image"}
              </Button>
              {form.image && (
                <button
                  type="button"
                  onClick={() => set("image", "")}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
            {uploadError && (
              <p className="font-sans text-xs text-destructive">{uploadError}</p>
            )}
          </div>
        )}

        {/* Image preview */}
        {form.image && (
          <div className="relative mt-1 size-20 overflow-hidden rounded-md border border-border">
            <Image
              src={form.image}
              alt="Preview"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vehicle-eta">ETA</Label>
        <Input
          id="vehicle-eta"
          value={form.eta}
          onChange={(e) => set("eta", e.target.value)}
          placeholder="5 min"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicle-seats">Seats</Label>
          <Input
            id="vehicle-seats"
            required
            type="number"
            min={1}
            max={20}
            value={form.seats}
            onChange={(e) => set("seats", num(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicle-bags">Bags</Label>
          <Input
            id="vehicle-bags"
            required
            type="number"
            min={0}
            max={20}
            value={form.bags}
            onChange={(e) => set("bags", num(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicle-perKm">Per km (₹)</Label>
          <Input
            id="vehicle-perKm"
            required
            type="number"
            min={0}
            value={form.perKm}
            onChange={(e) => set("perKm", num(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="vehicle-baseFare">Base fare (₹)</Label>
          <Input
            id="vehicle-baseFare"
            required
            type="number"
            min={0}
            value={form.baseFare}
            onChange={(e) => set("baseFare", num(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vehicle-ac">Air Conditioned</Label>
        <select
          id="vehicle-ac"
          value={form.ac ? "true" : "false"}
          onChange={(e) => set("ac", e.target.value === "true")}
          className={cn(
            "h-9 rounded-md border border-input bg-transparent px-3 font-sans text-sm outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          )}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="vehicle-active">Status</Label>
        <select
          id="vehicle-active"
          value={form.active ? "true" : "false"}
          onChange={(e) => set("active", e.target.value === "true")}
          className={cn(
            "h-9 rounded-md border border-input bg-transparent px-3 font-sans text-sm outline-none transition-colors",
            "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          )}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      <div className="mt-2 flex justify-end gap-2 sm:col-span-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={uploading}
          className="bg-leather font-semibold text-primary-foreground hover:bg-leather/90"
        >
          {initial ? "Save changes" : "Add vehicle"}
        </Button>
      </div>
    </form>
  )
}
