import type { ReactNode } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border bg-background lg:block">
        <AdminSidebar />
      </aside>
      <div className="lg:pl-72">{children}</div>
    </div>
  )
}
