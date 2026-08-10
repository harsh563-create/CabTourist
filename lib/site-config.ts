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
  whatsappNumber: "919876543210",
  whatsappDisplay: "+91 98765 43210",
  whatsappLink: (text: string) =>
    `https://wa.me/919876543210?text=${encodeURIComponent(text)}`,
  phone1Display: "1800-000-000",
  phone1Href: "tel:+911800000000",
  phone2Display: "+91 98275 45678",
  phone2Href: "tel:+919827545678",
} as const
