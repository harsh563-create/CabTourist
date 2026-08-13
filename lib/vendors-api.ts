import { adminFetch } from "./admin-api"
import { apiFetch } from "./api"
import type { Vendor } from "./admin-data"

export async function fetchVendors(): Promise<Vendor[]> {
  const data = await apiFetch<{ vendors: Vendor[] }>("/api/vendors")
  return data.vendors
}

export async function fetchVendor(id: string): Promise<Vendor> {
  const data = await apiFetch<{ vendor: Vendor }>(`/api/vendors/${id}`)
  return data.vendor
}

export async function createVendor(
  input: Omit<Vendor, "id">
): Promise<Vendor> {
  const data = await adminFetch<{ vendor: Vendor }>("/api/admin/vendors", {
    method: "POST",
    body: JSON.stringify(input),
  })
  return data.vendor
}

export async function updateVendor(
  id: string,
  input: Partial<Omit<Vendor, "id">>
): Promise<Vendor> {
  const data = await adminFetch<{ vendor: Vendor }>(
    `/api/admin/vendors/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    }
  )
  return data.vendor
}

export async function deleteVendor(id: string): Promise<void> {
  await adminFetch<{ id: string }>(`/api/admin/vendors/${id}`, {
    method: "DELETE",
  })
}
