'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Cpu, Activity, Grid3X3,
  List, PlusCircle, LogOut, User,
  ChevronRight, Trash2, Eye, Share2
} from 'lucide-react'
import { useSound } from '@/components/providers/sound-provider'

type BuildData = {
  id: string; name: string; totalPrice: number; totalWattage: number
  estimatedFps: { score: number } | null; createdAt: string; isPublic: boolean
}

type ActivityData = {
  id: string; type: string; title: string; message: string; createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { playClick, playSelect, playToggle, playSuccess, playError } = useSound()
  const [builds, setBuilds] = useState<BuildData[]>([])
  const [activities, setActivities] = useState<ActivityData[]>([])
  const [stats, setStats] = useState({ totalBuilds: 0, totalSpent: 0, avgWattage: 0, achievements: 0 })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return }
    if (status !== 'authenticated') return

    Promise.all([
      fetch('/api/builds').then((r) => r.ok ? r.json() : []),
      fetch('/api/user/stats').then((r) => r.ok ? r.json() : { totalBuilds: 0, totalSpent: 0, avgWattage: 0, achievements: 0 }),
      fetch('/api/user/activities').then((r) => r.ok ? r.json() : []),
    ]).then(([b, s, a]) => {
      setBuilds(b as BuildData[])
      setStats({ totalBuilds: (s as any).totalBuilds || 0, totalSpent: (s as any).totalSpent || 0, avgWattage: (s as any).avgWattage || 0, achievements: (s as any).achievements || 0 })
      setActivities(a.slice(0, 8))
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [status, router])

  const handleDelete = useCallback(async (id: string) => {
    const res = await fetch(`/api/builds/${id}`, { method: 'DELETE' })
    if (res.ok) { setBuilds((prev) => prev.filter((b) => b.id !== id)); playSuccess() }
    else playError()
  }, [playSuccess, playError])

  const handleTogglePublic = useCallback(async (id: string, isPublic: boolean) => {
    const res = await fetch(`/api/builds/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ isPublic: !isPublic }) })
    if (res.ok) { setBuilds((prev) => prev.map((b) => b.id === id ? { ...b, isPublic: !isPublic } : b)); playToggle() }
  }, [playToggle])

  if (status === 'loading' || loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <motion.div key={n} className="w-2 h-2 bg-[#444]"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1, delay: n * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-[#eee]">
      <header className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <Link href="/" className="logo-text font-display text-base sm:text-lg tracking-tight select-none">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/builder" className="glass-btn-primary text-[0.5rem] px-3 py-1.5 rounded-lg"><PlusCircle className="w-3 h-3" /> New Build</Link>
            <div className="flex glass-sm rounded-md overflow-hidden">
              <button onClick={() => { playSelect(); setViewMode('grid') }} className={`p-2 ${viewMode === 'grid' ? 'bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[rgba(255,255,255,0.03)]'}`}>
                <Grid3X3 className="w-3 h-3" />
              </button>
              <button onClick={() => { playSelect(); setViewMode('list') }} className={`p-2 ${viewMode === 'list' ? 'bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[rgba(255,255,255,0.03)]'}`}>
                <List className="w-3 h-3" />
              </button>
            </div>
            <button onClick={() => { playClick(); signOut() }} className="glass-btn-sm rounded-md flex items-center gap-1">
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[0.6rem] tracking-[0.25em] text-[#555] uppercase mb-1">Welcome back</p>
              <h1 className="font-display text-3xl text-[#eee]">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1.5 glass-sm rounded-md">
                <User className="w-3 h-3 text-[#555]" />
                <span className="text-xs text-[#888]">{session?.user?.name || 'User'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Builds', value: stats.totalBuilds, icon: Cpu },
              { label: 'Total Spent', value: `$${stats.totalSpent.toLocaleString()}`, icon: Activity },
              { label: 'Avg Wattage', value: `${stats.avgWattage}W`, icon: Activity },
              { label: 'Achievements', value: stats.achievements, icon: Activity },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-stat p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[0.55rem] text-[#555] tracking-wider uppercase">{stat.label}</p>
                    <Icon className="w-3.5 h-3.5 text-[#444]" />
                  </div>
                  <p className="text-xl text-[#eee]">{stat.value}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xs tracking-wider uppercase text-[#666]">Build Collection</h2>
                <span className="text-[0.5rem] text-[#444]">{builds.length} build{builds.length !== 1 ? 's' : ''}</span>
              </div>
              {builds.length === 0 ? (
                <div className="text-center py-12">
                  <Cpu className="w-8 h-8 text-[#333] mx-auto mb-3" />
                  <p className="text-sm text-[#666] mb-4">No builds yet</p>
                  <Link href="/builder" className="glass-btn-primary text-xs px-4 py-2 rounded-lg">Create Your First Build</Link>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {builds.map((build, i) => (
                    <motion.div key={build.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                      className="glass-card-item p-4 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm text-[#ddd] truncate">{build.name}</h3>
                        <span className={`text-[0.45rem] uppercase tracking-wider ${build.isPublic ? 'text-green-500' : 'text-[#555]'}`}>
                          {build.isPublic ? 'Public' : 'Private'}
                        </span>
                      </div>
                      <div className="flex gap-3 text-[0.55rem] text-[#666] mb-3">
                        <span>${build.totalPrice.toLocaleString()}</span>
                        <span>{build.totalWattage}W</span>
                        <span>{new Date(build.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { playToggle(); handleTogglePublic(build.id, build.isPublic) }} className="glass-btn-sm rounded-md">
                          <Share2 className="w-3 h-3" />
                        </button>
                        <Link href={`/builder?build=${build.id}`} className="glass-btn-sm rounded-md">
                          <Eye className="w-3 h-3" />
                        </Link>
                        <button onClick={() => { playClick(); handleDelete(build.id) }} className="glass-btn-sm rounded-md">
                          <Trash2 className="w-3 h-3 text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-[rgba(255,255,255,0.04)]">
                  {builds.map((build, i) => (
                    <motion.div key={build.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                      className="flex items-center justify-between py-3 group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#ddd] truncate">{build.name}</p>
                        <div className="flex gap-4 text-[0.5rem] text-[#555] mt-0.5">
                          <span>${build.totalPrice.toLocaleString()}</span>
                          <span>{build.totalWattage}W</span>
                          <span>{new Date(build.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { playToggle(); handleTogglePublic(build.id, build.isPublic) }} className="glass-btn-sm rounded-md p-1.5"><Share2 className="w-3 h-3" /></button>
                        <Link href={`/builder?build=${build.id}`} className="glass-btn-sm rounded-md p-1.5"><Eye className="w-3 h-3" /></Link>
                        <button onClick={() => { playClick(); handleDelete(build.id) }} className="glass-btn-sm rounded-md p-1.5"><Trash2 className="w-3 h-3 text-red-400" /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="glass-panel rounded-2xl p-5">
              <h2 className="text-xs tracking-wider uppercase text-[#666] mb-5">Recent Activity</h2>
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-[#555]">No activity yet</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {activities.map((act, i) => (
                    <motion.div key={act.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="border-l-2 border-[rgba(255,255,255,0.15)] pl-3 py-0.5"
                    >
                      <p className="text-xs text-[#aaa]">{act.title}</p>
                      <p className="text-[0.5rem] text-[#555] mt-0.5">{new Date(act.createdAt).toLocaleString()}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
