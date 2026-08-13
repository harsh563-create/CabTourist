import {
  Laptop,
  Smartphone,
  Tablet,
  HelpCircle,
  Globe,
  MonitorSmartphone,
  CalendarDays,
} from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { deviceLabel, locationLabel, type AdminCustomer } from "@/lib/admin-api"

const DEVICE_ICON: Record<string, typeof Laptop> = {
  desktop: Laptop,
  mobile: Smartphone,
  tablet: Tablet,
  unknown: HelpCircle,
}

const METHOD_STYLES: Record<AdminCustomer["loginMethod"], string> = {
  email: "bg-primary/15 text-primary",
  google: "bg-sky-500/15 text-sky-600",
  phone: "bg-emerald-500/15 text-emerald-600",
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—"
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function CustomersTable({ customers }: { customers: AdminCustomer[] }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/60">
            <TableHead>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">Device</TableHead>
            <TableHead className="hidden md:table-cell">Location</TableHead>
            <TableHead className="hidden lg:table-cell">Sign-in</TableHead>
            <TableHead className="hidden lg:table-cell">Last login</TableHead>
            <TableHead>Joined</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => {
            const DeviceIcon = DEVICE_ICON[c.device.type ?? "unknown"] ?? MonitorSmartphone
            const methodLabel =
              c.loginMethod === "google"
                ? "Google"
                : c.loginMethod === "phone"
                  ? "Mobile OTP"
                  : "Email"
            return (
              <TableRow key={c.id} className="border-border/40">
                <TableCell>
                  <p className="font-sans font-semibold text-foreground">
                    {c.name}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">
                    {c.email ?? (c.phone ? `+91 ${c.phone}` : "No contact")}
                  </p>
                  {c.role === "admin" && (
                    <span className="mt-0.5 inline-flex rounded-full bg-copper/10 px-2 py-0.5 font-sans text-[0.65rem] font-semibold text-copper">
                      Admin
                    </span>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <DeviceIcon className="size-4 shrink-0 text-copper" />
                    <div className="min-w-0">
                      <p className="truncate font-sans text-sm text-foreground">
                        {deviceLabel(c.device)}
                      </p>
                      {c.device.model && (
                        <p className="truncate font-sans text-xs text-muted-foreground">
                          {c.device.model}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 shrink-0 text-copper" />
                    <div className="min-w-0">
                      <p className="truncate font-sans text-sm text-foreground">
                        {locationLabel(c.location)}
                      </p>
                      {c.ip && (
                        <p className="font-mono text-xs text-muted-foreground">
                          {c.ip}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold",
                      METHOD_STYLES[c.loginMethod]
                    )}
                  >
                    {methodLabel}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className="inline-flex items-center gap-1.5 font-sans text-sm text-muted-foreground">
                    <CalendarDays className="size-3.5 text-copper" />
                    {formatDate(c.loginAt)}
                  </span>
                </TableCell>
                <TableCell className="font-sans text-sm text-muted-foreground">
                  {formatDate(c.joinedAt)}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
