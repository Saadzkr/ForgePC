'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import * as Switch from '@radix-ui/react-switch'
import {
  User, Cpu, Zap, Activity, Award, Settings,
  LogOut, Shield, Star, Medal,
  Trophy, Flame, Target, HardDrive,
  Trash2, Eye, Edit3
} from 'lucide-react'
import { useSound } from '@/components/providers/sound-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { t } from '@/lib/i18n'

type Badge = {
  id: string
  badge: { id: string; name: string; description: string; icon: string; rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' }
  earnedAt: string
}

type Build = {
  id: string; name: string; totalPrice: number; totalWattage: number
  estimatedFps: { score: number } | null; createdAt: string; isPublic: boolean
}

type UserStats = { buildsCreated: number; totalSpent: number; avgScore: number; totalWattage: number }

const rarityColors: Record<string, string> = {
  COMMON: 'text-[#666]', UNCOMMON: 'text-[#ff8c00]', RARE: 'text-[#4a9eff]',
  EPIC: 'text-[#a855f7]', LEGENDARY: 'text-[#fbbf24]',
}

function BadgeCard({ badge, earnedAt }: { badge: Badge['badge']; earnedAt: string }) {
  const Icon = { cpu: Cpu, zap: Zap, star: Star, trophy: Trophy, medal: Medal, flame: Flame, shield: Shield, target: Target, award: Award }[badge.icon] || Award
  return (
    <motion.div whileHover={{ scale: 1.05 }}
      className="glass-sm rounded-xl p-3 flex flex-col items-center text-center cursor-pointer"
    >
      <div className={`w-8 h-8 flex items-center justify-center mb-2 ${rarityColors[badge.rarity] || rarityColors.COMMON}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-[0.65rem] text-[#eee] leading-tight">{badge.name}</p>
      <span className={`text-[0.5rem] mt-0.5 uppercase tracking-wider ${rarityColors[badge.rarity] || rarityColors.COMMON}`}>{badge.rarity}</span>
    </motion.div>
  )
}

function ToggleSetting({ label, description, defaultOn = false }: { label: string; description?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  const { playToggle } = useSound()
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a] last:border-0">
      <div>
        <span className="text-xs text-[#eee]">{label}</span>
        {description && <p className="text-[0.6rem] text-[#666] mt-0.5">{description}</p>}
      </div>
      <Switch.Root checked={on} onCheckedChange={(v) => { playToggle(); setOn(v) }}
        className={`relative w-[36px] h-[20px] rounded-full transition-colors ${on ? 'bg-[#eee]' : 'bg-[#333]'}`}
      >
        <Switch.Thumb className={`block w-[16px] h-[16px] bg-black rounded-full transition-transform translate-x-0.5 ${on ? 'translate-x-[18px]' : ''}`} />
      </Switch.Root>
    </div>
  )
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { playClick, playToggle } = useSound()
  const { locale } = useLocale()
  const _ = (k: string) => t(k, locale)
  const [badges, setBadges] = useState<Badge[]>([])
  const [builds, setBuilds] = useState<Build[]>([])
  const [stats, setStats] = useState<UserStats>({ buildsCreated: 0, totalSpent: 0, avgScore: 0, totalWattage: 0 })

  const fetchData = useCallback(async () => {
    try {
      const [badgesRes, buildsRes, statsRes] = await Promise.all([
        fetch('/api/user/badges'), fetch('/api/builds'), fetch('/api/user/stats'),
      ])
      if (badgesRes.ok) setBadges(await badgesRes.json())
      if (buildsRes.ok) setBuilds(await buildsRes.json())
      if (statsRes.ok) setStats(await statsRes.json())
    } catch { /* */ }
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated') fetchData()
  }, [status, router, fetchData])

  if (status === 'loading') return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex gap-1.5 justify-center mb-4">{[1, 2, 3].map((n) => (
        <motion.div key={n} className="w-2 h-2 bg-[#444]"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, delay: n * 0.2, repeat: Infinity }}
        />
      ))}</div>
    </div>
  )

  if (status === 'unauthenticated') return null

  const displayName = session?.user?.name || _('dashboard.user')
  const email = session?.user?.email || ''

  return (
    <div className="min-h-screen bg-black text-[#eee]">
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <Link href="/" className="logo-text font-display text-base sm:text-lg tracking-tight select-none">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="glass-btn-sm rounded-md">{_('profile.dashboard')}</Link>
            <button onClick={() => { playClick(); signOut() }} className="glass-btn-sm rounded-md flex items-center gap-1"><LogOut className="w-3 h-3" /> {_('profile.logout')}</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-8">
          {/* Profile header */}
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-16 h-16 rounded-xl glass-sm flex items-center justify-center flex-shrink-0">
                {session?.user?.image ? <img src={session.user.image} alt={displayName} className="w-full h-full object-cover rounded-xl" /> : <User className="w-6 h-6 text-[#666]" />}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="font-display text-xl text-[#eee]">{displayName}</h1>
                <p className="text-xs text-[#666] mt-0.5">{email}</p>
                <div className="flex gap-4 mt-3 justify-center sm:justify-start">
                  <span className="text-xs text-[#666]">{(session?.user as { role?: string })?.role || _('dashboard.user')}</span>
                  <span className="text-xs text-[#666]">{_('profile.member')}</span>
                </div>
              </div>
              <Link href="/builder" className="glass-btn-primary text-xs px-4 py-2 rounded-lg self-center">{_('profile.newbuild')}</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: _('profile.builds'), value: stats.buildsCreated, icon: Cpu },
              { label: _('profile.totalspent'), value: `$${(stats.totalSpent / 1000).toFixed(1)}K`, icon: Zap },
              { label: _('profile.avgscore'), value: stats.avgScore, icon: Activity },
              { label: _('profile.wattage'), value: `${stats.totalWattage}W`, icon: HardDrive },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
                  className="glass-stat p-4 text-center"
                >
                  <Icon className="w-4 h-4 text-[#555] mx-auto mb-2" />
                  <span className="text-xl font-semibold block">{stat.value}</span>
                  <span className="text-[0.6rem] text-[#666] uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              )
            })}
          </div>

          {/* Builds + Badges */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel rounded-2xl p-4">
                <h2 className="text-xs uppercase tracking-wider text-[#666] mb-4 flex items-center gap-2">
                  <HardDrive className="w-3 h-3" /> {_('profile.collection')}
                </h2>
                {builds.length === 0 ? (
                  <div className="text-center py-8">
                    <Cpu className="w-8 h-8 text-[#333] mx-auto mb-3" />
                    <p className="text-xs text-[#666] mb-3">{_('profile.nobuilds')}</p>
                    <Link href="/builder" className="glass-btn-primary text-xs px-4 py-2 rounded-lg">{_('profile.create')}</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {builds.map((build) => (
                      <div key={build.id} className="glass-card-item p-3">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xs text-[#eee] truncate">{build.name}</h3>
                          <span className={`text-[0.5rem] uppercase tracking-wider ${build.isPublic ? 'text-green-400' : 'text-[#666]'}`}>
                            {build.isPublic ? _('dashboard.public') : _('dashboard.private')}
                          </span>
                        </div>
                        <div className="flex gap-3 text-[0.6rem] text-[#666] mb-3">
                          <span>${build.totalPrice.toLocaleString()}</span>
                          <span>{build.totalWattage}W</span>
                          {build.estimatedFps && <span>{_('profile.score')} {build.estimatedFps.score}</span>}
                        </div>
                        <div className="flex gap-1">
                          <Link href={`/builder?build=${build.id}`} className="glass-btn-sm rounded-md px-2 py-1 flex items-center gap-1"><Eye className="w-3 h-3" /> {_('profile.view')}</Link>
                          <Link href={`/builder?build=${build.id}`} className="glass-btn-sm rounded-md p-1"><Edit3 className="w-3 h-3" /></Link>
                          <button className="glass-btn-sm rounded-md p-1"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Badges */}
              <div className="glass-panel rounded-2xl p-4">
                <h2 className="text-xs uppercase tracking-wider text-[#666] mb-4 flex items-center gap-2">
                  <Award className="w-3 h-3" /> {_('profile.achievements')} <span className="ml-auto text-[0.5rem] text-[#666]">{badges.length}</span>
                </h2>
                {badges.length === 0 ? (
                  <div className="text-center py-8">
                    <Trophy className="w-6 h-6 text-[#333] mx-auto mb-3" />
                    <p className="text-xs text-[#666]">{_('profile.nobadges')}</p>
                    <p className="text-[0.55rem] text-[#555] mt-1">{_('profile.nobadges.desc')}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {badges.map((userBadge) => (
                      <BadgeCard key={userBadge.id} badge={userBadge.badge} earnedAt={userBadge.earnedAt} />
                    ))}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="glass-panel rounded-2xl p-4">
                <h2 className="text-xs uppercase tracking-wider text-[#666] mb-4 flex items-center gap-2">
                  <Settings className="w-3 h-3" /> {_('profile.settings')}
                </h2>
                <ToggleSetting label={_('profile.autosave')} description={_('profile.autosave.desc')} defaultOn />
                <ToggleSetting label={_('profile.publicprofile')} description={_('profile.publicprofile.desc')} />
                <ToggleSetting label={_('profile.notifications')} description={_('profile.notifications.desc')} />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
