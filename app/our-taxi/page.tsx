import type { Metadata } from "next"

import { OurTaxiContent } from "@/components/our-taxi-content"

export const metadata: Metadata = {
  title: "Our Taxi — Fleet & Cab Types | CabTourist",
  description:
    "Explore our fleet — Hatchback, Sedan, Ertiga, SUV and Innova Crysta. Transparent per-km pricing, AC comfort and verified drivers for every journey.",
}

export default function OurTaxiPage() {
  return <OurTaxiContent />
}
