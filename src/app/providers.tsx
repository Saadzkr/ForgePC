'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { SoundProvider } from '@/components/providers/sound-provider'
import { LocaleProvider } from '@/components/providers/locale-provider'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SoundProvider>
        <LocaleProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'hsl(0 0% 7%)',
                border: '1px solid hsl(0 0% 18%)',
                color: 'hsl(0 0% 88%)',
                fontSize: '0.8rem',
              },
            }}
          />
        </LocaleProvider>
      </SoundProvider>
    </SessionProvider>
  )
}
