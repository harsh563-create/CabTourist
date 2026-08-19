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

export type RecycleBinItem = {
  _id: string
  sourceCollection: string
  itemId: string
  data: Record<string, unknown>
  deletedAt: string
  createdAt: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  read: boolean
  createdAt?: string
}

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  return adminFetch<{ messages: ContactMessage[] }>("/api/admin/contact-messages").then((d) => d.messages)
}

export async function markMessageRead(id: string): Promise<ContactMessage> {
  return adminFetch<{ message: ContactMessage }>(`/api/admin/contact-messages/${id}/read`, { method: "PUT" }).then((d) => d.message)
}

export async function deleteContactMessage(id: string): Promise<void> {
  await adminFetch(`/api/admin/contact-messages/${id}`, { method: "DELETE" })
}

export async function fetchDeletedItems(collection?: string): Promise<RecycleBinItem[]> {
  const qs = collection ? `?collection=${collection}` : ""
  return adminFetch<{ items: RecycleBinItem[] }>(`/api/admin/recycle-bin${qs}`).then((d) => d.items)
}

export async function restoreDeletedItem(id: string): Promise<{ id: string; collection: string }> {
  return adminFetch(`/api/admin/recycle-bin/${id}/restore`, { method: "POST" })
}

export async function permanentDeleteItem(id: string): Promise<void> {
  await adminFetch(`/api/admin/recycle-bin/${id}`, { method: "DELETE" })
}

export async function emptyRecycleBin(collection?: string): Promise<void> {
  const qs = collection ? `?collection=${collection}` : ""
  await adminFetch(`/api/admin/recycle-bin${qs}`, { method: "DELETE" })
}

export async function uploadImage(file: File): Promise<string> {
  const token = getAdminToken()
  if (!token) throw new Error("Admin session not found")

  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(`${API_BASE_URL}/api/admin/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  const data = (await res.json().catch(() => null)) as { success: boolean; data?: { url: string }; message?: string } | null

  if (!res.ok) {
    const message = data && typeof data.message === "string" ? data.message : "Upload failed"
    throw new Error(message)
  }

  return data?.data?.url ?? ""
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
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAdminToken()
  if (!token) throw new Error("Admin session not found")

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
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
