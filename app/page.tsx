'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { theme } from '@/lib/theme'

export default function LandingPage() {
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

  // Custom handcrafted badge style constants (White text, top-left & bottom-right borders)
  const compliantBadgeClass = 'bg-emerald-500/15 text-white border border-t-emerald-500/35 border-l-emerald-500/35 border-b-emerald-500/5 border-r-emerald-500/5 rounded-full font-semibold uppercase tracking-wider text-[8.5px] px-3.5 flex items-center justify-center h-5'
  const reviewBadgeClass = 'bg-amber-500/15 text-white border border-t-amber-500/35 border-l-amber-500/35 border-b-amber-500/5 border-r-amber-500/5 rounded-full font-semibold uppercase tracking-wider text-[8.5px] px-3.5 flex items-center justify-center h-5'

  return (
    <div className="min-h-screen bg-[#090611] text-slate-100 selection:bg-[#7C3AED]/30 selection:text-white antialiased relative overflow-x-hidden font-sans">
      
      {/* 1. FLOATING NAVBAR CAPSULE */}
      <header className="sticky top-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 py-6 shrink-0">
        <div className={`flex h-16 items-center justify-between rounded-2xl border ${theme.colors.border} bg-[#0F1117]/65 px-6 shadow-md backdrop-blur-md`}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-white/5 text-white">
              <FileText className="h-4.5 w-4.5 text-slate-350" />
            </div>
            <Link href="/" className="flex items-baseline gap-1">
              <span className="text-xs font-black tracking-tight text-white uppercase">Meeting</span>
              <span className="text-[10px] text-slate-500 font-extrabold tracking-wider uppercase">Minute</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-white transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-white transition-colors">Risk Index</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-white transition-colors mr-2">
              Log In
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-4 border-0 shadow-sm">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. FULL SCREEN HERO WITH LIVE DASHBOARD PREVIEW */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 text-left">
          
          {/* Asymmetric Hero layout: Left description / Right CTA */}
          <div className="grid gap-12 lg:grid-cols-12 items-end mb-20">
            <div className="lg:col-span-8 space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6.5xl font-black tracking-tight text-white uppercase leading-[1.05]"
              >
                Build an Audit-Ready Compliance <br />
                Report in Minutes with AI
              </motion.h1>
              <p className="max-w-2xl text-slate-500 text-xs sm:text-sm leading-relaxed">
                Meeting Minute AI analyzes your legal, corporate, and council transcripts. Map conversations to regulatory standards and auto-verify auditing points.
              </p>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link href="/dashboard">
                <Button className="group rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-7 py-6 border-0 shadow-sm gap-1.5">
                  Build My Report
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* SIMULATED LIVE PRODUCT DASHBOARD HERO GRID */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`relative mx-auto border ${theme.colors.border} bg-[#0F1117]/40 p-4 shadow-xl backdrop-blur-md w-full max-w-6xl overflow-hidden ${theme.radius.card}`}
          >
            <div className="grid gap-4 lg:grid-cols-12 items-stretch text-left">
              
              {/* PANEL 1: Left Stepper Pipeline Widget (3 cols) */}
              <div className="lg:col-span-3 rounded-2xl border border-white/5 bg-[#090611]/75 p-5 flex flex-col justify-between">
                <div>
                  <span className={theme.typography.caption}>Live Status Index</span>
                  <h4 className={theme.typography.cardHeading + " mt-1 border-b border-white/5 pb-2.5 mb-3"}>AI Pipeline Stepper</h4>
                  
                  <div className="space-y-4">
                    {pipelineSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 relative">
                        {idx !== pipelineSteps.length - 1 && (
                          <div className="absolute top-5 left-2 w-[1px] h-8 bg-white/5" />
                        )}
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          step.status === 'done' 
                            ? 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400' 
                            : step.status === 'active' 
                              ? 'border-indigo-500/35 bg-indigo-500/5 text-indigo-400'
                              : 'border-slate-800 bg-slate-950 text-slate-600'
                        }`}>
                          {step.status === 'done' ? <CheckCircle2 className="h-3 w-3" /> : <span className="text-[8px] font-black">{idx + 1}</span>}
                        </div>
                        <div className="text-[11px] text-left">
                          <span className={`font-bold block ${step.status === 'done' ? 'text-slate-350' : 'text-slate-500'}`}>{step.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6">
                  <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 text-center cursor-pointer hover:border-white/10 transition-colors">
                    <span className="block text-[10px] font-bold text-slate-300">Upload Transcript</span>
                  </div>
                </div>
              </div>

              {/* PANEL 2: Central Graphic Chart & Document Logs (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl border border-white/5 bg-[#090611]/75 p-5 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                    <div>
                      <span className={theme.typography.caption}>Compliance Index</span>
                      <h4 className={theme.typography.cardHeading + " mt-0.5"}>Auditing Progress Graph</h4>
                    </div>
                  </div>

                  {/* Area Chart */}
                  <div className="h-28 w-full relative flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="hero-grad-mesh" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.1" />
                          <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 90 L 80 75 L 150 45 L 220 50 L 290 20 L 290 100 L 10 100 Z" fill="url(#hero-grad-mesh)" />
                      <path d="M 10 90 L 80 75 L 150 45 L 220 50 L 290 20" fill="none" stroke="#4F46E5" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className={theme.typography.caption}>Staged Reports</span>
                  
                  <div className="space-y-2">
                    {mockMeetings.map((mtg, i) => (
                      <div key={i} className="flex items-center justify-between bg-slate-950 border border-slate-900 px-3.5 py-2.5 rounded-xl text-[11px]">
                        <div className="text-left space-y-0.5">
                          <span className="font-bold text-slate-300 block">{mtg.title}</span>
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">{mtg.company}</span>
                        </div>
                        <span className={mtg.status === 'compliant' ? compliantBadgeClass : reviewBadgeClass}>
                          {mtg.status === 'compliant' ? 'Compliant' : 'Review'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PANEL 3: Right Side Live AI assistant & Notifications (4 cols) */}
              <div className="lg:col-span-4 rounded-2xl border border-white/5 bg-[#090611]/80 p-5 flex flex-col justify-between text-xs space-y-4">
                
                {/* AI Assistant Simulated Box */}
                <div>
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-3">
                    <div>
                      <span className={theme.typography.caption}>Copilot Node</span>
                      <h4 className="text-xs font-bold text-white mt-0.5">Compliance Terminal</h4>
                    </div>
                  </div>

                  {/* Messages Log */}
                  <div className="space-y-2.5 max-h-36 overflow-y-auto mb-3 pr-1 text-[11px]">
                    {messages.map((m, idx) => (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-xl max-w-[85%] text-left ${
                          m.sender === 'user' 
                            ? 'ml-auto bg-slate-950 border border-white/5 text-slate-200' 
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
                      placeholder="Ask about compliance..."
                      className="flex-1 bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-[11px] placeholder-slate-650 focus:outline-none focus:border-indigo-500/50 text-white"
                    />
                    <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-650 text-white border-0 shrink-0">
                      <ArrowRight className="h-4.5 w-4.5" />
                    </button>
                  </form>
                </div>

                {/* Notifications logs */}
                <div className="border-t border-white/5 pt-3 text-[11px] text-slate-500">
                  <div className="flex items-center justify-between mb-1.5 font-bold uppercase text-[8px] tracking-wider">
                    <span>Recent Logs</span>
                  </div>
                  <div className="rounded-xl border border-slate-900 bg-slate-950/50 p-2.5 font-mono text-[9px] text-slate-400 space-y-1">
                    <p className="truncate">• [INFO] Diarization process active</p>
                    <p className="truncate">• [INFO] SOX Section 404 verified</p>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. ASYMMETRIC ALTERNATING LAYOUT SECTIONS */}
      <section id="features" className="py-24 md:py-36 border-t border-white/5 bg-[#090611]">
        <div className="mx-auto max-w-5xl px-6 space-y-28 md:space-y-40">
          
          {/* SECTION A: Left Text / Right Visual (Diarization) */}
          <div className="grid gap-12 lg:grid-cols-12 items-center text-left">
            <div className="lg:col-span-5 space-y-4">
              <span className={theme.typography.caption}>Diarization Node</span>
              <h2 className="text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight leading-none">
                French Legal & Works-Council Speaker Resolution
              </h2>
              <p className={theme.typography.body}>
                Auto-resolves speaker placeholders and filters crosstalk for legal proceedings. Replaces complex manual annotation with structured voice parsing blocks.
              </p>
            </div>
            
            <div className="lg:col-span-7">
              <div className={`border ${theme.colors.border} bg-[#0F1117]/85 p-6 shadow-md ${theme.radius.card}`}>
                <div className="bg-slate-950/65 border border-slate-900 p-4 rounded-2xl text-[10px] space-y-3 font-mono text-left">
                  <div className="flex gap-2">
                    <span className="text-slate-400 font-bold shrink-0">[CFO - 00:23]</span>
                    <span className="text-slate-350">"Database controls and ledger sign-offs have been locked."</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-400 font-bold shrink-0">[CEO - 00:45]</span>
                    <span className="text-slate-350">"Approved. Compile the audit summary for compliance checks."</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION B: Left Visual / Right Text (Verification Index) */}
          <div className="grid gap-12 lg:grid-cols-12 items-center text-left">
            <div className="lg:col-span-7 lg:order-1 order-2">
              <div className={`border ${theme.colors.border} bg-[#0F1117]/85 p-8 shadow-md flex items-center justify-center min-h-[220px] ${theme.radius.card}`}>
                <div className="relative h-24 w-24">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#1E222F" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#10B981" strokeWidth="8" strokeDasharray="264" strokeDashoffset="264 * (1 - 0.96)" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-emerald-400">96%</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-2 order-1 space-y-4">
              <span className={theme.typography.caption}>Compliance Health</span>
              <h2 className="text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight leading-none">
                Verification Index alignment
              </h2>
              <p className={theme.typography.body}>
                Compliance alignment meters ensure your records pass external audits instantly. Automatically maps discussion segments directly to safety protocols.
              </p>
            </div>
          </div>

          {/* SECTION C: Left Text / Right Visual (Regulation scan mapping) */}
          <div className="grid gap-12 lg:grid-cols-12 items-center text-left">
            <div className="lg:col-span-5 space-y-4">
              <span className={theme.typography.caption}>Custom Policies</span>
              <h2 className="text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight leading-none">
                Interactive Regulation Checker
              </h2>
              <p className={theme.typography.body}>
                Check your minutes against specific security policies or SOX rules. Runs a semantic pass matching keywords directly into safety checkpoints.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className={`border ${theme.colors.border} bg-[#0F1117]/85 p-6 shadow-md ${theme.radius.card}`}>
                <div className="bg-slate-950/65 border border-slate-900 p-4 rounded-2xl text-[11px] text-left space-y-3">
                  <form onSubmit={handleQuerySearch} className="flex gap-2">
                    <input 
                      type="text" 
                      value={queryInput}
                      onChange={(e) => setQueryInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl py-2 px-3 text-xs focus:outline-none focus:border-indigo-500/20"
                    />
                    <Button type="submit" className="rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white border-0 text-xs px-3.5 py-2.5">
                      Query Scan
                    </Button>
                  </form>
                  <div className="space-y-1 pt-1.5 font-mono text-[9px] text-slate-500">
                    {demoQueryResults.map((res, i) => (
                      <p key={i} className="truncate">• {res}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION D: Left Visual / Right Text (Voting tables) */}
          <div className="grid gap-12 lg:grid-cols-12 items-center text-left">
            <div className="lg:col-span-7 lg:order-1 order-2">
              <div className={`border ${theme.colors.border} bg-[#0F1117]/85 p-6 shadow-md ${theme.radius.card}`}>
                <div className="bg-slate-950/65 border border-slate-900 p-3.5 rounded-2xl text-[10px] text-left font-sans space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                    <span className="font-bold text-slate-350">Auditor Ledger Overrides</span>
                    <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[8px] font-black uppercase">Passed</span>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-550">
                    <span>Results: 5-0 Unanimous Approval</span>
                    <span>Owner: CFO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:order-2 order-1 space-y-4">
              <span className={theme.typography.caption}>Voting Logs</span>
              <h2 className="text-2xl md:text-3.5xl font-black text-white uppercase tracking-tight leading-none">
                Decision & Voting Results
              </h2>
              <p className={theme.typography.body}>
                Compiles voting records, resolution owner assignments, and next-action logs. Structured audit trail tracks board consensus records.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. METRICS & KEY STATS */}
      <section id="metrics" className="py-24 md:py-36 border-t border-white/5 bg-[#090611]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-16 md:grid-cols-12 items-stretch">
            
            {/* Stats block left */}
            <div className="md:col-span-5 space-y-8 text-left">
              <div className="border-l border-white/10 pl-6 py-1">
                <span className={theme.typography.caption}>Established Node</span>
                <span className="block text-2xl font-black text-white mt-1 tracking-tight">SINCE 2024</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                  Mission-driven security engine checking governance board actions with AI.
                </p>
              </div>

              <div className="border-l border-white/10 pl-6 py-1">
                <span className={theme.typography.caption}>Total Audited Volume</span>
                <span className="block text-2xl font-black text-white mt-1 tracking-tight">100,000+</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                  Audits executed successfully across financial, tech, and healthcare boards.
                </p>
              </div>

              <div className="border-l border-white/10 pl-6 py-1">
                <span className={theme.typography.caption}>Inspection rating</span>
                <span className="block text-2xl font-black text-white mt-1 tracking-tight">95% SUCCESS</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium">
                  Boards reporting zero findings during external regulatory audits.
                </p>
              </div>
            </div>

            {/* Bento statistics blocks right */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6">
              <div className="text-left space-y-2">
                <h3 className={theme.typography.sectionHeading}>
                  Auditor Verified Architecture
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                  Dedicated secure system built under compliance regulation controls.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-[#0F1117]/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-white/10 transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span className="text-[10px] font-bold text-white">Pre-Templates & Checklists</span>
                  <span className="text-[9px] text-slate-500 font-semibold flex items-center gap-1">
                    Active Standards
                  </span>
                </div>

                <div className="bg-[#0F1117]/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-white/10 transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span className="text-[10px] font-bold text-white">AI Report Summaries</span>
                  <span className="text-[9px] text-slate-500 font-semibold flex items-center gap-1">
                    27 Languages
                  </span>
                </div>

                <div className="bg-[#0F1117]/40 border border-white/5 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-white/10 transition-colors">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span className="text-[10px] font-bold text-white">Fast & Simple Export</span>
                  <span className="text-[9px] text-slate-500 font-semibold flex items-center gap-1">
                    PDF / JSON
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FINAL CTA BANNER */}
      <section className="py-28 bg-[#090611] text-white text-center relative overflow-hidden border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white font-sans uppercase">
            Simplify your board compliance audits
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-500 text-xs leading-relaxed">
            Upload meeting audio or transcripts and get audit reports instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-xl bg-[#0F1117] border border-white/5 text-white hover:bg-slate-950 font-bold uppercase tracking-wider px-8 py-6 text-[10px]">
                Get Started Free
              </Button>
            </Link>
            <Link href="/compliance">
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent border-white/5 text-slate-350 hover:text-white hover:bg-slate-900 font-bold uppercase tracking-wider px-8 py-6 text-[10px]">
                View Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SYSTEM FOOTER */}
      <footer className="border-t border-white/5 bg-[#090611] py-16">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-white/5 text-slate-300">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-black text-white uppercase tracking-wider">
              Meeting <span className="text-slate-550">Minute</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-white transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-white transition-colors">Regulatory Risks</Link>
            <span className="hidden md:inline text-slate-800">|</span>
            <span className="font-normal text-slate-650 lowercase">&copy; {new Date().getFullYear()} meeting minute inc. all rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
