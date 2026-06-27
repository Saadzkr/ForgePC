'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import {
  Menu, X, Cpu, HardDrive, Monitor, Activity, User,
  LogOut, Settings, Home, BookOpen, ChevronRight
} from 'lucide-react'

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/builder', label: 'Builder', icon: Cpu },
  { href: '/dashboard', label: 'Dashboard', icon: Monitor },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/login', label: 'Login', icon: Activity },
  { href: '/signup', label: 'Sign Up', icon: BookOpen },
]

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const { data: session } = useSession()

  const toggle = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (!isAnimating) return
    const timer = setTimeout(() => setIsAnimating(false), 400)
    return () => clearTimeout(timer)
  }, [isAnimating])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <motion.button
        onClick={toggle}
        className="fixed top-6 right-6 z-50 w-12 h-12 flex items-center justify-center btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-[#eee]" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5 text-[#eee]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={toggle}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'tween',
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-40 bg-black border-l border-[#1a1a1a]"
              style={{
                boxShadow: '-10px 0 40px hsl(0 0% 0% / 0.5)',
              }}
            >
              <div className="h-full flex flex-col">
                <div className="p-6 border-b border-[#1a1a1a]">
                  <Link href="/" className="text-sm tracking-wide" onClick={toggle}>
                    <span className="text-[#eee]">Forge</span>{' '}
                    <span className="text-[#666]">PC</span>
                  </Link>
                </div>

                <nav className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {menuItems.map((item, i) => {
                      const Icon = item.icon
                      const isActive = typeof window !== 'undefined' &&
                        window.location.pathname === item.href

                      if (item.href === '/login' && session) return null
                      if (item.href === '/signup' && session) return null
                      if ((item.href === '/dashboard' || item.href === '/profile') && !session) return null

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                          <Link
                            href={item.href}
                            onClick={toggle}
                            className={`
                              flex items-center gap-4 p-3 group transition-all duration-150 rounded-lg
                              ${isActive
                                ? 'bg-[#111] border border-[#1a1a1a]'
                                : 'hover:bg-[#111] border border-transparent'
                              }
                            `}
                          >
                            <div className={`
                              w-8 h-8 flex items-center justify-center rounded
                              ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#111]'}
                            `}>
                              <Icon className={`w-4 h-4 ${isActive ? 'text-[#eee]' : 'text-[#666] group-hover:text-[#eee]'}`} />
                            </div>
                            <div className="flex-1">
                              <span className={`
                                text-sm block
                                ${isActive ? 'text-[#eee]' : 'text-[#666] group-hover:text-[#eee]'}
                              `}>
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#666]' : 'text-[#666]'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </nav>

                <div className="border-t border-[#1a1a1a] p-4">
                  {session ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2">
                        <div className="w-8 h-8 bg-[#111] flex items-center justify-center rounded">
                          <User className="w-4 h-4 text-[#eee]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#eee] truncate">
                            {session.user?.name || 'User'}
                          </p>
                          <p className="text-xs text-[#666] truncate">
                            {session.user?.email || ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href="/profile"
                          onClick={toggle}
                          className="btn text-sm flex-1 py-2 flex items-center justify-center gap-2"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          Settings
                        </Link>
                        <button
                          onClick={() => { toggle(); signOut() }}
                          className="btn text-sm flex-1 py-2 flex items-center justify-center gap-2"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        href="/login"
                        onClick={toggle}
                        className="btn text-sm flex-1 py-2 text-center"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={toggle}
                        className="btn text-sm flex-1 py-2 text-center"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
