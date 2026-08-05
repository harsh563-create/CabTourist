import Image from "next/image"
import { Pencil, Star, Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TourPackage } from "@/lib/cabtourist-data"

const TAG_STYLES: Record<string, string> = {
  Bestseller: "bg-primary/15 text-primary",
  Heritage: "bg-cta/15 text-cta",
  Weekend: "bg-emerald-500/15 text-emerald-500",
}

export function PackagesTable({
  packages,
  onEdit,
  onDelete,
}: {
  packages: TourPackage[]
  onEdit: (pkg: TourPackage) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead>Package</TableHead>
            <TableHead className="hidden md:table-cell">Duration</TableHead>
            <TableHead className="hidden lg:table-cell">Rating</TableHead>
            <TableHead className="hidden lg:table-cell">Reviews</TableHead>
            <TableHead className="text-right">From</TableHead>
            <TableHead className="hidden sm:table-cell">Tag</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((p) => (
            <TableRow key={p.id} className="border-border/40">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-md border border-border/60">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={p.title}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-sans font-semibold text-foreground">
                      {p.title}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      {p.location}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">
                {p.days}D · {p.nights}N
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <span className="inline-flex items-center gap-1 font-sans text-sm text-foreground">
                  <Star className="size-3.5 fill-cta text-cta" />
                  {p.rating}
                </span>
              </TableCell>
              <TableCell className="hidden lg:table-cell font-sans text-muted-foreground">
                {p.reviews}
              </TableCell>
              <TableCell className="text-right font-display font-semibold text-foreground">
                ₹{p.fromPrice.toLocaleString("en-IN")}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {p.tag ? (
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold",
                      TAG_STYLES[p.tag] ?? "bg-muted/70 text-foreground"
                    )}
                  >
                    {p.tag}
                  </span>
                ) : (
                  <span className="font-sans text-xs text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${p.title}`}
                    onClick={() => onEdit(p)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${p.title}`}
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(p.id)}
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
