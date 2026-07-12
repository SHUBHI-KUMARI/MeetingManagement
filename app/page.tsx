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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-[#4F46E5] selection:text-white antialiased relative overflow-x-hidden">
      
      {/* Background radial gradients for ambient OpenAI / Linear feel */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] aspect-square rounded-full bg-gradient-to-tr from-[#4F46E5]/10 to-[#7C3AED]/5 blur-[120px] pointer-events-none -z-10 animate-pulse duration-[10000ms]" />
      <div className="absolute top-[20%] right-[-15%] w-[60%] aspect-square rounded-full bg-gradient-to-bl from-[#06B6D4]/10 to-[#7C3AED]/5 blur-[130px] pointer-events-none -z-10" />

      {/* Decorative Daisy Flowers styled to match the new palette */}
      <div className="absolute left-[4%] top-[18%] hidden xl:block select-none pointer-events-none w-28 h-28 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#4F46E5]/20 drop-shadow-sm">
          <path d="M50 30 C45 10, 55 10, 50 30 M50 70 C45 90, 55 90, 50 70 M30 50 C10 45, 10 55, 30 50 M70 50 C90 45, 90 55, 70 50 M36 36 C18 22, 28 12, 36 36 M64 64 C82 78, 72 88, 64 64 M36 64 C18 78, 28 88, 36 64 M64 36 C82 22, 72 12, 64 36" fill="currentColor" stroke="none" />
          <circle cx="50" cy="50" r="12" fill="#7C3AED" className="opacity-90" />
        </svg>
      </div>
      
      <div className="absolute right-[4%] top-[15%] hidden xl:block select-none pointer-events-none w-32 h-32 opacity-80">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#06B6D4]/20 drop-shadow-sm">
          <path d="M50 30 C45 10, 55 10, 50 30 M50 70 C45 90, 55 90, 50 70 M30 50 C10 45, 10 55, 30 50 M70 50 C90 45, 90 55, 70 50 M36 36 C18 22, 28 12, 36 36 M64 64 C82 78, 72 88, 64 64 M36 64 C18 78, 28 88, 36 64 M64 36 C82 22, 72 12, 64 36" fill="currentColor" stroke="none" />
          <circle cx="50" cy="50" r="12" fill="#4F46E5" className="opacity-90" />
        </svg>
      </div>

      <div className="absolute left-[2%] top-[45%] hidden xl:block select-none pointer-events-none w-20 h-20 opacity-60">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#7C3AED]/20 drop-shadow-sm">
          <path d="M50 30 C45 10, 55 10, 50 30 M50 70 C45 90, 55 90, 50 70 M30 50 C10 45, 10 55, 30 50 M70 50 C90 45, 90 55, 70 50 M36 36 C18 22, 28 12, 36 36 M64 64 C82 78, 72 88, 64 64 M36 64 C18 78, 28 88, 36 64 M64 36 C82 22, 72 12, 64 36" fill="currentColor" stroke="none" />
          <circle cx="50" cy="50" r="10" fill="#06B6D4" className="opacity-90" />
        </svg>
      </div>

      {/* 1. NAVIGATION BAR (Sticky Transparent frosted-glass) */}
      <header className="sticky top-0 z-50 mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <div className="flex h-16 items-center justify-between rounded-2xl border border-white/40 bg-white/60 px-6 shadow-[0_8px_32px_0_rgba(15,23,42,0.05)] backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] text-white shadow-[0_4px_12px_rgba(79,70,229,0.3)]">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[#0F172A] font-sans">
              Meeting <span className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">Minute</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#64748B]">
            <a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#4F46E5] transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-[#4F46E5] transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-[#4F46E5] transition-colors">Risk Index</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors mr-2">
              Log In
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="rounded-xl bg-[#0F172A] px-5 py-5 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-md">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-6xl px-6 text-center">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold tracking-tight text-[#0F172A] sm:text-6xl md:text-7.5xl leading-[1.05] max-w-5xl mx-auto font-sans"
          >
            Build an Audit-Ready Compliance <br />
            Report in Minutes with <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">AI</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-8 max-w-3xl text-[#64748B] text-base sm:text-lg md:text-xl leading-relaxed"
          >
            Meeting Minute AI analyzes your legal, corporate, and council transcripts. <br className="hidden sm:inline" />
            Map conversations to regulatory standards and auto-verify auditing points.
          </motion.p>

          {/* Premium Gradient CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <Link href="/dashboard">
              <Button className="group rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] px-7 py-6 text-sm font-semibold text-white hover:opacity-95 shadow-lg shadow-indigo-500/20 transition-all gap-2.5 border-0">
                Build My Report
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* 3. HERO DASHBOARD CANVAS (Premium Apple-style Dark Glass Canvas with Ambient Glows) */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="relative mt-20 mx-auto max-w-4xl rounded-[32px] border border-white/60 bg-white/40 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-md"
          >
            <div className="relative w-full aspect-[16/9] rounded-2xl bg-gradient-to-tr from-[#0F172A] to-[#1E293B] overflow-hidden flex items-stretch border border-slate-800/80 shadow-inner">
              
              {/* Graphic Ambient Glows inside canvas */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(79,70,229,0.18),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.12),transparent_40%)]" />

              {/* Left Side: Modern Graphic Vector Art representing the woman working on laptop (CVPilot style) */}
              <div className="w-[45%] relative hidden md:flex items-end justify-center overflow-hidden border-r border-slate-800/20">
                <svg viewBox="0 0 200 240" className="w-[85%] h-[90%] text-white relative z-10">
                  {/* Background soft circle */}
                  <circle cx="100" cy="130" r="70" fill="#E2E8F0" opacity="0.08" />
                  
                  {/* Laptop */}
                  <path d="M 60 160 L 140 160 L 150 185 L 50 185 Z" fill="#334155" />
                  <path d="M 70 110 L 130 110 L 130 160 L 70 160 Z" fill="#475569" />
                  
                  {/* Character Body */}
                  <path d="M 70 240 C 70 190, 130 190, 130 240 Z" fill="#4F46E5" />
                  {/* Face & Neck */}
                  <rect x="92" y="118" width="16" height="20" rx="3" fill="#FFE5D9" />
                  <circle cx="100" cy="110" r="22" fill="#FFE5D9" />
                  
                  {/* Cap */}
                  <path d="M 78 102 C 78 80, 122 80, 122 102 Z" fill="#7C3AED" />
                  <path d="M 74 100 L 90 94 L 115 94 L 126 100 Z" fill="#6D28D9" />
                  
                  {/* Hair */}
                  <circle cx="83" cy="115" r="9" fill="#0F172A" />
                  <circle cx="117" cy="115" r="9" fill="#0F172A" />
                  
                  {/* Hands */}
                  <circle cx="80" cy="175" r="7" fill="#FFE5D9" />
                  <circle cx="120" cy="175" r="7" fill="#FFE5D9" />
                </svg>
              </div>

              {/* Right Side: Floating mock widgets styled as glowing glassmorphism widgets */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center items-start space-y-5 relative z-10">
                
                {/* Score Widget */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl p-4 flex items-center justify-between w-full max-w-xs transition-all hover:translate-y-[-2px] backdrop-blur-md">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 font-extrabold">Compliance Index</span>
                    <h5 className="text-sm font-bold text-white mt-0.5">Audit-Ready Score</h5>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] flex items-center justify-center font-sans text-xs font-black text-white shadow-lg shadow-indigo-500/20">
                    96%
                  </div>
                </div>

                {/* Question Search Widget */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-full shadow-xl px-5 py-3.5 flex items-center justify-between w-full max-w-sm transition-all hover:translate-y-[-2px] backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 text-[#06B6D4] shrink-0 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-300">Ask AI Compliance Officer Anything...</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </div>

                {/* Regulation checklist tags widget */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-xl p-4 w-full max-w-xs transition-all hover:translate-y-[-2px] backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5 mb-2.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Regulations Mapped</span>
                    <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">Verified</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="text-[9px] font-semibold bg-slate-950/40 border border-slate-800 px-2.5 py-0.5 rounded-full text-slate-300">SOX 404</span>
                    <span className="text-[9px] font-semibold bg-slate-950/40 border border-slate-800 px-2.5 py-0.5 rounded-full text-slate-300">GDPR Art. 32</span>
                    <span className="text-[9px] font-semibold bg-slate-950/40 border border-slate-800 px-2.5 py-0.5 rounded-full text-slate-300">HIPAA Safeguards</span>
                    <button className="text-[9px] font-bold bg-[#4F46E5] text-white px-2.5 py-0.5 rounded-full flex items-center gap-0.5 hover:bg-[#4338CA] transition-colors border-0">
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
      <section id="features" className="py-20 md:py-28 border-t border-slate-200/50 bg-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-6">
          
          <div className="grid gap-16 md:grid-cols-12 items-start">
            
            {/* Left Column: Stats & Highlight Summary Card */}
            <div className="md:col-span-5 space-y-8">
              
              {/* Highlight summary card */}
              <div className="bg-white rounded-3xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
                
                {/* SVG vector profile illustration */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-36 h-36 bg-gradient-to-tr from-slate-50 to-slate-100 rounded-2xl overflow-hidden flex items-end justify-center border border-slate-200/60">
                    <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
                      <circle cx="50" cy="40" r="20" fill="#FFE5D9" />
                      <path d="M20 90 C20 65, 80 65, 80 90 Z" fill="#4F46E5" />
                      <circle cx="40" cy="38" r="2" fill="#0F172A" />
                      <circle cx="60" cy="38" r="2" fill="#0F172A" />
                      <path d="M30 25 C30 10, 70 10, 70 25 Z" fill="#7C3AED" />
                    </svg>
                    <div className="absolute top-2 right-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      Match 98%
                    </div>
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-[#0F172A] text-center font-sans">AI-Powered Audit Ready Meeting Minutes</h4>
                <p className="text-xs text-[#64748B] text-center mt-3 leading-relaxed">
                  Meeting Minute helps risk officers optimize compliance records with AI, improving visibility, alignment, and review speed.
                </p>
                <div className="mt-6 flex justify-center">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="rounded-xl border-[#4F46E5]/30 text-[#4F46E5] bg-white font-semibold hover:bg-slate-50 transition-colors">
                      See How It Works
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Lower statistics row */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-250 pt-8 text-left">
                <div>
                  <span className="block text-3.5xl font-extrabold text-[#0F172A] tracking-tight">40%</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-extrabold tracking-wider mt-1.5">Audit pass index</span>
                </div>
                <div>
                  <span className="block text-3.5xl font-extrabold text-[#0F172A] tracking-tight">32%</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-extrabold tracking-wider mt-1.5">More resolution</span>
                </div>
                <div>
                  <span className="block text-3.5xl font-extrabold text-[#0F172A] tracking-tight">3x</span>
                  <span className="block text-[9px] text-slate-400 uppercase font-extrabold tracking-wider mt-1.5">Faster reports</span>
                </div>
              </div>
            </div>

            {/* Right Column: 2x2 Feature mockups (Styled as premium minimal SaaS layout) */}
            <div className="md:col-span-7 space-y-12">
              <div className="text-left space-y-2">
                <h2 className="text-3xl md:text-5xl text-[#0F172A] font-extrabold tracking-tight font-sans">
                  Features That Make Meeting Minute Stand Out
                </h2>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  From AI-powered writing to compliance audits, everything you need for corporate board records.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                
                {/* Feature 1: AI Writes it for you */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.01)] flex flex-col justify-between min-h-[270px] hover:shadow-md hover:border-slate-300/80 transition-all">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">AI Writes It for You</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      AI drafts structured board summaries and tags critical financial details automatically.
                    </p>
                  </div>
                  {/* Summary card widget */}
                  <div className="mt-4 border border-slate-200/60 rounded-xl bg-slate-50/50 p-3.5 text-[9.5px] text-left">
                    <span className="font-bold text-[#0F172A] block mb-1">Executive Summary Summary</span>
                    <p className="text-[#64748B] leading-normal italic">
                      "Approved ledger overrides (Passed 5-0). Database controls verified. Action ownership assigned to CFO."
                    </p>
                  </div>
                </div>

                {/* Feature 2: Guided Meeting Flow */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.01)] flex flex-col justify-between min-h-[270px] hover:shadow-md hover:border-slate-300/80 transition-all">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">Guided Report Flow</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Build your meeting reports step by step with clear auditing rules.
                    </p>
                  </div>
                  {/* Stepper widget */}
                  <div className="mt-4 bg-slate-50/50 border border-slate-200/60 p-3.5 rounded-xl space-y-2.5 text-[9.5px] font-bold text-[#64748B]">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>Step 1 • Personal Details</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>Step 2 • Meeting Summary</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4F46E5]">
                      <span className="h-4 w-4 rounded-full border border-[#4F46E5] flex items-center justify-center text-[8px] font-extrabold shrink-0 bg-white shadow-sm">3</span>
                      <span>Step 3 • Regulations Mapped</span>
                    </div>
                  </div>
                </div>

                {/* Feature 3: Compliance Score Index */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.01)] flex flex-col justify-between min-h-[270px] hover:shadow-md hover:border-slate-300/80 transition-all">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">Compliance score</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Ensure your records pass external checks. Check compliance alignment instantly.
                    </p>
                  </div>
                  {/* Circular progress gauge */}
                  <div className="mt-4 flex flex-col items-center justify-center bg-slate-50/50 border border-slate-200/60 p-4 rounded-xl">
                    <div className="relative flex items-center justify-center">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="26" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                        <circle cx="32" cy="32" r="26" stroke="#4F46E5" strokeWidth="4" fill="transparent" strokeDasharray={163} strokeDashoffset={163 * (1 - 0.48)} className="transition-all duration-1000" />
                      </svg>
                      <span className="absolute text-xs font-extrabold text-[#0F172A]">48%</span>
                    </div>
                    <span className="text-[9px] text-[#7C3AED] font-extrabold uppercase tracking-wider mt-2">Need improvement</span>
                  </div>
                </div>

                {/* Feature 4: Scan Regulations Instantly */}
                <div className="bg-white rounded-2xl border border-slate-200/60 p-5 shadow-[0_2px_8px_rgba(15,23,42,0.01)] flex flex-col justify-between min-h-[270px] hover:shadow-md hover:border-slate-300/80 transition-all">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">Scan Custom Policies</h4>
                    <p className="text-[11px] text-[#64748B] leading-relaxed">
                      Check your minutes against specific security or internal policy standards.
                    </p>
                  </div>
                  {/* Search box widget */}
                  <div className="mt-4 bg-slate-50/50 border border-slate-200/60 p-3.5 rounded-xl text-[9.5px] space-y-2">
                    <span className="text-slate-400 block font-bold">Paste a regulation link</span>
                    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[#0F172A]">
                      <span className="font-mono">https://www.sox.gov/404</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. METRICS & CASE STUDY SECTION (Lower left stats, Lower right preview cards) */}
      <section id="metrics" className="py-20 md:py-28 border-t border-slate-200/40 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 md:grid-cols-12 items-start">
            
            {/* Lower Left Column: Symmetrical stats block */}
            <div className="md:col-span-5 space-y-8 text-left">
              <div className="border-l-3 border-[#4F46E5] pl-6 py-1.5">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-extrabold">Experience Launched</span>
                <span className="block text-3.5xl font-extrabold text-[#0F172A] mt-1 tracking-tight">Since 2024</span>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Built with a dedicated mission to simplify minutes filing using secure generative AI.
                </p>
              </div>

              <div className="border-l-3 border-[#7C3AED] pl-6 py-1.5">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-extrabold">AI Reports Generated</span>
                <span className="block text-3.5xl font-extrabold text-[#0F172A] mt-1 tracking-tight">100,000+</span>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Thousands of policy-mapped audits created globally across financial committees.
                </p>
              </div>

              <div className="border-l-3 border-[#06B6D4] pl-6 py-1.5">
                <span className="block text-xs uppercase tracking-wider text-slate-400 font-extrabold">User Success Score</span>
                <span className="block text-3.5xl font-extrabold text-[#0F172A] mt-1 tracking-tight">95%</span>
                <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                  Governance boards report zero errors during external compliance inspections.
                </p>
              </div>
            </div>

            {/* Lower Right Column: Horizontal Cards Preview */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-3xl font-extrabold text-[#0F172A] leading-tight text-left font-sans">
                Why Choose Meeting Minute
              </h3>
              <p className="text-xs text-[#64748B] text-left leading-relaxed">
                A secure framework built around financial governance and board compliance guidelines.
              </p>

              {/* Grid of horizontal preview cards at bottom */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-slate-300 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                  <span className="text-[11px] font-bold text-[#0F172A]">Pre-Templates & Checklists</span>
                  <span className="text-[9.5px] text-[#64748B] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> Active Standard
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-slate-300 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[11px] font-bold text-[#0F172A]">AI Report Summaries</span>
                  <span className="text-[9.5px] text-[#64748B] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> 27 Languages
                  </span>
                </div>

                <div className="bg-[#F8FAFC] border border-slate-200/60 rounded-2xl p-5 flex flex-col justify-between aspect-[4/3] text-left hover:border-slate-300 transition-colors">
                  <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
                  <span className="text-[11px] font-bold text-[#0F172A]">Fast & Simple Export</span>
                  <span className="text-[9.5px] text-[#64748B] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> PDF / JSON
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FINAL CTA BANNER (OpenAI style) */}
      <section className="py-24 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white text-center relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(40rem_40rem_at_center,rgba(79,70,229,0.12),transparent)] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl px-6 relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-white font-sans">
            Simplify your board compliance audits
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-300 text-sm leading-relaxed">
            Upload meeting audio or transcripts and get audit reports instantly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-95 font-semibold px-8 py-6 shadow-lg border-0 text-sm">
                Get Started Free
              </Button>
            </Link>
            <Link href="/compliance">
              <Button size="lg" variant="outline" className="rounded-xl bg-transparent border-slate-700 text-slate-200 hover:text-white hover:bg-slate-850 font-semibold px-8 py-6 text-sm">
                View Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-slate-200/50 bg-[#F8FAFC] py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] text-white">
              <FileText className="h-4.5 w-4.5" />
            </div>
            <span className="text-base font-bold text-[#0F172A]">
              Meeting <span className="text-[#4F46E5]">Minute</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-semibold text-[#64748B]">
            <a href="#features" className="hover:text-[#4F46E5] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#4F46E5] transition-colors">How it works</a>
            <a href="#metrics" className="hover:text-[#4F46E5] transition-colors">Analytics</a>
            <Link href="/compliance" className="hover:text-[#4F46E5] transition-colors">Regulatory Risks</Link>
            <span className="hidden md:inline text-slate-250">|</span>
            <span className="font-normal">&copy; {new Date().getFullYear()} Meeting Minute Inc. All rights reserved.</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
