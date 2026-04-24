'use client'

import React, { useState } from 'react'
import { Upload, X, ShieldCheck, AlertCircle, Loader2, FileUp, ScanSearch } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function UploadZone({ onUpload }: { onUpload: (file: File) => void }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile)
        processFile(droppedFile)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      processFile(selectedFile)
    }
  }

  const processFile = async (file: File) => {
    setAnalyzing(true)
    // Simulate initial scan sequence
    await new Promise(resolve => setTimeout(resolve, 2000))
    onUpload(file)
    setAnalyzing(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        layout
        className={`relative rounded-[32px] overflow-hidden border-2 transition-all duration-500 bg-[#0d1117] ${
          dragActive ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.1)]' : 'border-gray-800'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {/* Scanner Line Animation */}
        {analyzing && (
            <motion.div 
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
        )}

        <div className="p-12 md:p-20 flex flex-col items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div 
                key="upload-prompt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-center relative z-10"
              >
                <div className="w-24 h-24 bg-gray-900 rounded-[2rem] border border-gray-800 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:border-blue-500/50 transition-all">
                  <FileUp className="text-blue-500" size={40} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Forensic ID Scan</h3>
                <p className="text-gray-500 mb-10 max-w-md mx-auto text-sm leading-relaxed">
                  Upload identity documents, biometric selfies, or KYC records. 
                  Our neural engine performs pixel-level artifact detection.
                </p>
                
                <label className="group relative inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all cursor-pointer shadow-xl shadow-blue-500/20 active:scale-95">
                  <ScanSearch size={20} />
                  Select Document
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
                <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">Secure AES-256 Processing</p>
              </motion.div>
            ) : (
              <motion.div 
                key="preview-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center relative z-10"
              >
                <div className="relative mb-10">
                  <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full"></div>
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Scan Preview" 
                    className="w-56 h-56 object-cover rounded-3xl shadow-2xl border-4 border-[#0d1117] relative z-10"
                  />
                  {!analyzing && (
                    <button 
                      onClick={() => setFile(null)}
                      className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-xl shadow-xl hover:scale-110 transition-all z-20 border-4 border-[#0d1117]"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3 px-6 py-2 bg-gray-900 border border-gray-800 rounded-full">
                    {analyzing ? (
                      <Loader2 className="animate-spin text-blue-500" size={18} />
                    ) : (
                      <ShieldCheck className="text-green-500" size={18} />
                    )}
                    <span className="text-xs font-bold text-gray-300">{file.name}</span>
                  </div>

                  {analyzing && (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">Running Neural Inference</p>
                        <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                        />
                        </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Background Grids */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </motion.div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatusCard 
            icon={<ShieldCheck size={20} className="text-blue-500" />} 
            title="Encrypted" 
            desc="SOC2 Compliant Storage" 
        />
        <StatusCard 
            icon={<ScanSearch size={20} className="text-purple-500" />} 
            title="Multi-Layer" 
            desc="ViT + FFT Analysis" 
        />
        <StatusCard 
            icon={<Loader2 size={20} className="text-green-500" />} 
            title="Real-time" 
            desc="Inference in <2.4s" 
        />
      </div>
    </div>
  )
}

function StatusCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-5 rounded-2xl bg-[#0d1117] border border-gray-800 flex items-center gap-4 transition-all hover:border-gray-700">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center border border-gray-800">{icon}</div>
            <div>
                <p className="text-sm font-bold text-white">{title}</p>
                <p className="text-[10px] text-gray-500 font-medium">{desc}</p>
            </div>
        </div>
    )
}
