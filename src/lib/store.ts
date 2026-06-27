'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BuilderComponent = {
  id: string
  name: string
  brand: string
  model: string
  category: string
  price: number
  wattage?: number
  specs: Record<string, string | number | boolean | string[]>
  imageUrl?: string
  performanceScore?: number
}

export type BuilderComponents = Record<string, BuilderComponent | BuilderComponent[]>

const FORM_FACTOR_ORDER: Record<string, number> = {
  'ITX': 0,
  'mATX': 1,
  'ATX': 2,
  'E-ATX': 3,
}

function getFormFactorRank(ff: string): number {
  return FORM_FACTOR_ORDER[ff] ?? -1
}

function flatten<T>(arr: (T | T[])[]): T[] {
  const result: T[] = []
  for (const item of arr) {
    if (Array.isArray(item)) result.push(...item)
    else result.push(item)
  }
  return result
}

function extractComponents(components: BuilderComponents): BuilderComponent[] {
  return flatten(Object.values(components))
}

function findOne(components: BuilderComponents, category: string): BuilderComponent | undefined {
  const c = components[category]
  if (!c) return undefined
  return Array.isArray(c) ? c[0] : c
}

function findAll(components: BuilderComponents, category: string): BuilderComponent[] {
  const c = components[category]
  if (!c) return []
  return Array.isArray(c) ? c : [c]
}

