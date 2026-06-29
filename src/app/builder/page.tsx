'use client'

import { useState, useMemo, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Cpu, HardDrive, Monitor, Zap, Activity, Thermometer,
  CheckCircle2, AlertTriangle, XCircle, Save, RotateCcw,
  DollarSign, BarChart3, ChevronRight, Box, Fan, Disc,
  MemoryStick as Memory, Power, Wifi, RefreshCw, Trash2, X
} from 'lucide-react'
import TiltCard from '@/components/effects/TiltCard'
import { useBuilderStore, useUIStore, type BuilderComponent } from '@/lib/store'
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
              <div className="mt-auto pt-8 border-t border-[rgba(255,255,255,0.04)]">
                <Link href="/login" className="text-[0.6rem] text-[#555]">Sign In</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const categoryMeta: Record<string, { icon: React.ElementType; label: string; desc: string }> = {
  CPU: { icon: Cpu, label: 'CPU', desc: 'Processor' },
  GPU: { icon: HardDrive, label: 'GPU', desc: 'Graphics Card' },
  MOTHERBOARD: { icon: Monitor, label: 'Mobo', desc: 'Motherboard' },
  RAM: { icon: Memory, label: 'RAM', desc: 'Memory' },
  STORAGE: { icon: Disc, label: 'Storage', desc: 'Drive' },
  PSU: { icon: Power, label: 'PSU', desc: 'Power Supply' },
  CASE: { icon: Box, label: 'Case', desc: 'Chassis' },
  COOLING: { icon: Fan, label: 'Cooling', desc: 'CPU Cooler' },
  PERIPHERAL: { icon: Activity, label: 'Peripheral', desc: 'Accessories' },
}

const categories = Object.keys(categoryMeta)

function formatSpecs(comp: BuilderComponent): string {
  const skip = ['performanceScore', 'formFactor', 'socket', 'ramType', 'rgb', 'hasGlass',
    'connection', 'noiseCanceling', 'frequency', 'dpi', 'layout', 'switchType',
    'l3Cache', 'interface', 'fps1080p', 'fps1440p', 'fps4K', 'maxTdp', 'maxRam',
    'maxGpuLength', 'maxPsuLength', 'maxCoolerHeight', 'height']
  const entries = Object.entries(comp.specs).filter(([k, v]) => !skip.includes(k) && typeof v !== 'object')
  return entries.slice(0, 3).map(([k, v]) => `${k}: ${v}`).join(' · ')
}

