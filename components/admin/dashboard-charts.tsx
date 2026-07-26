"use client"

import { Area, AreaChart, CartesianGrid, XAxis, Pie, PieChart, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { REVENUE_TREND, CAB_MIX } from "@/lib/admin-data"

const revenueConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig

const mixConfig = {
  value: { label: "Bookings" },
  Sedan: { label: "Sedan", color: "var(--chart-1)" },
  SUV: { label: "SUV", color: "var(--chart-2)" },
  Hatchback: { label: "Hatchback", color: "var(--chart-3)" },
  Premium: { label: "Premium", color: "var(--chart-4)" },
} satisfies ChartConfig

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Revenue overview</CardTitle>
          <CardDescription>Monthly gross booking revenue this year</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueConfig} className="h-72 w-full">
            <AreaChart data={REVENUE_TREND} margin={{ left: 4, right: 4, top: 8 }}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => "₹" + Number(value).toLocaleString("en-IN")}
                  />
                }
              />
              <Area
                dataKey="revenue"
                type="natural"
                fill="url(#fillRevenue)"
                stroke="var(--color-revenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fleet mix</CardTitle>
          <CardDescription>Bookings by cab type</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <ChartContainer config={mixConfig} className="mx-auto aspect-square h-56">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="type" />} />
              <Pie data={CAB_MIX} dataKey="value" nameKey="type" innerRadius={52} strokeWidth={4}>
                {CAB_MIX.map((entry) => (
                  <Cell key={entry.type} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-2 grid w-full grid-cols-2 gap-2">
            {CAB_MIX.map((entry) => (
              <div key={entry.type} className="flex items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full" style={{ background: entry.fill }} />
                <span className="text-muted-foreground">{entry.type}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
