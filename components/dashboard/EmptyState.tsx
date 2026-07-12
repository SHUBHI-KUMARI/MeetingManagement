'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Plus, CheckCircle2 } from 'lucide-react'

export function EmptyState() {
  const highlights = [
    { title: 'French Legal & Works-Council Diarization', desc: 'Auto-resolves speaker placeholders and filters crosstalk' },
    { title: 'SOX, GDPR & ISO27001 Compliance Mapping', desc: 'Identifies regulatory risks, missing documentation, and recommendations' },
    { title: 'Interactive Decision Logs & Voting Bars', desc: 'Extracts agreements, open items, tensions, and compiles voting data' }
  ]

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-slate-800/80 bg-slate-900/40 p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md relative overflow-hidden">
      
      {/* Background glow behind empty state */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />

      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-[#818CF8] shadow-lg shadow-indigo-500/5 mb-6">
        <FileText className="h-8 w-8" />
      </div>

      {/* Main headings */}
      <h3 className="text-2xl font-bold text-white tracking-tight">Workspace is Empty</h3>
      <p className="mt-3.5 text-center text-sm text-slate-400 max-w-lg font-sans leading-relaxed">
        Upload your raw meeting transcript to generate compliance-ready minutes, procès-verbal documents, and actionable compliance risk audits.
      </p>

      {/* Action Button */}
      <Link href="/new" className="mt-8">
        <Button size="lg" className="gap-2 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white hover:opacity-95 shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 border-0 font-semibold px-6 py-5">
          <Plus className="h-4.5 w-4.5" />
          Create First Report
        </Button>
      </Link>

      {/* Divider */}
      <div className="my-10 w-full max-w-md border-t border-slate-800/60" />

      {/* Platform Features Grid */}
      <div className="w-full max-w-2xl grid gap-5 sm:grid-cols-3">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start p-4 rounded-2xl bg-slate-950/20 border border-slate-900 hover:border-slate-800 transition-colors text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#818CF8]">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{item.title}</span>
            </div>
            <p className="mt-2 text-[10.5px] text-slate-400 leading-relaxed font-sans">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
