'use client'

import Link from 'next/link'
import { Report } from '@/lib/types'
import { ArrowUpRight, CheckCircle2, AlertTriangle, AlertCircle, Clock, Shield } from 'lucide-react'

interface ReportCardProps {
  report: Report
}

export function ReportCard({ report }: ReportCardProps) {
  const scorePercentage = report.complianceScore

  // Gradient themes matching standard score ranges
  const statusGradients = scorePercentage >= 80 
    ? { 
        ring: 'stroke-[#10B981]', 
        text: 'text-emerald-400', 
        bg: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-400', 
        label: 'Excellent' 
      }
    : scorePercentage >= 60 
      ? { 
          ring: 'stroke-[#F59E0B]', 
          text: 'text-amber-400', 
          bg: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-400', 
          label: 'Fair' 
        }
      : { 
          ring: 'stroke-[#EC4899]', 
          text: 'text-pink-400', 
          bg: 'from-pink-500/10 to-pink-500/5 border-pink-500/20 text-pink-400', 
          label: 'At Risk' 
        }

  const badgeClasses = report.status === 'compliant'
    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    : report.status === 'needs-review'
      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
      : 'bg-pink-500/10 border-pink-500/20 text-pink-400'

  return (
    <Link href={`/report/${report.id}`}>
      <div className="group relative rounded-3xl border border-slate-800 bg-[#08090F]/45 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] hover:scale-[1.02] hover:-translate-y-1">
        
        {/* Glow ambient point on hover inside card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-500/0 to-indigo-500/5 group-hover:to-indigo-500/10 rounded-3xl pointer-events-none transition-all duration-500" />
        
        {/* Top bar header */}
        <div className="flex items-start justify-between relative z-10 mb-5">
          <div className="text-left space-y-1 max-w-[85%]">
            <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
              {report.title}
            </h4>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              {report.company}
            </span>
          </div>
          <div className="h-8 w-8 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {/* Content list block */}
        <div className="space-y-3.5 relative z-10 mb-6">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Date & Time</span>
            <span className="font-bold text-slate-300">{report.meetingDate} • {report.duration}m</span>
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 font-semibold uppercase tracking-wider flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> Framework</span>
            <span className="inline-flex rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#818CF8]">
              {report.complianceType}
            </span>
          </div>
        </div>

        {/* Gauge & Badge lower footer block */}
        <div className="flex items-center justify-between border-t border-slate-850/80 pt-5 relative z-10">
          
          {/* Radial score gauge */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="7" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="7"
                  strokeDasharray={`${(scorePercentage / 100) * 264} 264`}
                  strokeLinecap="round"
                  className={`${statusGradients.ring}`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-[10px] font-black ${statusGradients.text}`}>
                  {scorePercentage}%
                </span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[8.5px] uppercase font-bold text-slate-500 tracking-wider">Health Score</span>
              <span className="block text-xs font-bold text-slate-200 mt-0.5">{statusGradients.label}</span>
            </div>
          </div>

          {/* Status pill badge */}
          <span className={`rounded-full px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider border ${badgeClasses}`}>
            {report.status === 'compliant' ? 'Compliant' : report.status === 'needs-review' ? 'Review' : 'At Risk'}
          </span>

        </div>

      </div>
    </Link>
  )
}
