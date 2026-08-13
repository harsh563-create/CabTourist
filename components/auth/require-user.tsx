"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { useUser } from "@/lib/use-user"
import type { AuthUser } from "@/lib/user-auth"

const AuthUserContext = React.createContext<AuthUser | null>(null)

export function useAuthUser(): AuthUser {
  const user = React.useContext(AuthUserContext)
  if (!user) {
    throw new Error("useAuthUser must be used inside <RequireUser>")
  }
  return user
}

export function RequireUser({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const user = useUser()

  React.useEffect(() => {
    if (user === null) {
      router.replace("/login")
    }
  }, [user, router])

  if (user === undefined) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-copper" />
      </div>
    )
  }

  if (user === null) {
    return null
  }

  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  )
}
