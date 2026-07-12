'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Library, 
  ShieldCheck, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight,
  Database
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      name: 'Reports Workspace',
      href: '/dashboard',
      icon: Library
    },
    {
      name: 'Compliance Risk Audit',
      href: '/compliance',
      icon: ShieldCheck
    }
  ]

  const supportItems = [
    {
      name: 'Workspace Settings',
      href: '#settings',
      icon: Settings
    },
    {
      name: 'Help & Docs',
      href: '#docs',
      icon: HelpCircle
    }
  ]

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? '5rem' : '16rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-slate-800/80 bg-[#0B0D13] text-white shrink-0 relative overflow-hidden"
    >
      {/* Subtle ambient light dot inside sidebar */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />

      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800/80">
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] shadow-md shadow-indigo-500/20 text-white">
            <FileText className="h-4.5 w-4.5" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-sm tracking-tight whitespace-nowrap"
            >
              Meeting<span className="text-[#818CF8]">Minute</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Workspace Switcher mockup */}
      <div className="p-4 border-b border-slate-800/60">
        <div className={`flex items-center gap-3 rounded-xl bg-slate-900/50 border border-slate-800 p-2.5 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-indigo-500/10 border border-indigo-500/25 text-[#818CF8]">
            <Database className="h-3.5 w-3.5" />
          </div>
          {!isCollapsed && (
            <div className="text-left overflow-hidden">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Active Tenant</span>
              <span className="block text-xs font-bold text-slate-200 truncate">Shubhi Workspace</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 py-6 px-4 space-y-7 overflow-y-auto">
        <div className="space-y-1.5">
          {!isCollapsed && (
            <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-500 px-3 mb-2">Workspace Navigation</span>
          )}
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all relative group ${
                  isActive 
                    ? 'text-white bg-gradient-to-r from-indigo-500/15 to-purple-500/10 border border-indigo-500/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <IconComponent className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[#818CF8]' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {!isCollapsed && <span>{item.name}</span>}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-indicator" 
                    className="absolute left-0 w-1 h-5 bg-[#818CF8] rounded-r-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="space-y-1.5">
          {!isCollapsed && (
            <span className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-500 px-3 mb-2">Support & Admin</span>
          )}
          {supportItems.map((item) => {
            const IconComponent = item.icon
            return (
              <a 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 ${
                  isCollapsed ? 'justify-center' : ''
                }`}
              >
                <IconComponent className="h-4.5 w-4.5 shrink-0 text-slate-400" />
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            )
          })}
        </div>
      </div>

      {/* Collapse control toggle button at bottom */}
      <div className="p-4 border-t border-slate-800/80 flex items-center justify-center">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 hover:border-slate-700 transition-colors shadow-sm"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

    </motion.aside>
  )
}
