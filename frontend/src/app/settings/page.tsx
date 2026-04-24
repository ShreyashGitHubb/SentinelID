'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Globe, 
  Bell, 
  Key, 
  User, 
  ShieldCheck,
  Save,
  ExternalLink,
  Activity,
  Cpu,
  Lock,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import LandingPage from '@/components/landing/LandingPage'

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth()
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/...')
  const [apiKey, setApiKey] = useState('sk_live_sentinel_....................')

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-blue-500">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Loading Config</p>
      </div>
    )
  }

  if (!user) return <LandingPage />

  return (
    <div className="max-w-6xl mx-auto py-12 px-8">
      <header className="mb-12">
        <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Configuration</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter mb-3 leading-none">System Settings</h1>
        <p className="text-gray-500 font-medium text-lg">Manage your forensic infrastructure, API keys, and notification protocols.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar (Mobile Hidden) */}
        <div className="lg:col-span-3 space-y-2 hidden lg:block">
            <SettingsTab active icon={<User size={16} />} label="Admin Profile" />
            <SettingsTab icon={<Globe size={16} />} label="API & Integrations" />
            <SettingsTab icon={<ShieldCheck size={16} />} label="Security Policy" />
            <SettingsTab icon={<Bell size={16} />} label="Alert Routing" />
        </div>

        {/* Content */}
        <div className="lg:col-span-9 space-y-12">
            {/* Profile Section */}
            <section className="bg-[#0d1117] border border-gray-800 rounded-[40px] p-10">
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/5">
                    <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                        <User className="text-blue-500" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white leading-none mb-2">Admin Profile</h3>
                        <p className="text-sm text-gray-500">Identity details for the primary forensic officer.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Full Name</label>
                        <input 
                            type="text" 
                            defaultValue={user.displayName || 'Forensic Admin'} 
                            className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-3 text-sm text-white focus:border-blue-500 focus:ring-0 transition-colors"
                            disabled
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Email Address</label>
                        <input 
                            type="email" 
                            defaultValue={user.email || ''} 
                            className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-3 text-sm text-white focus:border-blue-500 focus:ring-0 transition-colors"
                            disabled
                        />
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="bg-[#0d1117] border border-gray-800 rounded-[40px] p-10">
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/5">
                    <div className="w-14 h-14 bg-purple-600/10 border border-purple-500/20 rounded-2xl flex items-center justify-center">
                        <Cpu className="text-purple-500" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white leading-none mb-2">API & Webhooks</h3>
                        <p className="text-sm text-gray-500">Connect SentinelID to your enterprise ecosystem.</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Public API Key</label>
                            <span className="text-[9px] bg-green-500/10 text-green-500 px-3 py-1 rounded-full border border-green-500/20 font-black uppercase tracking-widest">Active</span>
                        </div>
                        <div className="flex gap-3">
                            <input 
                                type="password" 
                                value={apiKey} 
                                onChange={(e) => setApiKey(e.target.value)}
                                className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl px-5 py-3 text-sm text-white font-mono"
                            />
                            <button className="bg-gray-800 hover:bg-gray-700 px-5 rounded-2xl text-gray-400 hover:text-white transition-all">
                                <Key size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">Alert Webhook URL</label>
                        <input 
                            type="text" 
                            value={webhookUrl} 
                            onChange={(e) => setWebhookUrl(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-5 py-3 text-sm text-white"
                            placeholder="https://hooks.yourdomain.com/sentinel"
                        />
                        <p className="text-[10px] text-gray-600 leading-relaxed uppercase tracking-widest font-black">SentinelID will POST a JSON payload whenever confidence exceeds 0.85.</p>
                    </div>
                </div>
            </section>

            {/* System Controls */}
            <section className="bg-[#0d1117] border border-gray-800 rounded-[40px] p-10">
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/5">
                    <div className="w-14 h-14 bg-amber-600/10 border border-amber-500/20 rounded-2xl flex items-center justify-center">
                        <Lock className="text-amber-500" size={28} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white leading-none mb-2">Security Defaults</h3>
                        <p className="text-sm text-gray-500">Global automated verification parameters.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <ToggleItem 
                        title="Strict Mode" 
                        desc="Require 0.98+ confidence for automated document approval."
                        active
                    />
                    <ToggleItem 
                        title="AI Analysis Logic" 
                        desc="Utilize Gemini 1.5 Enterprise for natural language audit explanations."
                        active
                    />
                    <ToggleItem 
                        title="Spatial Anomaly Filter" 
                        desc="Auto-reject scans with significant spatial distortion (>40% variance)."
                    />
                </div>
            </section>

            <div className="flex justify-end gap-4 pt-6">
                <button className="px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-white/5 transition-all">
                    Discard Changes
                </button>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                    <Save size={18} />
                    Deploy Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

function SettingsTab({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <button className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all ${
            active ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
        }`}>
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-xs font-black uppercase tracking-widest">{label}</span>
            </div>
            {active && <ChevronRight size={14} className="text-blue-500" />}
        </button>
    )
}

function ToggleItem({ title, desc, active = false }: { title: string, desc: string, active?: boolean }) {
    return (
        <div className="flex items-center justify-between p-6 bg-gray-900/50 rounded-[32px] border border-gray-800 hover:border-gray-700 transition-all">
            <div>
                <p className="font-black text-white mb-1 tracking-tight">{title}</p>
                <p className="text-xs text-gray-500 font-medium">{desc}</p>
            </div>
            <div className={`w-14 h-8 rounded-full relative p-1 transition-colors duration-300 cursor-pointer ${
                active ? 'bg-blue-600' : 'bg-gray-800'
            }`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                    active ? 'translate-x-6' : 'translate-x-0'
                }`} />
            </div>
        </div>
    )
}
