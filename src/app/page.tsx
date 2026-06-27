'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Cpu, CheckCircle, Share2, ArrowUpRight, HardDrive, Monitor,
  MemoryStick, Fan, Box, Power, Wifi, Disc, Activity, X,
  Gauge, Zap, DollarSign, Plus, Minus
} from 'lucide-react'
import { GLSLHills } from '@/components/ui/glsl-hills'
import TiltCard from '@/components/effects/TiltCard'

const categories = [
  { id: 'CPU', label: 'CPUs', icon: Cpu, count: 15, color: 'from-[#444] to-[#222]' },
  { id: 'GPU', label: 'Graphics', icon: HardDrive, count: 16, color: 'from-[#3a3a3a] to-[#1a1a1a]' },
  { id: 'MOTHERBOARD', label: 'Motherboards', icon: Monitor, count: 19, color: 'from-[#404040] to-[#202020]' },
  { id: 'RAM', label: 'Memory', icon: MemoryStick, count: 10, color: 'from-[#383838] to-[#181818]' },
  { id: 'STORAGE', label: 'Storage', icon: Disc, count: 10, color: 'from-[#3c3c3c] to-[#1c1c1c]' },
  { id: 'PSU', label: 'Power Supplies', icon: Power, count: 10, color: 'from-[#424242] to-[#222222]' },
  { id: 'CASE', label: 'Cases', icon: Box, count: 12, color: 'from-[#3e3e3e] to-[#1e1e1e]' },
  { id: 'COOLING', label: 'Cooling', icon: Fan, count: 14, color: 'from-[#363636] to-[#161616]' },
  { id: 'OS', label: 'Operating Systems', icon: Wifi, count: 2, color: 'from-[#444] to-[#242424]' },
  { id: 'PERIPHERAL', label: 'Peripherals', icon: Activity, count: 8, color: 'from-[#3a3a3a] to-[#1a1a1a]' },
]

const hardwareTicker = [
  'AMD Ryzen 7 7800X3D', 'NVIDIA RTX 4090', '32GB DDR5-6000', '2TB NVMe PCIe 4.0',
  'ASUS ROG Crosshair X670E', 'Corsair HX1200i', 'NZXT Kraken Elite 360', 'Lian Li O11 Dynamic EVO',
  'Samsung 990 Pro', 'G.Skill Trident Z5', 'Noctua NH-D15', 'Fractal Design North',
  'AMD Ryzen 9 7950X3D', 'Intel Core i9-14900KS', 'RTX 4080 Super', 'RX 7900 XTX',
]

function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <button onClick={() => setOpen(!open)} className={`burger-btn md:hidden ${open ? 'active' : ''}`}>
        <span className="burger-line" />
        <span className="burger-line" />
        <span className="burger-line" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="burger-overlay md:hidden" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: 280 }} animate={{ x: 0 }} exit={{ x: 280 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="burger-menu md:hidden">
              <div className="flex items-center justify-between mb-8">
                <span className="logo-text text-base">Forge<span className="logo-dot inline-block mx-0.5" />PC</span>
                <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Link href="/" className="text-[0.65rem]">Home</Link>
              <Link href="/builder" className="text-[0.65rem]">Builder</Link>
              <Link href="/dashboard" className="text-[0.65rem]">Dashboard</Link>
              <Link href="/profile" className="text-[0.65rem]">Profile</Link>
              <Link href="/community" className="text-[0.65rem]">Community</Link>
              <Link href="/advisor" className="text-[0.65rem]">AI Advisor</Link>
              <div className="mt-auto pt-8 border-t border-[rgba(255,255,255,0.04)]">
                <Link href="/login" className="text-[0.6rem] text-muted-foreground">Sign In</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })
  const displayValue = useTransform(springValue, (v) => `${Math.round(v)}${suffix}`)

  if (isInView) springValue.set(value)

  return <span ref={ref}>{isInView ? <motion.span>{displayValue}</motion.span> : '0'}</span>
}

function ParallaxLayer({ children, speed = 0.3, className = '' }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100])
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>
}

