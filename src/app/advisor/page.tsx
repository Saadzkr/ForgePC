'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Cpu, Send, Bot, User, X, ArrowUpRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSound } from '@/components/providers/sound-provider'

function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { playClick, playToggle } = useSound()
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
              <Link href="/">Home</Link>
              <Link href="/builder">Builder</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/profile">Profile</Link>
              <Link href="/community">Community</Link>
              <Link href="/advisor">AI Advisor</Link>
              <div className="mt-auto pt-8 border-t border-[rgba(255,255,255,0.04)]"><Link href="/login" className="text-[0.6rem] text-[#555]">Sign In</Link></div>
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

const responses: Record<string, string[]> = {
  'recommend a gpu for 4k gaming': [
    'For 4K gaming, I recommend:',
    '• NVIDIA RTX 4090 (24GB) — Best-in-class 4K performance, ~90-120 FPS in most titles',
    '• AMD RX 7900 XTX (24GB) — Excellent value, ~80-100 FPS in 4K',
    '• NVIDIA RTX 4080 Super (16GB) — Great 4K option, ~70-90 FPS',
    '',
    'Pair with a high-refresh 4K display and at least 850W PSU.',
  ],
  'best cpu for video editing under $500': [
    'Top CPUs for video editing under $500:',
    '• AMD Ryzen 9 7900X (12C/24T) — ~$420, excellent multi-core for rendering',
    '• Intel Core i7-14700K (20C/28T) — ~$390, great QuickSync for h.264/h.265',
    '• AMD Ryzen 7 7800X3D (8C/16T) — ~$450, not ideal for editing (gaming optimized)',
    '',
    'I recommend the Ryzen 9 7900X for raw rendering performance.',
  ],
  default: [
    'I can help with component recommendations, compatibility questions, and build optimization.',
    '',
    'Try asking about:',
    '• GPU recommendations for specific resolutions',
    '• CPU choices for your budget',
    '• Compatible motherboard/cooler combinations',
    '• Power supply requirements',
    '• RAM speed and capacity recommendations',
  ],
}

export default function AdvisorPage() {
  const { playClick, playSelect } = useSound()
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
    { role: 'bot', content: 'Hello! I\'m your PC build advisor. Ask me about components, compatibility, or recommendations.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return
    playClick()
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setInput('')
    setLoading(true)

    const lower = text.toLowerCase()
    let reply: string[]
    if (lower.includes('gpu') && lower.includes('4k')) reply = responses['recommend a gpu for 4k gaming']
    else if (lower.includes('cpu') && lower.includes('video editing')) reply = responses['best cpu for video editing under $500']
    else if (lower.includes('ryzen') || lower.includes('motherboard')) reply = ['For AMD Ryzen 7000 series CPUs, you need an AM5 motherboard like:', '', '• X670E — Premium (PCIe 5.0, extensive I/O)', '• X670 — High-end (PCIe 5.0, good I/O)', '• B650E — Mid-range (PCIe 5.0 GPU)', '• B650 — Value (PCIe 4.0)', '', 'All support DDR5 RAM.']
    else if (lower.includes('ram')) reply = ['For optimal gaming performance:', '', '• DDR5-6000 CL30 is the sweet spot for Ryzen 7000', '• DDR5-6400+ for Intel 14th gen', '• 32GB (2x16GB) is the current standard for gaming', '• 64GB+ for productivity workloads', '', 'Dual-channel configuration is essential.']
    else if (lower.includes('psu') || lower.includes('power')) reply = ['Power supply recommendations:', '', '• RTX 4090 system: 1000W-1200W', '• RTX 4080 Super system: 850W-1000W', '• RTX 4070 Ti Super system: 750W-850W', '• RX 7900 XTX system: 900W-1000W', '', 'Always choose 80+ Gold or better for efficiency.']
    else if (lower.includes('cooler') || lower.includes('aio')) reply = ['Top AIO coolers for i9-14900K:', '', '• Arctic Liquid Freezer III 360 — Best value/performance', '• NZXT Kraken Elite 360 — Premium with LCD display', '• Corsair H150i Elite — Reliable and quiet', '• Lian Li Galahad II — Great performance', '', '360mm AIO recommended for high-end CPUs.']
    else reply = responses.default

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'bot', content: reply.join('\n') }])
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-center justify-between h-14">
          <Link href="/" className="logo-text font-display text-base sm:text-lg tracking-tight select-none">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/builder" className="glass-btn-sm rounded-md hidden sm:inline-flex">Builder</Link>
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
              <h1 className="font-display text-xl sm:text-2xl text-[#eee]">AI Component Advisor</h1>
              <p className="text-[0.5rem] sm:text-[0.55rem] text-[#555]">Get intelligent recommendations for your build</p>
            </div>
          </div>

          {/* Chat area */}
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
                    <p className="text-[0.55rem] sm:text-[0.6rem] text-[#ccc] whitespace-pre-line leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full glass-panel flex items-center justify-center">
                    <Bot className="w-3 h-3 text-[#888]" />
                  </div>
                  <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-3">
                    <div className="flex gap-1">
                      {[1,2,3].map((n) => (
                        <motion.div key={n} className="w-1.5 h-1.5 bg-[#444] rounded-full"
                          animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: n * 0.15, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => { playSelect(); handleSend(s) }}
                className="glass-btn-sm text-[0.4rem] sm:text-[0.45rem] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(input) }}
              className="input flex-1 text-xs sm:text-sm"
              placeholder="Ask about components, compatibility, or pricing..."
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
