'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Library, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react'
import { theme } from '@/lib/theme'

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const menuItems = [
    {
      name: 'Reports',
      href: '/dashboard',
      icon: Library
    },
    {
      name: 'Compliance',
      href: '/compliance',
      icon: ShieldCheck
    },
    {
      name: 'AI Assistant',
      href: '/assistant',
      icon: Sparkles
    }
  ]

  return (
    <motion.aside 
      animate={{ width: isCollapsed ? '5rem' : '16rem' }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`hidden md:flex flex-col h-screen sticky top-0 border-r ${theme.colors.border} bg-[#0F1117] text-white shrink-0 relative overflow-hidden`}
    >
      {/* Sidebar Header */}
      <div className={`flex h-16 items-center justify-between px-6 border-b ${theme.colors.borderMuted}`}>
        <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-white">
            <FileText className="h-4.5 w-4.5 text-slate-300" />
          </div>
          {!isCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="font-bold text-xs uppercase tracking-wider text-slate-200"
            >
              Meeting<span className="text-[#818CF8]">Minute</span>
            </motion.span>
          )}
        </Link>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 py-6 px-4 space-y-7 overflow-y-auto">
        <div className="space-y-1">
          {!isCollapsed && (
            <span className={theme.typography.caption + " px-3 mb-2 block"}>Navigation</span>
          )}
          {menuItems.map((item) => {
            const IconComponent = item.icon
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 ${theme.radius.button} text-xs font-bold uppercase tracking-wider transition-all relative group ${
                  isActive 
                    ? 'text-white bg-slate-900 border border-slate-800/60' 
                    : 'text-slate-500 hover:text-slate-350'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <IconComponent className="h-4 w-4 shrink-0 text-slate-400" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Collapse control toggle button at bottom */}
      <div className={`p-4 border-t ${theme.colors.borderMuted} flex items-center justify-center`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex h-8 w-8 items-center justify-center ${theme.radius.button} bg-slate-950 border border-slate-900 text-slate-500 hover:text-white transition-colors`}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

    </motion.aside>
  )
}
