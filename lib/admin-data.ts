export type BookingStatus = "confirmed" | "ongoing" | "completed" | "cancelled" | "pending"

export type AdminBooking = {
  id: string
  ref?: string
  customer: string
  route: string
  cab: string
  date: string
  amount: number
  status: BookingStatus
  driver: string
}

export type VendorStatus = "active" | "pending" | "suspended"

export type Vendor = {
  id: string
  name: string
  city: string
  fleet: number
  drivers: number
  rating: number
  revenue: number
  status: VendorStatus
  joined: string
}

export type Customer = {
  id: string
  name: string
  email: string
  city: string
  trips: number
  spend: number
  lastTrip: string
  tier: "New" | "Silver" | "Gold" | "Platinum"
}

export type AdminStat = {
  label: string
  value: string
  delta: number
  icon: string
}

export const ADMIN_STATS: AdminStat[] = [
  { label: "Total revenue", value: "₹48.6L", delta: 12.4, icon: "indian-rupee" },
  { label: "Bookings", value: "9,284", delta: 8.1, icon: "calendar-check" },
  { label: "Active vendors", value: "312", delta: 3.6, icon: "building-2" },
  { label: "Customers", value: "62,410", delta: 15.2, icon: "users" },
]

export const REVENUE_TREND = [
  { month: "Jan", revenue: 320000, bookings: 620 },
  { month: "Feb", revenue: 358000, bookings: 690 },
  { month: "Mar", revenue: 412000, bookings: 780 },
  { month: "Apr", revenue: 389000, bookings: 742 },
  { month: "May", revenue: 468000, bookings: 905 },
  { month: "Jun", revenue: 521000, bookings: 988 },
  { month: "Jul", revenue: 486000, bookings: 921 },
  { month: "Aug", revenue: 552000, bookings: 1042 },
  { month: "Sep", revenue: 601000, bookings: 1120 },
  { month: "Oct", revenue: 648000, bookings: 1235 },
  { month: "Nov", revenue: 712000, bookings: 1310 },
  { month: "Dec", revenue: 786000, bookings: 1456 },
]

export const CAB_MIX = [
  { type: "Sedan", value: 3820, fill: "var(--chart-1)" },
  { type: "SUV", value: 2960, fill: "var(--chart-2)" },
  { type: "Hatchback", value: 1540, fill: "var(--chart-3)" },
  { type: "Premium", value: 964, fill: "var(--chart-4)" },
]

export const BOOKINGS: AdminBooking[] = [
  { id: "CT-92841", customer: "Priya Sharma", route: "Mumbai → Pune", cab: "Sedan", date: "2026-07-26", amount: 2199, status: "ongoing", driver: "Ramesh K." },
  { id: "CT-92840", customer: "Rohit Mehta", route: "Delhi → Jaipur", cab: "SUV", date: "2026-07-26", amount: 3899, status: "confirmed", driver: "Suresh P." },
  { id: "CT-92838", customer: "Ananya Rao", route: "Bengaluru → Mysuru", cab: "Sedan", date: "2026-07-25", amount: 2099, status: "completed", driver: "Manoj R." },
  { id: "CT-92835", customer: "Sara Fernandes", route: "Goa Airport → Panaji", cab: "Hatchback", date: "2026-07-25", amount: 899, status: "completed", driver: "Anthony D." },
  { id: "CT-92830", customer: "Vikram Singh", route: "Chandigarh → Manali", cab: "SUV", date: "2026-07-24", amount: 5499, status: "cancelled", driver: "—" },
  { id: "CT-92826", customer: "Neha Gupta", route: "Delhi → Agra", cab: "Premium", date: "2026-07-24", amount: 4299, status: "completed", driver: "Imran S." },
  { id: "CT-92822", customer: "Arjun Nair", route: "Kochi → Munnar", cab: "SUV", date: "2026-07-23", amount: 2899, status: "completed", driver: "Biju V." },
  { id: "CT-92819", customer: "Meera Iyer", route: "Delhi → Shimla", cab: "Sedan", date: "2026-07-23", amount: 5199, status: "pending", driver: "—" },
  { id: "CT-92815", customer: "Karan Malhotra", route: "Pune → Mumbai", cab: "Premium", date: "2026-07-22", amount: 2499, status: "completed", driver: "Deepak M." },
  { id: "CT-92810", customer: "Divya Menon", route: "Jaipur → Udaipur", cab: "SUV", date: "2026-07-22", amount: 6299, status: "completed", driver: "Gopal S." },
]

