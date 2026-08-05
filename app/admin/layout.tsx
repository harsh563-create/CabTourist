"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

import { AdminGuard } from "@/components/admin/admin-guard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-muted/30">{children}</div>
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-muted/30">
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background lg:block">
          <AdminSidebar />
        </aside>
        <div className="lg:pl-72">{children}</div>
      </div>
    </AdminGuard>
  )
}
