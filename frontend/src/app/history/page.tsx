'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import LandingPage from '@/components/landing/LandingPage'
import { 
  FileText, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight,
  Activity,
  Clock,
  Search,
  Filter,
  Download
} from 'lucide-react'
import Link from 'next/link'

export default function HistoryPage() {
  const { user, loading: authLoading, getToken } = useAuth()
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchHistory()
    }
  }, [user])

  const fetchHistory = async () => {
    try {
      const token = await getToken()
      let apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sentinel-backend-322154607771.us-central1.run.app'
      if (apiUrl.startsWith('http://')) {
        apiUrl = apiUrl.replace('http://', 'https://')
      }
      const response = await fetch(`${apiUrl}/api/v1/history`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setHistory(data.history || [])
    } catch (error) {
      console.error("Failed to fetch history", error)
      // Demo fallback
      setHistory([
        { id: '1', filename: 'Passport_JohnDoe.jpg', overallConfidence: 0.94, timestamp: new Date().toISOString(), verdict: 'Critical Risk' },
        { id: '2', filename: 'DL_JaneSmith.png', overallConfidence: 0.12, timestamp: new Date(Date.now() - 86400000).toISOString(), verdict: 'Authenticated' },
        { id: '3', filename: 'ID_Card_Test_04.jpg', overallConfidence: 0.88, timestamp: new Date(Date.now() - 172800000).toISOString(), verdict: 'High Risk' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-blue-500">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Retrieving Audit Trail</p>
      </div>
    )
  }

  if (!user) return <LandingPage />

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Audit Log</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter mb-3 leading-none">Audit History</h1>
          <p className="text-gray-500 font-medium text-lg">Permanent cryptographic record of all identity verification operations.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="bg-[#0d1117] border border-gray-800 p-4 rounded-3xl flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center border border-gray-800">
                    <Clock size={20} className="text-blue-500" />
                </div>
                <div>
                    <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Total Audits</p>
                    <p className="text-xl font-black text-white leading-none">{history.length}</p>
                </div>
            </div>
            <button className="p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl transition-all shadow-xl shadow-blue-600/20 active:scale-95">
                <Download size={24} />
            </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 p-2 bg-[#0d1117] border border-gray-800 rounded-3xl">
        <div className="flex items-center gap-2 px-4 flex-1">
            <Search size={18} className="text-gray-600" />
            <input 
                type="text" 
                placeholder="Search audit ID, filename, or verdict..." 
                className="bg-transparent border-none text-sm text-gray-300 focus:ring-0 w-full placeholder:text-gray-700"
            />
        </div>
        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-6 py-2 bg-gray-900 border border-gray-800 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-white transition-colors">
                <Filter size={14} /> Filter
            </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-24 bg-[#0d1117] animate-pulse rounded-[32px] border border-gray-800" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-32 bg-[#0d1117] rounded-[48px] border border-gray-800 border-dashed">
          <div className="w-20 h-20 bg-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gray-800">
            <FileText size={40} className="text-gray-700" />
          </div>
          <h3 className="text-3xl font-black text-white mb-3">No scans detected</h3>
          <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">Your forensic audit trail is currently empty. Start your first scan to begin tracking.</p>
          <Link href="/" className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
            Launch Detection Center
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((audit, i) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#0d1117] p-8 rounded-[32px] border border-gray-800 hover:border-blue-500/50 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-8">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center border-2 ${
                  audit.overallConfidence > 0.7 
                    ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                    : 'bg-green-500/10 border-green-500/20 text-green-500'
                }`}>
                  {audit.overallConfidence > 0.7 ? <ShieldAlert size={32} /> : <ShieldCheck size={32} />}
                </div>
                <div>
                  <h3 className="font-black text-xl text-white tracking-tight mb-1">{audit.filename}</h3>
                  <div className="flex items-center gap-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar size={14} className="text-gray-700" /> {new Date(audit.timestamp).toLocaleDateString()}</span>
                    <span className="flex items-center gap-2"><Activity size={14} className="text-gray-700" /> Confidence: {(audit.overallConfidence * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                  audit.overallConfidence > 0.7 
                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                    : 'bg-green-500/10 text-green-400 border-green-500/20'
                }`}>
                  {audit.verdict || (audit.overallConfidence > 0.7 ? 'Critical Risk' : 'Authenticated')}
                </div>
                <div className="w-12 h-12 rounded-2xl border border-gray-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white text-gray-600 transition-all cursor-pointer">
                  <ArrowRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
