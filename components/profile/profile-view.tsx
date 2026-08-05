"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BadgeCheck,
  CalendarCheck,
  LogOut,
  Mail,
  Package,
  Phone,
  ShieldCheck,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { initials } from "@/lib/initials"
import { useAuthUser } from "@/components/auth/require-user"
import { logoutUser } from "@/lib/user-auth"

export function ProfileView() {
  const user = useAuthUser()
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push("/")
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <p className="font-handwritten text-lg text-copper">My account</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Profile
        </h1>
        <p className="mt-2 font-sans text-sm text-muted-foreground">
          Manage your account details and stay up to date with CabTourist.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="h-24 bg-gradient-to-r from-leather to-copper" />
        <div className="px-6 pb-6">
          <div className="-mt-10 mb-4 flex flex-col items-center gap-4 sm:flex-row sm:items-end">
            <Avatar className="size-20 ring-4 ring-card">
              <AvatarFallback className="bg-leather text-2xl font-semibold text-primary-foreground">
                {initials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center sm:items-start">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {user.name}
              </h2>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-copper/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-copper">
                <ShieldCheck className="size-3.5" />
                {user.role === "admin" ? "Administrator" : "Member"}
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <Mail className="size-4 shrink-0 text-copper" />
              <div className="min-w-0">
                <p className="font-sans text-xs text-muted-foreground">Email</p>
                <p className="truncate font-sans text-sm font-medium text-foreground">
                  {user.email ?? "—"}
                </p>
              </div>
              {user.isEmailVerified && (
                <BadgeCheck className="ml-auto size-4 shrink-0 text-green-600" />
              )}
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <Phone className="size-4 shrink-0 text-copper" />
              <div className="min-w-0">
                <p className="font-sans text-xs text-muted-foreground">Mobile</p>
                <p className="truncate font-sans text-sm font-medium text-foreground">
                  {user.phone ? `+91 ${user.phone}` : "—"}
                </p>
              </div>
              {user.isPhoneVerified && (
                <BadgeCheck className="ml-auto size-4 shrink-0 text-green-600" />
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Button
              render={<Link href="/book" />}
              className="flex-1 bg-leather font-sans font-semibold text-primary-foreground hover:bg-leather/90"
            >
              <CalendarCheck className="size-4" />
              Book a cab
            </Button>
            <Button
              render={<Link href="/packages" />}
              variant="outline"
              className="flex-1"
            >
              <Package className="size-4" />
              Browse packages
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="size-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
