import Link from "next/link"
import { Compass } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { AdminLoginForm } from "@/components/admin/admin-login-form"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-leather text-primary-foreground">
            <Compass className="size-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Cab<span className="text-copper">Tourist</span>
          </span>
          <span className="rounded-sm bg-cta/15 px-1.5 py-0.5 font-sans text-xs font-semibold text-cta">
            Admin
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <AdminLoginForm />
        </div>
      </main>

      <footer className="px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        <p className="font-sans">
          Protected area — authorized personnel only.
        </p>
      </footer>
    </div>
  )
}
