'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Lock, 
  Globe, 
  ChevronRight, 
  PlayCircle, 
  Fingerprint, 
  SearchCheck, 
  Activity, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export default function LandingPage() {
  const { login } = useAuth()

  return (
    <div className="bg-[#020617] text-gray-400 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Shield className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">SentinelID</span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-blue-500 mt-1">Enterprise Forensic</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
          <a href="#vision" className="hover:text-white transition-colors cursor-pointer">Neural Vision</a>
          <a href="#forensics" className="hover:text-white transition-colors cursor-pointer">Forensics</a>
          <a href="#infrastructure" className="hover:text-white transition-colors cursor-pointer">Security</a>
        </div>

        <button 
          onClick={login}
          className="relative group bg-white text-black px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          Access Portal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full opacity-50"></div>
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full opacity-30 animate-pulse"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Activity size={14} />
                Now in Private Beta: Forensic v2.4
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
                Eliminate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                  Identity Fraud
                </span>
              </h1>
              
              <p className="text-lg text-gray-500 max-w-xl mb-12 leading-relaxed font-medium">
                Advanced forensic analysis powered by Vision Transformers and Frequency Domain analysis. 
                Detect deepfakes, GAN artifacts, and forged identities with millisecond latency.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={login}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] active:scale-95"
                >
                  Start Forensic Scan <ArrowRight size={18} />
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-black text-sm uppercase tracking-widest hover:text-blue-400 transition-colors">
                  <PlayCircle size={20} /> Watch Technical Overview
                </button>
              </div>

              <div className="mt-16 flex items-center gap-12 pt-8 border-t border-white/5">
                <div>
                  <p className="text-2xl font-black text-white leading-none mb-1">0.8ms</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Avg Latency</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white leading-none mb-1">99.8%</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Detection Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white leading-none mb-1">256-bit</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">End-to-End Encryption</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="relative hidden lg:block"
            >
              {/* Complex UI Mockup */}
              <div className="relative bg-[#0d1117] border border-white/10 rounded-[40px] shadow-2xl p-8 overflow-hidden group">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        Node: US-CENTRAL-1
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Scan Target</p>
                            <p className="text-lg font-black text-white tracking-tight">Identity_Document_v4.jpg</p>
                        </div>
                        <div className="bg-blue-600/10 border border-blue-500/20 px-4 py-1.5 rounded-xl text-blue-500 text-[10px] font-black uppercase tracking-widest">
                            Scanning...
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                            <Activity className="text-blue-500 mb-3" size={20} />
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Freq Domain</p>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                                <motion.div 
                                    className="h-full bg-blue-500"
                                    animate={{ width: ['20%', '80%', '60%', '90%'] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                            </div>
                        </div>
                        <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                            <Fingerprint className="text-purple-500 mb-3" size={20} />
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Neural Attn</p>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                                <motion.div 
                                    className="h-full bg-purple-500"
                                    animate={{ width: ['40%', '30%', '85%', '70%'] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-600 p-6 rounded-[32px] text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <ShieldCheck size={16} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Forensic Verdict</span>
                        </div>
                        <p className="text-sm font-bold leading-relaxed">
                            Detected GAN artifacts in the high-frequency spectrum. Spatially inconsistent pixel clusters found in the biometric region.
                        </p>
                    </div>
                </div>

                {/* Abstract background grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute -top-10 -right-10 p-6 bg-[#0d1117] border border-white/10 rounded-[32px] shadow-2xl animate-bounce duration-[5s]">
                <Cpu className="text-blue-500 mb-2" size={32} />
                <p className="text-[10px] font-black text-white uppercase tracking-widest">ViT Engine</p>
              </div>
              <div className="absolute -bottom-10 -left-10 p-6 bg-[#0d1117] border border-white/10 rounded-[32px] shadow-2xl">
                <Server className="text-indigo-500 mb-2" size={32} />
                <p className="text-[10px] font-black text-white uppercase tracking-widest">Cloud Forensic</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="vision" className="py-24 border-t border-white/5 relative bg-[#020617]">
        <div className="max-w-7xl mx-auto px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <TechSection 
                    icon={<Zap className="text-blue-500" />}
                    title="Real-time Inference"
                    desc="Our models run on specialized TPU/GPU infrastructure to provide sub-second verification for massive user flows."
                />
                <TechSection 
                    icon={<ShieldCheck className="text-purple-500" />}
                    title="Forensic Explainability"
                    desc="Gemini-powered insights provide natural language explanations for every high-risk verdict, for human review."
                />
                <TechSection 
                    icon={<Lock className="text-green-500" />}
                    title="Privacy First"
                    desc="Biometric data is processed in ephemeral memory and encrypted with AES-256 GCM. No data persistent without consent."
                />
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#010409] px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 p-2 rounded-xl border border-blue-500/30">
              <Shield className="text-blue-500" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none">SentinelID</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-500 mt-1">Enterprise Forensic</span>
            </div>
          </div>
          
          <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-gray-600">
            <a href="#" className="hover:text-white transition-colors">API Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Forensic Whitepaper</a>
          </div>

          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">
            © 2026 SentinelID Forensic. Built for the Google Solution Challenge.
          </p>
        </div>
      </footer>
    </div>
  )
}

function TechSection({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="group">
            <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/5 group-hover:border-blue-500/30 transition-all group-hover:bg-blue-500/5">
                {icon}
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{desc}</p>
        </div>
    )
}
