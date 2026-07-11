'use client'

import { useEffect, useState } from 'react'
import { FileText, Users, MessageCircle, CheckCircle2, BarChart3, AlertTriangle } from 'lucide-react'

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
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200 bg-white p-6">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Contents</h3>

      <nav className="mt-4 space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
              activeSection === item.id
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
