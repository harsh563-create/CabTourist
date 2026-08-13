import { adminFetch } from "./admin-api"
import { apiFetch } from "./api"
import type { TourPackage } from "./cabtourist-data"

export async function fetchPackages(): Promise<TourPackage[]> {
  const data = await apiFetch<{ packages: TourPackage[] }>("/api/packages")
  return data.packages
}

export async function fetchPackage(id: string): Promise<TourPackage> {
  const data = await apiFetch<{ package: TourPackage }>(`/api/packages/${id}`)
  return data.package
}

export async function createPackage(
  input: Omit<TourPackage, "id">
): Promise<TourPackage> {
  const data = await adminFetch<{ package: TourPackage }>(
    "/api/admin/packages",
    {
      method: "POST",
      body: JSON.stringify(input),
    }
  )
  return data.package
}

export async function updatePackage(
  id: string,
  input: Partial<Omit<TourPackage, "id">>
): Promise<TourPackage> {
  const data = await adminFetch<{ package: TourPackage }>(
    `/api/admin/packages/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
    }
  )
  return data.package
}

export async function deletePackage(id: string): Promise<void> {
  await adminFetch<{ id: string }>(`/api/admin/packages/${id}`, {
    method: "DELETE",
  })
}
