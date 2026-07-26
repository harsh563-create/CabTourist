import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-4 py-4 sm:px-6">
        <a href="/" className="flex items-center gap-2">
          <BrandLogo />
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Cab<span className="text-primary">Tourist</span>
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
        <p>
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
        </p>
      </footer>
    </div>
  )
}
