'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { useSound } from '@/components/providers/sound-provider'
import { useLocale } from '@/components/providers/locale-provider'
import { t } from '@/lib/i18n'

function PasswordStrengthBar({ password }: { password: string }) {
  const { locale } = useLocale()
  const _ = (k: string) => t(k, locale)
  const strength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }, [password])

  const labels = [_('signup.weak'), _('signup.fair'), _('signup.good'), _('signup.strong'), _('signup.verystrong')]

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`h-1 flex-1 transition-colors duration-300 ${
            i < strength ? 'bg-foreground' : 'bg-border'
          }`} />
        ))}
      </div>
      {password.length > 0 && (
        <p className="text-[0.5rem] text-muted-foreground/60">{labels[strength - 1] || ''}</p>
      )}
    </div>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const { playSuccess, playError } = useSound()
  const { locale } = useLocale()
  const _ = (k: string) => t(k, locale)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) { const d = await res.json(); setError(d.error || 'Registration failed'); playError(); setLoading(false); return }
      playSuccess()
      router.push('/login')
    } catch (e) { setError('Connection error'); playError(); setLoading(false) }
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
          <p className="text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">{_('signup.title')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[0.55rem] tracking-wider uppercase text-muted-foreground block mb-1.5">{_('signup.name')}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="glass-input text-sm w-full px-3 py-2 rounded-lg" placeholder={_('signup.name.placeholder')} required />
          </div>
          <div>
            <label className="text-[0.55rem] tracking-wider uppercase text-muted-foreground block mb-1.5">{_('signup.email')}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="glass-input text-sm w-full px-3 py-2 rounded-lg" placeholder={_('signup.email.placeholder')} required />
          </div>
          <div>
            <label className="text-[0.55rem] tracking-wider uppercase text-muted-foreground block mb-1.5">{_('signup.password')}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="glass-input text-sm w-full px-3 py-2 rounded-lg" placeholder="••••••••" required minLength={8} />
            <div className="mt-2"><PasswordStrengthBar password={password} /></div>
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
            {loading ? _('signup.loading') : _('signup.button')}
          </button>
        </form>

        <div className="mt-6 pt-4 text-center glass-divider">
          <p className="text-xs text-muted-foreground">
            {_('signup.haveaccount')}{' '}
            <Link href="/login" className="text-foreground underline underline-offset-4 hover:text-white transition-colors">
              {_('signup.signin')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
