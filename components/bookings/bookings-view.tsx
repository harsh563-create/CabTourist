"use client"

import Link from "next/link"
import { CalendarCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export function BookingsView() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-handwritten text-lg text-copper">My account</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          My bookings
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Track your cab rides and tour packages in one place.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-copper/10">
          <CalendarCheck className="size-8 text-copper" />
        </span>
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            No bookings yet
          </h2>
          <p className="mt-1.5 max-w-sm font-sans text-sm text-muted-foreground">
            When you book an outstation cab or a tour package, it will show up
            here with live status updates.
          </p>
        </div>
        <Button
          render={<Link href="/book" />}
          className="bg-leather font-sans font-semibold text-primary-foreground hover:bg-leather/90"
        >
          <CalendarCheck className="size-4" />
          Book your first trip
        </Button>
      </div>
    </div>
  )
}
