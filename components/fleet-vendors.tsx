"use client"

import { useEffect, useState } from "react"
import { Building2, Calendar, CarFront, MapPin, Star, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { VENDORS, type Vendor, type VendorStatus } from "@/lib/admin-data"
import { fetchVendors } from "@/lib/vendors-api"

const STATUS_STYLES: Record<VendorStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-600",
  pending: "bg-cta/15 text-cta",
  suspended: "bg-destructive/15 text-destructive",
}

const STATUS_LABELS: Record<VendorStatus, string> = {
  active: "Active",
  pending: "Pending verification",
  suspended: "Suspended",
}

export function FleetVendors({ heading = true }: { heading?: boolean }) {
  const [vendors, setVendors] = useState<Vendor[]>(VENDORS)

  useEffect(() => {
    let cancelled = false
    fetchVendors()
      .then((data) => {
        if (!cancelled && data.length > 0) setVendors(data)
      })
      .catch(() => {
        // Keep the static fallback when the API is unreachable.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="vendors" className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        {heading ? (
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-handwritten text-base text-copper">
              Trusted fleet partners
            </span>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our verified fleet vendors
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Every vendor on CabTourist is verified, rated by real travelers,
              and committed to transparent pricing.
            </p>
          </div>
        ) : null}

        <ul
          className={cn(
            "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
            heading ? "mt-10" : "mt-0"
          )}
        >
          {vendors.map((v) => (
            <li
              key={v.id}
              className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-copper/10 text-copper">
                  <Building2 className="size-5" />
                </span>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 font-sans text-xs font-semibold",
                    STATUS_STYLES[v.status]
                  )}
                >
                  {STATUS_LABELS[v.status]}
                </span>
              </div>

              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                {v.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 font-sans text-sm text-muted-foreground">
                <MapPin className="size-3.5 text-copper" />
                {v.city}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/60 pt-4">
                <div className="flex items-center gap-2">
                  <CarFront className="size-4 text-copper" />
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      {v.fleet}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      Vehicles
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-copper" />
                  <div>
                    <p className="font-display text-base font-bold text-foreground">
                      {v.drivers}
                    </p>
                    <p className="font-sans text-xs text-muted-foreground">
                      Drivers
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="inline-flex items-center gap-1 font-sans text-sm text-foreground">
                  <Star className="size-4 fill-cta text-cta" />
                  <span className="font-semibold">{v.rating}</span>
                </span>
                {v.joined ? (
                  <span className="flex items-center gap-1 font-sans text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    Since {v.joined}
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
