import { API_BASE_URL } from "./api"
import { getAdminToken } from "./admin-auth"

export type AdminDevice = {
  type?: "desktop" | "mobile" | "tablet" | "unknown"
  browser?: string
  os?: string
  model?: string
}

export type AdminLocation = {
  city?: string
  region?: string
  country?: string
  lat?: number
  lon?: number
}

export type AdminCustomer = {
  id: string
  name: string
  email?: string
  phone?: string
  role: string
  loginMethod: "email" | "google" | "phone"
  device: AdminDevice
  location?: AdminLocation
  ip?: string
  loginAt: string
  joinedAt: string | null
}

type ApiResponse<T> = { success: boolean; message?: string; data?: T }

export function locationLabel(location?: AdminLocation): string {
  if (!location) return "Unknown"
  const parts = [
    location.city,
    location.region,
    location.country,
  ].filter(Boolean)
  if (parts.length > 0) return parts.join(", ")
  if (location.lat !== undefined && location.lon !== undefined) {
    return `${location.lat.toFixed(3)}, ${location.lon.toFixed(3)}`
  }
  return "Unknown"
}

export function deviceLabel(device: AdminDevice): string {
  const parts = [device.os, device.browser].filter(Boolean)
  return parts.length > 0 ? parts.join(" · ") : "Unknown device"
}

export async function adminFetch<T = unknown>(
  path: string
): Promise<T> {
  const token = getAdminToken()
  if (!token) throw new Error("Admin session not found")

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  const data = (await res.json().catch(() => null)) as ApiResponse<T> | null

  if (!res.ok) {
    const message =
      data && typeof data.message === "string"
        ? data.message
        : "Something went wrong"
    throw new Error(message)
  }

  return data?.data as T
}
