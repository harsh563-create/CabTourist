import { Quote, Star, Stamp } from "lucide-react"

import { cn } from "@/lib/utils"
import { REVIEWS } from "@/lib/cabtourist-data"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

const CARD_ROTATIONS = ["rotate-[0.5deg]", "rotate-[-0.4deg]", "rotate-[0.8deg]"]

export function Reviews({ heading = true }: { heading?: boolean }) {
  return (
    <section id="reviews" className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {heading ? (
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-handwritten text-base text-copper">
              Traveler stories
            </span>
            <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Rated 4.9 by travelers across India
            </h2>
          </div>
        ) : null}

        <ul className={cn("grid gap-6 md:grid-cols-3", heading ? "mt-10" : "mt-0")}>
          {REVIEWS.map((r, i) => (
            <li
              key={r.id}
              className={cn(
                "relative flex flex-col rounded-sm border border-border bg-card p-6",
                "shadow-[0_2px_8px_rgba(58,46,31,0.06),0_1px_3px_rgba(58,46,31,0.04)]",
                CARD_ROTATIONS[i % CARD_ROTATIONS.length],
              )}
            >
              {/* Vintage stamp decoration */}
              <div className="absolute top-4 right-4 opacity-10">
                <Stamp className="size-10 text-copper" />
              </div>

              {/* Postcard border accent */}
              <div className="mb-3 border-b-2 border-dashed border-border/60 pb-3">
                <Quote className="size-6 text-copper/40" />
                <div className="mt-2 flex items-center gap-0.5 text-cta">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={
                        j < r.rating ? "size-4 fill-current" : "size-4 opacity-25"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="flex-1 font-sans text-sm leading-relaxed text-foreground">
                &ldquo;{r.quote}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <Avatar className="size-10 border-2 border-border/60">
                  <AvatarFallback className="bg-copper/10 font-display text-sm font-semibold text-copper">
                    {r.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">
                    {r.name}
                  </p>
                  <p className="font-handwritten text-sm text-muted-foreground">
                    {r.location} · {r.trip}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
