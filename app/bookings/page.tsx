import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { RequireUser } from "@/components/auth/require-user"
import { BookingsView } from "@/components/bookings/bookings-view"

export const metadata: Metadata = {
  title: "My Bookings — CabTourist",
  description: "Track your CabTourist cab and tour package bookings.",
}

export default function BookingsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <RequireUser>
          <BookingsView />
        </RequireUser>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
