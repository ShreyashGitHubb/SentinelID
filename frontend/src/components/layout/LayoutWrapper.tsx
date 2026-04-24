'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()

  // If loading, show a centered spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-[var(--background)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--primary-container)] border-t-[var(--primary)] rounded-full animate-spin"></div>
          <p className="text-sm font-medium animate-pulse text-[var(--secondary)]">Initializing SentinelID...</p>
        </div>
      </div>
    )
  }

  // Paths that don't need the dashboard layout (e.g., login/landing if not logged in)
  const isMarketingPage = pathname === '/' && !user

  if (isMarketingPage || !user) {
    return <main className="min-h-screen w-full bg-[var(--background)]">{children}</main>
  }

  return (
    <div className="flex h-screen w-screen bg-[var(--background)] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
