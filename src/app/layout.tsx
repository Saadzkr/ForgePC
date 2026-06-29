import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono, Lavishly_Yours } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { TransitionProvider } from '@/components/providers/transition-provider'
import Navbar from '@/components/ui/navbar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

const lavishlyYours = Lavishly_Yours({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Forge PC — Custom Computer Builder',
    template: '%s — Forge PC',
  },
  description: 'Design, configure, and build your dream custom PC. Real-time compatibility checking across 126 premium components.',
  keywords: ['PC builder', 'custom PC', 'computer configurator', 'build PC', 'gaming PC'],
  authors: [{ name: 'Forge PC' }],
  openGraph: {
    title: 'Forge PC — Custom Computer Builder',
    description: 'Design, configure, and build your dream custom PC.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Forge PC',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forge PC — Custom Computer Builder',
    description: 'Design, configure, and build your dream custom PC.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} ${lavishlyYours.variable}`}>
      <head>
        <link rel="preconnect" href="https://my.spline.design" />
      </head>
      <body className="bg-black text-[#eee] antialiased">
        <Providers>
          <TransitionProvider>
            <Navbar />
            <div className="pt-14 sm:pt-16">{children}</div>
          </TransitionProvider>
        </Providers>
      </body>
    </html>
  )
}