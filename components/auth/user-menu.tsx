"use client"

import { useRouter } from "next/navigation"
import { CalendarCheck, ChevronDown, LogOut, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { logoutUser } from "@/lib/user-auth"
import { initials } from "@/lib/initials"

export function UserMenu({
  name,
  email,
  onNavigate,
}: {
  name: string
  email?: string
  onNavigate?: () => void
}) {
  const router = useRouter()

  const go = (path: string) => {
    onNavigate?.()
    router.push(path)
  }

  const handleLogout = async () => {
    await logoutUser()
    onNavigate?.()
    router.push("/")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center gap-1.5 rounded-lg border-2 border-border bg-card/70 py-1.5 pr-2.5 pl-1.5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-secondary data-[popup-open]:bg-secondary"
        aria-label="Account menu"
      >
        <Avatar className="size-7">
          <AvatarFallback className="bg-leather font-semibold text-primary-foreground">
            {initials(name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden max-w-24 truncate lg:inline">
          {name.split(" ")[0]}
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2.5 py-2">
            <div className="flex flex-col items-start gap-0.5">
              <span className="truncate text-sm font-semibold text-foreground">
                {name}
              </span>
              {email && (
                <span className="truncate text-xs font-normal text-muted-foreground">
                  {email}
                </span>
              )}
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => go("/bookings")}
          className="py-2 pl-2"
        >
          <CalendarCheck className="size-4" />
          My Bookings
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => go("/profile")}
          className="py-2 pl-2"
        >
          <User className="size-4" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="py-2 pl-2"
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
