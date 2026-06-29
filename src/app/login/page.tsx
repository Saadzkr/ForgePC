'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { useSound } from '@/components/providers/sound-provider'

export default function LoginPage() {
  const router = useRouter()
  const { playSuccess, playError } = useSound()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) { setError('Invalid credentials'); playError(); setLoading(false) }
    else { playSuccess(); router.push('/dashboard') }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-sm glass-panel rounded-2xl p-8"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="logo-text font-display text-xl block mb-2">
            Forge<span className="logo-dot inline-block mx-0.5 align-middle" />PC
          </Link>
          <p className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">Sign In</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[0.55rem] tracking-wider uppercase text-muted-foreground block mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="glass-input text-sm w-full px-3 py-2 rounded-lg" placeholder="user@domain.com" required />
          </div>
          <div>
            <label className="text-[0.55rem] tracking-wider uppercase text-muted-foreground block mb-1.5">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="glass-input text-sm w-full px-3 py-2 rounded-lg" placeholder="••••••••" required />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="glass-sm rounded-lg flex items-center gap-2 p-2"
            >
              <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
              <span className="text-[0.55rem] text-red-400">{error}</span>
            </motion.div>
          )}

          <button type="submit" disabled={loading}
            className="glass-btn-primary w-full rounded-lg text-xs py-3 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 pt-4 text-center glass-divider">
          <p className="text-xs text-muted-foreground">
            No account?{' '}
            <Link href="/signup" className="text-foreground underline underline-offset-4 hover:text-white transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
