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
  Plus, 
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { theme } from '@/lib/theme'

interface DashboardClientProps {
  initialReports: Report[]
}

export default function DashboardClient({ initialReports }: DashboardClientProps) {
  const [reports] = useState<Report[]>(initialReports)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'compliant' | 'review'>('all')
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

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
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Stripe-Inspired Chart Mock Points (Muted palette)
  const chartPoints = [
    { month: 'Jan', val: 78, reports: 12 },
    { month: 'Feb', val: 82, reports: 15 },
    { month: 'Mar', val: 88, reports: 19 },
    { month: 'Apr', val: 85, reports: 22 },
    { month: 'May', val: 91, reports: 28 },
    { month: 'Jun', val: 96, reports: 34 }
  ]

  const upcomingMeetings = [
    { title: 'SOX Section 404 Audit Prep', time: '10:00 AM', date: 'July 15', room: 'Room 3' },
    { title: 'French Works-Council Sync', time: '2:30 PM', date: 'July 18', room: 'Room A' }
  ]

  const livePipelines = [
    { name: 'Transcription Parser', status: 'Online', code: 'NODE_X86' },
    { name: 'Diarization Biometrics', status: 'Running', code: 'VOICE_ID' },
    { name: 'Regulatory Scope Scan', status: 'Checking', code: 'SEC_AUDIT' }
  ]

  return (
    <div className={`flex bg-[#090611] text-slate-100 min-h-screen font-sans overflow-x-hidden`}>
      
      {/* 1. SIDEBAR */}
      <Sidebar />

      {/* 2. MAIN GRID CONTAINER */}
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav />

        <main className="flex-1 p-6 sm:p-8 space-y-8 w-full max-w-7xl mx-auto font-sans">
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              /* --- SKELETON LOADER STATE (Clean gray blocks) --- */
              <motion.div 
                key="loading-skeletons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 animate-pulse"
              >
                <div className="h-44 w-full bg-slate-900/40 border border-slate-900 rounded-2xl" />
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="h-28 bg-slate-900/40 border border-slate-900 rounded-2xl" />
                  <div className="h-28 bg-slate-900/40 border border-slate-900 rounded-2xl" />
                  <div className="h-28 bg-slate-900/40 border border-slate-900 rounded-2xl" />
                </div>
                <div className="h-80 w-full bg-slate-900/40 border border-slate-900 rounded-2xl" />
              </motion.div>
            ) : (
              /* --- THREE-COLUMN BENTO GRID WORKSPACE --- */
              <motion.div 
                key="active-bento-workspace"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-6 lg:grid-cols-12 items-stretch"
              >
                
                {/* ================= LEFT & CENTRAL WORKSPACE PANEL (8 COLS) ================= */}
                <div className="lg:col-span-8 space-y-6 flex flex-col">
                  
                  {/* BENTO BLOCK A: Cinematic Greeting & Rotating Orbit Core */}
                  <div className={`relative ${theme.radius.card} border ${theme.colors.border} bg-[#0F1117]/90 p-6 sm:p-8 overflow-hidden shadow flex items-center justify-between gap-6 min-h-[200px]`}>
                    <div className="text-left space-y-3 relative z-10 max-w-lg">
                      <span className={theme.typography.caption}>AI Engine Live</span>
                      <h1 className={theme.typography.hero}>
                        Good Morning, Shubhi 👋
                      </h1>
                      <p className={theme.typography.body + " max-w-sm"}>
                        Audit window verification triggers remain optimal. Generate compliance mapping reports below.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2.5">
                        <Link href="/new">
                          <Button className={`rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-5 py-4 border-0 shadow-sm`}>
                            <Plus className="h-4 w-4 mr-1" /> New Audit Report
                          </Button>
                        </Link>
                      </div>
                    </div>

                    {/* Minimal Orbit Core Graphic (Muted Grays) */}
                    <div className="relative w-36 h-36 hidden md:block shrink-0 z-10 opacity-75">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="5 5" className="animate-spin" style={{ animationDuration: '30s' }} />
                        <circle cx="50" cy="50" r="28" fill="none" stroke="#475569" strokeWidth="0.5" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                        <circle cx="50" cy="50" r="12" fill="url(#core-gradient)" />
                        <defs>
                          <radialGradient id="core-gradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="transparent" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                  {/* BENTO BLOCK B: Analytics & Stripe-inspired Area Chart */}
                  <div className={`rounded-3xl border ${theme.colors.border} bg-[#0F1117]/60 p-6 shadow backdrop-blur-md flex flex-col justify-between text-left relative overflow-hidden min-h-[300px]`}>
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                      <div>
                        <span className={theme.typography.caption}>Governance Index Trend</span>
                        <h4 className={theme.typography.cardHeading + " mt-0.5"}>Workspace Compliance Overview</h4>
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 bg-slate-950 p-2 rounded-xl border border-white/5">
                        <span>Score: {hoveredPoint !== null ? chartPoints[hoveredPoint].val : avgScore}%</span>
                      </div>
                    </div>

                    {/* Gradient Graph Canvas Area */}
                    <div className="relative h-44 w-full flex items-end pt-4">
                      <svg className="w-full h-full" viewBox="0 0 600 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="stripe-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Area Gradient Path */}
                        <path d="M 50 125 L 140 115 L 230 85 L 320 90 L 410 60 L 520 40 L 520 150 L 50 150 Z" fill="url(#stripe-grad)" />
                        
                        {/* Grid lines */}
                        <line x1="50" y1="20" x2="520" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="50" y1="65" x2="520" y2="65" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />
                        <line x1="50" y1="110" x2="520" y2="110" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="3 3" />

                        {/* Chart Area line */}
                        <path 
                          d="M 50 125 L 140 115 L 230 85 L 320 90 L 410 60 L 520 40" 
                          fill="none" 
                          stroke="#4F46E5" 
                          strokeWidth="2.0" 
                          strokeLinecap="round"
                        />
                      </svg>

                      {/* Overlapping Hover Targets Map */}
                      <div className="absolute inset-0 flex justify-between px-[8.3%] items-end pb-1 font-mono text-[9px] text-slate-550">
                        {chartPoints.map((pt, i) => (
                          <div 
                            key={i}
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                            className="flex flex-col items-center justify-end cursor-pointer group relative"
                            style={{ height: '100%', width: '13%' }}
                          >
                            {hoveredPoint === i && (
                              <div className="absolute bottom-full mb-2 bg-slate-950 border border-slate-900 p-2.5 rounded-xl text-white text-[8px] font-bold shadow-2xl flex flex-col gap-0.5 shrink-0 z-20">
                                <span className="text-slate-450 font-normal">Score: {pt.val}%</span>
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/5 pb-4 gap-4">
                      <div className="text-left">
                        <span className={theme.typography.caption}>Workspace Documents</span>
                        <h3 className={theme.typography.cardHeading + " mt-0.5"}>Recent Risk Audits</h3>
                      </div>
                      
                      {/* Filter tabs */}
                      <div className="flex bg-slate-950 border border-slate-900 rounded-xl p-1 text-[10.5px] font-semibold text-slate-500">
                        <button 
                          onClick={() => setActiveTab('all')}
                          className={`px-3 py-1.5 rounded-lg transition-colors border ${activeTab === 'all' ? 'bg-[#0F1117] border-white/5 text-white shadow-sm' : 'border-transparent hover:text-white'}`}
                        >
                          All
                        </button>
                        <button 
                          onClick={() => setActiveTab('compliant')}
                          className={`px-3 py-1.5 rounded-lg transition-colors border ${activeTab === 'compliant' ? 'bg-[#0F1117] border-white/5 text-white shadow-sm' : 'border-transparent hover:text-white'}`}
                        >
                          Compliant
                        </button>
                        <button 
                          onClick={() => setActiveTab('review')}
                          className={`px-3 py-1.5 rounded-lg transition-colors border ${activeTab === 'review' ? 'bg-[#0F1117] border-white/5 text-white shadow-sm' : 'border-transparent hover:text-white'}`}
                        >
                          Review
                        </button>
                      </div>
                    </div>

                    {totalReports > 0 ? (
                      filteredReports.length > 0 ? (
                        <ReportGrid reports={filteredReports} />
                      ) : (
                        <div className="text-center py-12 bg-slate-950 border border-slate-900 rounded-2xl">
                          <span className="text-xs text-slate-500 font-semibold">No audit reports match this category filter.</span>
                        </div>
                      )
                    ) : (
                      <EmptyState />
                    )}
                  </div>

                </div>

                {/* ================= RIGHT UTILITY CONTROL DECK (4 COLS) ================= */}
                <div className="lg:col-span-4 space-y-6 flex flex-col justify-start text-left">
                  
                  {/* UTILITY WIDGET 1: Compliance Health Card */}
                  <div className={`rounded-3xl border ${theme.colors.border} bg-[#0F1117]/60 p-6 shadow backdrop-blur-md`}>
                    <span className={theme.typography.caption}>Health Rating</span>
                    <h4 className={theme.typography.cardHeading + " mt-0.5"}>Workspace Average</h4>

                    <div className="mt-6 flex flex-col items-center justify-center relative">
                      <div className="relative h-28 w-28">
                        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#161821" strokeWidth="6" />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            fill="none"
                            stroke="#4F46E5"
                            strokeWidth="6"
                            strokeDasharray={264}
                            strokeDashoffset={264 * (1 - avgScore / 100)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xl font-black text-white">{avgScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* UTILITY WIDGET 2: AI Pipeline Status */}
                  <div className={`rounded-3xl border ${theme.colors.border} bg-[#0F1117]/60 p-6 shadow backdrop-blur-md`}>
                    <span className={theme.typography.caption}>Workspace Processing</span>
                    <h4 className={theme.typography.cardHeading + " mt-0.5"}>Active Systems Status</h4>

                    <div className="mt-5 space-y-3">
                      {livePipelines.map((node, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-950 border border-slate-900 px-4 py-2.5 rounded-xl text-xs">
                          <div className="text-left space-y-0.5">
                            <span className="font-bold text-slate-200 block">{node.name}</span>
                            <span className="text-[9.5px] text-slate-500 font-mono">{node.code}</span>
                          </div>
                          {/* Custom pill styled with top-left & bottom-right border */}
                          <span className={`rounded-full ${theme.heights.badge} text-[8.5px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-white border border-t-emerald-500/35 border-l-emerald-500/35 border-b-emerald-500/5 border-r-emerald-500/5 shadow-inner`}>
                            {node.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* UTILITY WIDGET 3: Upcoming Syncs */}
                  <div className={`rounded-3xl border ${theme.colors.border} bg-[#0F1117]/60 p-6 shadow backdrop-blur-md`}>
                    <span className={theme.typography.caption}>Meeting Timeline</span>
                    <h4 className={theme.typography.cardHeading + " mt-0.5"}>Upcoming Syncs</h4>

                    <div className="mt-5 space-y-4">
                      {upcomingMeetings.map((mtg, i) => (
                        <div key={i} className="flex gap-4 relative">
                          {i !== upcomingMeetings.length - 1 && (
                            <div className="absolute top-5 left-2 w-[1px] h-11 bg-white/5" />
                          )}
                          <div className="h-4 w-4 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
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


                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </main>
      </div>

    </div>
  )
}
