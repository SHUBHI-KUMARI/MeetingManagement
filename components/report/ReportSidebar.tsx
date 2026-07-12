'use client'

import { useEffect, useState } from 'react'
import { FileText, Users, MessageCircle, CheckCircle2, BarChart3, AlertTriangle } from 'lucide-react'
import { theme } from '@/lib/theme'

interface TOCItem {
  id: string
  label: string
  icon: React.ReactNode
}

const tocItems: TOCItem[] = [
  { id: 'cover', label: 'Cover', icon: <FileText className="h-4 w-4" /> },
  { id: 'attendance', label: 'Attendance', icon: <Users className="h-4 w-4" /> },
  { id: 'discussion', label: 'Discussion', icon: <MessageCircle className="h-4 w-4" /> },
  { id: 'decisions', label: 'Decisions', icon: <CheckCircle2 className="h-4 w-4" /> },
  { id: 'votes', label: 'Voting', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'compliance-findings', label: 'Findings', icon: <AlertTriangle className="h-4 w-4" /> },
]

export function ReportSidebar() {
  const [activeSection, setActiveSection] = useState('cover')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <aside className={`sticky top-16 h-[calc(100vh-4rem)] w-64 flex-shrink-0 overflow-y-auto border-r ${theme.colors.border} bg-[#0F1117]/40 p-6`}>
      <h3 className={theme.typography.caption}>Contents</h3>

      <nav className="mt-4 space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all border ${
              activeSection === item.id
                ? 'bg-slate-900 border border-slate-800 text-white shadow-sm'
                : 'text-slate-500 border-transparent hover:text-slate-300'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
