import { ArrowUpRight, IndianRupee, CalendarCheck, Building2, Users, type LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { ADMIN_STATS } from "@/lib/admin-data"

const ICONS: Record<string, LucideIcon> = {
  "indian-rupee": IndianRupee,
  "calendar-check": CalendarCheck,
  "building-2": Building2,
  users: Users,
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {ADMIN_STATS.map((stat) => {
        const Icon = ICONS[stat.icon]
        return (
          <Card key={stat.label} className="gap-0 p-5">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-500">
                <ArrowUpRight className="size-3" />
                {stat.delta}%
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        )
      })}
    </div>
  )
}
