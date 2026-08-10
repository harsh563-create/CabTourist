"use client"

import { Phone } from "lucide-react"

import { CONTACTS } from "@/lib/site-config"
import { WhatsAppIcon } from "@/components/whatsapp-icon"

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={CONTACTS.whatsappLink(
          "Hi CabTourist, I need help with a cab booking.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      >
        <WhatsAppIcon className="size-7" />
      </a>

      {/* Call */}
      <a
        href={CONTACTS.phone1Href}
        aria-label="Call us"
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      >
        <Phone className="size-6" />
      </a>
    </div>
  )
}
