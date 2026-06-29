'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cpu, Eye, DollarSign, Zap, ArrowUpRight, X } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useSound } from '@/components/providers/sound-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { t } from '@/lib/i18n'

function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { playClick, playToggle } = useSound()
  const { locale } = useLocale()
  const _ = (k: string) => t(k, locale)
  useEffect(() => { setOpen(false) }, [pathname])
  return (
    <>
      <button onClick={() => { playToggle(); setOpen(!open) }} className={`burger-btn md:hidden ${open ? 'active' : ''}`}>
        <span className="burger-line" /><span className="burger-line" /><span className="burger-line" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="burger-overlay md:hidden" onClick={() => { playClick(); setOpen(false) }} />
            <motion.div initial={{x:280}} animate={{x:0}} exit={{x:280}} transition={{type:'spring',damping:25,stiffness:200}} className="burger-menu md:hidden">
              <div className="flex items-center justify-between mb-8">
                <span className="logo-text text-base">Forge<span className="logo-dot inline-block mx-0.5" />PC</span>
                <button onClick={() => { playClick(); setOpen(false) }} className="text-[#555] hover:text-[#eee] transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <Link href="/">{_('nav.home')}</Link>
              <Link href="/builder">{_('nav.builder')}</Link>
              <Link href="/dashboard">{_('nav.dashboard')}</Link>
              <Link href="/profile">{_('nav.profile')}</Link>
              <Link href="/community">{_('nav.community')}</Link>
              <Link href="/advisor">{_('nav.advisor')}</Link>
              <div className="mt-auto pt-8 border-t border-[rgba(255,255,255,0.04)]"><Link href="/login" className="text-[0.6rem] text-[#555]">{_('nav.signin')}</Link></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

type CommunityBuild = {
  id: string; name: string; totalPrice: number; totalWattage: number
  estimatedFps: { score?: number } | null; createdAt: string; user: { name: string }
}

export default function CommunityPage() {
  const [builds, setBuilds] = useState<CommunityBuild[]>([])
  const [loading, setLoading] = useState(true)
  const { locale } = useLocale()
  const _ = (k: string) => t(k, locale)

  useEffect(() => {
    fetch('/api/builds/shared')
      .then((r) => r.ok ? r.json() : [])
      .then((data) => { setBuilds(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-center justify-between h-14">
          <Link href="/" className="logo-text font-display text-base sm:text-lg tracking-tight select-none">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/builder" className="glass-btn-sm rounded-md hidden sm:inline-flex">{_('nav.builder')}</Link>
            <BurgerMenu />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8 sm:mb-10">
            <p className="text-[0.5rem] sm:text-[0.6rem] tracking-[0.25em] text-[#555] uppercase mb-2">Community</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-[#eee] leading-[1.1]">
              {_('community.title')}
            </h1>
            <p className="text-xs sm:text-sm text-[#555] mt-2 sm:mt-3 max-w-lg">
              {_('community.desc')}
            </p>
          </div>

          {loading ? (
            <div className="flex gap-1.5 py-24 justify-center">
              {[1,2,3].map((n) => (
                <motion.div key={n} className="w-2 h-2 bg-[#444]"
                  animate={{opacity:[0.2,1,0.2]}} transition={{duration:1,delay:n*0.2,repeat:Infinity}} />
              ))}
            </div>
          ) : builds.length === 0 ? (
            <div className="text-center py-24">
              <Cpu className="w-10 h-10 text-[#333] mx-auto mb-4" />
              <p className="text-sm text-[#555] mb-2">{_('community.none')}</p>
              <p className="text-[0.55rem] text-[#444] mb-6">{_('community.bethefirst')}</p>
              <Link href="/builder" className="glass-btn inline-flex items-center gap-2 px-5 py-2.5 text-[0.55rem] text-[#eee] uppercase rounded-lg">
                {_('community.create')} <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {builds.map((build, i) => (
                <motion.div key={build.id}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="glass-panel rounded-xl p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-sm sm:text-base text-[#eee] truncate">{build.name}</h3>
                    <span className="text-[0.45rem] text-[#555] uppercase tracking-wider flex-shrink-0 ml-2">{build.user?.name || _('community.anonymous')}</span>
                  </div>
                  <div className="flex gap-3 sm:gap-4 text-[0.5rem] sm:text-[0.55rem] text-[#555] mb-3">
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> ${build.totalPrice.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {build.totalWattage}W</span>
                    {build.estimatedFps?.score && <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> Score: {build.estimatedFps.score}</span>}
                  </div>
                  <Link href={`/builder?build=${build.id}`} className="glass-btn-sm text-[0.5rem] sm:text-[0.55rem] w-full justify-center rounded-lg">{_('community.view')}</Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
