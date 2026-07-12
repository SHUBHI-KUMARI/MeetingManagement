'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'
import { theme } from '@/lib/theme'

export function EmptyState() {
  const highlights = [
    { title: 'French Legal & Works-Council Diarization', desc: 'Auto-resolves speaker placeholders and filters crosstalk' },
    { title: 'SOX, GDPR & ISO27001 Compliance Mapping', desc: 'Identifies regulatory risks, missing documentation, and recommendations' },
    { title: 'Interactive Decision Logs & Voting Bars', desc: 'Extracts agreements, open items, tensions, and compiles voting data' }
  ]

  return (
    <div className={`flex min-h-[500px] flex-col items-center justify-center border ${theme.colors.border} bg-[#0F1117]/40 p-8 sm:p-12 shadow backdrop-blur-md relative overflow-hidden ${theme.radius.card}`}>
      
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 mb-6">
        <FileText className="h-6 w-6" />
      </div>

      {/* Main headings */}
      <h3 className="text-xl font-bold text-white tracking-tight">Workspace is Empty</h3>
      <p className="mt-2 text-center text-xs text-slate-400 max-w-md font-sans leading-relaxed">
        Upload your raw meeting transcript to generate compliance-ready minutes, procès-verbal documents, and actionable compliance risk audits.
      </p>

      {/* Action Button */}
      <Link href="/new" className="mt-8">
        <Button size="lg" className={`rounded-xl bg-indigo-650 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-wider px-6 py-5 border-0 shadow-sm`}>
          <Plus className="h-4 w-4 mr-1" />
          Create First Report
        </Button>
      </Link>

      {/* Divider */}
      <div className="my-10 w-full max-w-md border-t border-slate-900" />

      {/* Platform Features Grid */}
      <div className="w-full max-w-2xl grid gap-5 sm:grid-cols-3">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start p-4 rounded-xl bg-slate-950/20 border border-slate-900 text-left space-y-2.5">
            <span className="text-[9.5px] font-black text-slate-300 uppercase tracking-wider block">
              {item.title}
            </span>
            <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
