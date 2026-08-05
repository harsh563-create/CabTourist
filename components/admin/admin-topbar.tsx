"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, Search, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { clearAdminSession, getAdminUser } from "@/lib/admin-auth"

export function AdminTopbar({ title }: { title: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [adminName, setAdminName] = useState("Admin")

  useEffect(() => {
    const user = getAdminUser()
    if (user) setAdminName(user.name)
  }, [])

  const handleLogout = () => {
    clearAdminSession()
    router.replace("/admin/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          }
        />
        <DialogContent className="left-0 top-0 h-full w-72 max-w-[80vw] translate-x-0 translate-y-0 rounded-none border-r p-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left">
          <DialogTitle className="sr-only">Navigation</DialogTitle>
          <AdminSidebar onNavigate={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <h1 className="font-display text-lg font-semibold text-foreground">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search bookings, vendors..."
            className="h-9 w-64 rounded-md pl-9"
            aria-label="Search"
          />
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-cta" />
        </Button>
        <div className="hidden text-right sm:block">
          <p className="font-sans text-sm font-semibold leading-tight text-foreground">
            {adminName}
          </p>
          <p className="font-sans text-xs text-muted-foreground">Administrator</p>
        </div>
        <Avatar className="size-9 border-2 border-border/60">
          <AvatarFallback className="bg-copper/10 font-display text-xs font-semibold text-copper">
            {adminName
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Sign out"
          className="text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </header>
  )
}
