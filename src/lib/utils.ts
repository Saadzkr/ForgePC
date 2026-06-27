import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatWattage(watts: number): string {
  return `${watts}W`
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function generateBuildSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function generateShareableId(): string {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export function getCompatibilityStatus(
  components: Record<string, unknown>
): { compatible: boolean; issues: string[] } {
  const issues: string[] = []
  const cpu = components.cpu as { socket?: string; tdp?: number } | undefined
  const motherboard = components.motherboard as { socket?: string; maxTdp?: number } | undefined
  const ram = components.ram as { type?: string; speed?: number } | undefined
  const psu = components.psu as { wattage?: number } | undefined
  const gpu = components.gpu as { powerDraw?: number; length?: number } | undefined
  const case_ = components.case as { maxGpuLength?: number; maxPsuLength?: number } | undefined

  if (cpu && motherboard && cpu.socket !== motherboard.socket) {
    issues.push(`CPU socket (${cpu.socket}) incompatible with motherboard socket (${motherboard.socket})`)
  }

  if (cpu && motherboard && cpu.tdp && motherboard.maxTdp && cpu.tdp > motherboard.maxTdp) {
    issues.push(`CPU TDP (${cpu.tdp}W) exceeds motherboard max TDP (${motherboard.maxTdp}W)`)
  }

  if (ram && motherboard && ram.type) {
    const mbRamType = (motherboard as Record<string, unknown>).ramType as string | undefined
    if (mbRamType && ram.type !== mbRamType) {
      issues.push(`RAM type (${ram.type}) incompatible with motherboard (${mbRamType})`)
    }
  }

  if (gpu && case_ && gpu.length && case_.maxGpuLength && gpu.length > case_.maxGpuLength) {
    issues.push(`GPU length (${gpu.length}mm) exceeds case max GPU length (${case_.maxGpuLength}mm)`)
  }

  const totalPower = [
    cpu?.tdp || 0,
    gpu?.powerDraw || 0,
    50,
    (components.ram as { count?: number; powerPerStick?: number } | undefined)?.count || 0 * ((components.ram as any)?.powerPerStick || 3),
    (components.storage as { count?: number; power?: number } | undefined)?.count || 0 * ((components.storage as any)?.power || 5),
  ].reduce((a, b) => a + b, 0)

  const recommendedPsu = Math.ceil(totalPower * 1.3 / 100) * 100
  if (psu && psu.wattage && psu.wattage < recommendedPsu) {
    issues.push(`PSU (${psu.wattage}W) may be insufficient. Recommended: ${recommendedPsu}W+`)
  }

  return { compatible: issues.length === 0, issues }
}

export function calculatePerformanceScore(components: Record<string, unknown>): number {
  const weights = {
    cpu: 0.3,
    gpu: 0.4,
    ram: 0.1,
    storage: 0.1,
    cooling: 0.05,
    psu: 0.05,
  }

  const scores: Record<string, number> = {}
  Object.entries(components).forEach(([key, component]) => {
    const comp = component as { performanceScore?: number; benchmark?: number }
    scores[key] = comp.performanceScore || comp.benchmark || 50
  })

  return Math.round(
    Object.entries(weights).reduce((acc, [key, weight]) => {
      return acc + (scores[key] || 50) * weight
    }, 0)
  )
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'COMMON': return 'hsl(var(--muted-foreground))'
    case 'UNCOMMON': return 'hsl(var(--primary))'
    case 'RARE': return 'hsl(220, 90%, 60%)'
    case 'EPIC': return 'hsl(280, 80%, 65%)'
    case 'LEGENDARY': return 'hsl(45, 100%, 60%)'
    default: return 'hsl(var(--muted-foreground))'
  }
}

export function getRarityGlow(rarity: string): string {
  switch (rarity) {
    case 'COMMON': return 'none'
    case 'UNCOMMON': return '0 0 10px hsl(var(--primary) / 0.5)'
    case 'RARE': return '0 0 15px hsl(220, 90%, 60% / 0.6)'
    case 'EPIC': return '0 0 20px hsl(280, 80%, 65% / 0.7)'
    case 'LEGENDARY': return '0 0 30px hsl(45, 100%, 60% / 0.8), 0 0 60px hsl(45, 100%, 60% / 0.4)'
    default: return 'none'
  }
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= ms) {
      lastCall = now
      fn(...args)
    }
  }
}