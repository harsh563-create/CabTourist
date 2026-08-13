import { adminFetch } from "./admin-api"
import { apiFetch } from "./api"
import type { BookingStatus } from "./admin-data"

export type Booking = {
  id: string
  ref: string
  customer: string
  phone?: string
  email?: string
  route: string
  fromCity: string
  toCity: string
  tripType: "oneway" | "roundtrip" | "rental" | "airport"
  cab: string
  date: string
  time?: string
  returnDate?: string
  distanceKm: number
  amount: number
  status: BookingStatus
  driver?: string
  createdAt?: string
}

export type CreateBookingInput = {
  customer: string
  phone?: string
  email?: string
  fromCity: string
  toCity: string
  tripType: Booking["tripType"]
  cab: string
  date: string
  time?: string
  returnDate?: string
  distanceKm: number
  amount: number
}

export async function createBooking(
  input: CreateBookingInput
): Promise<Booking> {
  const data = await apiFetch<{ booking: Booking }>("/api/bookings", {
    method: "POST",
    body: JSON.stringify(input),
  })
  return data.booking
}

export async function fetchMyBookings(
  email?: string,
  phone?: string
): Promise<Booking[]> {
  const params = new URLSearchParams()
  if (email) params.set("email", email)
  if (phone) params.set("phone", phone)
  const query = params.toString()
  const data = await apiFetch<{ bookings: Booking[] }>(
    `/api/bookings${query ? `?${query}` : ""}`
  )
  return data.bookings
}

export async function fetchBookings(): Promise<Booking[]> {
  const data = await adminFetch<{ bookings: Booking[] }>("/api/admin/bookings")
  return data.bookings
}

export async function updateBooking(
  id: string,
  input: Partial<Pick<Booking, "status" | "driver">>
): Promise<Booking> {
  const data = await adminFetch<{ booking: Booking }>(
    `/api/admin/bookings/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    }
  )
  return data.booking
}

export async function deleteBooking(id: string): Promise<void> {
  await adminFetch<{ id: string }>(`/api/admin/bookings/${id}`, {
    method: "DELETE",
  })
}
