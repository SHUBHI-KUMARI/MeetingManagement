'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Plus, 
  Bell, 
  ChevronDown, 
  Settings 
} from 'lucide-react'
import { theme } from '@/lib/theme'

export function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-4 shrink-0 font-sans">
      <div className={`flex h-16 items-center justify-between rounded-2xl border ${theme.colors.border} bg-[#0F1117]/80 px-6 shadow-xl backdrop-blur-md text-white`}>
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800">
            <FileText className="h-4.5 w-4.5 text-slate-350" />
          </div>
          <Link href="/dashboard" className="flex items-baseline gap-1">
            <span className="text-xs font-black tracking-tight text-white uppercase">Meeting</span>
            <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">Minute</span>
          </Link>
        </div>

        {/* Center Mode status (Clean text indicator, no ping animation) */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950 border border-slate-900 px-3.5 py-1.5 rounded-xl text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
          <span>Secured Audit Workspace</span>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3.5">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 border border-slate-850 text-slate-500 hover:text-white transition-colors relative"
            >
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-slate-400" />
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-slate-800 bg-[#0F1117] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.6)] text-left z-50">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-2">
                  <span className="text-[9.5px] font-black uppercase tracking-wider text-slate-500">System Logs</span>
                  <span className="text-[8.5px] text-indigo-400 font-bold cursor-pointer hover:underline uppercase">Clear</span>
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
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-855 hover:border-slate-800 transition-all text-slate-450 hover:text-white"
            >
              <div className="h-5.5 w-5.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center text-[9px] font-bold">
                SK
              </div>
              <span className="hidden sm:inline text-[9px] font-extrabold uppercase tracking-wider">Shubhi</span>
              <ChevronDown className="h-3 w-3 text-slate-600" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-800 bg-[#0F1117] p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.6)] text-left z-50">
                <div className="px-3.5 py-2 border-b border-slate-850 text-xs">
                  <span className="block font-bold text-slate-200">Shubhi K.</span>
                  <span className="block text-[9.5px] text-slate-500 truncate">shubhimit21@gmail.com</span>
                </div>
                <div className="p-1 space-y-0.5">
                  <Link href="#settings" className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-200 hover:bg-slate-950 transition-colors">
                    <Settings className="h-3.5 w-3.5" /> Workspace Config
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger */}
          <Link href="/new">
            <Button className="gap-2 rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-4.5 py-4 border-0 shadow-sm">
              <Plus className="h-3.5 w-3.5" /> New Report
            </Button>
          </Link>

        </div>
      </div>
    </div>
  )
}
