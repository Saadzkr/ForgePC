'use client'

import { useLocale } from '@/components/providers/locale-provider'
import { Languages } from 'lucide-react'

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <button
      onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
      className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-1.5 flex items-center gap-1 text-[0.55rem] tracking-wider uppercase"
      aria-label="Switch language"
    >
      <Languages className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">{locale === 'en' ? 'AR' : 'EN'}</span>
    </button>
  )
}
