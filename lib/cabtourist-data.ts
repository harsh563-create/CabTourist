export type CabType = {
  id: string
  name: string
  description: string
  seats: number
  bags: number
  perKm: number
  baseFare: number
  eta: string
}

export type Route = {
  id: string
  from: string
  to: string
  distanceKm: number
  durationHrs: number
  fromPrice: number
  popular?: boolean
}

export type TourPackage = {
  id: string
  title: string
  location: string
  image: string
  nights: number
  days: number
  rating: number
  reviews: number
  fromPrice: number
  highlights: string[]
  tag?: string
}

export type Review = {
  id: string
  name: string
  location: string
  rating: number
  quote: string
  trip: string
  initials: string
}

export type Feature = {
  title: string
  description: string
  icon: string
}

export type Faq = {
  question: string
  answer: string
}

export const CITIES: string[] = [
  'Mumbai',
  'Pune',
  'Delhi',
  'Jaipur',
  'Agra',
  'Goa',
  'Bengaluru',
  'Mysuru',
  'Manali',
  'Shimla',
  'Chandigarh',
  'Udaipur',
  'Kochi',
  'Munnar',
]

export const CAB_TYPES: CabType[] = [
  {
    id: 'hatchback',
    name: 'Hatchback',
    description: 'Compact & economical for city hops',
    seats: 4,
    bags: 2,
    perKm: 11,
    baseFare: 250,
    eta: '4 min',
  },
  {
    id: 'sedan',
    name: 'Sedan',
    description: 'Comfortable rides for small families',
    seats: 4,
    bags: 3,
    perKm: 14,
    baseFare: 350,
    eta: '5 min',
  },
  {
    id: 'suv',
    name: 'SUV',
    description: 'Spacious & sturdy for hill routes',
    seats: 6,
    bags: 4,
    perKm: 18,
    baseFare: 500,
    eta: '7 min',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury sedans with pro chauffeurs',
    seats: 4,
    bags: 3,
    perKm: 26,
    baseFare: 900,
    eta: '9 min',
  },
]

export const POPULAR_ROUTES: Route[] = [
  { id: 'r1', from: 'Mumbai', to: 'Pune', distanceKm: 150, durationHrs: 3, fromPrice: 2199, popular: true },
  { id: 'r2', from: 'Delhi', to: 'Agra', distanceKm: 233, durationHrs: 4, fromPrice: 3299, popular: true },
  { id: 'r3', from: 'Delhi', to: 'Jaipur', distanceKm: 281, durationHrs: 5, fromPrice: 3899 },
  { id: 'r4', from: 'Bengaluru', to: 'Mysuru', distanceKm: 145, durationHrs: 3, fromPrice: 2099, popular: true },
  { id: 'r5', from: 'Chandigarh', to: 'Manali', distanceKm: 310, durationHrs: 8, fromPrice: 5499 },
  { id: 'r6', from: 'Kochi', to: 'Munnar', distanceKm: 130, durationHrs: 4, fromPrice: 2899 },
  { id: 'r7', from: 'Delhi', to: 'Shimla', distanceKm: 342, durationHrs: 7, fromPrice: 5199 },
  { id: 'r8', from: 'Goa', to: 'Udaipur', distanceKm: 550, durationHrs: 10, fromPrice: 8999 },
]

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'p1',
    title: 'Himalayan Escape',
    location: 'Manali & Shimla',
    image: '/images/package-mountain.png',
    nights: 4,
    days: 5,
    rating: 4.9,
    reviews: 412,
    fromPrice: 18999,
    highlights: ['Snow point sightseeing', 'Private cab throughout', 'Handpicked stays'],
    tag: 'Bestseller',
  },
  {
    id: 'p2',
    title: 'Royal Rajasthan',
    location: 'Jaipur, Udaipur & Agra',
    image: '/images/package-heritage.png',
    nights: 5,
    days: 6,
    rating: 4.8,
    reviews: 328,
    fromPrice: 24999,
    highlights: ['Palace & fort tours', 'Heritage haveli stay', 'Expert local guide'],
    tag: 'Heritage',
  },
  {
    id: 'p3',
    title: 'Coastal Goa Getaway',
    location: 'North & South Goa',
    image: '/images/package-beach.png',
    nights: 3,
    days: 4,
    rating: 4.7,
    reviews: 561,
    fromPrice: 14999,
    highlights: ['Beach hopping', 'Sunset cruise', 'Airport transfers included'],
    tag: 'Weekend',
  },
]

