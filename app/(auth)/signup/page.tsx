import type { Metadata } from "next"
import { AuthForm } from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign Up — CabTourist",
  description: "Create your CabTourist account and start booking premium cabs and tour packages.",
}

export default function SignupPage() {
  return <AuthForm mode="signup" />
}
