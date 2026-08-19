import { apiFetch } from "./api"

export async function submitContactMessage(input: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}): Promise<void> {
  await apiFetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(input),
  })
}
