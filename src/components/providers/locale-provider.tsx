'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { Locale } from '@/lib/i18n'

type LocaleContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  rtl: boolean
}

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
  rtl: false,
})

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('forge-locale') as Locale | null
    if (stored === 'ar' || stored === 'en') {
      setLocaleState(stored)
    }
    setReady(true)
  }, [])

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('forge-locale', l)
  }, [])

  const rtl = locale === 'ar'

  useEffect(() => {
    if (!ready) return
    document.documentElement.dir = rtl ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('rtl', rtl)
  }, [rtl, ready])

  return (
    <LocaleContext.Provider value={{ locale, setLocale, rtl }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}
