'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Cpu, Send, Bot, User, X, ArrowUpRight } from 'lucide-react'
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

const suggestions = [
  'Recommend a GPU for 4K gaming',
  'Best CPU for video editing under $500',
  'Compatible motherboard for Ryzen 7800X3D',
  'Optimal RAM speed for gaming',
  'What PSU wattage do I need for an RTX 4090?',
  'Best AIO cooler for i9-14900K',
]

export default function AdvisorPage() {
  const { playClick, playSelect } = useSound()
  const { locale } = useLocale()
  const _ = (k: string) => t(k, locale)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: _('advisor.welcome') },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return
    playClick()
    const userMsg = { role: 'user' as const, content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const botIndex = messages.length + 1
    setMessages((prev) => [...prev, { role: 'bot', content: '' }])

    try {
      const apiMessages = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }))
        setMessages((prev) => {
          const updated = [...prev]
          updated[botIndex] = { role: 'bot', content: `Error: ${err.error || 'Something went wrong'}` }
          return updated
        })
        setLoading(false)
        return
      }

      const reader = res.body?.getReader()
      if (!reader) {
        setMessages((prev) => {
          const updated = [...prev]
          updated[botIndex] = { role: 'bot', content: 'Error: No response stream' }
          return updated
        })
        setLoading(false)
        return
      }

      const decoder = new TextDecoder()
      let fullContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        fullContent += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[botIndex] = { role: 'bot', content: fullContent }
          return updated
        })
      }
    } catch (e) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[botIndex] = { role: 'bot', content: 'Network error — check your connection and try again.' }
        return updated
      })
    }
    setLoading(false)
  }

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

      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 glass-panel rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#888]" />
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl text-[#eee]">{_('advisor.title')}</h1>
              <p className="text-[0.5rem] sm:text-[0.55rem] text-[#555]">{_('advisor.subtitle')}</p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-3 sm:p-4 mb-3 sm:mb-4" style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}>
            <div className="space-y-3 sm:space-y-4">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 sm:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-[#222]' : 'glass-panel'
                  }`}>
                    {msg.role === 'user' ? <User className="w-3 h-3 text-[#888]" /> : <Bot className="w-3 h-3 text-[#888]" />}
                  </div>
                  <div className={`max-w-[80%] rounded-lg p-2.5 sm:p-3 ${
                    msg.role === 'user' ? 'glass-panel' : 'bg-[#0a0a0a] border border-[#1a1a1a]'
                  }`}>
                    <p className="text-[0.55rem] sm:text-[0.6rem] text-[#ccc] whitespace-pre-line leading-relaxed">
                      {msg.content || (i === messages.length - 1 && loading ? (
                        <span className="inline-flex gap-1">
                          <motion.span className="w-1.5 h-1.5 bg-[#444] rounded-full inline-block" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0, repeat: Infinity }} />
                          <motion.span className="w-1.5 h-1.5 bg-[#444] rounded-full inline-block" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0.15, repeat: Infinity }} />
                          <motion.span className="w-1.5 h-1.5 bg-[#444] rounded-full inline-block" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: 0.3, repeat: Infinity }} />
                        </span>
                      ) : null)}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => { playSelect(); handleSend(s) }}
                className="glass-btn-sm text-[0.4rem] sm:text-[0.45rem] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(input) }}
              className="input flex-1 text-xs sm:text-sm"
              placeholder={_('advisor.placeholder')}
            />
            <button onClick={() => handleSend(input)} disabled={loading || !input.trim()}
              className="glass-btn px-3 sm:px-4 rounded-lg text-[0.5rem] text-[#eee] uppercase"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
