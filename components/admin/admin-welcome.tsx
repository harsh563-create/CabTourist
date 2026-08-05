"use client"

import { useEffect, useState } from "react"

import { getAdminUser } from "@/lib/admin-auth"

export function AdminWelcome() {
  const [name, setName] = useState("Admin")

  useEffect(() => {
    const user = getAdminUser()
    if (user) setName(user.name)
  }, [])

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-foreground text-balance">
        Welcome back, {name}
      </h2>
      <p className="font-sans text-sm text-muted-foreground">
        Here is what is happening across CabTourist today.
      </p>
    </div>
  )
}
