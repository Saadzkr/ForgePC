'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'

type SoundType = 'click' | 'hover' | 'select' | 'success' | 'error' | 'toggle'

type SoundContextType = {
  muted: boolean
  toggleMute: () => void
  play: (type: SoundType) => void
  playClick: () => void
  playHover: () => void
  playSelect: () => void
  playSuccess: () => void
  playError: () => void
  playToggle: () => void
}

const SoundContext = createContext<SoundContextType | null>(null)

let audioCtx: AudioContext | null = null
let readyResolve: (() => void) | null = null
let ctxReady = false

function initAudio() {
  if (audioCtx) return
  if (typeof window === 'undefined') return
  try {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioCtx.onstatechange = () => {
      if (audioCtx?.state === 'running' && !ctxReady) {
        ctxReady = true
        readyResolve?.()
        readyResolve = null
      }
    }
  } catch {
    return
  }
}

function ensureReady(): Promise<void> {
  if (ctxReady) return Promise.resolve()
  if (!audioCtx) return Promise.resolve()
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  if (audioCtx.state === 'running') {
    ctxReady = true
    return Promise.resolve()
  }
  return new Promise((resolve) => {
    readyResolve = resolve
  })
}

function schedule(fn: (ctx: AudioContext, t: number) => void) {
  if (!audioCtx) return
  fn(audioCtx, audioCtx.currentTime)
}

function playClickSound() { schedule((ctx, t) => {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'square'
  o.frequency.setValueAtTime(800, t)
  o.frequency.exponentialRampToValueAtTime(400, t + 0.03)
  g.gain.setValueAtTime(0.12, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + 0.05)
})}

function playHoverSound() { schedule((ctx, t) => {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(1500, t)
  g.gain.setValueAtTime(0.03, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.02)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + 0.02)
})}

function playSelectSound() { schedule((ctx, t) => {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(220, t)
  o.frequency.exponentialRampToValueAtTime(440, t + 0.1)
  g.gain.setValueAtTime(0.18, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.15)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + 0.15)
})}

function playSuccessSound() { schedule((ctx, t) => {
  const notes = [523.25, 659.25, 783.99]
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    const nt = t + i * 0.08
    o.frequency.setValueAtTime(freq, nt)
    g.gain.setValueAtTime(0, nt)
    g.gain.linearRampToValueAtTime(0.15, nt + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, nt + 0.2)
    o.connect(g).connect(ctx.destination)
    o.start(nt)
    o.stop(nt + 0.2)
  })
})}

function playErrorSound() { schedule((ctx, t) => {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sawtooth'
  o.frequency.setValueAtTime(300, t)
  o.frequency.exponentialRampToValueAtTime(150, t + 0.25)
  g.gain.setValueAtTime(0.12, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.3)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + 0.3)
})}

function playToggleSound() { schedule((ctx, t) => {
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(600, t)
  o.frequency.setValueAtTime(900, t + 0.02)
  g.gain.setValueAtTime(0.1, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.06)
  o.connect(g).connect(ctx.destination)
  o.start(t)
  o.stop(t + 0.06)
})}

const PLAY_FN: Record<SoundType, () => void> = {
  click: playClickSound,
  hover: playHoverSound,
  select: playSelectSound,
  success: playSuccessSound,
  error: playErrorSound,
  toggle: playToggleSound,
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(true)
  const [ready, setReady] = useState(false)
  const inited = useRef(false)

  useEffect(() => {
    const stored = localStorage.getItem('forge-sound-muted')
    if (stored !== null) {
      setMuted(stored === 'true')
    } else {
      setMuted(true)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem('forge-sound-muted', String(muted))
  }, [muted, ready])

  useEffect(() => {
    function warmup() {
      if (inited.current) return
      inited.current = true
      initAudio()
      ensureReady()
      document.removeEventListener('pointerdown', warmup)
      document.removeEventListener('keydown', warmup)
    }
    document.addEventListener('pointerdown', warmup, { once: true })
    document.addEventListener('keydown', warmup, { once: true })
    return () => {
      document.removeEventListener('pointerdown', warmup)
      document.removeEventListener('keydown', warmup)
    }
  }, [])

  const play = useCallback(async (type: SoundType) => {
    if (muted) return
    await ensureReady()
    PLAY_FN[type]?.()
  }, [muted])

  const toggleMute = useCallback(() => {
    if (!inited.current) {
      inited.current = true
      initAudio()
      ensureReady()
    }
    setMuted(m => !m)
  }, [])

  const value: SoundContextType = {
    muted,
    toggleMute,
    play,
    playClick: useCallback(() => play('click'), [play]),
    playHover: useCallback(() => play('hover'), [play]),
    playSelect: useCallback(() => play('select'), [play]),
    playSuccess: useCallback(() => play('success'), [play]),
    playError: useCallback(() => play('error'), [play]),
    playToggle: useCallback(() => play('toggle'), [play]),
  }

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return ctx
}
