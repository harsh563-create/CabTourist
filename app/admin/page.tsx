import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { StatCards } from "@/components/admin/stat-cards"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import { BookingsTable } from "@/components/admin/bookings-table"
import { BOOKINGS } from "@/lib/admin-data"

export default function AdminDashboardPage() {
  return (
    <>
      <AdminTopbar title="Dashboard" />
      <main className="space-y-6 p-4 md:p-6">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground text-balance">
            Welcome back, Admin
          </h2>
          <p className="font-sans text-sm text-muted-foreground">
            Here is what is happening across CabTourist today.
          </p>
        </div>

        <StatCards />
        <DashboardCharts />

        <div className="paper-card rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border/60 p-5">
            <h3 className="font-display text-base font-semibold text-foreground">Recent bookings</h3>
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1 font-sans text-sm font-medium text-copper hover:underline"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="px-0 sm:px-2 py-2">
            <BookingsTable bookings={BOOKINGS.slice(0, 6)} />
          </div>
        </div>
      </main>
    </>
  )
}
