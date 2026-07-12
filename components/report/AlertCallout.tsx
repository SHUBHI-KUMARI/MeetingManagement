'use client'

import { Decision } from '@/lib/types'
import { CheckCircle2, AlertCircle, AlertTriangle, Zap, User } from 'lucide-react'

interface AlertCalloutProps {
  decision: Decision
}

export function AlertCallout({ decision }: AlertCalloutProps) {
  const getIcon = () => {
    switch (decision.type) {
      case 'decision':
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
      case 'unresolved':
        return <AlertCircle className="h-4.5 w-4.5 text-amber-600" />
      case 'tension':
        return <AlertTriangle className="h-4.5 w-4.5 text-rose-600" />
      case 'projection':
        return <Zap className="h-4.5 w-4.5 text-indigo-600" />
      default:
        return null
    }
  }

  const getBorderColor = () => {
    switch (decision.type) {
      case 'decision':
        return 'border-l-emerald-500'
      case 'unresolved':
        return 'border-l-amber-500'
      case 'tension':
        return 'border-l-rose-500'
      case 'projection':
        return 'border-l-indigo-500'
      default:
        return 'border-l-slate-400'
    }
  }

  const getTypeLabel = () => {
    switch (decision.type) {
      case 'decision':
        return 'Agreed Decision'
      case 'unresolved':
        return 'Unresolved Point'
      case 'tension':
        return 'Conflict / Tension'
      case 'projection':
        return 'Action Item'
      default:
        return 'Notice'
    }
  }

  return (
    <div className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] border-l-4 ${getBorderColor()} text-left font-sans text-xs`}>
      <div className="flex gap-3.5">
        <div className="shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 space-y-3">
          
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              {getTypeLabel()}
            </span>
            <h4 className="mt-1 text-sm font-bold text-slate-800 tracking-tight leading-snug">
              {decision.subject}
            </h4>
          </div>

          <p className="text-slate-500 leading-relaxed font-medium font-sans">{decision.fact}</p>

          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Next Steps</span>
            <p className="text-xs text-slate-700 font-semibold leading-relaxed">{decision.nextSteps}</p>
          </div>

          {decision.owner && (
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-slate-400 uppercase pt-1">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-slate-400" />
                <span>Owner: <span className="text-slate-600 lowercase font-medium">{decision.owner}</span></span>
              </div>
              {decision.dueDate && (
                <div>
                  <span>Due: <span className="text-[#E07E63] lowercase font-medium">{decision.dueDate}</span></span>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
