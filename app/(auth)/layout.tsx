import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Compass } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-leather text-primary-foreground">
            <Compass className="size-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Cab<span className="text-copper">Tourist</span>
          </span>
        </a>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      <footer className="px-4 py-4 text-center text-xs text-muted-foreground sm:px-6">
        <p className="font-sans">
          By continuing, you agree to our{" "}
          <a href="#" className="font-medium text-copper underline hover:text-foreground">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="font-medium text-copper underline hover:text-foreground">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  )
}