export const FEATURES: Feature[] = [
  {
    title: 'Verified drivers',
    description: 'Every chauffeur is background-checked, trained, and rated by real travelers.',
    icon: 'shield-check',
  },
  {
    title: 'Transparent pricing',
    description: 'See the full fare upfront. No surge, no hidden charges, no surprises.',
    icon: 'badge-indian-rupee',
  },
  {
    title: '24/7 live support',
    description: 'Real humans on call, chat, and WhatsApp for every leg of your journey.',
    icon: 'headset',
  },
  {
    title: 'Well-maintained fleet',
    description: 'Sanitized, insured, and regularly serviced cabs across every category.',
    icon: 'car-front',
  },
  {
    title: 'Live trip tracking',
    description: 'Share your live location and ETA with family for complete peace of mind.',
    icon: 'map-pin',
  },
  {
    title: 'Free cancellation',
    description: 'Plans change. Cancel up to 1 hour before pickup at zero cost.',
    icon: 'calendar-check',
  },
]

export const REVIEWS: Review[] = [
  {
    id: 'rev1',
    name: 'Ananya Rao',
    location: 'Bengaluru',
    rating: 5,
    quote:
      'Booked a Mysuru road trip and the driver was punctual, polite, and knew all the best food stops. The fare matched the estimate exactly.',
    trip: 'Bengaluru → Mysuru',
    initials: 'AR',
  },
  {
    id: 'rev2',
    name: 'Rohit Mehta',
    location: 'Delhi',
    rating: 5,
    quote:
      'The Rajasthan package was flawless — clean SUV, great hotels, and support answered instantly when we changed our plan.',
    trip: 'Royal Rajasthan',
    initials: 'RM',
  },
  {
    id: 'rev3',
    name: 'Sara Fernandes',
    location: 'Goa',
    rating: 4,
    quote:
      'Loved the transparent pricing and live tracking. Airport pickup was on time even for a 2 AM flight. Will book again.',
    trip: 'Goa Getaway',
    initials: 'SF',
  },
]

export const FAQS: Faq[] = [
  {
    question: 'How is the fare calculated?',
    answer:
      'Fares are based on a fixed base fare plus a per-kilometer rate for your chosen cab type. Tolls, taxes, and driver allowance for outstation trips are shown transparently before you confirm — the price you see is the price you pay.',
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer:
      'Yes. You can cancel free of charge up to 1 hour before pickup, and rescheduling is free anytime subject to driver availability. Manage everything from your booking confirmation page.',
  },
  {
    question: 'Are the drivers verified?',
    answer:
      'Absolutely. Every driver undergoes background verification, license checks, and customer-rating reviews. You will receive your driver’s name, photo, and vehicle details before the trip.',
  },
  {
    question: 'Do you operate for one-way and round trips?',
    answer:
      'We offer one-way, round-trip, hourly rentals, airport transfers, and multi-day tour packages. Choose your trip type in the booking widget to see relevant pricing.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept UPI, all major credit and debit cards, net banking, and popular wallets. You can also choose partial payment now and the balance to the driver on select routes.',
  },
]

export const TRIP_TYPES = [
  { id: 'oneway', label: 'One Way' },
  { id: 'roundtrip', label: 'Round Trip' },
  { id: 'rental', label: 'Hourly Rental' },
  { id: 'airport', label: 'Airport' },
] as const

export type TripTypeId = (typeof TRIP_TYPES)[number]['id']

export const STATS = [
  { value: '2M+', label: 'Happy travelers' },
  { value: '450+', label: 'Cities covered' },
  { value: '12K+', label: 'Verified drivers' },
  { value: '4.9', label: 'Average rating' },
]
