"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Lock, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { apiFetch } from "@/lib/api"
import { setAdminSession } from "@/lib/admin-auth"

type LoginResponse = {
  token: string
  user: { id: string; name: string; email: string; role: string }
}

export function AdminLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await apiFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      if (data.user.role !== "admin") {
        setError("This account does not have admin access.")
        return
      }

      setAdminSession(data.token, data.user)
      router.replace("/admin")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed. Make sure the API server is running."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-[0_2px_8px_rgba(58,46,31,0.06),0_8px_24px_rgba(58,46,31,0.04)] sm:p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex size-12 items-center justify-center rounded-lg wood-block">
          <ShieldCheck className="size-6" />
        </span>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Admin sign in
        </h1>
        <p className="font-sans text-sm text-muted-foreground">
          Access the CabTourist operations console
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-email">Email address</Label>
          <Input
            id="admin-email"
            type="email"
            required
            autoComplete="email"
            placeholder="admin@cabtourist.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 rounded-md"
          />
        </div>

        {error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 font-sans text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={loading}
          className="flex h-11 w-full gap-2 rounded-md bg-leather font-sans text-base font-semibold text-primary-foreground hover:bg-leather/90"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          <Lock className="size-4" />
          Sign in
        </Button>
      </form>

      <div className="mt-5 rounded-lg border border-border/60 bg-muted/40 p-3">
        <p className="flex items-center gap-1.5 font-sans text-xs font-semibold text-foreground">
          <Lock className="size-3 text-copper" />
          Default admin credentials
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          admin@cabtourist.com · Admin@123
        </p>
      </div>
    </div>
  )
}
