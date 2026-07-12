'use client'

import React, { useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Send } from 'lucide-react'
import { theme } from '@/lib/theme'

export default function AssistantPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Hello Shubhi! I am your regulatory compliance copilot. Ask me anything about SOX Section 404, GDPR security policies, ISO27001 scopes, or active gap analyses in your workspace.' }
  ])
  const [inputVal, setInputVal] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    const txt = inputVal
    setMessages(prev => [...prev, { sender: 'user', text: txt }])
    setInputVal('')
    
    setTimeout(() => {
      let reply = "Compliance scan completed. All database inputs match standard ledger security controls."
      if (txt.toLowerCase().includes('sox')) {
        reply = "Sarbanes-Oxley controls list verified: CFO approval ledger is synced, and no manual overrides were recorded."
      } else if (txt.toLowerCase().includes('gdpr')) {
        reply = "GDPR security resilience index verified: Data retention limits are set, and access logs are active via TLS 1.3."
      } else if (txt.toLowerCase().includes('iso')) {
        reply = "ISO27001 security controls are mapped. Access reviews are completed for the current audit quarter."
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }])
    }, 600)
  }

  return (
    <div className="flex bg-[#090611] text-slate-100 min-h-screen font-sans">
      
      {/* 1. SIDEBAR */}
      <Sidebar />

      {/* 2. MAIN GRID CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav />

        <main className="flex-1 p-6 sm:p-8 w-full max-w-4xl mx-auto flex flex-col justify-between space-y-6">
          
          {/* Header */}
          <div className="text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 uppercase leading-none">
              AI Compliance Assistant
              <span className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-emerald-400">
                Copilot Online
              </span>
            </h1>
            <p className="mt-2 text-xs text-slate-400 font-medium">
              Ask questions about regulatory scope mapping, audit gaps, and corporate meeting governance.
            </p>
          </div>

          {/* Assistant Panel Chat Interface */}
          <div className={`flex-1 border ${theme.colors.border} bg-[#0F1117]/60 shadow backdrop-blur-md flex flex-col justify-between min-h-[450px] ${theme.radius.card} overflow-hidden`}>
            
            {/* Messages panel */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[500px]">
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.sender === 'user' ? 'bg-slate-800 text-white border border-slate-750' : 'bg-slate-900 text-slate-350 border border-white/5'
                  }`}>
                    {msg.sender === 'user' ? 'SK' : 'AI'}
                  </div>
                  <div className={`p-4 rounded-[24px] text-xs text-left leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-slate-950 border border-slate-900 text-slate-200' 
                      : 'bg-slate-950/40 border border-white/5 text-slate-350'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Submission Deck */}
            <div className="p-4 border-t border-white/5 bg-slate-950/30">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input 
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask a compliance query (e.g. SOX compliance controls)..."
                  className="flex-1 bg-slate-950 border border-white/5 text-white rounded-xl py-3 px-4 text-xs placeholder-slate-650 focus:outline-none focus:border-indigo-500/50"
                />
                <button 
                  type="submit"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white transition-colors border-0 shrink-0 shadow-sm"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>

        </main>
      </div>

    </div>
  )
}
