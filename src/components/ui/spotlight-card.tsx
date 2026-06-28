'use client'

import { useRef, useState } from 'react'

export function GlowCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMouse(e: React.MouseEvent) {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouse}
      className="relative w-80 h-48 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] group cursor-default"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.06), transparent 60%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(250px circle at ${pos.x}px ${pos.y}px, rgba(212,175,55,0.15), transparent 50%)`,
        }}
      />
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
        <div>
          <p className="text-xs text-white/60">Premium</p>
          <p className="text-sm text-white/80 mt-1">Custom PC Component</p>
        </div>
      </div>
    </div>
  )
}
