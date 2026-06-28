'use client'

import { useRef, useState, type ReactNode } from 'react'

interface SpotlightProps {
  children: ReactNode
  className?: string
  size?: number
  whiteOpacity?: number
  goldOpacity?: number
  disabled?: boolean
}

export default function Spotlight({
  children,
  className = '',
  size = 500,
  whiteOpacity = 0.08,
  goldOpacity = 0.12,
  disabled = false,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouse(e: React.MouseEvent) {
    if (disabled) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,${whiteOpacity}), transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(${Math.round(size * 0.5)}px circle at ${pos.x}px ${pos.y}px, rgba(212,175,55,${goldOpacity}), transparent 50%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
