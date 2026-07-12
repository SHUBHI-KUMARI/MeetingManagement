'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Plus, 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  Settings 
} from 'lucide-react'

export function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4 shrink-0">
      <div className="flex h-16 items-center justify-between rounded-2xl border border-slate-800 bg-[#08090F]/60 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md text-white relative overflow-hidden">
        
        {/* Glow boundary line inside navbar */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#06B6D4] shadow-md shadow-indigo-500/25">
            <FileText className="h-4.5 w-4.5 text-white" />
          </div>
          <Link href="/dashboard" className="flex items-baseline gap-1">
            <span className="text-sm font-black tracking-tight text-white font-sans uppercase">Meeting</span>
            <span className="text-xs bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent font-black tracking-wider uppercase">Minute</span>
          </Link>
        </div>

        {/* Center Mode status */}
        <div className="hidden md:flex items-center gap-2 bg-slate-950 border border-slate-900 px-3.5 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
          <span>Secured Sandbox Node</span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3.5">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 border border-slate-850 text-slate-400 hover:text-white transition-colors relative"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-[#EC4899] shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-800 bg-[#08090F] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.6)] text-left z-50">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-2">
                  <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-400">System Logs</span>
                  <span className="text-[8.5px] text-[#7C3AED] font-bold cursor-pointer hover:underline uppercase">Clear</span>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="text-[11px] p-2.5 rounded-xl bg-slate-950 border border-slate-900">
                    <span className="font-bold text-slate-200 block">PCI-DSS Scope Checked</span>
                    <span className="text-[9.5px] text-slate-500 mt-0.5 block">Audit report completed with zero critical gaps.</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-850 hover:border-slate-800 transition-all text-slate-400 hover:text-white"
            >
              <div className="h-5.5 w-5.5 rounded-lg bg-gradient-to-tr from-[#EC4899] to-[#7C3AED] text-white flex items-center justify-center text-[9px] font-black shadow-md">
                SK
              </div>
              <span className="hidden sm:inline text-[10px] font-black uppercase tracking-wider">Shubhi</span>
              <ChevronDown className="h-3 w-3 text-slate-650" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-800 bg-[#08090F] p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] text-left z-50">
                <div className="px-3.5 py-2 border-b border-slate-850 text-xs">
                  <span className="block font-bold text-slate-200">Shubhi K.</span>
                  <span className="block text-[9.5px] text-slate-500 truncate">shubhimit21@gmail.com</span>
                </div>
                <div className="p-1 space-y-0.5">
                  <Link href="#settings" className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-450 hover:text-slate-200 hover:bg-slate-950 transition-colors">
                    <Settings className="h-3.5 w-3.5" /> Workspace Config
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger */}
          <Link href="/new">
            <Button className="gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white hover:opacity-95 shadow-md shadow-indigo-500/10 text-[10px] font-bold uppercase tracking-wider px-4.5 py-4 border-0">
              <Plus className="h-3.5 w-3.5" /> New Report
            </Button>
          </Link>

        </div>
      </div>
    </div>
  )
}