function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <GLSLHills />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/70 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-grid opacity-[0.4]" />
        <div className="absolute inset-0 bg-noise" />
      </div>

      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-8 py-6">
          <Link href="/" className="logo-text font-display text-lg sm:text-xl tracking-tight select-none">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {['Builder', 'Dashboard', 'Community', 'Advisor'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="nav-link text-[0.6rem] sm:text-[0.7rem]">
                {item}
              </Link>
            ))}
            <Link href="/login" className="nav-link text-[0.6rem] sm:text-[0.7rem]">Sign In</Link>
          </div>
          <BurgerMenu />
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-white/[0.03] to-transparent" />
        </motion.div>

        <div className="text-center max-w-5xl mx-auto relative px-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[0.5rem] sm:text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase mb-6 sm:mb-8"
          >
            Custom PC Configurator
          </motion.p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-[0.9] tracking-tight mb-6 sm:mb-8 select-none">
            <motion.span
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="block text-white"
            >
              Forge
            </motion.span>
            <motion.span
              initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="block text-highlight-strong font-script"
            >
              Your Machine
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xs sm:text-sm md:text-base text-muted-foreground/60 max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed tracking-wide px-2"
          >
            Select from 126 premium components. Real-time compatibility checking.
            No guesswork. Just the perfect build.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <Link href="/builder"
              className="glass-btn inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 text-[0.55rem] sm:text-xs tracking-[0.15em] uppercase text-foreground rounded-xl"
            >
              <span className="relative z-10">Start Building</span>
              <ArrowUpRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
            <Link href="/dashboard"
              className="glass-btn inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-[0.5rem] sm:text-xs tracking-[0.15em] uppercase text-muted-foreground/70 rounded-xl"
            >
              View Builds
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 sm:py-4 border-t border-border bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 sm:gap-8 whitespace-nowrap"
          >
            {[...hardwareTicker, ...hardwareTicker].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-2 sm:gap-3 text-[0.5rem] sm:text-[0.6rem] tracking-[0.15em] text-muted-foreground/40 uppercase">
                <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function BentoHowItWorks() {
  return (
    <ParallaxLayer speed={0.15}>
      <section className="bg-black py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-10 sm:mb-16"
          >
            <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-3 sm:mb-4">Process</p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1]">
              Three steps to<br />
              <span className="text-muted-foreground">your perfect build</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="md:col-span-2 relative group cursor-default"
            >
              <TiltCard intensity={4}>
                <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-12 h-full">
                  <div className="flex items-start justify-between mb-6 sm:mb-8">
                    <span className="text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">Step 01</span>
                    <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-3 sm:mb-4">Choose Components</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg">
                    Browse our curated catalog of 126 premium components across 10 categories.
                    CPUs, GPUs, motherboards, memory, storage — everything you need.
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
                      {['CPU', 'GPU', 'RAM', 'STORAGE'].map((tag) => (
                          <span key={tag} className="glass-sm text-[0.45rem] sm:text-[0.5rem] tracking-[0.15em] text-muted-foreground px-2 sm:px-3 py-1 sm:py-1.5 uppercase rounded">
                            {tag}
                          </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            <div className="md:col-span-1 flex flex-col gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative group cursor-default flex-1"
              >
                <TiltCard intensity={3}>
                  <div className="glass-panel rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <span className="text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">Step 02</span>
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-2 sm:mb-3">Check Compatibility</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">Real-time validation across socket type, form factor, power draw, and clearance.</p>
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative group cursor-default flex-1"
              >
                <TiltCard intensity={3}>
                  <div className="glass-panel rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <span className="text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">Step 03</span>
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-2 sm:mb-3">Save & Share</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">Save your configuration, share with the community, or export a complete parts list.</p>
                  </div>
                </TiltCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </ParallaxLayer>
  )
}

function ComponentGrid() {
  return (
    <ParallaxLayer speed={-0.1}>
      <section className="bg-black py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-10 sm:mb-16"
          >
            <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-3 sm:mb-4">Catalog</p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1]">126 components.<br /><span className="text-muted-foreground">10 categories. Endless possibilities.</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="group cursor-default"
                >
                  <TiltCard intensity={5}>
                    <div className="glass-panel rounded-xl p-4 sm:p-5 h-full transition-all duration-300 group-hover:border-[rgba(255,255,255,0.2)]">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground mb-3 sm:mb-4 group-hover:text-foreground transition-colors duration-300" />
                      <p className="text-[0.6rem] sm:text-xs text-muted-foreground/60 mb-0.5 sm:mb-1 transition-colors duration-300 group-hover:text-muted-foreground/80">{cat.label}</p>
                      <p className="text-[0.45rem] sm:text-[0.55rem] text-muted-foreground/40 transition-colors duration-300">{cat.count} options</p>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </ParallaxLayer>
  )
}

function QuickConfig() {
  const tiers = {
    CPU: [
      { label: 'Ryzen 5', price: 200, icon: Cpu },
      { label: 'Ryzen 7', price: 350, icon: Cpu },
      { label: 'Ryzen 9', price: 550, icon: Cpu },
    ],
    GPU: [
      { label: 'RTX 4060', price: 300, icon: Monitor },
      { label: 'RTX 4070', price: 550, icon: Monitor },
      { label: 'RTX 4090', price: 1600, icon: Monitor },
    ],
    RAM: [
      { label: '16 GB', price: 80, icon: MemoryStick },
      { label: '32 GB', price: 150, icon: MemoryStick },
      { label: '64 GB', price: 280, icon: MemoryStick },
    ],
    Storage: [
      { label: '1 TB SSD', price: 100, icon: Disc },
      { label: '2 TB SSD', price: 180, icon: Disc },
      { label: '4 TB SSD', price: 350, icon: Disc },
    ],
  }

  const [selected, setSelected] = useState<Record<string, number>>({
    CPU: 0, GPU: 0, RAM: 0, Storage: 0,
  })

  const total = Object.entries(tiers).reduce((sum, [key, opts]) => sum + opts[selected[key]].price, 0)

  return (
    <ParallaxLayer speed={0.05}>
      <section className="bg-black py-12 sm:py-20 px-4 sm:px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-8 sm:mb-12"
          >
            <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-3 sm:mb-4">Quick Config</p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1]">
              Estimate your build.<br /><span className="text-muted-foreground">Adjust tiers in real time.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {Object.entries(tiers).map(([key, opts]) => {
              const Icon = opts[0].icon
              return (
                <motion.div key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: '-50px' }}
                >
                  <TiltCard intensity={4}>
                    <div className="glass-panel rounded-xl p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                        <span className="text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] text-muted-foreground uppercase">{key}</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {opts.map((opt, i) => (
                          <button key={opt.label} onClick={() => setSelected(prev => ({ ...prev, [key]: i }))}
                            className={`text-left px-3 py-2 rounded-lg text-[0.5rem] sm:text-[0.55rem] tracking-wide transition-all duration-200 ${
                              selected[key] === i
                                ? 'bg-white/10 border border-white/20 text-foreground'
                                : 'bg-white/[0.02] border border-transparent text-muted-foreground hover:bg-white/[0.04] hover:text-muted-foreground/60'
                            }`}
                          >
                            <span className="flex items-center justify-between">
                              <span>{opt.label}</span>
                              <span className="text-[0.45rem] opacity-60">+${opt.price}</span>
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel rounded-xl p-4 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <div>
                <p className="text-[0.45rem] sm:text-[0.5rem] tracking-[0.2em] text-muted-foreground uppercase">Estimated Total</p>
                <p className="font-display text-2xl sm:text-3xl text-foreground tabular-nums">${total.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[0.45rem] sm:text-[0.5rem] text-muted-foreground">+ case, PSU, cooling &amp; OS</span>
              <Link href="/builder"
                className="glass-btn-primary text-[0.5rem] sm:text-[0.55rem] px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3" />
                Full Builder
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </ParallaxLayer>
  )
}

function StatsSection() {
  const stats = [
    { value: 126, suffix: '+', label: 'Components' },
    { value: 15, suffix: '', label: 'Badges & Achievements' },
    { value: 10, suffix: '', label: 'Compatibility Checks' },
    { value: 99, suffix: '%', label: 'Accuracy Rate' },
  ]

  return (
    <ParallaxLayer speed={0.1}>
      <section className="bg-black py-12 sm:py-20 px-4 sm:px-6 border-t border-border relative overflow-hidden">
        <motion.div className="absolute inset-0 bg-grid opacity-[0.15]"
          animate={{ opacity: [0.15, 0.08, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-10 sm:mb-16 text-center"
          >
            By the Numbers
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="text-center group"
              >
                <motion.p className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground mb-1 sm:mb-2 tabular-nums"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </motion.p>
                <p className="text-[0.55rem] sm:text-xs text-muted-foreground tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </ParallaxLayer>
  )
}

function CTASection() {
  return (
    <section className="bg-black py-20 sm:py-28 px-4 sm:px-6 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      <div className="absolute inset-0 bg-noise" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-white/[0.02] to-transparent pointer-events-none"
      />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-4 sm:mb-6">Get Started</p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl text-foreground mb-4 sm:mb-6 leading-[1.1]">
            Ready to build<br /><span className="text-muted-foreground">something extraordinary?</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
            Open the configurator, select your components, and see real-time compatibility.
            Your dream PC is a few clicks away.
          </p>
          <Link href="/builder"
            className="glass-btn inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 text-[0.55rem] sm:text-xs tracking-[0.15em] uppercase text-foreground rounded-xl"
          >
            <span className="relative z-10">Start Building</span>
            <ArrowUpRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="bg-black text-foreground overflow-x-hidden">
      <HeroSection />
      <BentoHowItWorks />
      <ComponentGrid />
      <QuickConfig />
      <StatsSection />
      <CTASection />
      <footer className="border-t border-border py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-3">
            <span className="logo-text text-base">Forge<span className="logo-dot inline-block mx-0.5" />PC</span>
            <span className="text-[0.4rem] sm:text-[0.45rem] text-muted-foreground/30 tracking-widest uppercase hidden sm:inline">Custom Computer Builder</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/builder" className="text-[0.45rem] sm:text-[0.5rem] text-muted-foreground/40 tracking-wider uppercase hover:text-muted-foreground/60 transition-colors">Builder</Link>
            <Link href="/dashboard" className="text-[0.45rem] sm:text-[0.5rem] text-muted-foreground/40 tracking-wider uppercase hover:text-muted-foreground/60 transition-colors">Dashboard</Link>
            <Link href="/community" className="text-[0.45rem] sm:text-[0.5rem] text-muted-foreground/40 tracking-wider uppercase hover:text-muted-foreground/60 transition-colors">Community</Link>
            <Link href="/login" className="text-[0.45rem] sm:text-[0.5rem] text-muted-foreground/40 tracking-wider uppercase hover:text-muted-foreground/60 transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
