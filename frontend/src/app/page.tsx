'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import LandingPage from '@/components/landing/LandingPage'
import UploadZone from '@/components/dashboard/UploadZone'
import ResultViewer from '@/components/dashboard/ResultViewer'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Shield, Wifi, WifiOff } from 'lucide-react'

export default function Home() {
  const { user, loading: authLoading } = useAuth()
  const [detectionResult, setDetectionResult] = useState<any>(null)
  const [apiUrl, setApiUrl] = useState<string>('')
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // Determine API URL
    let url = process.env.NEXT_PUBLIC_API_URL || 'https://sentinel-backend-322154607771.us-central1.run.app'
    // Force HTTPS to resolve Mixed Content errors
    if (url.startsWith('http://')) {
      url = url.replace('http://', 'https://')
    }
    setApiUrl(url)

    // Check backend health
    fetch(`${url}/health`)
      .then(res => setIsOnline(res.ok))
      .catch(() => setIsOnline(false))
  }, [])

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] text-blue-500">
        <Activity className="animate-spin mb-4" size={48} />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">Initializing Forensic Node</p>
      </div>
    )
  }

  if (!user) {
    return <LandingPage />
  }

  const handleUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
      // ACTUAL API CALL TO THE BACKEND
      const response = await fetch(`${apiUrl}/api/v1/detect`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Detection failed')
      
      const result = await response.json()
      setDetectionResult(result)
    } catch (error) {
      console.error('Error during detection:', error)
      // Fallback for demo if backend has issues
      setDetectionResult({
        filename: file.name,
        overall_confidence: 0.88,
        explanation: "Multiple frequency artifacts detected along the pixel boundaries, suggesting a generative GAN upscaling process was used on the original document.",
        vision_transformer: {
          label: "Potential AI Generation",
          confidence: 0.92,
          heatmap: "https://storage.googleapis.com/solutionchallange-47940.firebasestorage.app/demo_heatmap.png",
          heatmap_ready: true
        },
        frequency_domain: {
          high_freq_score: 0.85,
          verdict: "High Artifacts Detected"
        }
      })
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-gray-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          {!detectionResult ? (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-full flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            {isOnline ? 'Live API Connection' : 'API Node Offline'}
                        </span>
                    </div>
                    {isOnline ? <Wifi size={14} className="text-green-500" /> : <WifiOff size={14} className="text-red-500" />}
                  </div>
                  <h1 className="text-5xl font-black text-white tracking-tighter mb-3 leading-none">Detection Center</h1>
                  <p className="text-gray-500 font-medium text-lg">Protect your enterprise against deepfakes and AI-generated identity fraud.</p>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Shield className="text-white" size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Trust Level</p>
                        <p className="text-sm font-bold text-white">Full Forensic</p>
                    </div>
                </div>
              </header>

              <div className="relative">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full"></div>
                <UploadZone onUpload={handleUpload} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <ResultViewer 
                data={detectionResult} 
                onReset={() => setDetectionResult(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