interface BuilderState {
  components: BuilderComponents
  buildName: string
  totalPrice: number
  totalWattage: number
  estimatedFps: { '1080p': number; '1440p': number; '4K': number } | null
  compatibilityErrors: string[]
  compatibilityWarnings: string[]
  addComponent: (category: string, component: BuilderComponent) => void
  removeComponent: (category: string, componentId: string) => void
  setBuildName: (name: string) => void
  resetBuild: () => void
  recalculate: () => void
}

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set, get) => ({
      components: {},
      buildName: 'New Build',
      totalPrice: 0,
      totalWattage: 0,
      estimatedFps: null,
      compatibilityErrors: [],
      compatibilityWarnings: [],

      addComponent: (category, component) => {
        const current = get().components
        const updated = { ...current }

        if (category === 'RAM' || category === 'STORAGE' || category === 'PERIPHERAL') {
          const existing = (updated[category] as BuilderComponent[]) || []
          updated[category] = [...existing, component]
        } else {
          updated[category] = component
        }

        set({ components: updated })
        get().recalculate()
      },

      removeComponent: (category, componentId) => {
        const current = get().components
        const updated = { ...current }

        if (Array.isArray(updated[category])) {
          updated[category] = (updated[category] as BuilderComponent[]).filter(
            (c) => c.id !== componentId
          )
          if ((updated[category] as BuilderComponent[]).length === 0) {
            delete updated[category]
          }
        } else {
          delete updated[category]
        }

        set({ components: updated })
        get().recalculate()
      },

      setBuildName: (name) => set({ buildName: name }),

      resetBuild: () =>
        set({
          components: {},
          buildName: 'New Build',
          totalPrice: 0,
          totalWattage: 0,
          estimatedFps: null,
          compatibilityErrors: [],
          compatibilityWarnings: [],
        }),

      recalculate: () => {
        const { components } = get()
        const errors: string[] = []
        const warnings: string[] = []
        let totalPrice = 0
        let totalWattage = 0

        for (const item of extractComponents(components)) {
          totalPrice += item.price || 0
          totalWattage += item.wattage || 0
        }

        const cpu = findOne(components, 'CPU')
        const mb = findOne(components, 'MOTHERBOARD')
        const gpu = findOne(components, 'GPU')
        const psu = findOne(components, 'PSU')
        const case_ = findOne(components, 'CASE')
        const cooler = findOne(components, 'COOLING')
        const rams = findAll(components, 'RAM')

        // CPU ↔ Motherboard socket
        if (cpu && mb) {
          const cpuSocket = cpu.specs.socket as string | undefined
          const mbSocket = mb.specs.socket as string | undefined
          if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
            errors.push(`Socket mismatch: CPU (${cpuSocket}) ≠ Motherboard (${mbSocket})`)
          }
        }

        // CPU TDP ↔ Motherboard VRM capability
        if (cpu && mb) {
          const cpuTdp = (cpu.specs.tdp || cpu.specs.tdp || 0) as number
          const mbMaxTdp = (mb.specs.maxTdp || mb.specs.maxTdp || 250) as number
          if (cpuTdp > mbMaxTdp) {
            warnings.push(`CPU TDP (${cpuTdp}W) exceeds motherboard VRM capability (${mbMaxTdp}W)`)
          }
        }

        // Motherboard ↔ RAM type
        if (rams.length > 0 && mb) {
          const ramType = rams[0].specs.type as string | undefined
          const mbRamType = mb.specs.ramType as string | undefined
          if (ramType && mbRamType && ramType !== mbRamType) {
            errors.push(`RAM type mismatch: ${ramType} ≠ ${mbRamType}`)
          }
        }

        // Motherboard ↔ Case form factor
        if (mb && case_) {
          const mbFormFactor = (mb.specs.formFactor || (mb.specs as Record<string, unknown>).formFactor) as string | undefined
          const caseFormFactor = (case_.specs.formFactor || (case_.specs as Record<string, unknown>).formFactor) as string | undefined
          if (mbFormFactor && caseFormFactor) {
            if (getFormFactorRank(mbFormFactor) > getFormFactorRank(caseFormFactor)) {
              errors.push(`Form factor mismatch: ${mbFormFactor} motherboard won't fit in ${caseFormFactor} case`)
            }
          }
        }

        // Cooler socket ↔ CPU socket
        if (cooler && cpu) {
          const cpuSocket = cpu.specs.socket as string | undefined
          const coolerSockets = cooler.specs.socket as string[] | undefined
          if (cpuSocket && coolerSockets && Array.isArray(coolerSockets)) {
            const normalizedSockets = coolerSockets.map((s) => s.toLowerCase())
            if (!normalizedSockets.includes(cpuSocket.toLowerCase())) {
              errors.push(`Cooler not compatible: does not support ${cpuSocket} socket`)
            }
          }
        }

        // Cooler height ↔ Case max cooler height
        if (cooler && case_) {
          const coolerHeight = cooler.specs.height as number | undefined
          const caseMaxHeight = case_.specs.maxCoolerHeight as number | undefined
          if (coolerHeight && caseMaxHeight && coolerHeight > caseMaxHeight) {
            errors.push(`Cooler too tall: ${coolerHeight}mm exceeds case limit of ${caseMaxHeight}mm`)
          }
        }

        // GPU length ↔ Case max GPU length
        if (gpu && case_) {
          const gpuLength = (gpu.specs.length || gpu.specs.length || 0) as number
          const caseMaxGpu = (case_.specs.maxGpuLength || case_.specs.maxGpuLength || 999) as number
          if (gpuLength > 0 && caseMaxGpu > 0 && gpuLength > caseMaxGpu) {
            errors.push(`GPU too long: ${gpuLength}mm exceeds case limit of ${caseMaxGpu}mm`)
          }
        }

        // PSU ↔ System power draw with headroom
        const cpuTdp = (cpu?.specs.tdp || cpu?.specs.tdp || 0) as number
        const gpuTdp = (gpu?.specs.tdp || gpu?.specs.powerDraw || 0) as number
        const baseLoad = 50
        const estimatedLoad = cpuTdp + gpuTdp + baseLoad
        const recommendedPsu = Math.max(750, Math.ceil(estimatedLoad * 1.4 / 50) * 50)

        if (psu) {
          const psuWattage = (psu.specs.wattage || psu.wattage || 0) as number
          if (psuWattage > 0 && psuWattage < recommendedPsu) {
            warnings.push(
              `PSU may be insufficient: ${psuWattage}W < ${recommendedPsu}W recommended (${estimatedLoad}W estimated load)`
            )
          }
        }

        // PSU form factor ↔ Case
        if (psu && case_) {
          const psuFormFactor = psu.specs.formFactor as string | undefined
          if (psuFormFactor === 'ATX' && case_.specs.maxPsuLength) {
            const psuLength = psu.specs.depth as number || 160
            const caseMaxPsu = case_.specs.maxPsuLength as number || 999
            if (psuLength > caseMaxPsu) {
              errors.push(`PSU too long: ${psuLength}mm exceeds case limit of ${caseMaxPsu}mm`)
            }
          }
        }

        // FPS estimation from GPU
        let estimatedFps: { '1080p': number; '1440p': number; '4K': number } | null = null
        if (gpu) {
          const fps1080p = gpu.specs.fps1080p as number | undefined
          const fps1440p = gpu.specs.fps1440p as number | undefined
          const fps4K = gpu.specs.fps4K as number | undefined
          if (fps1080p && fps1440p && fps4K) {
            estimatedFps = { '1080p': fps1080p, '1440p': fps1440p, '4K': fps4K }
          }
        }

        // If no GPU FPS data, fall back to performance score
        if (!estimatedFps) {
          const gpuScore = gpu?.performanceScore || 0
          if (gpuScore > 0) {
            estimatedFps = {
              '1080p': Math.round(gpuScore * 2.4),
              '1440p': Math.round(gpuScore * 1.8),
              '4K': Math.round(gpuScore * 1.1),
            }
          }
        }

        set({
          totalPrice,
          totalWattage,
          estimatedFps,
          compatibilityErrors: errors,
          compatibilityWarnings: warnings,
        })
      },
    }),
    {
      name: 'forge-pc-builder',
      partialize: (state) => ({
        components: state.components,
        buildName: state.buildName,
        totalPrice: state.totalPrice,
        totalWattage: state.totalWattage,
      }),
    }
  )
)

interface UIState {
  menuOpen: boolean
  menuAnimating: boolean
  crtWarmup: boolean
  allComponents: BuilderComponent[]
  setMenuOpen: (open: boolean) => void
  setMenuAnimating: (animating: boolean) => void
  setCrtWarmup: (done: boolean) => void
  setAllComponents: (components: BuilderComponent[]) => void
}

export const useUIStore = create<UIState>()((set) => ({
  menuOpen: false,
  menuAnimating: false,
  crtWarmup: false,
  allComponents: [],
  setMenuOpen: (open) => set({ menuOpen: open }),
  setMenuAnimating: (animating) => set({ menuAnimating: animating }),
  setCrtWarmup: (done) => set({ crtWarmup: done }),
  setAllComponents: (components) => set({ allComponents: components }),
}))
