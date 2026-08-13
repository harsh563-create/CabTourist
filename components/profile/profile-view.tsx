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
  UserRound,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { initials } from "@/lib/initials"
import { useAuthUser } from "@/components/auth/require-user"
import { logoutUser } from "@/lib/user-auth"

function VerifiedBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2 py-0.5 font-sans text-[0.7rem] font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
      <BadgeCheck className="size-3" />
      {label}
    </span>
  )
}

function DetailRow({
  icon,
  label,
  value,
  badge,
}: {
  icon: React.ReactNode
  label: string
  value: string
  badge?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-copper/10 text-copper">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-sans text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-0.5 truncate font-sans text-sm font-semibold text-foreground">
          {value}
        </p>
      </div>
      {badge}
    </div>
  )
}

export function ProfileView() {
  const user = useAuthUser()
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    router.push("/")
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="font-handwritten text-lg text-copper">My account</p>
        <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Profile
            </h1>
            <p className="mt-2 font-sans text-sm text-muted-foreground">
              Manage your account details and stay up to date with CabTourist.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <aside className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="h-24 bg-gradient-to-r from-leather to-copper" />
          <div className="px-6 pb-6 text-center">
            <div className="-mt-12 mb-3 flex justify-center">
              <Avatar className="size-24 ring-4 ring-card">
                <AvatarFallback className="bg-leather text-3xl font-semibold text-primary-foreground">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              {user.name}
            </h2>
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-copper/10 px-2.5 py-0.5 font-sans text-xs font-semibold text-copper">
              <ShieldCheck className="size-3.5" />
              {user.role === "admin" ? "Administrator" : "Member"}
            </span>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {user.isEmailVerified && <VerifiedBadge label="Email verified" />}
              {user.isPhoneVerified && <VerifiedBadge label="Phone verified" />}
            </div>

            <div className="mt-5 divide-y divide-border/70 border-t border-border">
              <div className="flex items-center gap-3 px-1 py-3 text-left">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <p className="truncate font-sans text-sm text-foreground">
                  {user.email ?? "—"}
                </p>
              </div>
              <div className="flex items-center gap-3 px-1 py-3 text-left">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <p className="truncate font-sans text-sm text-foreground">
                  {user.phone ? `+91 ${user.phone}` : "—"}
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/40 px-5 py-3.5">
              <h3 className="font-sans text-sm font-semibold text-foreground">
                Account details
              </h3>
            </div>
            <div className="divide-y divide-border/70">
              <DetailRow
                icon={<UserRound className="size-4" />}
                label="Full name"
                value={user.name}
              />
              <DetailRow
                icon={<Mail className="size-4" />}
                label="Email address"
                value={user.email ?? "Not added"}
                badge={
                  user.isEmailVerified ? (
                    <VerifiedBadge label="Verified" />
                  ) : (
                    <span className="hidden font-sans text-xs text-muted-foreground sm:inline">
                      Not verified
                    </span>
                  )
                }
              />
              <DetailRow
                icon={<Phone className="size-4" />}
                label="Mobile number"
                value={user.phone ? `+91 ${user.phone}` : "Not added"}
                badge={
                  user.isPhoneVerified ? (
                    <VerifiedBadge label="Verified" />
                  ) : (
                    <span className="hidden font-sans text-xs text-muted-foreground sm:inline">
                      Not verified
                    </span>
                  )
                }
              />
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/40 px-5 py-3.5">
              <h3 className="font-sans text-sm font-semibold text-foreground">
                Quick actions
              </h3>
            </div>
            <div className="flex flex-col gap-2.5 p-5 sm:flex-row">
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
          </section>
        </div>
      </div>
    </div>
  )
}