export const VENDORS: Vendor[] = [
  { id: "V-101", name: "Skyline Travels", city: "Mumbai", fleet: 48, drivers: 62, rating: 4.8, revenue: 1240000, status: "active", joined: "2023-02-11" },
  { id: "V-102", name: "Rajasthan Wheels", city: "Jaipur", fleet: 36, drivers: 44, rating: 4.7, revenue: 980000, status: "active", joined: "2023-05-19" },
  { id: "V-103", name: "Coastal Cabs", city: "Goa", fleet: 22, drivers: 28, rating: 4.6, revenue: 610000, status: "active", joined: "2023-08-02" },
  { id: "V-104", name: "Hill Rider Fleet", city: "Manali", fleet: 18, drivers: 21, rating: 4.5, revenue: 470000, status: "pending", joined: "2026-07-10" },
  { id: "V-105", name: "Southern Star Mobility", city: "Bengaluru", fleet: 54, drivers: 71, rating: 4.9, revenue: 1560000, status: "active", joined: "2022-11-23" },
  { id: "V-106", name: "Backwater Rides", city: "Kochi", fleet: 15, drivers: 19, rating: 4.4, revenue: 320000, status: "suspended", joined: "2024-01-30" },
  { id: "V-107", name: "Capital Cabs", city: "Delhi", fleet: 61, drivers: 88, rating: 4.7, revenue: 1810000, status: "active", joined: "2022-09-14" },
]

export const CUSTOMERS: Customer[] = [
  { id: "U-5001", name: "Priya Sharma", email: "priya@email.com", city: "Mumbai", trips: 34, spend: 68200, lastTrip: "2026-07-26", tier: "Platinum" },
  { id: "U-5002", name: "Rohit Mehta", email: "rohit.m@email.com", city: "Delhi", trips: 21, spend: 41500, lastTrip: "2026-07-26", tier: "Gold" },
  { id: "U-5003", name: "Ananya Rao", email: "ananya.rao@email.com", city: "Bengaluru", trips: 18, spend: 33900, lastTrip: "2026-07-25", tier: "Gold" },
  { id: "U-5004", name: "Sara Fernandes", email: "sara.f@email.com", city: "Goa", trips: 9, spend: 14200, lastTrip: "2026-07-25", tier: "Silver" },
  { id: "U-5005", name: "Vikram Singh", email: "vikram.s@email.com", city: "Chandigarh", trips: 4, spend: 21800, lastTrip: "2026-07-24", tier: "Silver" },
  { id: "U-5006", name: "Neha Gupta", email: "neha.g@email.com", city: "Delhi", trips: 27, spend: 52400, lastTrip: "2026-07-24", tier: "Platinum" },
  { id: "U-5007", name: "Arjun Nair", email: "arjun.n@email.com", city: "Kochi", trips: 2, spend: 5600, lastTrip: "2026-07-23", tier: "New" },
  { id: "U-5008", name: "Meera Iyer", email: "meera.i@email.com", city: "Chennai", trips: 12, spend: 28700, lastTrip: "2026-07-23", tier: "Silver" },
]

export const ADMIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: "layout-dashboard" },
  { href: "/admin/bookings", label: "Bookings", icon: "calendar-check" },
  { href: "/admin/vendors", label: "Vendors", icon: "building-2" },
  { href: "/admin/vehicles", label: "Vehicles", icon: "car" },
  { href: "/admin/customers", label: "Customers", icon: "users" },
  { href: "/admin/packages", label: "Packages", icon: "map" },
  { href: "/admin/recycle-bin", label: "Recycle Bin", icon: "trash-2" },
] as const

export function inr(n: number): string {
  return "₹" + n.toLocaleString("en-IN")
}

export const STATUS_STYLES: Record<BookingStatus, string> = {
  confirmed: "bg-primary/15 text-primary",
  ongoing: "bg-cta/15 text-cta",
  completed: "bg-emerald-500/15 text-emerald-500",
  cancelled: "bg-destructive/15 text-destructive",
  pending: "bg-muted-foreground/15 text-muted-foreground",
}

export const VENDOR_STATUS_STYLES: Record<VendorStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-500",
  pending: "bg-cta/15 text-cta",
  suspended: "bg-destructive/15 text-destructive",
}

export const CUSTOMER_TIERS = ["New", "Silver", "Gold", "Platinum"] as const

export type CustomerTier = (typeof CUSTOMER_TIERS)[number]

export const TIER_STYLES: Record<CustomerTier, string> = {
  New: "bg-muted-foreground/15 text-muted-foreground",
  Silver: "bg-muted/70 text-foreground",
  Gold: "bg-cta/15 text-cta",
  Platinum: "bg-primary/15 text-primary",
}
