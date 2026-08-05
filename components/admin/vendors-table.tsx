import { Pencil, Star, Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { VENDOR_STATUS_STYLES, inr, type Vendor } from "@/lib/admin-data"

export function VendorsTable({
  vendors,
  onEdit,
  onDelete,
}: {
  vendors: Vendor[]
  onEdit: (vendor: Vendor) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead>Vendor</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="hidden md:table-cell">Fleet</TableHead>
            <TableHead className="hidden md:table-cell">Drivers</TableHead>
            <TableHead className="hidden sm:table-cell">Rating</TableHead>
            <TableHead className="hidden lg:table-cell">Revenue</TableHead>
            <TableHead className="hidden lg:table-cell">Joined</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((v) => (
            <TableRow key={v.id} className="border-border/40">
              <TableCell>
                <p className="font-sans font-semibold text-foreground">{v.name}</p>
                <p className="font-mono text-xs font-medium text-copper">{v.id}</p>
              </TableCell>
              <TableCell className="font-sans text-muted-foreground">{v.city}</TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">{v.fleet}</TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">{v.drivers}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <span className="inline-flex items-center gap-1 font-sans text-sm text-foreground">
                  <Star className="size-3.5 fill-cta text-cta" />
                  {v.rating}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell font-display font-semibold text-foreground">
                {inr(v.revenue)}
              </TableCell>
              <TableCell className="hidden lg:table-cell font-sans text-muted-foreground">{v.joined}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold capitalize",
                    VENDOR_STATUS_STYLES[v.status]
                  )}
                >
                  {v.status}
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
