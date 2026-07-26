import { Quote, Star } from "lucide-react"

import { REVIEWS } from "@/lib/cabtourist-data"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

export function Reviews() {
  return (
    <section id="reviews" className="bg-muted/40 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold text-primary">
            Traveler stories
          </span>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Rated 4.9 by travelers across India
          </h2>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <li
              key={r.id}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="size-7 text-primary/30" />
              <div className="mt-3 flex items-center gap-0.5 text-cta">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < r.rating ? "size-4 fill-current" : "size-4 opacity-25"
                    }
                  />
                ))}
              </div>
              <p className="mt-3 flex-1 text-pretty leading-relaxed text-foreground">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {r.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {r.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
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
