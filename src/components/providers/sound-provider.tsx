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

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch {
      return null
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

function playClickSound() {
  const ctx = getCtx()
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'square'
  o.frequency.setValueAtTime(800, ctx.currentTime)
  o.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03)
  g.gain.setValueAtTime(0.12, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)
  o.connect(g).connect(ctx.destination)
  o.start(ctx.currentTime)
  o.stop(ctx.currentTime + 0.05)
}

function playHoverSound() {
  const ctx = getCtx()
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(1500, ctx.currentTime)
  g.gain.setValueAtTime(0.03, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02)
  o.connect(g).connect(ctx.destination)
  o.start(ctx.currentTime)
  o.stop(ctx.currentTime + 0.02)
}

function playSelectSound() {
  const ctx = getCtx()
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(220, ctx.currentTime)
  o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1)
  g.gain.setValueAtTime(0.18, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
  o.connect(g).connect(ctx.destination)
  o.start(ctx.currentTime)
  o.stop(ctx.currentTime + 0.15)
}

function playSuccessSound() {
  const ctx = getCtx()
  if (!ctx) return
  const notes = [523.25, 659.25, 783.99]
  notes.forEach((freq, i) => {
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)
    g.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
    g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.08 + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.2)
    o.connect(g).connect(ctx.destination)
    o.start(ctx.currentTime + i * 0.08)
    o.stop(ctx.currentTime + i * 0.08 + 0.2)
  })
}

function playErrorSound() {
  const ctx = getCtx()
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sawtooth'
  o.frequency.setValueAtTime(300, ctx.currentTime)
  o.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.25)
  g.gain.setValueAtTime(0.12, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
  o.connect(g).connect(ctx.destination)
  o.start(ctx.currentTime)
  o.stop(ctx.currentTime + 0.3)
}

function playToggleSound() {
  const ctx = getCtx()
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(600, ctx.currentTime)
  o.frequency.setValueAtTime(900, ctx.currentTime + 0.02)
  g.gain.setValueAtTime(0.1, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
  o.connect(g).connect(ctx.destination)
  o.start(ctx.currentTime)
  o.stop(ctx.currentTime + 0.06)
}

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
  const initRef = useRef(false)

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

  const play = useCallback((type: SoundType) => {
    if (muted) return
    PLAY_FN[type]?.()
  }, [muted])

  const toggleMute = useCallback(() => setMuted(m => !m), [])

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
