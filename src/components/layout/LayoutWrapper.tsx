'use client'

import BurgerMenu from '@/components/layout/BurgerMenu'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BurgerMenu />
      {children}
    </>
  )
}