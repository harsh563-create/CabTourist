import { MessageCircleQuestion } from "lucide-react"

import { FAQS } from "@/lib/cabtourist-data"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <span className="flex size-11 items-center justify-center rounded-lg wood-block">
            <MessageCircleQuestion className="size-5" />
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            Everything you need to know about booking, pricing, and support. Can
            &apos;t find your answer? Our team is available 24/7 on
            1800-000-000.
          </p>
        </div>

        <Accordion className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={`faq-${i}`}
              className="border-border/60"
            >
              <AccordionTrigger className="font-sans text-base font-semibold text-foreground hover:text-copper">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-sans leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
