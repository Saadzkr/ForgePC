'use client'

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

type TransitionContextType = {
  isNavigating: boolean
}

const TransitionContext = createContext<TransitionContextType>({ isNavigating: false })

export function TransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const navigatingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const startTimeRef = useRef(0)
  const prevPath = useRef(pathname)

  const hide = useCallback(() => {
    setShow(false)
    navigatingRef.current = false
  }, [])

  // Detect navigation completion via pathname change
  useEffect(() => {
    if (prevPath.current !== pathname && navigatingRef.current) {
      clearTimeout(timerRef.current)
      const elapsed = Date.now() - startTimeRef.current
      const remaining = Math.max(0, 600 - elapsed)
      timerRef.current = setTimeout(hide, remaining)
    }
    prevPath.current = pathname
  }, [pathname, hide])

  // Intercept all internal link clicks
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as Element).closest('a[href]')
      if (!anchor) return
      const href = (anchor as HTMLAnchorElement).href
      if (!href) return
      try {
        const url = new URL(href)
        if (url.origin !== window.location.origin) return
        if ((anchor as HTMLAnchorElement).target === '_blank') return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        if (navigatingRef.current) return
        navigatingRef.current = true
        startTimeRef.current = Date.now()
        setShow(true)
      } catch { /* */ }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Intercept browser back/forward
  useEffect(() => {
    function handlePopState() {
      if (navigatingRef.current) return
      navigatingRef.current = true
      startTimeRef.current = Date.now()
      setShow(true)
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => { clearTimeout(timerRef.current) }
  }, [])

  return (
    <TransitionContext.Provider value={{ isNavigating: show }}>
      {children}
      {show && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-accent-gold/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative flex items-baseline gap-1">
                <span className="logo-text text-4xl sm:text-5xl text-white">Forge</span>
                <span className="logo-dot inline-block mx-0.5 align-middle" />
                <span className="logo-text text-4xl sm:text-5xl text-white">PC</span>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-accent-gold/60 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 bg-accent-gold/60 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 bg-accent-gold/60 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  return useContext(TransitionContext)
}
