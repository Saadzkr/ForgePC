export type Build = {
  id: string
  name: string
  description?: string
  components: BuildComponents
  totalPrice: number
  totalWattage: number
  estimatedFps: PerformanceEstimate | null
  compatibility: CompatibilityResult | null
  isPublic: boolean
  shareToken?: string
  createdAt: Date
  updatedAt: Date
  user?: {
    id: string
    name?: string
    image?: string
  }
}

export type BuildComponents = {
  cpu?: ComponentItem
  gpu?: ComponentItem
  motherboard?: ComponentItem
  ram?: ComponentItem[]
  storage?: ComponentItem[]
  psu?: ComponentItem
  case?: ComponentItem
  cooling?: ComponentItem
  os?: ComponentItem
  peripherals?: ComponentItem[]
}

export type ComponentItem = {
  id: string
  name: string
  brand: string
  model: string
  category: ComponentCategory
  price: number
  wattage?: number
  specs: Record<string, string | number | boolean>
  imageUrl?: string
  performanceScore?: number
}

export type ComponentCategory =
  | 'CPU'
  | 'GPU'
  | 'MOTHERBOARD'
  | 'RAM'
  | 'STORAGE'
  | 'PSU'
  | 'CASE'
  | 'COOLING'
  | 'OS'
  | 'PERIPHERAL'

export type PerformanceEstimate = {
  fps1080p: number
  fps1440p: number
  fps4k: number
  score: number
}

export type CompatibilityResult = {
  compatible: boolean
  issues: string[]
  warnings: string[]
  suggestions: string[]
}

export type User = {
  id: string
  name?: string
  email: string
  image?: string
  role: 'USER' | 'ADMIN'
  builds: Build[]
  savedBuilds: SavedBuild[]
  badges: UserBadge[]
  stats: UserStats
  activities: Activity[]
  createdAt: Date
}

export type SavedBuild = {
  id: string
  build: Build
  createdAt: Date
}

export type UserBadge = {
  id: string
  badge: Badge
  earnedAt: Date
}

export type Badge = {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
}

export type UserStats = {
  buildsCreated: number
  buildsSaved: number
  totalSpent: number
  highestFps: number
  totalWattage: number
}

export type Activity = {
  id: string
  type: ActivityType
  title: string
  message: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

export type ActivityType =
  | 'BUILD_CREATED'
  | 'BUILD_SAVED'
  | 'BUILD_SHARED'
  | 'BADGE_EARNED'
  | 'BUILD_UPDATED'
  | 'COMPONENT_ADDED'