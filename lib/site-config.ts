export const SITE = {
  name: "CabTourist",
  tagline: "Explore India's Top Destinations with CabTourist",
  description:
    "Book cabs for temple darshan, airport transfers, outstation trips, and travel anywhere in India. Verified drivers, transparent fares, 24/7 support.",
  url: "https://cabtourist.com",
  email: "hello@cabtourist.com",
  address: "Ujjain, Madhya Pradesh, India",
} as const

export const CONTACTS = {
  whatsappNumber: "917828887888",
  whatsappDisplay: "+91 7828887888",
  whatsappLink: (text: string) =>
    `https://wa.me/917828887888?text=${encodeURIComponent(text)}`,
  phone1Display: "+91 7828887888",
  phone1Href: "tel:+917828887888",
} as const
