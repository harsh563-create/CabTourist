import Image from "next/image"
import { Pencil, Trash2, Snowflake, Car } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Vehicle } from "@/lib/vehicles-api"

export function VehiclesTable({
  vehicles,
  onEdit,
  onDelete,
}: {
  vehicles: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead>Vehicle</TableHead>
            <TableHead className="hidden md:table-cell">Seats</TableHead>
            <TableHead className="hidden md:table-cell">Bags</TableHead>
            <TableHead className="hidden lg:table-cell">AC</TableHead>
            <TableHead className="hidden lg:table-cell">ETA</TableHead>
            <TableHead className="text-right">Per Km</TableHead>
            <TableHead className="text-right">Base Fare</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((v) => (
            <TableRow key={v.id} className="border-border/40">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-md border border-border/60">
                    <Image
                      src={v.image || "/placeholder.svg"}
                      alt={v.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-sans font-semibold text-foreground">
                      {v.name}
                    </p>
                    <p className="max-w-[200px] truncate font-sans text-xs text-muted-foreground">
                      {v.description}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">
                {v.seats}
              </TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">
                {v.bags}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {v.ac ? (
                  <span className="inline-flex items-center gap-1 text-sky-600">
                    <Snowflake className="size-3.5" />
                    <span className="font-sans text-sm">Yes</span>
                  </span>
                ) : (
                  <span className="font-sans text-sm text-muted-foreground">No</span>
                )}
              </TableCell>
              <TableCell className="hidden lg:table-cell font-sans text-muted-foreground">
                {v.eta}
              </TableCell>
              <TableCell className="text-right font-display font-semibold text-foreground">
                ₹{v.perKm}
              </TableCell>
              <TableCell className="text-right font-display font-semibold text-foreground">
                ₹{v.baseFare.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold",
                    v.active
                      ? "bg-emerald-500/15 text-emerald-500"
                      : "bg-muted-foreground/15 text-muted-foreground"
                  )}
                >
                  {v.active ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${v.name}`}
                    onClick={() => onEdit(v)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${v.name}`}
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(v.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
