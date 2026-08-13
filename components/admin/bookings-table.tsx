import { Trash2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  type AdminBooking,
  type BookingStatus,
  STATUS_STYLES,
  inr,
} from "@/lib/admin-data"

const STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "ongoing",
  "completed",
  "cancelled",
]

export function BookingsTable({
  bookings,
  onStatusChange,
  onDelete,
}: {
  bookings: AdminBooking[]
  onStatusChange?: (id: string, status: BookingStatus) => void
  onDelete?: (id: string) => void
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Route</TableHead>
            <TableHead className="hidden md:table-cell">Cab</TableHead>
            <TableHead className="hidden lg:table-cell">Driver</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            {onDelete ? <TableHead className="text-right">Actions</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id} className="border-border/40">
              <TableCell className="font-mono text-xs font-medium text-copper">
                {b.ref ?? b.id}
              </TableCell>
              <TableCell className="font-sans font-medium text-foreground">
                {b.customer}
              </TableCell>
              <TableCell className="font-sans text-muted-foreground">
                {b.route}
              </TableCell>
              <TableCell className="hidden md:table-cell font-sans text-muted-foreground">
                {b.cab}
              </TableCell>
              <TableCell className="hidden lg:table-cell font-sans text-muted-foreground">
                {b.driver || "—"}
              </TableCell>
              <TableCell className="hidden sm:table-cell font-sans text-muted-foreground">
                {b.date}
              </TableCell>
              <TableCell className="text-right font-display font-semibold text-foreground">
                {inr(b.amount)}
              </TableCell>
              <TableCell>
                {onStatusChange ? (
                  <Select
                    value={b.status}
                    onValueChange={(v) =>
                      v && onStatusChange(b.id, v as BookingStatus)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "h-7 w-[7.5rem] rounded-full px-2.5 text-xs font-semibold capitalize",
                        STATUS_STYLES[b.status]
                      )}
                    >
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
                ) : (
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold capitalize",
                      STATUS_STYLES[b.status]
                    )}
                  >
                    {b.status}
                  </span>
                )}
              </TableCell>
              {onDelete ? (
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete booking ${b.ref ?? b.id}`}
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete(b.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
