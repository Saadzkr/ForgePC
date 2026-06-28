'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  Cpu, CheckCircle, Share2, ArrowUpRight, HardDrive, Monitor,
  MemoryStick, Fan, Box, Power, Wifi, Disc, Activity,
  Zap, DollarSign
} from 'lucide-react'
import { GLSLHills } from '@/components/ui/glsl-hills'
import { GlowCard } from '@/components/ui/spotlight-card'
import TiltCard from '@/components/effects/TiltCard'
import Spotlight from '@/components/effects/Spotlight'
import {
  ContainerStagger,
  ContainerAnimated,
} from '@/components/blocks/animated-gallery'
import { ZoomParallax } from '@/components/ui/zoom-parallax'

const categories = [
  { id: 'CPU', label: 'Processors', icon: Cpu, count: 15, spec: 'AM5 / LGA1700', power: '65-253W' },
  { id: 'GPU', label: 'Graphics', icon: HardDrive, count: 16, spec: 'PCIe 5.0 x16', power: '150-450W' },
  { id: 'MOTHERBOARD', label: 'Motherboards', icon: Monitor, count: 19, spec: 'ATX / mATX', power: '' },
  { id: 'RAM', label: 'Memory', icon: MemoryStick, count: 10, spec: 'DDR5-6000', power: '' },
  { id: 'STORAGE', label: 'Storage', icon: Disc, count: 10, spec: 'NVMe / SATA', power: '' },
  { id: 'PSU', label: 'PSUs', icon: Power, count: 10, spec: '750-1600W', power: '80+ Plat' },
  { id: 'CASE', label: 'Cases', icon: Box, count: 12, spec: 'ATX / ITX', power: '' },
  { id: 'COOLING', label: 'Cooling', icon: Fan, count: 14, spec: 'AIO / Air', power: '' },
  { id: 'OS', label: 'OS', icon: Wifi, count: 2, spec: 'Win 11 / Linux', power: '' },
  { id: 'PERIPHERAL', label: 'Peripherals', icon: Activity, count: 8, spec: 'USB / BT', power: '' },
]

const hardwareTicker = [
  'AMD Ryzen 7 7800X3D', 'NVIDIA RTX 4090', '32GB DDR5-6000', '2TB NVMe PCIe 4.0',
  'ASUS ROG Crosshair X670E', 'Corsair HX1200i', 'NZXT Kraken Elite 360', 'Lian Li O11 Dynamic EVO',
  'Samsung 990 Pro', 'G.Skill Trident Z5', 'Noctua NH-D15', 'Fractal Design North',
  'AMD Ryzen 9 7950X3D', 'Intel Core i9-14900KS', 'RTX 4080 Super', 'RX 7900 XTX',
]

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-radial from-accent-gold/[0.04] to-transparent" />
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
          <h1 className="font-display text-[3rem] sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10rem] leading-[0.9] tracking-tight mb-6 sm:mb-8 select-none">
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
              className="block text-highlight-strong font-script text-[3.5rem] sm:text-inherit"
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
            <Spotlight size={400} whiteOpacity={0.12} goldOpacity={0.15}>
              <Link href="/builder"
                className="glass-btn inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 text-[0.55rem] sm:text-xs tracking-[0.15em] uppercase text-foreground rounded-xl"
              >
                <span className="relative z-10">Start Building</span>
                <ArrowUpRight className="relative z-10 w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </Spotlight>
            <Spotlight size={350} whiteOpacity={0.06} goldOpacity={0.08}>
              <Link href="/dashboard"
                className="glass-btn inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 text-[0.5rem] sm:text-xs tracking-[0.15em] uppercase text-muted-foreground/70 rounded-xl"
              >
                View Builds
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Spotlight>
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

