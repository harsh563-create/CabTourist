export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%236b4226' stroke-width='0.5'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%236b4226'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-handwritten text-base text-copper">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-balance font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
