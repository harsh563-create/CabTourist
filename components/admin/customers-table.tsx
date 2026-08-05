import { Pencil, Trash2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { TIER_STYLES, inr, type Customer } from "@/lib/admin-data"

export function CustomersTable({
  customers,
  onEdit,
  onDelete,
}: {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">City</TableHead>
            <TableHead className="hidden md:table-cell">Trips</TableHead>
            <TableHead className="hidden lg:table-cell">Total spend</TableHead>
            <TableHead className="hidden lg:table-cell">Last trip</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id} className="border-border/40">
              <TableCell>
                <p className="font-sans font-semibold text-foreground">{c.name}</p>
                <p className="font-sans text-xs text-muted-foreground">{c.email}</p>
                <p className="mt-0.5 font-mono text-xs font-medium text-copper">{c.id}</p>
              </TableCell>
              <TableCell className="hidden sm:table-cell font-sans text-muted-foreground">
                {c.city}
              </TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">
                {c.trips}
              </TableCell>
              <TableCell className="hidden lg:table-cell font-display font-semibold text-foreground">
                {inr(c.spend)}
              </TableCell>
              <TableCell className="hidden lg:table-cell font-sans text-muted-foreground">
                {c.lastTrip}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold",
                    TIER_STYLES[c.tier]
                  )}
                >
                  {c.tier}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Edit ${c.name}`}
                    onClick={() => onEdit(c)}
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Delete ${c.name}`}
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete(c.id)}
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
