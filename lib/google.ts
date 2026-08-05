const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string
            callback: (resp: { credential: string }) => void
          }) => void
          prompt: () => void
        }
      }
    }
  }
}

export type GoogleProfile = {
  googleId: string
  email: string
  name: string
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (
      document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
    ) {
      resolve()
      return
    }
    const script = document.createElement("script")
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Google sign-in"))
    document.head.appendChild(script)
  })
}

function decodeCredential(credential: string): GoogleProfile {
  const payload = JSON.parse(atob(credential.split(".")[1])) as {
    sub: string
    email: string
    name?: string
  }
  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name ?? payload.email.split("@")[0],
  }
}

export async function getGoogleProfile(): Promise<GoogleProfile> {
  if (!CLIENT_ID) {
    throw new Error(
      "Google sign-in is not configured. Set NEXT_PUBLIC_GOOGLE_CLIENT_ID."
    )
  }

  await loadScript()
  if (!window.google) {
    throw new Error("Google sign-in is unavailable")
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Google sign-in timed out")),
      60_000
    )
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (resp) => {
        clearTimeout(timeout)
        resolve(decodeCredential(resp.credential))
      },
    })
    window.google.accounts.id.prompt()
  })
}
