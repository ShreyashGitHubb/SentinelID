'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { LogIn, ShieldCheck } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfd] p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-[40px] p-10 border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative z-10"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-[#1a73e8] rounded-[24px] flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20">
            <ShieldCheck size={40} className="text-white" />
          </div>
          
          <h1 className="text-4xl font-black mb-3 tracking-tighter text-gray-900">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-10 leading-relaxed font-medium">
            Securely access the SentinelID Forensic Dashboard to manage identity threats.
          </p>
          
          <div className="w-full space-y-4">
            <button
              onClick={login}
              className="w-full bg-white border border-gray-200 text-gray-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-gray-50 transition-all active:scale-[0.98] shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            
            <div className="py-2 flex items-center gap-4 text-gray-300">
                <div className="h-[1px] flex-1 bg-gray-100"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Enterprise Access Only</span>
                <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>

            <button
              disabled
              className="w-full bg-gray-50 text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 cursor-not-allowed border border-gray-100"
            >
              SSO Authentication
            </button>
          </div>
          
          <div className="mt-10 pt-8 border-t border-gray-50 w-full">
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-bold">
              Powered by Google Vertex AI
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="mt-8 flex gap-6 relative z-10">
        <a href="/" className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors">Back to Home</a>
        <span className="text-gray-200">|</span>
        <a href="#" className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Technical Support</a>
      </div>
    </div>
  )
}
