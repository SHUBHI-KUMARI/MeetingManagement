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
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 sm:p-12 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 shadow-sm">
        <FileText className="h-7 w-7" />
      </div>

      {/* Main headings */}
      <h3 className="mt-6 text-xl font-bold text-black">Workspace is Empty</h3>
      <p className="mt-2 text-center text-sm text-black/70 max-w-md font-sans">
        Upload your raw meeting transcript to generate compliance-ready minutes, procès-verbal documents, and actionable compliance risk audits.
      </p>

      {/* Action Button */}
      <Link href="/new" className="mt-8">
        <Button size="lg" className="gap-2 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
          <Plus className="h-4 w-4" />
          Create First Report
        </Button>
      </Link>

      {/* Divider */}
      <div className="my-8 w-full max-w-md border-t border-gray-100" />

      {/* Platform Features Grid */}
      <div className="w-full max-w-xl grid gap-4 sm:grid-cols-3">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start p-3 rounded-lg hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{item.title}</span>
            </div>
            <p className="mt-1 text-[11px] text-black/60 leading-relaxed font-sans">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
