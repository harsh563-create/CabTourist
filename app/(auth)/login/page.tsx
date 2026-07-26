import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign In — CabTourist",
  description: "Sign in to your CabTourist account to manage bookings and trips.",
}

export default function LoginPage() {
  return <AuthForm mode="login" />
}
