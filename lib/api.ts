export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

type ApiResponse<T> = {
  success: boolean
  message?: string
  data?: T
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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
