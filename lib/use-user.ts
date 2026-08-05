"use client"

import * as React from "react"
import {
  getUser,
  subscribeUserChange,
  type AuthUser,
} from "@/lib/user-auth"

export function useUser(): AuthUser | null {
  const [user, setUser] = React.useState<AuthUser | null>(null)

  React.useEffect(() => {
    setUser(getUser())
    return subscribeUserChange(() => setUser(getUser()))
  }, [])

  return user
}