function HardwareLab() {
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
            <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-3 sm:mb-4">Assembly Flow</p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1]">
              Three-stage<br />
              <span className="text-muted-foreground">configuration pipeline</span>
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
              <Spotlight size={600} whiteOpacity={0.06} goldOpacity={0.1}>
              <TiltCard intensity={4}>
                <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-12 h-full">
                  <div className="flex items-start justify-between mb-6 sm:mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-accent-gold text-[0.5rem] sm:text-[0.55rem] tracking-[0.2em] uppercase font-mono">STAGE 01</span>
                      <span className="w-px h-3 bg-white/10" />
                      <span className="text-[0.45rem] text-muted-foreground tracking-[0.15em] uppercase font-mono">SELECTION</span>
                    </div>
                    <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-accent-gold/60" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-3 sm:mb-4">Choose Components</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg">
                    Browse our curated catalog of 126 premium components across 10 categories.
                    CPUs, GPUs, motherboards, memory, storage — everything you need.
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-wrap gap-2">
                    {[
                      { id: 'CPU', spec: 'SOCKET AM5 / LGA1700' },
                      { id: 'GPU', spec: 'PCIe 5.0 x16' },
                      { id: 'RAM', spec: 'DDR5-6000' },
                      { id: 'STORAGE', spec: 'NVMe M.2' },
                    ].map((tag) => (
                      <span key={tag.id} className="glass-sm text-[0.45rem] sm:text-[0.5rem] tracking-[0.15em] text-muted-foreground px-2 sm:px-3 py-1 sm:py-1.5 uppercase rounded flex items-center gap-2">
                        <span className="text-accent-gold/70">{tag.id}</span>
                        <span className="w-px h-2.5 bg-white/5" />
                        <span className="opacity-50">{tag.spec}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
              </Spotlight>
            </motion.div>

            <div className="md:col-span-1 flex flex-col gap-3 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative group cursor-default flex-1"
              >
                <Spotlight size={400} whiteOpacity={0.05} goldOpacity={0.08}>
                <TiltCard intensity={3}>
                  <div className="glass-panel rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-accent-gold text-[0.45rem] tracking-[0.2em] uppercase font-mono">STAGE 02</span>
                        <span className="w-px h-2.5 bg-white/10" />
                        <span className="text-[0.4rem] text-muted-foreground tracking-[0.15em] uppercase font-mono">VALIDATION</span>
                      </div>
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold/60" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-2 sm:mb-3">Check Compatibility</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">Real-time validation across socket type, form factor, power draw, and clearance.</p>
                    <div className="mt-4 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[0.4rem] tracking-wider text-muted-foreground/50 uppercase font-mono">
                        <span>SOCKET</span>
                        <span className="text-accent-gold/70">MATCH</span>
                      </div>
                      <div className="flex items-center justify-between text-[0.4rem] tracking-wider text-muted-foreground/50 uppercase font-mono">
                        <span>THERMAL</span>
                        <span className="text-accent-gold/70">OK</span>
                      </div>
                      <div className="flex items-center justify-between text-[0.4rem] tracking-wider text-muted-foreground/50 uppercase font-mono">
                        <span>CLEARANCE</span>
                        <span className="text-accent-gold/70">PASS</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
                </Spotlight>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: '-100px' }}
                className="relative group cursor-default flex-1"
              >
                <Spotlight size={400} whiteOpacity={0.05} goldOpacity={0.08}>
                <TiltCard intensity={3}>
                  <div className="glass-panel rounded-2xl p-6 sm:p-8 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-accent-gold text-[0.45rem] tracking-[0.2em] uppercase font-mono">STAGE 03</span>
                        <span className="w-px h-2.5 bg-white/10" />
                        <span className="text-[0.4rem] text-muted-foreground tracking-[0.15em] uppercase font-mono">DEPLOY</span>
                      </div>
                      <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold/60" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-2 sm:mb-3">Save & Share</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1">Save your configuration, share with the community, or export a complete parts list.</p>
                    <div className="mt-4 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[0.4rem] tracking-wider text-muted-foreground/50 uppercase font-mono">
                        <span>EXPORT</span>
                        <span className="text-accent-gold/70">PDF / CSV</span>
                      </div>
                      <div className="flex items-center justify-between text-[0.4rem] tracking-wider text-muted-foreground/50 uppercase font-mono">
                        <span>SHARE</span>
                        <span className="text-accent-gold/70">LINK</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
                </Spotlight>
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
            <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-3 sm:mb-4">Component Catalog</p>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1]">126 precision parts.<br /><span className="text-muted-foreground">10 categories. One vision.</span></h2>
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
                  <Spotlight size={350} whiteOpacity={0.06} goldOpacity={0.08}>
                  <TiltCard intensity={5}>
                    <div className="glass-panel rounded-xl p-4 sm:p-5 h-full transition-all duration-500 group-hover:border-accent-gold/20">
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-accent-gold transition-colors duration-500" />
                        <span className="font-mono text-[0.4rem] text-muted-foreground/30">{cat.count}x</span>
                      </div>
                      <p className="text-[0.6rem] sm:text-xs text-muted-foreground/60 mb-1 transition-colors duration-300 group-hover:text-foreground">{cat.label}</p>
                      <p className="text-[0.4rem] font-mono text-muted-foreground/40 mb-0.5">{cat.spec}</p>
                      {cat.power && (
                        <p className="text-[0.35rem] font-mono text-accent-gold/50 tracking-wider uppercase">{cat.power}</p>
                      )}
                    </div>
                  </TiltCard>
                  </Spotlight>
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
                  <Spotlight size={400} whiteOpacity={0.05} goldOpacity={0.08}>
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
                                ? 'bg-accent-gold/10 border border-accent-gold/30 text-accent-gold'
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
                  </Spotlight>
                </motion.div>
              )
            })}
          </div>

          <Spotlight size={600} whiteOpacity={0.05} goldOpacity={0.08}>
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
                <p className="font-display text-2xl sm:text-3xl text-accent-gold tabular-nums">${total.toLocaleString()}</p>
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
          </Spotlight>
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-accent-gold/[0.04] to-transparent pointer-events-none"
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
          <Spotlight size={400} whiteOpacity={0.1} goldOpacity={0.12}>
          <Link href="/builder"
            className="glass-btn inline-flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 text-[0.55rem] sm:text-xs tracking-[0.15em] uppercase text-foreground rounded-xl"
          >
            Start Building
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
          </Spotlight>
        </motion.div>
      </div>
    </section>
  )
}

