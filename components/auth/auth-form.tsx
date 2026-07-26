"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, ArrowLeft, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type AuthMode = "email" | "phone"

interface AuthFormProps {
  mode: "login" | "signup"
  className?: string
}

export function AuthForm({ mode, className }: AuthFormProps) {
  const router = useRouter()
  const [authMode, setAuthMode] = React.useState<AuthMode>("email")
  const [loading, setLoading] = React.useState(false)
  const [otpSent, setOtpSent] = React.useState(false)
  const [otpVerified, setOtpVerified] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""])
  const [otpCountdown, setOtpCountdown] = React.useState(0)
  const [phone, setPhone] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [otpError, setOtpError] = React.useState("")
  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const isSignup = mode === "signup"

  React.useEffect(() => {
    if (otpCountdown <= 0) return
    const timer = setTimeout(() => setOtpCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [otpCountdown])

  const handleGoogleLogin = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    router.push("/")
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    router.push("/")
  }

  const handleSendOtp = async () => {
    if (phone.length < 10) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setOtpSent(true)
    setOtpCountdown(30)
    setOtp(["", "", "", "", "", ""])
    setOtpError("")
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setOtpError("")

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }

    if (newOtp.every((d) => d !== "")) {
      verifyOtp(newOtp.join(""))
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (pasted.length === 0) return
    const newOtp = pasted.split("").concat(Array(6).fill("")).slice(0, 6)
    setOtp(newOtp)
    const nextEmpty = newOtp.findIndex((d) => d === "")
    otpRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus()
    if (newOtp.every((d) => d !== "")) {
      verifyOtp(newOtp.join(""))
    }
  }

  const verifyOtp = async (code: string) => {
    setLoading(true)
    setOtpError("")
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    if (code === "123456" || code.length === 6) {
      setOtpVerified(true)
      await new Promise((r) => setTimeout(r, 800))
      router.push("/")
    } else {
      setOtpError("Invalid OTP. Please try again.")
      setOtp(["", "", "", "", "", ""])
      otpRefs.current[0]?.focus()
    }
  }

  const handleResendOtp = async () => {
    if (otpCountdown > 0) return
    await handleSendOtp()
  }

  const GoogleIcon = () => (
    <svg className="size-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isSignup
            ? "Start your journey with CabTourist today"
            : "Sign in to manage your bookings and trips"}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          className="h-11 w-full gap-3 text-base"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        <div className="relative flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-xs text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-lg border bg-muted/50 p-1">
          <button
            onClick={() => {
              setAuthMode("email")
              setOtpSent(false)
              setOtpVerified(false)
              setOtpError("")
            }}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
              authMode === "email"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Mail className="size-4" />
            Email
          </button>
          <button
            onClick={() => {
              setAuthMode("phone")
              setOtpSent(false)
              setOtpVerified(false)
              setOtpError("")
            }}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all",
              authMode === "phone"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Phone className="size-4" />
            Mobile
          </button>
        </div>

        {authMode === "email" ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            {isSignup && (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignup ? "Create a strong password" : "Enter your password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="h-11 w-full rounded-full text-base" disabled={loading}>
              {loading && <Loader2 className="size-4 animate-spin" />}
              {isSignup ? "Create account" : "Sign in"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            {otpVerified ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <CheckCircle2 className="size-12 text-green-500" />
                <p className="text-sm font-medium">Phone verified successfully!</p>
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : !otpSent ? (
              <>
                {isSignup && (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="phone-name">Full name</Label>
                    <Input
                      id="phone-name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Mobile number</Label>
                  <div className="flex gap-2">
                    <div className="flex h-11 w-16 items-center justify-center rounded-lg border bg-muted/50 text-sm font-medium">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      required
                      maxLength={10}
                      className="h-11 flex-1"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSendOtp}
                  className="h-11 w-full rounded-full text-base"
                  disabled={loading || phone.length < 10}
                >
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  Send OTP
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp(["", "", "", "", "", ""])
                      setOtpError("")
                    }}
                    className="flex size-8 items-center justify-center rounded-full hover:bg-muted"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Enter OTP</span>
                    <span className="text-xs text-muted-foreground">
                      Sent to +91 {phone}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      onPaste={i === 0 ? handleOtpPaste : undefined}
                      className={cn(
                        "size-12 rounded-lg border bg-transparent text-center text-lg font-semibold outline-none transition-all focus:border-ring focus:ring-3 focus:ring-ring/50",
                        otpError && "border-destructive focus:border-destructive focus:ring-destructive/20",
                        digit && "border-primary/50"
                      )}
                    />
                  ))}
                </div>

                {otpError && (
                  <p className="text-center text-xs text-destructive">{otpError}</p>
                )}

                {loading && (
                  <div className="flex items-center justify-center gap-2 py-2">
                    <Loader2 className="size-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Verifying...</span>
                  </div>
                )}

                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    Didn&apos;t receive the OTP?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpCountdown > 0}
                    className={cn(
                      "text-sm font-medium",
                      otpCountdown > 0
                        ? "text-muted-foreground cursor-not-allowed"
                        : "text-primary hover:underline"
                    )}
                  >
                    {otpCountdown > 0
                      ? `Resend in ${otpCountdown}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <a
          href={isSignup ? "/login" : "/signup"}
          className="font-medium text-primary hover:underline"
        >
          {isSignup ? "Sign in" : "Create one"}
        </a>
      </p>
    </div>
  )
}
