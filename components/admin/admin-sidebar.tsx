"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Users,
  Map,
  Compass,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ADMIN_NAV } from "@/lib/admin-data"

const ICONS: Record<string, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  "calendar-check": CalendarCheck,
  "building-2": Building2,
  users: Users,
  map: Map,
}

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-leather text-primary-foreground">
            <Compass className="size-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Cab<span className="text-copper">Tourist</span>
          </span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <p className="px-3 pb-2 font-handwritten text-sm text-muted-foreground">
          Management
        </p>
        {ADMIN_NAV.map((item) => {
          const Icon = ICONS[item.icon]
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 font-sans text-sm font-medium transition-colors",
                active
                  ? "bg-leather text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mx-3 mb-4 rounded-lg border border-border bg-accent/50 p-4">
        <p className="font-sans text-sm font-semibold text-foreground">CabTourist Admin</p>
        <p className="mt-1 font-handwritten text-sm text-muted-foreground">
          Operations console v1.0
        </p>
      </div>
    </div>
  )
}
