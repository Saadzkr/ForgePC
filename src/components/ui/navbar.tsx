'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react'
import { useSound } from '@/components/providers/sound-provider'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { useLocale } from '@/components/providers/locale-provider'
import { t } from '@/lib/i18n'

const navItems = [
  { href: '/builder', label: 'Builder' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/community', label: 'Community' },
  { href: '/advisor', label: 'AI Advisor' },
]

function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { playClick, playToggle } = useSound()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <button
        onClick={() => { playToggle(); setOpen(!open) }}
        className={`burger-btn md:hidden ${open ? 'active' : ''}`}
      >
        <span className="burger-line" />
        <span className="burger-line" />
        <span className="burger-line" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="burger-overlay md:hidden" onClick={() => { playClick(); setOpen(false) }} />
            <motion.div initial={{ x: 280 }} animate={{ x: 0 }} exit={{ x: 280 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="burger-menu md:hidden">
              <div className="flex items-center justify-between mb-8">
                <span className="logo-text text-base">Forge<span className="logo-dot inline-block mx-0.5" />PC</span>
                <button onClick={() => { playClick(); setOpen(false) }} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="block py-2.5 text-[0.65rem]">{item.label}</Link>
              ))}
              <div className="mt-auto pt-8 border-t border-[rgba(255,255,255,0.04)]">
                <Link href="/login" className="block py-2.5 text-[0.6rem] text-muted-foreground">Sign In</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function SoundToggle() {
  const { muted, toggleMute, playClick } = useSound()
  return (
    <button
      onClick={() => { playClick(); toggleMute() }}
      className="text-muted-foreground hover:text-foreground transition-colors duration-300 p-1.5"
      aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
    </button>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { playHover } = useSound()
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>()
  const playHoverSafe = () => {
    if (hoverTimer.current) return
    hoverTimer.current = setTimeout(() => { hoverTimer.current = undefined }, 80)
    playHover()
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 h-14 sm:h-16">
        <Link href="/" className="logo-text font-display text-lg sm:text-xl tracking-tight select-none flex items-center gap-1.5">
          Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={playHoverSafe}
                className={`relative px-3 py-1.5 text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-300 ${
                  isActive
                    ? 'text-accent-gold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 border border-accent-gold/30 rounded"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <SoundToggle />
          <Link
            href="/login"
            onMouseEnter={playHoverSafe}
            className="text-[0.6rem] tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 px-2 py-1.5"
          >
            Sign In
          </Link>
          <Link
            href="/builder"
            onMouseEnter={playHoverSafe}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.55rem] tracking-[0.15em] uppercase text-black bg-accent-gold hover:bg-[#C9A84C] transition-all duration-300"
          >
            Build
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LocaleSwitcher />
          <SoundToggle />
          <BurgerMenu />
        </div>
      </div>
    </header>
  )
}
