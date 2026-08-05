import { API_BASE_URL } from "./api"

const TOKEN_KEY = "cabtourist-token"
const USER_KEY = "cabtourist-user"
const USER_EVENT = "cabtourist:user-change"

export type AuthUser = {
  id: string
  name: string
  email?: string
  phone?: string
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  role: string
}

export type AuthSession = {
  token: string
  user: AuthUser
}

export function getUserToken(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function setUserSession(token: string, user: AuthUser): void {
  window.localStorage.setItem(TOKEN_KEY, token)
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  notifyUserChange()
}

export function clearUserSession(): void {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
  notifyUserChange()
}

export function subscribeUserChange(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {}
  window.addEventListener(USER_EVENT, listener)
  return () => window.removeEventListener(USER_EVENT, listener)
}

function notifyUserChange(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(USER_EVENT))
}

export async function logoutUser(): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, { method: "POST" })
  } catch {
    // ignore network errors during logout
  }
  clearUserSession()
}
