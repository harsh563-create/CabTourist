import type { Metadata } from "next"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FloatingActions } from "@/components/floating-actions"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Privacy Policy — CabTourist",
  description:
    "Learn how CabTourist collects, uses and protects your personal information.",
}

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: `When you use CabTourist, we may collect the following types of information:\n\n• Personal details: name, email address, phone number and location when you create an account or make a booking.\n• Payment information: UPI ID, card details or banking information processed through our secure payment partners. We do not store card or UPI credentials on our servers.\n• Trip data: pickup and drop locations, travel dates, route history and ride preferences.\n• Device information: browser type, operating system, device model and IP address for security and analytics.\n• Communications: messages sent through our contact forms, WhatsApp, phone calls or in-app chat.`,
  },
  {
    title: "2. How we use your information",
    body: `We use the collected information to:\n\n• Process and confirm your bookings.\n• Communicate trip updates, driver details and receipts.\n• Provide 24/7 customer support.\n• Improve our services, website experience and route recommendations.\n• Send promotional offers and newsletters (only with your consent).\n• Comply with legal obligations and resolve disputes.`,
  },
  {
    title: "3. Information sharing",
    body: `CabTourist does not sell or rent your personal information to third parties. We may share your data in the following limited circumstances:\n\n• With your assigned driver: your name and contact number are shared to coordinate the pickup.\n• With service partners: payment processors, analytics tools and cloud hosting providers who are contractually bound to protect your data.\n• Legal requirements: when required by law, court order or government authority.`,
  },
  {
    title: "4. Data security",
    body: `We implement industry-standard security measures including encrypted data transmission (SSL/TLS), secure server infrastructure and regular security audits. While we take every reasonable precaution, no method of transmission or storage is 100% secure. We encourage you to use strong passwords and keep your account credentials confidential.`,
  },
  {
    title: "5. Data retention",
    body: `Your account information is retained as long as your account is active. Trip history and booking records are retained for 24 months for support and analytics purposes. You may request deletion of your data by contacting us at hello@cabtourist.com. We will process deletion requests within 30 business days.`,
  },
  {
    title: "6. Cookies and tracking",
    body: `Our website uses essential cookies to maintain your session and preferences. We also use analytics tools (such as Vercel Analytics) to understand visitor behavior and improve our services. We do not use third-party advertising cookies or sell analytics data.`,
  },
  {
    title: "7. Your rights",
    body: `You have the right to:\n\n• Access the personal data we hold about you.\n• Correct inaccurate or incomplete information.\n• Request deletion of your data.\n• Opt out of promotional communications at any time.\n\nTo exercise any of these rights, contact us at hello@cabtourist.com or call +91 7828887888.`,
  },
  {
    title: "8. Children's privacy",
    body: `CabTourist services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately so we can delete it.`,
  },
  {
    title: "9. Changes to this policy",
    body: `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    title: "10. Contact us",
    body: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:\n\nEmail: hello@cabtourist.com\nPhone: +91 7828887888\nAddress: Ujjain, Madhya Pradesh, India`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="Your privacy matters to us. Here is how we handle your data."
        />

        <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
          <p className="font-sans text-sm text-muted-foreground">
            Effective date: 1 August 2025
          </p>
          <div className="mt-8 space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {s.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  )
}
