'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { ReportGrid } from '@/components/dashboard/ReportGrid'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { Report } from '@/lib/types'
import { 
  Activity, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  ChevronRight, 
  FileText, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle,
  Database,
  ArrowRight,
  Shield,
  Fingerprint
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardClientProps {
  initialReports: Report[]
}

export default function DashboardClient({ initialReports }: DashboardClientProps) {
  const [reports] = useState<Report[]>(initialReports)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'compliant' | 'review'>('all')
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  
  // Chat state
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Ask me anything about your current SOX or GDPR audits.' }
  ])
  const [inputVal, setInputVal] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim()) return
    const userMsg = inputVal
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }])
    setInputVal('')
    
    // Auto AI reply mock
    setTimeout(() => {
      let reply = "Compliance indices verified. Database connections are encrypting via TLS 1.3."
      if (userMsg.toLowerCase().includes('sox')) {
        reply = "SOX Section 404 controls are audit-ready. No overrides detected in database ledger."
      } else if (userMsg.toLowerCase().includes('gdpr')) {
        reply = "GDPR Article 32 requires regular testing. Next scheduled test window starts on July 18."
      }
      setMessages(prev => [...prev, { sender: 'ai', text: reply }])
    }, 700)
  }

  const totalReports = reports.length
  const totalMinutes = reports.reduce((sum, r) => sum + r.duration, 0)
  const avgScore = totalReports > 0 ? Math.round(reports.reduce((sum, r) => sum + r.complianceScore, 0) / totalReports) : 0

  // Filter lists
  const filteredReports = reports.filter(r => {
    if (activeTab === 'compliant') return r.status === 'compliant'
    if (activeTab === 'review') return r.status === 'needs-review' || r.status === 'at-risk'
    return true
  })

  // Simulated skeletal loader
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  // Stripe-Inspired Chart Mock Points
  const chartPoints = [
    { month: 'Jan', val: 78, reports: 12 },
    { month: 'Feb', val: 82, reports: 15 },
    { month: 'Mar', val: 88, reports: 19 },
    { month: 'Apr', val: 85, reports: 22 },
    { month: 'May', val: 91, reports: 28 },
    { month: 'Jun', val: 96, reports: 34 }
  ]

  const upcomingMeetings = [
    { title: 'SOX Section 404 Audit Prep', time: '10:00 AM', date: 'July 15', room: 'Audit Room 3' },
    { title: 'French Works-Council Sync', time: '2:30 PM', date: 'July 18', room: 'Meeting Room A' }
  ]

  const livePipelines = [
    { name: 'Transcription Parser', status: 'Online', code: 'NODE_X86' },
    { name: 'Diarization Biometrics', status: 'Running', code: 'VOICE_ID' },
    { name: 'Regulatory Scope Scan', status: 'Checking', code: 'SEC_AUDIT' }
  ]

  return (
    <div className="flex bg-[#08090F] text-slate-100 min-h-screen font-sans overflow-x-hidden selection:bg-[#7C3AED]/30 selection:text-white">
      
      {/* Animated gradient mesh background blobs */}
      <div className="absolute top-[5%] left-[10%] w-[45%] aspect-square rounded-full bg-gradient-to-tr from-[#7C3AED]/12 to-transparent blur-[120px] pointer-events-none -z-10 animate-pulse duration-[12000ms]" />
      <div className="absolute bottom-[10%] right-[5%] w-[50%] aspect-square rounded-full bg-gradient-to-bl from-[#06B6D4]/12 to-transparent blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[25%] w-[35%] aspect-square rounded-full bg-gradient-to-tr from-[#EC4899]/8 to-transparent blur-[110px] pointer-events-none -z-10" />

      {/* 1. COLLAPSIBLE SIDEBAR */}
      <Sidebar />

      {/* 2. MAIN GRID CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <TopNav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 w-full max-w-7xl mx-auto">
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              /* --- SKELETON LOADER STATE --- */
              <motion.div 
                key="loading-skeletons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 animate-pulse"
              >
                <div className="h-48 w-full bg-slate-900/40 border border-slate-850 rounded-3xl" />
                <div className="grid gap-6 md:grid-cols-4">
                  <div className="h-32 bg-slate-900/40 border border-slate-850 rounded-2xl" />
                  <div className="h-32 bg-slate-900/40 border border-slate-850 rounded-2xl" />
                  <div className="h-32 bg-slate-900/40 border border-slate-850 rounded-2xl" />
                  <div className="h-32 bg-slate-900/40 border border-slate-850 rounded-2xl" />
                </div>
                <div className="h-96 w-full bg-slate-900/40 border border-slate-850 rounded-3xl" />
              </motion.div>
            ) : (
              /* --- THREE-COLUMN BENTO GRID WORKSPACE --- */
              <motion.div 
                key="active-bento-workspace"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="grid gap-6 lg:grid-cols-12 items-stretch"
              >
                
                {/* ================= LEFT & CENTRAL WORKSPACE PANEL (8 COLS) ================= */}
                <div className="lg:col-span-8 space-y-6 flex flex-col">
                  
                  {/* BENTO BLOCK A: Cinematic Greeting & Rotating Orbit Core */}
                  <div className="relative rounded-3xl border border-slate-850 bg-gradient-to-tr from-[#0F111A] via-[#131624] to-[#0F111A] p-6 sm:p-8 overflow-hidden shadow-2xl flex items-center justify-between gap-6 min-h-[220px]">
                    
                    {/* Inner glowing core overlay */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-tr from-[#7C3AED]/20 to-[#06B6D4]/10 rounded-full blur-[70px] pointer-events-none" />

                    <div className="text-left space-y-3 relative z-10 max-w-lg">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#818CF8]">
                        <Sparkles className="h-3.5 w-3.5" /> AI Engine Live
                      </div>
                      <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
                        Good Morning, Shubhi 👋
                      </h1>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
                        Audit window verification triggers remain optimal. Generate compliance mapping reports below.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2.5">
                        <Link href="/new">
                          <Button className="rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] text-white hover:opacity-95 text-xs py-4.5 px-5 shadow-lg shadow-indigo-500/20 border-0 font-bold uppercase tracking-wider">
                            <Plus className="h-4 w-4 mr-1" /> New Audit Report
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Animated Intersecting Rotating Orbits SVG (Awwwards 3D Core Graphic representation) */}
                    <div className="relative w-40 h-40 hidden md:block shrink-0 z-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Outer Orbit */}
                        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#orbit-purple)" strokeWidth="0.75" strokeDasharray="5 5" className="animate-spin" style={{ animationDuration: '30s' }} />
                        {/* Middle Orbit */}
                        <circle cx="50" cy="50" r="28" fill="none" stroke="url(#orbit-blue)" strokeWidth="0.75" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                        {/* Inner Core Glow */}
                        <circle cx="50" cy="50" r="14" fill="url(#core-glow-gradient)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                        {/* Intersecting Ellipses for 3D look */}
                        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="url(#orbit-cyan)" strokeWidth="0.75" transform="rotate(45 50 50)" className="opacity-60" />
                        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="url(#orbit-pink)" strokeWidth="0.75" transform="rotate(-45 50 50)" className="opacity-60" />
                        
                        <defs>
                          <linearGradient id="orbit-purple" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                          <linearGradient id="orbit-blue" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                          <linearGradient id="orbit-cyan" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                          <linearGradient id="orbit-pink" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                          <radialGradient id="core-glow-gradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#7C3AED" />
                            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="transparent" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>

                  </div>

                  {/* BENTO BLOCK B: Analytics & Stripe-inspired Area Chart */}
                  <div className="rounded-3xl border border-slate-850 bg-[#08090F]/55 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md flex flex-col justify-between text-left relative overflow-hidden min-h-[300px]">
                    <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-4">
                      <div>
                        <span className="text-[9.5px] uppercase tracking-wider text-slate-500 font-extrabold block">Governance Index Over Time</span>
                        <h4 className="text-sm font-bold text-slate-200 mt-0.5">Workspace Compliance Performance</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-350 bg-slate-950 p-2 rounded-xl border border-slate-850">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
                        <span>Month Score: {hoveredPoint !== null ? chartPoints[hoveredPoint].val : avgScore}%</span>
                      </div>
                    </div>

                    {/* Gradient Graph Canvas Area */}
                    <div className="relative h-44 w-full flex items-end pt-4">
                      <svg className="w-full h-full" viewBox="0 0 600 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="stripe-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
                            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.12" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area Gradient Path */}
                        <path d="M 50 125 L 140 115 L 230 85 L 320 90 L 410 60 L 520 40 L 520 150 L 50 150 Z" fill="url(#stripe-grad)" />
                        
                        {/* Grid lines */}
                        <line x1="50" y1="20" x2="520" y2="20" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="50" y1="65" x2="520" y2="65" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="50" y1="110" x2="520" y2="110" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3" />

                        {/* Chart Area line */}
                        <path 
                          d="M 50 125 L 140 115 L 230 85 L 320 90 L 410 60 L 520 40" 
                          fill="none" 
                          stroke="url(#stripe-line-gradient)" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="stripe-line-gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#7C3AED" />
                            <stop offset="50%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
                      </svg>

                      {/* Overlapping Hover Targets Map */}
                      <div className="absolute inset-0 flex justify-between px-[8.3%] items-end pb-1 font-mono text-[9px] text-slate-500">
                        {chartPoints.map((pt, i) => (
                          <div 
                            key={i}
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                            className="flex flex-col items-center justify-end cursor-pointer group relative"
                            style={{ height: '100%', width: '13%' }}
                          >
                            {hoveredPoint === i && (
                              <div className="absolute bottom-full mb-2 bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white text-[8px] font-bold shadow-2xl flex flex-col gap-0.5 shrink-0 z-20">
                                <span className="text-slate-400 font-normal">Score: {pt.val}%</span>
                                <span>Reports: {pt.reports}</span>
                              </div>
                            )}
                            <span className={`block pb-1.5 transition-colors ${hoveredPoint === i ? 'text-white font-black' : ''}`}>
                              {pt.month}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BENTO BLOCK C: Reports Deck & Document filters */}
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-850 pb-4 gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">Workspace Documents</span>
                        <h3 className="text-base font-bold text-slate-200 mt-0.5">Recent Risk Audits</h3>
                      </div>
                      
                      {/* Filter tabs */}
                      <div className="flex bg-slate-950 border border-slate-850 rounded-xl p-1 text-[10.5px] font-semibold text-slate-400">
                        <button 
                          onClick={() => setActiveTab('all')}
                          className={`px-3 py-1.5 rounded-lg transition-colors border ${activeTab === 'all' ? 'bg-[#7C3AED] border-slate-800 text-white shadow-md shadow-indigo-500/10' : 'border-transparent hover:text-white'}`}
                        >
                          All
                        </button>
                        <button 
                          onClick={() => setActiveTab('compliant')}
                          className={`px-3 py-1.5 rounded-lg transition-colors border ${activeTab === 'compliant' ? 'bg-[#7C3AED] border-slate-800 text-white shadow-md shadow-indigo-500/10' : 'border-transparent hover:text-white'}`}
                        >
                          Compliant
                        </button>
                        <button 
                          onClick={() => setActiveTab('review')}
                          className={`px-3 py-1.5 rounded-lg transition-colors border ${activeTab === 'review' ? 'bg-[#7C3AED] border-slate-800 text-white shadow-md shadow-indigo-500/10' : 'border-transparent hover:text-white'}`}
                        >
                          Review
                        </button>
                      </div>
                    </div>

                    {totalReports > 0 ? (
                      filteredReports.length > 0 ? (
                        <ReportGrid reports={filteredReports} />
                      ) : (
                        <div className="text-center py-12 bg-slate-950/20 border border-slate-900 rounded-3xl">
                          <span className="text-xs text-slate-500 font-semibold">No audit reports match this category filter.</span>
                        </div>
                      )
                    ) : (
                      <EmptyState />
                    )}
                  </div>

                </div>

                {/* ================= RIGHT UTILITY CONTROL DECK (4 COLS) ================= */}
                <div className="lg:col-span-4 space-y-6 flex flex-col justify-start">
                  
                  {/* UTILITY WIDGET 1: Compliance Radial Health Gauge */}
                  <div className="rounded-3xl border border-slate-850 bg-[#08090F]/55 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-[#06B6D4]/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <span className="text-[9.5px] uppercase tracking-wider text-slate-500 font-extrabold block">Health Rating</span>
                    <h4 className="text-sm font-bold text-slate-200 mt-0.5">Workspace Average</h4>

                    <div className="mt-6 flex flex-col items-center justify-center relative">
                      <div className="relative h-32 w-32">
                        {/* Glow circular background */}
                        <div className="absolute inset-2 bg-gradient-to-tr from-[#7C3AED]/10 to-[#06B6D4]/10 rounded-full blur-xl animate-pulse" />
                        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="6" />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="url(#radial-kpi-gradient)"
                            strokeWidth="6"
                            strokeDasharray={264}
                            strokeDashoffset={264 * (1 - avgScore / 100)}
                            strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="radial-kpi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#7C3AED" />
                              <stop offset="50%" stopColor="#3B82F6" />
                              <stop offset="100%" stopColor="#06B6D4" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-2xl font-black text-white">{avgScore}%</span>
                          <span className="text-[7.5px] font-black uppercase text-slate-500 tracking-wider">Secured</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UTILITY WIDGET 2: AI Pipeline Node Workflow */}
                  <div className="rounded-3xl border border-slate-850 bg-[#08090F]/55 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-left relative overflow-hidden">
                    <span className="text-[9.5px] uppercase tracking-wider text-slate-500 font-extrabold block">Workspace Processing</span>
                    <h4 className="text-sm font-bold text-slate-200 mt-0.5">Active Systems Status</h4>

                    <div className="mt-5 space-y-4">
                      {livePipelines.map((node, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-950/60 border border-slate-900 px-4 py-3 rounded-2xl">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400">
                              {i === 0 ? <FileText className="h-4 w-4 text-[#818CF8]" /> : i === 1 ? <Fingerprint className="h-4 w-4 text-[#EC4899]" /> : <Shield className="h-4 w-4 text-[#22D3EE]" />}
                            </div>
                            <div className="text-left space-y-0.5 text-xs">
                              <span className="font-bold text-slate-200 block">{node.name}</span>
                              <span className="text-[9.5px] text-slate-500 font-mono">{node.code}</span>
                            </div>
                          </div>
                          <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                            {node.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UTILITY WIDGET 3: Upcoming Governance Syncs */}
                  <div className="rounded-3xl border border-slate-850 bg-[#08090F]/55 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-left relative overflow-hidden">
                    <span className="text-[9.5px] uppercase tracking-wider text-slate-500 font-extrabold block">Meeting Timeline</span>
                    <h4 className="text-sm font-bold text-slate-200 mt-0.5">Upcoming Syncs</h4>

                    <div className="mt-5 space-y-4">
                      {upcomingMeetings.map((mtg, i) => (
                        <div key={i} className="flex gap-4 relative">
                          {i !== upcomingMeetings.length - 1 && (
                            <div className="absolute top-5 left-2 w-[1px] h-11 bg-slate-850" />
                          )}
                          <div className="h-4 w-4 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#818CF8]" />
                          </div>
                          <div className="text-xs text-left space-y-0.5">
                            <span className="font-bold text-slate-200 block">{mtg.title}</span>
                            <span className="text-[10px] text-slate-500 font-semibold block">
                              {mtg.date} • {mtg.time} | <span className="text-slate-400">{mtg.room}</span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UTILITY WIDGET 4: Floating Interactive AI Assistant Console */}
                  <div className="rounded-3xl border border-slate-850 bg-[#08090F]/70 p-5 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-md text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#7C3AED]/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 border-b border-slate-850 pb-3 mb-3">
                      <Sparkles className="h-4.5 w-4.5 text-[#818CF8] animate-pulse" />
                      <div>
                        <span className="text-[8.5px] font-black uppercase text-slate-500 tracking-wider block">Real-time Copilot</span>
                        <h4 className="text-xs font-bold text-white">Compliance Assistant</h4>
                      </div>
                    </div>

                    {/* Messages Panel */}
                    <div className="space-y-3.5 max-h-48 overflow-y-auto mb-4 pr-1 text-xs">
                      {messages.map((msg, i) => (
                        <div 
                          key={i}
                          className={`p-3 rounded-2xl max-w-[85%] text-left ${
                            msg.sender === 'user' 
                              ? 'ml-auto bg-[#7C3AED]/20 border border-[#7C3AED]/35 text-slate-200' 
                              : 'bg-slate-950/65 border border-slate-850 text-slate-350'
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>

                    {/* Message submission form */}
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <input 
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Ask about SOX or GDPR indexes..."
                        className="flex-1 bg-slate-950 border border-slate-850 text-white rounded-xl py-2.5 px-3.5 text-[11px] placeholder-slate-650 focus:outline-none focus:border-indigo-500/50"
                      />
                      <button 
                        type="submit"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#3B82F6] text-white hover:opacity-95 shadow-md shadow-indigo-500/10 border-0 shrink-0"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  </div>

                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

    </div>
  )
}