function FPSIndicator({ estimatedFps }: { estimatedFps: { '1080p': number; '1440p': number; '4K': number } | null }) {
  if (!estimatedFps) return (
    <div className="py-10 text-center">
      <BarChart3 className="w-6 h-6 text-[#333] mx-auto mb-3" />
      <p className="text-[0.6rem] text-[#555]">Select a GPU to estimate FPS</p>
    </div>
  )

  const max = Math.max(estimatedFps['1080p'], 1)
  const resolutions = [
    { label: '1080p', value: estimatedFps['1080p'] },
    { label: '1440p', value: estimatedFps['1440p'] },
    { label: '4K', value: estimatedFps['4K'] },
  ]

  return (
    <div className="space-y-4">
      {resolutions.map((res) => {
        const pct = Math.round((res.value / max) * 100)
        const color = res.value >= 144 ? 'bg-green-500' : res.value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
        return (
          <div key={res.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">{res.label}</span>
              <span className="font-mono text-[0.6rem] text-[#ccc]">{res.value} FPS</span>
            </div>
            <div className="h-1 glass-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className={`h-full ${color} transition-colors`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CompatibilityPanel({ errors, warnings }: { errors: string[]; warnings: string[] }) {
  const all = [...errors, ...warnings]
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">Status</span>
        {all.length === 0 ? (
          <span className="flex items-center gap-1 text-green-500 text-[0.55rem]">
            <CheckCircle2 className="w-3 h-3" /> All Clear
          </span>
        ) : errors.length > 0 ? (
          <span className="flex items-center gap-1 text-red-500 text-[0.55rem]">
            <XCircle className="w-3 h-3" /> {errors.length} Error{errors.length > 1 ? 's' : ''}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-yellow-500 text-[0.55rem]">
            <AlertTriangle className="w-3 h-3" /> {warnings.length} Warning{warnings.length > 1 ? 's' : ''}
          </span>
        )}
      </div>
      {all.length === 0 && (
        <div className="py-6 text-center">
          <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-xs text-green-500">All components compatible</p>
        </div>
      )}
      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {all.map((issue, i) => {
          const isError = errors.includes(issue)
          return (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              className={`flex items-start gap-2 p-2 rounded-lg ${isError ? 'bg-red-500/5 border border-red-500/10' : 'bg-yellow-500/5 border border-yellow-500/10'}`}
            >
              {isError ? <XCircle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-3 h-3 text-yellow-500 flex-shrink-0 mt-0.5" />}
              <span className="text-[0.5rem] text-[#777] leading-relaxed">{issue}</span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function BuilderPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const store = useBuilderStore()
  const { playClick, playSelect, playToggle, playSuccess, playError, playHover } = useSound()
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>()
  const playHoverSafe = () => {
    if (hoverTimer.current) return
    hoverTimer.current = setTimeout(() => { hoverTimer.current = undefined }, 100)
    playHover()
  }
  const { components, addComponent, removeComponent, buildName, setBuildName, resetBuild, totalPrice, totalWattage, estimatedFps, compatibilityErrors, compatibilityWarnings } = store
  const allComponents = useUIStore((s) => s.allComponents)
  const setAllComponents = useUIStore((s) => s.setAllComponents)
  const [activeCategory, setActiveCategory] = useState<string>('CPU')
  const [showPanel, setShowPanel] = useState<'components' | 'preview'>('preview')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchComponents() {
      try { const res = await fetch('/api/components'); if (res.ok) setAllComponents(await res.json()) }
      catch { /* */ } finally { setLoading(false) }
    }
    if (allComponents.length === 0) fetchComponents(); else setLoading(false)
  }, [allComponents.length, setAllComponents])

  const byCategory = useMemo(() => {
    const grouped: Record<string, BuilderComponent[]> = {}
    for (const comp of allComponents) { if (!grouped[comp.category]) grouped[comp.category] = []; grouped[comp.category].push(comp) }
    return grouped
  }, [allComponents])

  const currentItems = useMemo(() => byCategory[activeCategory] || [], [byCategory, activeCategory])

  const cpu = components.CPU as BuilderComponent | undefined
  const gpu = components.GPU as BuilderComponent | undefined
  const cpuTdp = (cpu?.specs.tdp || cpu?.specs.tdp || 0) as number
  const gpuTdp = (gpu?.specs.tdp || gpu?.specs.powerDraw || 0) as number
  const estimatedLoad = cpuTdp + gpuTdp + 50
  const recommendedPsu = Math.max(750, Math.ceil(estimatedLoad * 1.4 / 50) * 50)

  const handleSave = useCallback(async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/builds', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: buildName, components, totalPrice, totalWattage, estimatedFps, compatibility: { errors: compatibilityErrors, warnings: compatibilityWarnings } }),
      })
      if (res.ok) { playSuccess() } else { playError() }
    } catch (e) { playError() } finally { setSaving(false) }
  }, [buildName, components, totalPrice, totalWattage, estimatedFps, compatibilityErrors, compatibilityWarnings, playSuccess, playError])

  useEffect(() => { if (status === 'unauthenticated') router.push('/login') }, [status, router])

  if (status === 'loading') return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex gap-1.5">{[1, 2, 3].map((n) => (
        <motion.div key={n} className="w-2 h-2 bg-[#444]"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, delay: n * 0.2, repeat: Infinity }}
        />
      ))}</div>
    </div>
  )
  if (status === 'unauthenticated') return null

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 flex items-center justify-between h-14">
          <Link href="/" className="logo-text font-display text-base sm:text-lg tracking-tight select-none">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <div className="flex items-center gap-1 sm:gap-3">
            <Link href="/dashboard" className="glass-btn-sm rounded-md hidden sm:inline-flex">Dashboard</Link>
            <button onClick={() => { playClick(); handleSave() }} disabled={saving}
              className="glass-btn-primary text-[0.5rem] sm:text-[0.6rem] flex items-center gap-1.5 rounded-lg px-3 sm:px-4 py-2"
              style={{color: saving ? '#888' : '#eee'}}
            >
              <Save className="w-3 h-3" /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => { playClick(); resetBuild() }} className="glass-btn-sm rounded-md hidden sm:inline-flex items-center gap-1.5">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <BurgerMenu />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <RefreshCw className="w-4 h-4 text-[#555] animate-spin mr-2" />
          <span className="text-[0.6rem] text-[#555]">Loading components...</span>
        </div>
      ) : (
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-[0.5rem] sm:text-[0.55rem] text-[#555] tracking-wider uppercase">Build Name</span>
            <input type="text" value={buildName} onChange={(e) => setBuildName(e.target.value)} className="input w-full sm:flex-1 sm:max-w-xs text-xs sm:text-sm" placeholder="Enter build name..." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-5">
            {/* Category sidebar */}
            <aside className="lg:col-span-2">
              <div className="glass-sidebar rounded-xl overflow-hidden">
                <div className="p-3 border-b border-[rgba(255,255,255,0.06)]">
                  <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">Components</span>
                </div>
                <div className="p-2 space-y-1">
                  {categories.map((cat) => {
                    const meta = categoryMeta[cat]
                    const Icon = meta.icon
                    const isActive = activeCategory === cat
                    const hasComponent = !!components[cat]
                    const count = byCategory[cat]?.length || 0
                    return (
                      <motion.button key={cat} onClick={() => { playSelect(); setActiveCategory(cat); setShowPanel('components') }}
                        onMouseEnter={playHoverSafe}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-150 ${
                          isActive ? 'bg-[rgba(255,255,255,0.06)] border-l-2 border-[#eee]' : 'hover:bg-[rgba(255,255,255,0.02)] border-l-2 border-transparent'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#eee]' : 'text-[#444]'}`} />
                        <div className="flex-1 min-w-0">
                          <span className={`text-[0.55rem] block truncate tracking-wider uppercase ${isActive ? 'text-[#eee]' : 'text-[#555]'}`}>{meta.label}</span>
                        </div>
                        <span className={`text-[0.45rem] ${hasComponent ? 'text-[#888]' : 'text-[#333]'}`}>{count}</span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Main panel */}
            <section className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {showPanel === 'components' ? (
                  <motion.div key="components" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="glass-panel rounded-2xl overflow-hidden"
                  >
                    <div className="p-3 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {(() => { const Icon = categoryMeta[activeCategory].icon; return <Icon className="w-4 h-4 text-[#555]" /> })()}
                        <span className="text-[0.6rem] tracking-wider uppercase text-[#888]">{categoryMeta[activeCategory].desc}</span>
                        <span className="text-[0.5rem] text-[#444]">({currentItems.length})</span>
                      </div>
                      <button onClick={() => { playClick(); setShowPanel('preview') }} className="glass-btn-sm rounded-md p-1"><ChevronRight className="w-3 h-3 rotate-180" /></button>
                    </div>
                    <div className="divide-y divide-[rgba(255,255,255,0.03)] max-h-[520px] overflow-y-auto">
                      {currentItems.map((component, idx) => {
                        const existing = components[activeCategory]
                        const isSelected = existing
                          ? Array.isArray(existing)
                            ? (existing as BuilderComponent[]).some((c) => c.id === component.id)
                            : (existing as BuilderComponent).id === component.id
                          : false
                        return (
                          <motion.div key={component.id} layout
                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.025, duration: 0.3 }}
                          >
                            <TiltCard intensity={3}>
                              <div onClick={() => { playToggle(); if (isSelected) removeComponent(activeCategory, component.id); else addComponent(activeCategory, component) }}
                                onMouseEnter={playHoverSafe}
                                className={`p-4 transition-colors cursor-pointer ${
                                  isSelected ? 'bg-[rgba(255,255,255,0.06)] border-l-2 border-[#eee]' : 'hover:bg-[rgba(255,255,255,0.02)] border-l-2 border-transparent'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3 className="text-sm text-[#ddd] truncate">{component.name}</h3>
                                      {isSelected && <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />}
                                    </div>
                                    <div className="flex gap-3 text-[0.5rem] text-[#555]">
                                      <span className="tracking-wider uppercase">{component.brand}</span>
                                      <span className="truncate">{component.model}</span>
                                    </div>
                                    {formatSpecs(component) && <p className="text-[0.45rem] text-[#444] mt-1.5 truncate">{formatSpecs(component)}</p>}
                                  </div>
                                  <div className="text-right flex-shrink-0">
                                    <span className="text-sm text-[#eee]">${component.price}</span>
                                    {component.wattage ? <p className="text-[0.45rem] text-[#555]">{component.wattage}W</p> : null}
                                  </div>
                                </div>
                              </div>
                            </TiltCard>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="glass-panel rounded-2xl p-8 min-h-[400px]"
                  >
                    {Object.keys(components).length === 0 ? (
                      <div className="text-center py-16">
                        <div className="grid grid-cols-5 gap-3 max-w-xs mx-auto mb-8">
                          {categories.slice(0, 10).map((cat) => {
                            const Icon = categoryMeta[cat].icon
                            return <div key={cat} className="aspect-square glass-sm rounded-xl flex items-center justify-center"><Icon className="w-4 h-4 text-[#444]" /></div>
                          })}
                        </div>
                        <p className="text-sm text-[#555] mb-2">No components selected</p>
                        <p className="text-[0.55rem] text-[#333]">Select a category from the left panel to start building</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">Build Summary</span>
                          <span className="text-[0.5rem] text-[#555]">{Object.keys(components).length}/10 slots filled</span>
                        </div>
                        {categories.filter(c => components[c]).map((cat) => {
                          const comp = components[cat]
                          const items = Array.isArray(comp) ? comp as BuilderComponent[] : [comp as BuilderComponent]
                          return items.map((item: BuilderComponent) => (
                            <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#0d0d0d] last:border-0">
                              <div className="flex items-center gap-3 min-w-0">
                                {(() => { const Icon = categoryMeta[cat].icon; return <Icon className="w-3.5 h-3.5 text-[#444] flex-shrink-0" /> })()}
                                <span className="text-xs text-[#ccc] truncate">{item.name}</span>
                              </div>
                              <div className="flex items-center gap-3 flex-shrink-0">
                                <span className="text-xs text-[#888]">${item.price}</span>
                                <button onClick={() => { playClick(); removeComponent(cat, item.id) }} className="text-[#444] hover:text-red-400 transition-colors"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </div>
                          ))
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Right panels */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="glass-panel rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[rgba(255,255,255,0.06)]">
                  <BarChart3 className="w-3 h-3 text-[#555]" />
                  <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">Performance</span>
                </div>
                <FPSIndicator estimatedFps={estimatedFps} />
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[rgba(255,255,255,0.06)]">
                  <Zap className="w-3 h-3 text-[#555]" />
                  <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">Power & Price</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[0.5rem] text-[#555] tracking-wider uppercase">Total</span>
                    <span className="font-display text-2xl text-[#eee]">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="glass-divider" />
                  <div className="flex justify-between"><span className="text-[0.5rem] text-[#555]">Power Draw</span><span className="text-xs text-[#888]">{totalWattage}W</span></div>
                  <div className="flex justify-between"><span className="text-[0.5rem] text-[#555]">Recommended PSU</span><span className="text-xs text-[#888]">{recommendedPsu}W</span></div>
                  {estimatedFps && <div className="flex justify-between"><span className="text-[0.5rem] text-[#555]">Cost per Frame</span><span className="text-xs text-[#888]">${Math.round(totalPrice / estimatedFps['1080p'])}</span></div>}
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[rgba(255,255,255,0.06)]">
                  <Thermometer className="w-3 h-3 text-[#555]" />
                  <span className="text-[0.55rem] text-[#555] tracking-wider uppercase">Compatibility</span>
                </div>
                <CompatibilityPanel errors={compatibilityErrors} warnings={compatibilityWarnings} />
              </div>
            </aside>
          </div>
        </main>
      )}
    </div>
  )
}
