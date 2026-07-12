'use client'

import { Report, ComplianceFinding } from '@/lib/types'
import { AlertCircle, FileText, Lightbulb, Activity } from 'lucide-react'

interface ComplianceFindingsProps {
  report: Report
}

export function ComplianceFindings({ report }: ComplianceFindingsProps) {
  const risks = report.complianceFindings.filter((f) => f.type === 'risk')
  const missingDocs = report.complianceFindings.filter((f) => f.type === 'missing-doc')
  const recommendations = report.complianceFindings.filter((f) => f.type === 'recommendation')

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return { border: 'border-l-rose-500', bg: 'bg-rose-50/20', text: 'text-rose-950', badge: 'bg-rose-100/50 text-rose-700 border-rose-200/50' }
      case 'medium':
        return { border: 'border-l-amber-500', bg: 'bg-amber-50/20', text: 'text-amber-950', badge: 'bg-amber-100/50 text-amber-700 border-amber-200/50' }
      case 'low':
      default:
        return { border: 'border-l-indigo-500', bg: 'bg-indigo-50/10', text: 'text-slate-800', badge: 'bg-indigo-100/50 text-indigo-700 border-indigo-200/50' }
    }
  }

  const renderFinding = (finding: ComplianceFinding, icon: React.ReactNode) => {
    const style = getSeverityStyle(finding.severity)
    return (
      <div key={finding.id} className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)] border-l-4 ${style.border} ${style.bg} text-left font-sans text-xs`}>
        <div className="flex gap-3.5">
          <div className="shrink-0 mt-0.5">{icon}</div>
          <div className="flex-1 space-y-3">
            
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className={`inline-flex rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${style.badge}`}>
                  {finding.severity} Severity
                </span>
                <h4 className="font-bold text-slate-800 text-sm tracking-tight leading-snug mt-1.5">{finding.title}</h4>
              </div>
              
              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-450 uppercase tracking-wider">
                <span className="bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">Impact: {finding.impact}%</span>
                <span className="bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5">Confidence: {finding.confidence}%</span>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed font-medium">{finding.description}</p>
            
            {finding.relatedRegulations && finding.relatedRegulations.length > 0 && (
              <div className="flex gap-1.5 flex-wrap pt-1">
                {finding.relatedRegulations.map((reg) => (
                  <span key={reg} className="inline-block rounded bg-slate-100 border border-slate-200/40 px-2 py-0.5 text-[9px] font-bold text-slate-500 uppercase">
                    {reg}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section id="compliance-findings" className="space-y-8 font-sans">
      
      <div className="border-b border-slate-200/60 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Compliance Audit Findings</h2>
      </div>

      {/* Risks */}
      {risks.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Identified Risks ({risks.length})
          </h3>
          <div className="space-y-4">
            {risks.map((risk) => renderFinding(risk, <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />))}
          </div>
        </div>
      )}

      {/* Missing Documents */}
      {missingDocs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Missing Documentation ({missingDocs.length})
          </h3>
          <div className="space-y-4">
            {missingDocs.map((doc) => renderFinding(doc, <FileText className="h-4.5 w-4.5 text-amber-600 shrink-0" />))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-450 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Recommendations ({recommendations.length})
          </h3>
          <div className="space-y-4">
            {recommendations.map((rec) => renderFinding(rec, <Lightbulb className="h-4.5 w-4.5 text-indigo-600 shrink-0" />))}
          </div>
        </div>
      )}
    </section>
  )
}
