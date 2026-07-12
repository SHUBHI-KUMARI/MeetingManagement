'use client'

import Link from 'next/link'
import { Report } from '@/lib/types'
import { theme } from '@/lib/theme'

interface ReportCardProps {
  report: Report
}

export function ReportCard({ report }: ReportCardProps) {
  const scorePercentage = report.complianceScore

  // Handcrafted premium theme mappings (Muted rating indicator colors)
  const ratingDetails = scorePercentage >= 80 
    ? { 
        stroke: '#10B981', 
        textClass: 'text-emerald-400', 
        label: 'Excellent' 
      }
    : scorePercentage >= 60 
      ? { 
          stroke: '#F59E0B', 
          textClass: 'text-amber-400', 
          label: 'Fair' 
        }
      : { 
          stroke: '#F43F5E', 
          textClass: 'text-rose-400', 
          label: 'At Risk' 
        }

  const badgeBorderClasses = report.status === 'compliant'
    ? 'bg-emerald-500/15 text-white border-t border-l border-b border-r border-t-emerald-500/35 border-l-emerald-500/35 border-b-emerald-500/5 border-r-emerald-500/5 shadow-inner'
    : report.status === 'needs-review'
      ? 'bg-amber-500/15 text-white border-t border-l border-b border-r border-t-amber-500/35 border-l-amber-500/35 border-b-amber-500/5 border-r-amber-500/5 shadow-inner'
      : 'bg-rose-500/15 text-white border-t border-l border-b border-r border-t-rose-500/35 border-l-rose-500/35 border-b-rose-500/5 border-r-rose-500/5 shadow-inner'

  const statusText = report.status === 'compliant' ? 'Compliant' : report.status === 'needs-review' ? 'Review' : 'At Risk'

  return (
    <Link href={`/report/${report.id}`}>
      <div className={`group relative ${theme.radius.card} border ${theme.colors.border} bg-[#0F1117]/85 p-6 shadow-md ${theme.transition} hover:border-white/10 hover:shadow-lg`}>
        
        {/* Top bar header */}
        <div className="flex items-start justify-between mb-5">
          <div className="text-left space-y-1 max-w-[85%]">
            <h4 className={theme.typography.cardHeading + " truncate"}>
              {report.title}
            </h4>
            <span className={theme.typography.caption}>
              {report.company}
            </span>
          </div>
        </div>

        {/* Content list block */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider">Date & Time</span>
            <span className="font-bold text-slate-350">{report.meetingDate} • {report.duration}m</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider">Framework</span>
            <span className="inline-flex rounded-lg bg-slate-950 border border-white/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-400">
              {report.complianceType}
            </span>
          </div>
        </div>

        {/* Gauge & Badge lower footer block */}
        <div className={`flex items-center justify-between border-t ${theme.colors.borderMuted} pt-5`}>
          
          {/* Radial score gauge */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#161821" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="6"
                  strokeDasharray={`${(scorePercentage / 100) * 264} 264`}
                  strokeLinecap="round"
                  stroke={ratingDetails.stroke}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[10px] font-black ${ratingDetails.textClass}`}>
                  {scorePercentage}%
                </span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[8.5px] uppercase font-bold text-slate-500 tracking-wider">Health Score</span>
              <span className="block text-xs font-bold text-slate-200 mt-0.5">{ratingDetails.label}</span>
            </div>
          </div>

          {/* Status pill badge with top-left & bottom-right custom borders */}
          <span className={`rounded-full ${theme.heights.badge} text-[9px] font-extrabold uppercase tracking-wider ${badgeBorderClasses}`}>
            {statusText}
          </span>

        </div>

      </div>
    </Link>
  )
}
