import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lora, Caveat } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CabTourist — Vintage Cabs & Guided Tour Packages',
  description:
    'Book reliable outstation cabs, airport transfers, and curated tour packages with verified drivers, transparent pricing, and 24/7 support. Travel smarter with CabTourist.',
  keywords: [
    'cab booking',
    'taxi service',
    'outstation cabs',
    'airport transfer',
    'tour packages',
    'road trips',
    'CabTourist',
  ],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5eed6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e170e' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${caveat.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
