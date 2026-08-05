"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getAdminToken } from "@/lib/admin-auth"

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login")
    } else {
      setChecked(true)
    }
  }, [router])

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <p className="font-handwritten text-lg text-muted-foreground">
          Loading admin…
        </p>
      </div>
    )
  }

  return <>{children}</>
}
