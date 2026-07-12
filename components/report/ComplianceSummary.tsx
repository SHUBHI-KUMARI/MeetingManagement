'use client'

import { Report } from '@/lib/types'
import { AlertCircle, FileCheck, Lightbulb, CheckCircle2 } from 'lucide-react'

interface ComplianceSummaryProps {
  report: Report
}

export function ComplianceSummary({ report }: ComplianceSummaryProps) {
  const riskCount = report.complianceFindings.filter((f) => f.type === 'risk').length
  const missingDocCount = report.complianceFindings.filter((f) => f.type === 'missing-doc').length
  const recommendationCount = report.complianceFindings.filter((f) => f.type === 'recommendation').length
  const scorePercentage = report.complianceScore

  const getScoreInfo = (score: number) => {
    if (score >= 80) return { label: 'High Compliance', sub: 'Excellent governance records.', color: 'text-emerald-600', stroke: '#10b981', bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' }
    if (score >= 60) return { label: 'Needs Improvement', sub: 'Minor issues detected.', color: 'text-amber-600', stroke: '#f59e0b', bg: 'bg-amber-50 text-amber-700 border-amber-100' }
    return { label: 'Non-Compliant', sub: 'Critical policy issues.', color: 'text-rose-600', stroke: '#f43f5e', bg: 'bg-rose-50 text-rose-700 border-rose-100' }
  }

  const scoreInfo = getScoreInfo(scorePercentage)

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Compliance Index Score</h3>

        <div className="mt-6 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Radial score progress */}
          <div className="flex flex-shrink-0 flex-col items-center gap-3">
            <div className="relative h-28 w-28 flex items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={scoreInfo.stroke}
                  strokeWidth="6"
                  strokeDasharray={264}
                  strokeDashoffset={264 * (1 - scorePercentage / 100)}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className={`block text-2xl font-extrabold text-slate-800`}>
                    {scorePercentage}%
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">of 100</span>
                </div>
              </div>
            </div>

            {/* Score interpretation */}
            <div className="text-center">
              <p className="text-xs font-extrabold text-slate-800">{scoreInfo.label}</p>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider mt-1.5 ${scoreInfo.bg}`}>
                {report.status === 'compliant' ? '✓ Compliant' : report.status === 'needs-review' ? '⚠ Review Needed' : '🚨 At Risk'}
              </span>
            </div>
          </div>

          {/* Stats cards grid */}
          <div className="flex-1 w-full grid gap-4 sm:grid-cols-3">
            
            {/* Risks card */}
            <div className="rounded-xl border border-rose-100 bg-rose-50/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100/50 text-rose-600">
                  <AlertCircle className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Identified Risks</p>
                  <p className="text-lg font-extrabold text-rose-800 mt-0.5">{riskCount}</p>
                </div>
              </div>
            </div>

            {/* Missing Docs card */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100/50 text-amber-600">
                  <FileCheck className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Missing Docs</p>
                  <p className="text-lg font-extrabold text-amber-800 mt-0.5">{missingDocCount}</p>
                </div>
              </div>
            </div>

            {/* Recommendations card */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/50 text-blue-600">
                  <Lightbulb className="h-4.5 w-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Advice Tips</p>
                  <p className="text-lg font-extrabold text-blue-800 mt-0.5">{recommendationCount}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
