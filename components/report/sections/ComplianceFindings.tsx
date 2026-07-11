'use client'

import { Report } from '@/lib/types'
import { getSeverityColor } from '@/lib/mock-data'
import { AlertCircle, FileText, Lightbulb } from 'lucide-react'

interface ComplianceFindingsProps {
  report: Report
}

export function ComplianceFindings({ report }: ComplianceFindingsProps) {
  const risks = report.complianceFindings.filter((f) => f.type === 'risk')
  const missingDocs = report.complianceFindings.filter((f) => f.type === 'missing-doc')
  const recommendations = report.complianceFindings.filter((f) => f.type === 'recommendation')

  const renderFinding = (finding, icon) => (
    <div key={finding.id} className={`rounded-lg border p-4 ${getSeverityColor(finding.severity)}`}>
      <div className="flex gap-3">
        {icon}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-gray-900">{finding.title}</h4>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-medium">Impact: {finding.impact}%</span>
              <span className="font-medium">Confidence: {finding.confidence}%</span>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-700">{finding.description}</p>
          {finding.relatedRegulations && finding.relatedRegulations.length > 0 && (
            <div className="mt-2 flex gap-1 flex-wrap">
              {finding.relatedRegulations.map((reg) => (
                <span key={reg} className="inline-block rounded bg-gray-200 px-2 py-0.5 text-xs font-medium">
                  {reg}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <section id="compliance-findings" className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Compliance Findings</h2>

      {/* Risks */}
      {risks.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Identified Risks ({risks.length})</h3>
          <div className="space-y-3">
            {risks.map((risk) => renderFinding(risk, <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />))}
          </div>
        </div>
      )}

      {/* Missing Documents */}
      {missingDocs.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Missing Documents ({missingDocs.length})</h3>
          <div className="space-y-3">
            {missingDocs.map((doc) => renderFinding(doc, <FileText className="h-5 w-5 flex-shrink-0 text-amber-600" />))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Recommendations ({recommendations.length})</h3>
          <div className="space-y-3">
            {recommendations.map((rec) => renderFinding(rec, <Lightbulb className="h-5 w-5 flex-shrink-0 text-blue-600" />))}
          </div>
        </div>
      )}
    </section>
  )
}
