'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const [hovering, setHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const dotXSpring = useSpring(dotX, { damping: 35, stiffness: 350, mass: 0.25 })
  const dotYSpring = useSpring(dotY, { damping: 35, stiffness: 350, mass: 0.25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)

      const target = (e.target as HTMLElement).closest('a, button, [role="button"], input, textarea, select')
      setHovering(!!target)
    }

    const handleLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
      dotX.set(-100)
      dotY.set(-100)
      setHovering(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [cursorX, cursorY, dotX, dotY])

  if (typeof window === 'undefined') return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 0.6 : 0.25,
        }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="w-full h-full rounded-full border border-white" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-full h-full rounded-full bg-white" />
      </motion.div>
    </>
  )
}
