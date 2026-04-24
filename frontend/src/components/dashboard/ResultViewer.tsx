'use client'

import React from 'react'
import { 
  ShieldCheck, 
  AlertTriangle, 
  Download, 
  Share2, 
  RefreshCcw, 
  Zap, 
  Activity, 
  Fingerprint, 
  FileText 
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ResultData {
  filename: string
  overall_confidence: number
  explanation: string
  vision_transformer: {
    label: string
    confidence: number
    heatmap?: string
  }
  frequency_domain: {
    high_freq_score: number
    verdict: string
  }
}

export default function ResultViewer({ data, onReset }: { data: ResultData, onReset: () => void }) {
  const isHighRisk = data.overall_confidence > 0.7

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                Analysis Complete
            </span>
            <span className="text-gray-600 text-xs font-medium uppercase tracking-tighter">Forensic Node: US-CENTRAL-1</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none mb-2">Forensic Report</h1>
          <p className="text-gray-500 text-sm font-medium flex items-center gap-2">
            <FileText size={14} />
            {data.filename}
          </p>
        </div>

        <div className="flex items-center gap-3">
            <button className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all hover:bg-gray-800">
                <Download size={20} />
            </button>
            <button className="p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all hover:bg-gray-800">
                <Share2 size={20} />
            </button>
            <button 
                onClick={onReset}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
            >
                <RefreshCcw size={18} />
                New Scan
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Risk Profile */}
        <div className="lg:col-span-4 space-y-8">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-10 rounded-[40px] border-2 flex flex-col items-center text-center relative overflow-hidden bg-[#0d1117] ${
                isHighRisk ? 'border-red-500/20' : 'border-green-500/20'
            }`}>
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 shadow-2xl ${
                    isHighRisk ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-green-500 text-white shadow-green-500/30'
                }`}>
                    {isHighRisk ? <AlertTriangle size={48} /> : <ShieldCheck size={48} />}
                </div>

                <div className="relative mb-8">
                    <svg className="w-56 h-56 transform -rotate-90">
                        <circle
                            cx="112"
                            cy="112"
                            r="104"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            className="text-gray-900"
                        />
                        <motion.circle
                            cx="112"
                            cy="112"
                            r="104"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={653.45}
                            initial={{ strokeDashoffset: 653.45 }}
                            animate={{ strokeDashoffset: 653.45 * (1 - data.overall_confidence) }}
                            transition={{ duration: 2, ease: "circOut" }}
                            strokeLinecap="round"
                            className={isHighRisk ? 'text-red-500' : 'text-green-500'}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-6xl font-black text-white leading-none">{(data.overall_confidence * 100).toFixed(0)}%</span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mt-3">Confidence</span>
                    </div>
                </div>

                <h3 className={`text-3xl font-black mb-3 ${isHighRisk ? 'text-red-400' : 'text-green-400'}`}>
                    {isHighRisk ? 'Critical Risk' : 'Standard Profile'}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[240px]">
                    {isHighRisk 
                        ? 'Multiple spatial and frequency anomalies detected. Probable AI generation or manipulation.' 
                        : 'Biometric signature patterns match standard acquisition hardware profiles.'
                    }
                </p>
            </motion.div>

            <div className="bg-blue-600 rounded-[40px] p-10 text-white relative overflow-hidden group">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap size={20} className="fill-white" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sentinel AI Insight</span>
                    </div>
                    <p className="text-xl font-medium leading-relaxed italic opacity-90 mb-8">
                        "{data.explanation}"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                        Gemini 1.5 Enterprise Secured
                    </div>
                </div>
                <div className="absolute -bottom-20 -right-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                    <ShieldCheck size={280} />
                </div>
            </div>
        </div>

        {/* Technical metrics */}
        <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TechnicalCard 
                    icon={<Activity className="text-blue-500" size={28} />}
                    title="Frequency Domain"
                    value={data.frequency_domain.verdict}
                    score={data.frequency_domain.high_freq_score}
                    desc="High-frequency spectral analysis for GAN upsampling artifacts and interpolation noise."
                />
                <TechnicalCard 
                    icon={<Fingerprint className="text-purple-500" size={28} />}
                    title="Neural Consistency"
                    value={data.vision_transformer.label}
                    score={data.vision_transformer.confidence}
                    desc="Vision Transformer (ViT) spatial logic check for pixel-level inconsistencies and blurring."
                />
            </div>

            <div className="bg-[#0d1117] border border-gray-800 rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 shadow-inner">
                            <FileText className="text-blue-500" size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white leading-none">Evidence Map</h3>
                            <p className="text-sm text-gray-500 mt-2">Spatial mapping of neural model activations</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Status: Generated
                    </div>
                </div>

                <div className="relative aspect-video rounded-[32px] overflow-hidden border border-gray-800 bg-gray-950 group shadow-2xl">
                    {data.vision_transformer.heatmap ? (
                        <img 
                            src={data.vision_transformer.heatmap} 
                            alt="Heatmap" 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-800 gap-6">
                            <Activity className="animate-spin duration-[3000ms]" size={64} />
                            <p className="text-xs font-black uppercase tracking-[0.5em]">Rendering Gradient Map</p>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                        <div className="flex gap-3">
                            <span className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/5 shadow-xl">Forensic Scale: 1:1</span>
                            <span className="px-4 py-2 bg-black/80 backdrop-blur-md rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest border border-blue-500/20 shadow-xl">Layer: Neural Attn</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

function TechnicalCard({ icon, title, value, score, desc }: { icon: React.ReactNode, title: string, value: string, score: number, desc: string }) {
    return (
        <div className="bg-[#0d1117] border border-gray-800 rounded-[40px] p-10 flex flex-col transition-all hover:border-gray-700 hover:shadow-2xl group">
            <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center border border-gray-800 shadow-inner group-hover:scale-110 transition-transform">{icon}</div>
                <h4 className="text-xl font-black text-white tracking-tight">{title}</h4>
            </div>
            
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Model Output</span>
                    <span className="text-xs font-black text-white">{(score * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-900 rounded-full overflow-hidden p-0.5 border border-gray-800 shadow-inner">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${score * 100}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={`h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] ${score > 0.7 ? 'bg-red-500' : 'bg-blue-500'}`}
                    />
                </div>
                <p className="mt-4 text-sm font-bold text-gray-300">{value}</p>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
        </div>
    )
}
