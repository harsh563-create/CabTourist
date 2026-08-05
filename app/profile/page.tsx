import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { RequireUser } from "@/components/auth/require-user"
import { ProfileView } from "@/components/profile/profile-view"

export const metadata: Metadata = {
  title: "My Profile — CabTourist",
  description: "Manage your CabTourist account, contact details, and preferences.",
}

export default function ProfilePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <RequireUser>
          <ProfileView />
        </RequireUser>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
