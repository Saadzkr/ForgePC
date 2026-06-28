'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, useInView, type MotionValue } from 'framer-motion'

const ScrollCtx = createContext<{ progress: MotionValue<number> | null }>({ progress: null })

export function ContainerStagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ContainerAnimated({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ContainerScroll({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <ScrollCtx.Provider value={{ progress }}>
      <div ref={ref} className={`relative ${className}`}>
        {children}
      </div>
    </ScrollCtx.Provider>
  )
}

export function ContainerSticky({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`sticky top-0 h-screen ${className}`}>{children}</div>
}

export function GalleryContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex h-full gap-3 sm:gap-4 px-4 sm:px-6 max-w-7xl mx-auto items-start pt-24 sm:pt-28 ${className}`}>
      {children}
    </div>
  )
}

export function GalleryCol({
  children,
  yRange = ['0%', '0%'],
  className = '',
}: {
  children: ReactNode
  yRange?: [string, string]
  className?: string
}) {
  const { progress } = useContext(ScrollCtx)
  const y = useTransform(progress!, [0, 1], yRange as [string, string])

  return (
    <motion.div
      style={{ y }}
      className={`flex flex-col gap-3 sm:gap-4 flex-1 min-w-0 ${className}`}
    >
      {children}
    </motion.div>
  )
}
