import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { type AdminBooking, STATUS_STYLES, inr } from "@/lib/admin-data"

export function BookingsTable({ bookings }: { bookings: AdminBooking[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Route</TableHead>
            <TableHead className="hidden md:table-cell">Cab</TableHead>
            <TableHead className="hidden lg:table-cell">Driver</TableHead>
            <TableHead className="hidden sm:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="font-mono text-xs font-medium">{b.id}</TableCell>
              <TableCell className="font-medium text-foreground">{b.customer}</TableCell>
              <TableCell className="text-muted-foreground">{b.route}</TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">{b.cab}</TableCell>
              <TableCell className="hidden lg:table-cell text-muted-foreground">{b.driver}</TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">{b.date}</TableCell>
              <TableCell className="text-right font-semibold text-foreground">{inr(b.amount)}</TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
                    STATUS_STYLES[b.status],
                  )}
                >
                  {b.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
