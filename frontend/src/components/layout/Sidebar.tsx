'use client'

import React from 'react'
import { Shield, LayoutDashboard, History, Settings, LogOut, ChevronRight, Zap, Database } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navItems = [
  { icon: LayoutDashboard, label: 'Detection Center', href: '/' },
  { icon: History, label: 'Audit History', href: '/history' },
  { icon: Database, label: 'Asset Library', href: '/assets' },
  { icon: Settings, label: 'System Config', href: '/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()

  return (
    <aside className="w-72 h-screen bg-[#0d1117] flex flex-col border-r border-gray-800 text-gray-300">
      <div className="flex items-center gap-3 px-6 py-10">
        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
          <Shield className="text-white" size={24} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-white leading-none">SentinelID</h1>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mt-1">Enterprise Forensic</span>
        </div>
      </div>

      <div className="px-4 mb-6">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Operations</p>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group",
                  active 
                    ? "bg-white/10 text-white" 
                    : "hover:bg-white/5 text-gray-500 hover:text-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={active ? "text-blue-500" : "group-hover:text-gray-300"} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                {active && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="px-4 mt-auto pb-8 space-y-4">
        <div className="p-4 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-600/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
                <Zap size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Upgrade</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">Get advanced ViT models and higher API limits.</p>
            <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all">
                Learn More
            </button>
        </div>

        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all group"
        >
          <LogOut size={18} className="group-hover:text-red-400" />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
