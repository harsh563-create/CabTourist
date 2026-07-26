"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  Users,
  Map,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"
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
        <Link href="/" className="flex items-center gap-2">
          <BrandLogo />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" aria-hidden="true" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mx-3 mb-4 rounded-xl border border-border bg-accent/50 p-4">
        <p className="text-sm font-semibold text-foreground">CabTourist Admin</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Operations console v1.0
        </p>
      </div>
    </div>
  )
}
