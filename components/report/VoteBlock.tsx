'use client'

import { Vote } from '@/lib/types'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'

interface VoteBlockProps {
  vote: Vote
}

export function VoteBlock({ vote }: VoteBlockProps) {
  const totalVotes = vote.results.reduce((sum, result) => sum + result.count, 0)

  const getOutcomeBadge = () => {
    switch (vote.outcome) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            <CheckCircle2 className="h-3 w-3 shrink-0" />
            Passed
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-rose-50 border border-rose-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
            <XCircle className="h-3 w-3 shrink-0" />
            Failed
          </span>
        )
      case 'abstained':
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-amber-50 border border-amber-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            <AlertCircle className="h-3 w-3 shrink-0" />
            Abstained
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded bg-slate-50 border border-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
            Recorded
          </span>
        )
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)] text-left font-sans text-xs">
      
      {/* Question & Date */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">{vote.question}</h4>
          <p className="mt-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Voted on {vote.date}</p>
        </div>
        <div>
          {getOutcomeBadge()}
        </div>
      </div>

      {/* Vote results */}
      <div className="space-y-4 pt-1">
        {vote.results.map((result, index) => {
          const pct = totalVotes > 0 ? Math.round((result.count / totalVotes) * 100) : 0
          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-slate-700">
                <span className="font-semibold text-xs text-slate-650">{result.option}</span>
                <span className="font-bold text-slate-500">
                  {pct}% <span className="font-medium text-slate-400 text-[10px]">({result.count} vote{result.count !== 1 ? 's' : ''})</span>
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/30">
                <div
                  className="h-full bg-[#E07E63] rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
