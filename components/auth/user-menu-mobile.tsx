"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarCheck, LogOut, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { logoutUser } from "@/lib/user-auth"
import { initials } from "@/lib/initials"

export function UserMenuMobile({
  name,
  email,
  onNavigate,
}: {
  name: string
  email?: string
  onNavigate: () => void
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await logoutUser()
    onNavigate()
    router.push("/")
  }

  return (
    <div className="mt-2 flex flex-col gap-1">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-3 py-2.5">
        <Avatar className="size-9">
          <AvatarFallback className="bg-leather font-semibold text-primary-foreground">
            {initials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-semibold text-foreground">
            {name}
          </span>
          {email && (
            <span className="truncate text-xs text-muted-foreground">
              {email}
            </span>
          )}
        </div>
      </div>
      <Link
        href="/bookings"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        <CalendarCheck className="size-4" />
        My Bookings
      </Link>
      <Link
        href="/profile"
        onClick={onNavigate}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        <User className="size-4" />
        My Profile
      </Link>
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10"
      >
        <LogOut className="size-4" />
        Log out
      </button>
    </div>
  )
}
