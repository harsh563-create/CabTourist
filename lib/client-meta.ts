export type ClientMeta = {
  device?: {
    type?: "desktop" | "mobile" | "tablet" | "unknown"
    browser?: string
    os?: string
    model?: string
  }
  location?: {
    lat?: number
    lon?: number
    city?: string
    region?: string
    country?: string
  }
}

type UAData = {
  platform?: string
  mobile?: boolean
  model?: string
  getHighEntropyValues?: (
    hints: string[]
  ) => Promise<{ platform?: string; model?: string }>
}

function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge"
  if (/opr\/|opera/i.test(ua)) return "Opera"
  if (/crios|chrome/i.test(ua)) return "Chrome"
  if (/fxios|firefox/i.test(ua)) return "Firefox"
  if (/safari/i.test(ua)) return "Safari"
  if (/msie|trident/i.test(ua)) return "Internet Explorer"
  return "Unknown"
}

function parseUA(ua: string): ClientMeta["device"] {
  let type: "desktop" | "mobile" | "tablet" | "unknown" = "desktop"
  if (/tablet|ipad/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))) {
    type = "tablet"
  } else if (/mobi|iphone|ipod|android/i.test(ua)) {
    type = "mobile"
  }

  let os = "Unknown"
  if (/windows/i.test(ua)) os = "Windows"
  else if (/iphone|ipod/i.test(ua)) os = "iOS"
  else if (/ipad/i.test(ua)) os = "iPadOS"
  else if (/mac os x/i.test(ua)) os = "macOS"
  else if (/android/i.test(ua)) os = "Android"
  else if (/cros/i.test(ua)) os = "Chrome OS"
  else if (/linux/i.test(ua)) os = "Linux"

  return { type, browser: detectBrowser(ua), os }
}

async function collectDevice(): Promise<ClientMeta["device"]> {
  if (typeof navigator === "undefined") return undefined

  const ua = navigator.userAgent
  const nav = navigator as Navigator & { userAgentData?: UAData }
  const uaData = nav.userAgentData

  if (!uaData) return parseUA(ua)

  let os = uaData.platform ?? "Unknown"
  let model = ""
  if (uaData.getHighEntropyValues) {
    try {
      const hints = await uaData.getHighEntropyValues([
        "platform",
        "platformVersion",
        "model",
      ])
      if (hints.platform) os = hints.platform
      if (hints.model) model = hints.model
    } catch {
      // fall through with low-entropy values
    }
  }

  return {
    type: uaData.mobile ? "mobile" : /tablet|ipad/i.test(ua) ? "tablet" : "desktop",
    browser: detectBrowser(ua),
    os,
    ...(model ? { model } : {}),
  }
}

async function collectLocation(): Promise<ClientMeta["location"]> {
  if (typeof navigator === "undefined" || !navigator.geolocation) {
    return undefined
  }

  try {
    const perms = navigator.permissions
    if (perms?.query) {
      const status = await perms.query({ name: "geolocation" } as PermissionDescriptor)
      if (status.state !== "granted") return undefined
    }
  } catch {
    return undefined
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      const timer = window.setTimeout(() => reject(new Error("timeout")), 4000)
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          window.clearTimeout(timer)
          resolve(pos)
        },
        (err) => {
          window.clearTimeout(timer)
          reject(err)
        },
        { timeout: 3500, maximumAge: 10 * 60 * 1000 }
      )
    })
    return {
      lat: Number(position.coords.latitude.toFixed(4)),
      lon: Number(position.coords.longitude.toFixed(4)),
    }
  } catch {
    return undefined
  }
}

export async function collectClientMeta(): Promise<ClientMeta> {
  const [device, location] = await Promise.all([
    collectDevice(),
    collectLocation(),
  ])
  return {
    ...(device ? { device } : {}),
    ...(location ? { location } : {}),
  }
}