function SpotlightSection() {
  return (
    <section className="bg-black py-20 sm:py-28 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-10 sm:mb-16 text-center"
        >
          Spotlight Components
        </motion.p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Spotlight size={400} whiteOpacity={0.06} goldOpacity={0.1}><GlowCard /></Spotlight>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Spotlight size={400} whiteOpacity={0.06} goldOpacity={0.1}><GlowCard /></Spotlight>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Spotlight size={400} whiteOpacity={0.06} goldOpacity={0.1}><GlowCard /></Spotlight>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const buildImages = [
  { src: '/01-sdl-sanjaya-VBVtNgkA3ak-unsplash.jpg', alt: 'Custom gaming PC' },
  { src: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80', alt: 'High-end workstation' },
  { src: 'https://images.unsplash.com/photo-1660855551740-4474188debdb?w=800&auto=format&fit=crop&q=80', alt: 'Custom watercooled PC' },
  { src: 'https://images.unsplash.com/photo-1596697938289-68e8d0c6e8f4?w=800&auto=format&fit=crop&q=80', alt: 'Minimalist PC setup' },
  { src: 'https://images.unsplash.com/photo-1643509242569-911eebc68fc7?w=800&auto=format&fit=crop&q=80', alt: 'Dual monitor rig' },
  { src: 'https://images.unsplash.com/photo-1658673934021-cb0ba771f8ea?w=800&auto=format&fit=crop&q=80', alt: 'Custom loop PC' },
]

function BuildsShowcase() {
  return (
    <section className="bg-black border-t border-border relative">
      <ContainerStagger className="relative z-10 pt-16 sm:pt-24 pb-4 sm:pb-8 px-4 sm:px-6 text-center">
        <ContainerAnimated>
          <p className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase mb-3 sm:mb-4">Featured Builds</p>
        </ContainerAnimated>
        <ContainerAnimated>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground leading-[1.1]">
            Real builds.<br />
            <span className="text-muted-foreground">Real hardware. Real performance.</span>
          </h2>
        </ContainerAnimated>
      </ContainerStagger>

      <ZoomParallax images={buildImages} />
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="bg-black text-foreground">
      <HeroSection />
      <HardwareLab />
      <ComponentGrid />
      <BuildsShowcase />
      <QuickConfig />
      <StatsSection />
      <CTASection />
      <SpotlightSection />
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
