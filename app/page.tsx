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
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [queryInput, setQueryInput] = useState<string>('GDPR Article 32')
  const [demoQueryResults, setDemoQueryResults] = useState<string[]>([
    'Article 32(1)(a): Encryption active.',
    'Article 32(1)(b): Resilience logged.'
  ])

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

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-blue-600 selection:text-white antialiased font-sans relative overflow-x-hidden">
      
      {/* Background grids */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#eef0f3_1px,transparent_1px),linear-gradient(to_bottom,#eef0f3_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

      {/* Decorative Daisy Flowers (floating on left & right of hero) replicating the reference image exactly */}
      <div className="absolute left-[4%] top-[18%] hidden xl:block select-none pointer-events-none w-28 h-28 opacity-85">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-sm">
          {/* Flower petals */}
          <path d="M50 30 C45 10, 55 10, 50 30 M50 70 C45 90, 55 90, 50 70 M30 50 C10 45, 10 55, 30 50 M70 50 C90 45, 90 55, 70 50 M36 36 C18 22, 28 12, 36 36 M64 64 C82 78, 72 88, 64 64 M36 64 C18 78, 28 88, 36 64 M64 36 C82 22, 72 12, 64 36" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
          {/* Flower core */}
          <circle cx="50" cy="50" r="12" fill="#E07E63" />
        </svg>
      </div>
      
      <div className="absolute right-[4%] top-[15%] hidden xl:block select-none pointer-events-none w-32 h-32 opacity-85">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-sm">
          <path d="M50 30 C45 10, 55 10, 50 30 M50 70 C45 90, 55 90, 50 70 M30 50 C10 45, 10 55, 30 50 M70 50 C90 45, 90 55, 70 50 M36 36 C18 22, 28 12, 36 36 M64 64 C82 78, 72 88, 64 64 M36 64 C18 78, 28 88, 36 64 M64 36 C82 22, 72 12, 64 36" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="12" fill="#E07E63" />
        </svg>
      </div>

      <div className="absolute left-[2%] top-[45%] hidden xl:block select-none pointer-events-none w-20 h-20 opacity-70">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-sm">
          <path d="M50 30 C45 10, 55 10, 50 30 M50 70 C45 90, 55 90, 50 70 M30 50 C10 45, 10 55, 30 50 M70 50 C90 45, 90 55, 70 50 M36 36 C18 22, 28 12, 36 36 M64 64 C82 78, 72 88, 64 64 M36 64 C18 78, 28 88, 36 64 M64 36 C82 22, 72 12, 64 36" fill="white" stroke="#e2e8f0" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" fill="#E07E63" />
        </svg>
      </div>

      {/* 1. NAVIGATION BAR */}
      <header className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex h-14 items-center justify-between rounded-full border border-slate-200/60 bg-white/70 px-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-slate-800">Meeting Minute</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <a href="#features" className="hover:text-slate-800 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-800 transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-slate-800 transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-slate-800 transition-colors">Risk Index</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors mr-2">
              Log In
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="rounded-full bg-slate-950 px-4 text-xs font-semibold text-white hover:bg-slate-800 transition-all">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-5xl font-normal tracking-tight text-[#1E293B] sm:text-6xl md:text-7xl leading-[1.08] max-w-4xl mx-auto"
          >
            Build an Audit-Ready Compliance <br />
            Report in Minutes with AI
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-slate-500 text-sm sm:text-base leading-relaxed"
          >
            Meeting Minute AI analyzes your legal, corporate, and council transcripts. 
            Map conversations to regulatory standards and auto-verify auditing points.
          </motion.p>

          {/* Terracotta Orange CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex justify-center"
          >
            <Link href="/dashboard">
              <Button className="group rounded-full bg-[#E07E63] px-6 py-5 text-sm font-semibold text-white hover:bg-[#cf6d52] transition-all gap-2 border-0 shadow-lg shadow-orange-500/10">
                Build My Report
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3 w-3 text-white" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* 3. HERO DASHBOARD CANVAS (Forest Green bg-[#5B705B] with Character Vector Art & Floating Widgets) */}
          <motion.div 
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative mt-16 mx-auto max-w-4xl rounded-[32px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
          >
            <div className="relative w-full aspect-[16/9] rounded-[24px] bg-[#5B705B] overflow-hidden flex items-stretch">
              
              {/* Left Side: Modern Graphic Vector Art representing the woman working on laptop (CVPilot style) */}
              <div className="w-[45%] relative hidden md:flex items-end justify-center overflow-hidden">
                <svg viewBox="0 0 200 240" className="w-[85%] h-[90%] text-white">
                  {/* Background soft orange circle */}
                  <circle cx="100" cy="130" r="70" fill="#EBD6CD" opacity="0.8" />
                  
                  {/* Laptop */}
                  <path d="M 60 160 L 140 160 L 150 185 L 50 185 Z" fill="#2E3A3E" />
                  <path d="M 70 110 L 130 110 L 130 160 L 70 160 Z" fill="#4B585C" />
                  
                  {/* Character Body */}
                  <path d="M 70 240 C 70 190, 130 190, 130 240 Z" fill="#E07E63" />
                  {/* Face & Neck */}
                  <rect x="92" y="118" width="16" height="20" rx="3" fill="#FFE5D9" />
                  <circle cx="100" cy="110" r="22" fill="#FFE5D9" />
                  
                  {/* Orange cap */}
                  <path d="M 78 102 C 78 80, 122 80, 122 102 Z" fill="#E07E63" />
                  <path d="M 74 100 L 90 94 L 115 94 L 126 100 Z" fill="#C96B51" />
                  
                  {/* Hair */}
                  <circle cx="83" cy="115" r="9" fill="#9C6644" />
                  <circle cx="117" cy="115" r="9" fill="#9C6644" />
                  
                  {/* Hands */}
                  <circle cx="80" cy="175" r="7" fill="#FFE5D9" />
                  <circle cx="120" cy="175" r="7" fill="#FFE5D9" />
                </svg>
              </div>

              {/* Right Side: Floating mock widgets exactly as displayed on the reference image */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center items-start space-y-4 relative z-10">
                
                {/* Score Widget */}
                <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between w-full max-w-xs transition-transform hover:scale-[1.02]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Compliance Index</span>
                    <h5 className="text-sm font-extrabold text-slate-800 mt-0.5">Audit-Ready Score</h5>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center font-serif text-sm font-black text-[#E07E63]">
                    96%
                  </div>
                </div>

                {/* Question Search Widget */}
                <div className="bg-white rounded-full shadow-md px-5 py-3.5 flex items-center justify-between w-full max-w-sm transition-transform hover:scale-[1.02]">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#E07E63] shrink-0 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-700">Ask AI Compliance Officer Anything...</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>

                {/* Regulation checklist tags widget */}
                <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-xs transition-transform hover:scale-[1.02]">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Regulations Mapped</span>
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">Verified</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[9px] font-semibold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full text-slate-600">SOX 404</span>
                    <span className="text-[9px] font-semibold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full text-slate-600">GDPR Art. 32</span>
                    <span className="text-[9px] font-semibold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full text-slate-600">HIPAA Safeguards</span>
                    <button className="text-[9px] font-bold bg-[#E07E63] text-white px-2.5 py-0.5 rounded-full flex items-center gap-0.5 hover:bg-[#cf6d52]">
                      <Plus className="h-2 w-2" /> Add Policy
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. MAIN FEATURES & GRID SECTION */}
      <section id="features" className="py-16 md:py-24 border-t border-slate-200/50 bg-[#FAF9F6]">
        <div className="mx-auto max-w-6xl px-6">
          
          <div className="grid gap-12 md:grid-cols-12 items-start">
            
            {/* Left Column: Stats & Highlight Summary Card */}
            <div className="md:col-span-5 space-y-8">
              
              {/* Highlight summary card */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm">
                {/* SVG vector profile illustration */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-36 h-36 bg-[#EBD6CD] rounded-2xl overflow-hidden flex items-end justify-center border border-slate-100">
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
                      <circle cx="50" cy="40" r="20" fill="#FFE5D9" />
                      <path d="M20 90 C20 65, 80 65, 80 90 Z" fill="#E07E63" />
                      <circle cx="40" cy="38" r="2" fill="#2E3A3E" />
                      <circle cx="60" cy="38" r="2" fill="#2E3A3E" />
                      <path d="M30 25 C30 10, 70 10, 70 25 Z" fill="#5B705B" />
                    </svg>
                    <div className="absolute top-2 right-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full px-2 py-0.5 text-[9px] font-bold">
                      Match 98%
                    </div>
                  </div>
                </div>
                
                <h4 className="font-serif text-2xl font-normal text-slate-800 text-center">AI-Powered Audit Ready Meeting Minutes</h4>
                <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
                  Meeting Minute helps risk officers optimize compliance records with AI, improving visibility, alignment, and review speed.
                </p>
                <div className="mt-6 flex justify-center">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="rounded-full border-[#E07E63] text-[#E07E63] bg-white font-semibold hover:bg-orange-50/50">
                      See How It Works
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Lower statistics row */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-6 text-left">
                <div>
                  <span className="block text-3xl font-extrabold text-slate-800">40%</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-bold mt-1">Audit pass index</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-slate-800">32%</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-bold mt-1">More resolution</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-slate-800">3x</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-bold mt-1">Faster reports</span>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Feature mockups (Exactly as CVPilot features) */}
            <div className="md:col-span-7 space-y-12">
              <div className="text-left">
                <h2 className="font-serif text-3xl md:text-5xl text-[#1E293B] font-normal tracking-tight">
                  Features That Make Meeting Minute Stand Out
                </h2>
                <p className="mt-2 text-xs text-slate-500">
                  From AI-powered writing to compliance audits, everything you need for corporate board records.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                
                {/* Feature 1: AI Writes it for you */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[260px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07E63]">AI Writes It for You</h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      AI drafts structured board summaries and tags critical financial details automatically.
                    </p>
                  </div>
                  {/* Summary card widget */}
                  <div className="mt-4 border border-slate-100 rounded-lg bg-slate-50/50 p-3 text-[9px] text-left">
                    <span className="font-bold text-slate-700 block mb-1">Executive Summary Summary</span>
                    <p className="text-slate-500 leading-normal">
                      "Approved ledger overrides (Passed 5-0). Database controls verified. Action ownership assigned to CFO."
                    </p>
                  </div>
                </div>

                {/* Feature 2: Guided Meeting Flow */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[260px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07E63]">Guided Report Flow</h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      Build your meeting reports step by step with clear auditing rules.
                    </p>
                  </div>
                  {/* Stepper widget */}
                  <div className="mt-4 bg-slate-50/50 border border-slate-100 p-3 rounded-lg space-y-1.5 text-[9px] font-bold text-slate-500">
                    <div className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Step 1 • Personal Details</div>
                    <div className="flex items-center gap-1.5 text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Step 2 • Meeting Summary</div>
                    <div className="flex items-center gap-1.5"><span className="h-3.5 w-3.5 rounded-full border border-slate-350 flex items-center justify-center text-[7px]">3</span> Step 3 • Regulations Mapped</div>
                  </div>
                </div>

                {/* Feature 3: Compliance Score Index */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[260px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07E63]">Compliance score</h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      Ensure your records pass external checks. Check compliance alignment instantly.
                    </p>
                  </div>
                  {/* Circular progress gauge */}
                  <div className="mt-4 flex flex-col items-center justify-center bg-slate-50/50 border border-slate-100 p-3 rounded-lg">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle cx="28" cy="28" r="22" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                        <circle cx="28" cy="28" r="22" stroke="#E07E63" strokeWidth="4" fill="transparent" strokeDasharray={138} strokeDashoffset={138 * (1 - 0.48)} />
                      </svg>
                      <span className="absolute text-[10px] font-extrabold text-slate-700">48%</span>
                    </div>
                    <span className="text-[8px] text-orange-600 font-bold mt-1.5">Need improvement</span>
                  </div>
                </div>

                {/* Feature 4: Scan Regulations Instantly */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex flex-col justify-between min-h-[260px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07E63]">Scan Custom Policies</h4>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      Check your minutes against specific security or internal policy standards.
                    </p>
                  </div>
                  {/* Search box widget */}
                  <div className="mt-4 bg-slate-50/50 border border-slate-100 p-3 rounded-lg text-[9px] space-y-1.5">
                    <span className="text-slate-400 block font-semibold">Paste a regulation link</span>
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded px-2 py-1 text-slate-800">
                      <span>https://www.sox.gov/404</span>
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. METRICS & CASE STUDY SECTION (Lower left stats, Lower right preview cards) */}
      <section id="metrics" className="py-16 md:py-24 border-t border-slate-200/40 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-12 items-start">
            
            {/* Lower Left Column: Symmetrical stats block */}
            <div className="md:col-span-5 space-y-8 text-left">
              <div className="border-l-2 border-[#E07E63] pl-6">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">Experience Launched</span>
                <span className="block text-3xl font-extrabold text-slate-800 mt-1">Since 2024</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Built with a dedicated mission to simplify minutes filing using secure generative AI.
                </p>
              </div>

              <div className="border-l-2 border-[#E07E63] pl-6">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">AI Reports Generated</span>
                <span className="block text-3xl font-extrabold text-slate-800 mt-1">100,000+</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Thousands of policy-mapped audits created globally across financial committees.
                </p>
              </div>

              <div className="border-l-2 border-[#E07E63] pl-6">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">User Success Score</span>
                <span className="block text-3xl font-extrabold text-slate-800 mt-1">95%</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Governance boards report zero errors during external compliance inspections.
                </p>
              </div>
            </div>

            {/* Lower Right Column: Horizontal Cards Preview */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="font-serif text-3xl text-slate-800 font-normal leading-tight text-left">
                Why Choose Meeting Minute
              </h3>
              <p className="text-xs text-slate-500 text-left">
                A secure framework built around financial governance and board compliance guidelines.
              </p>

              {/* Grid of horizontal preview cards at bottom */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col justify-between aspect-[4/3] text-left">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-800">Pre-Templates & Checklists</span>
                  <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Active Standard
                  </span>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col justify-between aspect-[4/3] text-left">
                  <span className="h-2 w-2 rounded-full bg-[#E07E63]" />
                  <span className="text-[10px] font-bold text-slate-800">AI Report Summaries</span>
                  <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> 27 Languages
                  </span>
                </div>

                <div className="bg-slate-50/70 border border-slate-100 rounded-xl p-4 flex flex-col justify-between aspect-[4/3] text-left">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-800">Fast & Simple Export</span>
                  <span className="text-[9px] text-slate-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" /> PDF / JSON
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER */}
      <section className="py-20 md:py-28 bg-[#0B1E19] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_center,theme(colors.emerald.900/15),theme(colors.slate.950/0))]" />
        
        <div className="mx-auto max-w-4xl px-6 relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-normal leading-tight text-white">
            Simplify your board compliance audits
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-emerald-300/80 text-xs sm:text-sm leading-relaxed">
            Upload meeting audio or transcripts and get audit reports instantly.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full bg-[#E07E63] hover:bg-[#cf6d52] font-semibold px-6 py-4 shadow-lg text-xs border-0">
                Get Started Free
              </Button>
            </Link>
            <Link href="/compliance">
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-emerald-800 text-emerald-100 hover:text-white hover:bg-[#15342a] font-semibold px-6 py-4 text-xs">
                View Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-200/50 bg-[#FAF9F6] py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-serif text-sm font-bold text-slate-800">Meeting Minute</span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] font-semibold text-slate-400">
            <a href="#features" className="hover:text-slate-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-600 transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-slate-600 transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-slate-600 transition-colors">Regulatory Risks</Link>
            <span className="hidden md:inline text-slate-200">|</span>
            <span>&copy; {new Date().getFullYear()} Meeting Minute Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
