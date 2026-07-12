'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  UploadCloud, 
  Shield, 
  Sparkles, 
  Download,
  AlertTriangle,
  Send,
  MessageSquare,
  Lock,
  Plus,
  Volume2,
  ChevronRight,
  Fingerprint,
  Activity,
  Clock,
  Globe,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [queryInput, setQueryInput] = useState<string>('GDPR Article 32')
  const [demoQueryResults, setDemoQueryResults] = useState<string[]>([
    'Article 32(1)(a): Encryption active.',
    'Article 32(1)(b): Resilience logged.'
  ])
  
  // Interactive mock chat inside dashboard hero
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Ask me anything about regulatory risk mapping.' }
  ])
  const [chatInput, setChatInput] = useState('')

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    const txt = chatInput
    setMessages(prev => [...prev, { sender: 'user', text: txt }])
    setChatInput('')
    
    setTimeout(() => {
      let reply = "Compliance indices checked. No documentation gaps found in latest board minutes."
      if (txt.toLowerCase().includes('sox')) {
        reply = "SOX 404 ledger records are fully verified and mapped."
      } else if (txt.toLowerCase().includes('gdpr')) {
        reply = "GDPR security resilience checks passed with 98% confidence score."
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }])
    }, 600)
  }

  const handleQuerySearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (queryInput.toLowerCase().includes('sox')) {
      setDemoQueryResults([
        'Section 404: Internal controls verified.',
        'Section 302: Signatures recorded.'
      ])
    } else {
      setDemoQueryResults([
        `Scan results for "${queryInput}": Matches found.`,
        'Status: Documented.'
      ])
    }
  }

  // Stepper progress for simulated hero pipeline
  const pipelineSteps = [
    { title: 'Audio Parser Node', status: 'done' },
    { title: 'French Legal Diarization', status: 'done' },
    { title: 'Framework Analysis Index', status: 'active' },
    { title: 'Cryptographic Signature', status: 'pending' }
  ]

  // Mock list of meetings inside hero
  const mockMeetings = [
    { title: 'Q3 Board Audit Sync', company: 'Acme Corp', score: 96, status: 'compliant' },
    { title: 'Works-Council translation check', company: 'Legal Dept', score: 78, status: 'needs-review' }
  ]

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 selection:bg-[#7C3AED]/30 selection:text-white antialiased relative overflow-x-hidden">
      
      {/* Animated gradient mesh background blobs */}
      <div className="absolute top-[-5%] left-[-10%] w-[50%] aspect-square rounded-full bg-gradient-to-tr from-[#7C3AED]/12 to-transparent blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />
      <div className="absolute top-[20%] right-[-15%] w-[60%] aspect-square rounded-full bg-gradient-to-bl from-[#06B6D4]/12 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-5%] w-[50%] aspect-square rounded-full bg-gradient-to-tr from-[#EC4899]/8 to-transparent blur-[110px] pointer-events-none -z-10" />

      {/* 1. FLOATING TRANSPARENT NAVBAR CAPSULE */}
      <header className="sticky top-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 py-4 shrink-0">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-slate-800/80 bg-[#070B14]/65 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)]">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-sm font-black tracking-tight text-white font-sans uppercase">
              Meeting <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">Minute</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-white transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-white transition-colors">Risk Index</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors mr-2">
              Log In
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-5 py-4 text-xs font-bold uppercase tracking-wider text-white border-0 hover:opacity-95 shadow-md">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. FULL SCREEN HERO WITH LIVE DASHBOARD PREVIEW */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          
          <div className="space-y-4 max-w-3xl mx-auto mb-14 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight text-white leading-[1.08] uppercase"
            >
              Build an Audit-Ready Compliance <br />
              Report in Minutes with <span className="bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent">AI</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-2xl text-slate-450 text-xs sm:text-sm leading-relaxed"
            >
              Meeting Minute AI analyzes your legal, corporate, and council transcripts. <br />
              Map conversations to regulatory standards and auto-verify auditing points.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex justify-center gap-3 pt-3"
            >
              <Link href="/dashboard">
                <Button className="group rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] px-6 py-5 text-xs font-bold uppercase tracking-wider text-white border-0 hover:opacity-95 shadow-lg shadow-indigo-500/10 transition-all gap-1.5">
                  Build My Report
                  <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* SIMULATED LIVE PRODUCT DASHBOARD HERO GRID */}
          <motion.div 
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto rounded-3xl border border-slate-800/80 bg-[#111827]/40 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md w-full max-w-6xl overflow-hidden"
          >
            {/* Ambient glows inside hero console */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-[#7C3AED]/12 to-transparent blur-[70px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#06B6D4]/8 to-transparent blur-[70px] pointer-events-none" />

            <div className="grid gap-4 lg:grid-cols-12 items-stretch relative z-10 text-left">
              
              {/* PANEL 1: Left Stepper Pipeline Widget (3 cols) */}
              <div className="lg:col-span-3 rounded-2xl border border-slate-850 bg-[#070B14]/75 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold block">Live Status Index</span>
                  <h4 className="text-xs font-black text-white mt-1 border-b border-slate-850 pb-2.5 mb-3">AI Pipeline Stepper</h4>
                  
                  <div className="space-y-4">
                    {pipelineSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 relative">
                        {idx !== pipelineSteps.length - 1 && (
                          <div className="absolute top-5 left-2 w-[1px] h-8 bg-slate-850" />
                        )}
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          step.status === 'done' 
                            ? 'border-emerald-500/35 bg-emerald-500/10 text-emerald-400' 
                            : step.status === 'active' 
                              ? 'border-indigo-500/40 bg-indigo-500/10 text-[#818CF8] animate-pulse'
                              : 'border-slate-800 bg-slate-950 text-slate-500'
                        }`}>
                          {step.status === 'done' ? <CheckCircle2 className="h-3 w-3" /> : <span className="text-[8px] font-black">{idx + 1}</span>}
                        </div>
                        <div className="text-[11px] text-left">
                          <span className={`font-bold block ${step.status === 'done' ? 'text-slate-300' : 'text-slate-450'}`}>{step.title}</span>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wide font-extrabold">
                            {step.status === 'done' ? 'Completed' : step.status === 'active' ? 'Parsing logs' : 'Staged'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-850/80 pt-4 mt-6">
                  <div className="rounded-xl border border-slate-850 bg-slate-950/60 p-3 text-center cursor-pointer hover:border-indigo-500/30 transition-colors">
                    <UploadCloud className="h-5 w-5 text-indigo-400 mx-auto mb-2" />
                    <span className="block text-[10px] font-bold text-slate-300">Upload Transcript</span>
                  </div>
                </div>
              </div>

              {/* PANEL 2: Central Graphic Chart & Document Logs (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl border border-slate-850 bg-[#070B14]/75 p-5 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 mb-3">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold block">Compliance Index</span>
                      <h4 className="text-xs font-black text-white mt-0.5">Auditing Progress Graph</h4>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">
                      Optimal
                    </span>
                  </div>

                  {/* Gradient Area Chart representation */}
                  <div className="h-28 w-full relative flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="hero-stripe" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 90 L 80 75 L 150 45 L 220 50 L 290 20 L 290 100 L 10 100 Z" fill="url(#hero-grad-mesh)" />
                      <path d="M 10 90 L 80 75 L 150 45 L 220 50 L 290 20" fill="none" stroke="#7C3AED" strokeWidth="1.5" />
                      <defs>
                        <linearGradient id="hero-grad-mesh" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[8.5px] uppercase tracking-wider text-slate-500 font-extrabold block">Staged Reports</span>
                  
                  <div className="space-y-2">
                    {mockMeetings.map((mtg, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-950/65 border border-slate-900 px-3.5 py-2.5 rounded-xl text-[11px]">
                        <div className="text-left space-y-0.5">
                          <span className="font-bold text-slate-200 block">{mtg.title}</span>
                          <span className="text-[9.5px] text-slate-500 uppercase font-extrabold">{mtg.company}</span>
                        </div>
                        <span className={`rounded-full px-2 py-0.5 text-[8.5px] font-extrabold uppercase tracking-wide border ${
                          mtg.status === 'compliant' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}>
                          {mtg.status === 'compliant' ? 'Compliant' : 'Review'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PANEL 3: Right Side Live AI assistant & Notifications (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-slate-850 bg-[#070B14]/80 p-5 flex flex-col justify-between text-xs space-y-4">
                
                {/* AI Assistant Simulated Box */}
                <div>
                  <div className="flex items-center gap-2 border-b border-slate-850 pb-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#818CF8] animate-pulse" />
                    <div>
                      <span className="text-[8.5px] font-black uppercase text-slate-500 tracking-wider block">Copilot Node</span>
                      <h4 className="text-xs font-bold text-white">Compliance Terminal</h4>
                    </div>
                  </div>

                  {/* Messages Log */}
                  <div className="space-y-2.5 max-h-36 overflow-y-auto mb-3 pr-1 text-[11px]">
                    {messages.map((m, idx) => (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-xl max-w-[85%] text-left ${
                          m.sender === 'user' 
                            ? 'ml-auto bg-indigo-500/10 border border-indigo-500/25 text-[#818CF8]' 
                            : 'bg-slate-950/65 border border-slate-900 text-slate-400'
                        }`}
                      >
                        {m.text}
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleChatSubmit} className="flex gap-1.5">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about compliance policies..."
                      className="flex-1 bg-slate-950 border border-slate-850 rounded-xl py-2 px-3 text-[11px] placeholder-slate-650 focus:outline-none focus:border-indigo-500/50 text-white"
                    />
                    <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white border-0 shrink-0">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>

                {/* Notifications logs */}
                <div className="border-t border-slate-850/80 pt-3 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between mb-1.5 font-bold uppercase text-[8px] tracking-wider">
                    <span>Recent Logs</span>
                    <span className="text-cyan-400 animate-pulse">Live</span>
                  </div>
                  <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-2 font-mono text-[9px] text-slate-400 space-y-1">
                    <p className="truncate">• [INFO] Diarization process active</p>
                    <p className="truncate">• [INFO] SOX Section 404 verified</p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. INTERACTIVE BENTO GRID FEATURE SECTIONS */}
      <section id="features" className="py-20 md:py-28 border-t border-slate-900 bg-[#070B14]">
        <div className="mx-auto max-w-6xl px-6">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#818CF8] bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
              Product Overview
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase font-sans">
              Interactive Dashboard Modules
            </h2>
            <p className="text-xs text-slate-450 leading-relaxed font-sans font-medium">
              Every detail is engineered to optimize board compliance, diarization, and regulatory standards verification.
            </p>
          </div>

          {/* Bento grid panels mapping features */}
          <div className="grid gap-6 md:grid-cols-12">
            
            {/* Bento Module 1: Diarization Transcript view (7 cols) */}
            <div className="md:col-span-7 rounded-3xl border border-slate-850 bg-[#111827]/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all min-h-[300px]">
              <div className="space-y-2 text-left mb-6">
                <span className="text-[9px] font-black text-[#818CF8] uppercase tracking-wider block">Diarization Node</span>
                <h4 className="text-lg font-bold text-white font-sans">French Legal & Works-Council Speaker Resolution</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed font-medium">
                  Auto-resolves speaker placeholders and filters crosstalk for legal proceedings.
                </p>
              </div>

              {/* Simulated transcript screenshot */}
              <div className="bg-slate-950/65 border border-slate-900 p-4 rounded-2xl text-[10px] space-y-3 text-left font-mono">
                <div className="flex gap-2">
                  <span className="text-[#818CF8] font-bold shrink-0">[CFO - 00:23]</span>
                  <span className="text-slate-350">"Database controls and ledger sign-offs have been locked."</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#06B6D4] font-bold shrink-0">[CEO - 00:45]</span>
                  <span className="text-slate-350">"Approved. Compile the audit summary for compliance checks."</span>
                </div>
              </div>
            </div>

            {/* Bento Module 2: Circular gauge & stats indicators (5 cols) */}
            <div className="md:col-span-5 rounded-3xl border border-slate-850 bg-[#111827]/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all min-h-[300px]">
              <div className="space-y-2 text-left mb-6">
                <span className="text-[9px] font-black text-[#818CF8] uppercase tracking-wider block">Compliance health</span>
                <h4 className="text-lg font-bold text-white font-sans">Verification Index</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed font-medium">
                  Compliance alignment meters ensure your records pass external audits instantly.
                </p>
              </div>

              {/* Radial meter indicator */}
              <div className="flex justify-center items-center py-2.5">
                <div className="relative h-20 w-20">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="264" strokeDashoffset="264 * (1 - 0.96)" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-emerald-400">96%</span>
                </div>
              </div>
            </div>

            {/* Bento Module 3: Regulation scan mapping form (6 cols) */}
            <div className="md:col-span-6 rounded-3xl border border-slate-850 bg-[#111827]/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all min-h-[300px]">
              <div className="space-y-2 text-left mb-6">
                <span className="text-[9px] font-black text-[#818CF8] uppercase tracking-wider block">Scan Custom Policies</span>
                <h4 className="text-lg font-bold text-white font-sans">Interactive Regulation Checker</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed font-medium">
                  Check your minutes against specific security policies or SOX rules.
                </p>
              </div>

              {/* Search query module */}
              <div className="bg-slate-950/65 border border-slate-900 p-4 rounded-2xl text-[11px] text-left space-y-3">
                <form onSubmit={handleQuerySearch} className="flex gap-2">
                  <input 
                    type="text" 
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 text-xs focus:outline-none"
                  />
                  <Button type="submit" className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white border-0 text-xs px-3">
                    Query Scan
                  </Button>
                </form>
                <div className="space-y-1 pt-1.5 font-mono text-[9px] text-slate-400">
                  {demoQueryResults.map((res, i) => (
                    <p key={i} className="truncate">• {res}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Bento Module 4: Voting results list tracker (6 cols) */}
            <div className="md:col-span-6 rounded-3xl border border-slate-850 bg-[#111827]/40 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-slate-700/80 transition-all min-h-[300px]">
              <div className="space-y-2 text-left mb-6">
                <span className="text-[9px] font-black text-[#818CF8] uppercase tracking-wider block">Voting Logs</span>
                <h4 className="text-lg font-bold text-white font-sans">Decision & Voting Results</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed font-medium">
                  Compiles voting records, resolution owner assignments, and next-action logs.
                </p>
              </div>

              {/* Voting table simulation */}
              <div className="bg-slate-950/65 border border-slate-900 p-3.5 rounded-2xl text-[10px] text-left font-sans space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                  <span className="font-bold text-slate-300">Auditor Ledger Overrides</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">Passed</span>
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-500">
                  <span>Results: 5-0 Unanimous Approval</span>
                  <span>Owner: CFO</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. METRICS & DENSE KEY STATS */}
      <section id="metrics" className="py-20 md:py-24 border-t border-slate-900 bg-[#070B14]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 md:grid-cols-12 items-stretch">
            
            {/* Stats block left */}
            <div className="md:col-span-5 space-y-8 text-left">
              <div className="border-l-3 border-[#7C3AED] pl-6 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Established Node</span>
                <span className="block text-3.5xl font-black text-white mt-1 tracking-tight">SINCE 2024</span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Mission-driven security engine checking governance board actions with AI.
                </p>
              </div>

              <div className="border-l-3 border-[#3B82F6] pl-6 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Total Audited Volume</span>
                <span className="block text-3.5xl font-black text-white mt-1 tracking-tight">100,000+</span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Audits executed successfully across financial, tech, and healthcare boards.
                </p>
              </div>

              <div className="border-l-3 border-[#06B6D4] pl-6 py-2">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Inspection rating</span>
                <span className="block text-3.5xl font-black text-white mt-1 tracking-tight">95% SUCCESS</span>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Boards reporting zero findings during external regulatory audits.
                </p>
              </div>
            </div>

            {/* Bento statistics blocks right */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6">
              <div className="text-left space-y-2">
                <h3 className="text-3xl font-black text-white leading-tight uppercase font-sans">
                  Auditor Verified Architecture
                </h3>
                <p className="text-xs text-slate-450 leading-relaxed font-sans font-medium">
                  Dedicated secure system built under compliance regulation controls.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-[#111827]/40 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-slate-800 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[11px] font-bold text-white">Pre-Templates & Checklists</span>
                  <span className="text-[9.5px] text-slate-500 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Active Standards
                  </span>
                </div>

                <div className="bg-[#111827]/40 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-slate-800 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
                  <span className="text-[11px] font-bold text-white">AI Report Summaries</span>
                  <span className="text-[9.5px] text-slate-500 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 27 Languages
                  </span>
                </div>

                <div className="bg-[#111827]/40 border border-slate-850 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-slate-800 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
                  <span className="text-[11px] font-bold text-white">Fast & Simple Export</span>
                  <span className="text-[9.5px] text-slate-500 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> PDF / JSON
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FINAL PRODUCT-MOCKUP CTA BANNER */}
      <section className="py-24 bg-gradient-to-r from-[#0F111A] via-[#131624] to-[#0F111A] text-white text-center relative overflow-hidden border-t border-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_center,rgba(124,58,237,0.12),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-6 relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white font-sans uppercase">
            Simplify your board compliance audits
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400 text-xs leading-relaxed">
            Upload meeting audio or transcripts and get audit reports instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] hover:opacity-95 font-bold uppercase tracking-wider px-8 py-6 shadow-lg border-0 text-[10px]">
                Get Started Free
              </Button>
            </Link>
            <Link href="/compliance">
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 font-bold uppercase tracking-wider px-8 py-6 text-[10px]">
                View Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. MINIMAL SYSTEM FOOTER */}
      <footer className="border-t border-slate-900 bg-[#070B14] py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs font-black text-white uppercase tracking-wider">
              Meeting <span className="text-[#818CF8]">Minute</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-white transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-white transition-colors">Regulatory Risks</Link>
            <span className="hidden md:inline text-slate-800">|</span>
            <span className="font-normal text-slate-600 lowercase">&copy; {new Date().getFullYear()} meeting minute inc. all rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
