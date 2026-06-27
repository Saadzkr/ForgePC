'use client'

import { SessionProvider } from 'next-auth/react'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const CursorFollower = dynamic(() => import('@/components/effects/CursorFollower'), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/effects/ParticleBackground'), { ssr: false })

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <SessionProvider>
      <LazyMotion features={domAnimation}>
        <CursorFollower />
        <ParticleBackground />
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </LazyMotion>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(0 0% 7%)',
            border: '1px solid hsl(0 0% 18%)',
            color: 'hsl(0 0% 88%)',
            fontFamily: 'var(--font-mono)',
            borderRadius: '0',
            fontSize: '0.8rem',
          },
        }}
      />
    </SessionProvider>
  )
}
