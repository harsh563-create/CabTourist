export type CabType = {
  id: string
  name: string
  description: string
  seats: number
  bags: number
  perKm: number
  baseFare: number
  eta: string
  ac: boolean
  image: string
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
  'Ujjain',
  'Indore',
  'Omkareshwar',
  'Nalkheda',
  'Sanwariya Seth',
  'Khatushyam',
  'Udaipur',
  'Panchmari',
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
    ac: true,
    image: '/images/car-hatchback.jpg',
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
    ac: true,
    image: '/images/car-sedan.jpg',
  },
  {
    id: 'ertiga',
    name: 'Ertiga',
    description: 'Spacious MPV ideal for groups',
    seats: 6,
    bags: 4,
    perKm: 16,
    baseFare: 450,
    eta: '6 min',
    ac: true,
    image: '/images/car-ertiga.jpg',
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
    ac: true,
    image: '/images/car-suv.jpg',
  },
  {
    id: 'innova',
    name: 'Innova Crysta',
    description: 'Premium MPV for family & outstation',
    seats: 7,
    bags: 5,
    perKm: 22,
    baseFare: 700,
    eta: '8 min',
    ac: true,
    image: '/images/car-innova.jpg',
  },
]

export const POPULAR_ROUTES: Route[] = [
  { id: 'r1', from: 'Ujjain', to: 'Omkareshwar', distanceKm: 135, durationHrs: 3, fromPrice: 2599, popular: true },
  { id: 'r2', from: 'Ujjain', to: 'Indore', distanceKm: 55, durationHrs: 1.5, fromPrice: 1199, popular: true },
  { id: 'r3', from: 'Ujjain', to: 'Nalkheda', distanceKm: 60, durationHrs: 1.5, fromPrice: 1499 },
  { id: 'r4', from: 'Ujjain', to: 'Sanwariya Seth', distanceKm: 300, durationHrs: 6, fromPrice: 4999, popular: true },
  { id: 'r5', from: 'Ujjain', to: 'Khatushyam', distanceKm: 450, durationHrs: 8, fromPrice: 7999 },
  { id: 'r6', from: 'Indore', to: 'Ujjain', distanceKm: 55, durationHrs: 1.5, fromPrice: 1199 },
  { id: 'r7', from: 'Ujjain', to: 'Udaipur', distanceKm: 400, durationHrs: 7, fromPrice: 6999 },
  { id: 'r8', from: 'Ujjain', to: 'Panchmari', distanceKm: 200, durationHrs: 4.5, fromPrice: 3499 },
]

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'uj1',
    title: 'Ujjain Local Sightseeing',
    location: 'Ujjain, Madhya Pradesh',
    image: '/images/hero-mahakal-1.jpg',
    nights: 0,
    days: 1,
    rating: 4.9,
    reviews: 612,
    fromPrice: 1499,
    highlights: ['Mahakaleshwar darshan', 'Ram Ghat & Sandipani Ashram', 'Private AC cab for 12 hrs'],
    tag: 'Bestseller',
  },
  {
    id: 'uj2',
    title: 'Ujjain to Indore',
    location: 'Indore, Madhya Pradesh',
    image: '/images/package-heritage.png',
    nights: 0,
    days: 1,
    rating: 4.8,
    reviews: 428,
    fromPrice: 1599,
    highlights: ['Door-to-door pickup & drop', 'Tolls & driver allowance included', 'Flexible one-way or round trip'],
    tag: 'Popular',
  },
  {
    id: 'uj3',
    title: 'Ujjain to Omkareshwar',
    location: 'Omkareshwar, Madhya Pradesh',
    image: '/images/hero-mahakal-2.jpg',
    nights: 0,
    days: 1,
    rating: 4.9,
    reviews: 305,
    fromPrice: 2599,
    highlights: ['Omkareshwar Jyotirlinga darshan', 'Mamleshwar & Gauri Somnath visit', 'Flexible return timing'],
    tag: 'Pilgrimage',
  },
  {
    id: 'uj4',
    title: 'Ujjain to Indore Airport',
    location: 'Indore Airport, Madhya Pradesh',
    image: '/images/car-sedan.jpg',
    nights: 0,
    days: 1,
    rating: 4.8,
    reviews: 389,
    fromPrice: 1299,
    highlights: ['On-time airport pickup & drop', 'Flight tracking for delays', 'Help with luggage included'],
    tag: 'Airport',
  },
  {
    id: 'uj5',
    title: 'Ujjain to Khatu Shyam Ji',
    location: 'Sikar, Rajasthan',
    image: '/images/package-heritage.png',
    nights: 0,
    days: 1,
    rating: 4.9,
    reviews: 174,
    fromPrice: 9999,
    highlights: ['Shyam Baba darshan', 'Experienced highway drivers', 'Rest stops on the way'],
    tag: 'Pilgrimage',
  },
  {
    id: 'uj6',
    title: 'Ujjain to Maa Baglamukhi',
    location: 'Nalkheda, Madhya Pradesh',
    image: '/images/pujan-mahakal.jpg',
    nights: 0,
    days: 1,
    rating: 4.8,
    reviews: 216,
    fromPrice: 1999,
    highlights: ['Maa Baglamukhi darshan', 'Smooth countryside route', 'Round trip friendly'],
    tag: 'Popular',
  },
  {
    id: 'uj7',
    title: 'Ujjain to Sanwariya Seth',
    location: 'Menar, Rajasthan',
    image: '/images/hero-mahakal-3.jpg',
    nights: 0,
    days: 1,
    rating: 4.9,
    reviews: 148,
    fromPrice: 6999,
    highlights: ['Sanwariya Seth darshan', 'Comfortable highway travel', 'Flexible overnight stay option'],
    tag: 'Pilgrimage',
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

export const TRUST_STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '24×7', label: 'Customer Support' },
]

export const HERO_SLIDES = [
  {
    image: '/images/hero-mahakal-1.jpg',
    alt: 'Mahakaleshwar Temple, Ujjain',
  },
  {
    image: '/images/hero-mahakal-2.jpg',
    alt: 'Shri Mahakaleshwar Temple Ujjain',
  },
  {
    image: '/images/hero-mahakal-3.jpg',
    alt: 'Mahakaleshwar Temple, Ujjain darshan',
  },
]

export const UJJAIN_SIGHTS = [
  { name: 'Mahakaleshwar Temple', detail: 'One of the 12 Jyotirlingas' },
  { name: 'Kumbh Mela Ghat', detail: 'Holy banks of river Shipra' },
  { name: 'Bade Ganeshji Ka Mandir', detail: 'Revered Ganesh shrine' },
  { name: 'Kal Bhairav Temple', detail: 'Guardian deity of Ujjain' },
  { name: 'Ram Ghat', detail: 'Sacred evening aarti' },
  { name: 'Sandipani Ashram', detail: 'Ancient guru-shishya heritage' },
]
