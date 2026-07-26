import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AdminTopbar } from "@/components/admin/admin-topbar"
import { StatCards } from "@/components/admin/stat-cards"
import { DashboardCharts } from "@/components/admin/dashboard-charts"
import { BookingsTable } from "@/components/admin/bookings-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BOOKINGS } from "@/lib/admin-data"

export default function AdminDashboardPage() {
  return (
    <>
      <AdminTopbar title="Dashboard" />
      <main className="space-y-6 p-4 md:p-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground text-balance">
            Welcome back, Admin
          </h2>
          <p className="text-sm text-muted-foreground">
            Here is what is happening across CabTourist today.
          </p>
        </div>

        <StatCards />
        <DashboardCharts />

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Recent bookings</CardTitle>
            <Link
              href="/admin/bookings"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </CardHeader>
          <CardContent className="px-0 sm:px-2">
            <BookingsTable bookings={BOOKINGS.slice(0, 6)} />
          </CardContent>
        </Card>
      </main>
    </>
  )
}
