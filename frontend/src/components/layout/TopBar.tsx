'use client'

import React from 'react'
import { Bell, Search, UserCircle, Globe, ChevronDown } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function TopBar() {
  const { user } = useAuth()

  return (
    <header className="h-20 border-b border-gray-800 bg-[#0d1117]/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center bg-gray-900 px-4 py-2 rounded-xl w-[400px] border border-gray-800 focus-within:border-blue-500/50 transition-all">
        <Search className="text-gray-500" size={16} />
        <input 
          type="text" 
          placeholder="Search detection reports, logs, or assets..." 
          className="bg-transparent border-none outline-none ml-3 w-full text-xs text-gray-300 placeholder:text-gray-600"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">System Operational</span>
        </div>

        <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/5 rounded-lg transition-all relative text-gray-400 hover:text-white">
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full ring-2 ring-[#0d1117]"></span>
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-gray-400 hover:text-white">
                <Globe size={18} />
            </button>
        </div>

        <div className="h-6 w-[1px] bg-gray-800"></div>

        <button className="flex items-center gap-3 pl-2 pr-2 py-1.5 hover:bg-white/5 rounded-xl transition-all group">
          <div className="relative">
            {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    {user?.displayName?.charAt(0) || 'A'}
                </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d1117]"></div>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                {user?.displayName || 'Security Admin'}
            </p>
            <p className="text-[10px] text-gray-500 font-medium">Enterprise Tier</p>
          </div>
          <ChevronDown size={14} className="text-gray-600 group-hover:text-gray-400" />
        </button>
      </div>
    </header>
  )
}
