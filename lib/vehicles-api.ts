import { adminFetch } from "./admin-api"
import { apiFetch } from "./api"

export type Vehicle = {
  id: string
  name: string
  description: string
  seats: number
  bags: number
  perKm: number
  baseFare: number
  eta: string
  ac: boolean
  image: string
  active: boolean
}

export async function fetchVehicles(): Promise<Vehicle[]> {
  const data = await apiFetch<{ vehicles: Vehicle[] }>("/api/vehicles")
  return data.vehicles
}

export async function fetchAllVehicles(): Promise<Vehicle[]> {
  const data = await adminFetch<{ vehicles: Vehicle[] }>("/api/admin/vehicles")
  return data.vehicles
}

export async function fetchVehicle(id: string): Promise<Vehicle> {
  const data = await apiFetch<{ vehicle: Vehicle }>(`/api/vehicles/${id}`)
  return data.vehicle
}

export async function createVehicle(
  input: Omit<Vehicle, "id">
): Promise<Vehicle> {
  const data = await adminFetch<{ vehicle: Vehicle }>(
    "/api/admin/vehicles",
    {
      method: "POST",
      body: JSON.stringify(input),
    }
  )
  return data.vehicle
}

export async function updateVehicle(
  id: string,
  input: Partial<Omit<Vehicle, "id">>
): Promise<Vehicle> {
  const data = await adminFetch<{ vehicle: Vehicle }>(
    `/api/admin/vehicles/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    }
  )
  return data.vehicle
}

export async function deleteVehicle(id: string): Promise<void> {
  await adminFetch<{ id: string }>(`/api/admin/vehicles/${id}`, {
    method: "DELETE",
  })
}
