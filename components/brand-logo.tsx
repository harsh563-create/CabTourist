import { cn } from "@/lib/utils"

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
        <path d="M3 14a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-1" />
        <path d="M6 18H4a1 1 0 0 1-1-1v-3" />
        <circle cx="7.5" cy="17.5" r="1.4" />
        <circle cx="16.5" cy="17.5" r="1.4" />
      </svg>
    </span>
  )
}
