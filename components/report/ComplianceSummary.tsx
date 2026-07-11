'use client'

import { Report } from '@/lib/types'
import { getScoreColor, getStatusColor } from '@/lib/mock-data'
import { AlertCircle, FileCheck, Lightbulb } from 'lucide-react'

interface ComplianceSummaryProps {
  report: Report
}

export function ComplianceSummary({ report }: ComplianceSummaryProps) {
  const riskCount = report.complianceFindings.filter((f) => f.type === 'risk').length
  const missingDocCount = report.complianceFindings.filter((f) => f.type === 'missing-doc').length
  const recommendationCount = report.complianceFindings.filter((f) => f.type === 'recommendation').length

  const scorePercentage = report.complianceScore

  return (
    <div className="space-y-6">
      {/* Score card with visual */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Score</h3>

        <div className="mt-6 flex items-center gap-8">
          {/* Radial chart */}
          <div className="flex flex-shrink-0 flex-col items-center gap-4">
            <div className="relative h-32 w-32">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray={`${(scorePercentage / 100) * 283} 283`}
                  className={getScoreColor(scorePercentage)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className={`block text-3xl font-bold ${getScoreColor(scorePercentage)}`}>
                    {scorePercentage}
                  </span>
                  <span className="text-xs text-gray-500">of 100</span>
                </div>
              </div>
            </div>

            {/* Score interpretation */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                {scorePercentage >= 80
                  ? 'Excellent'
                  : scorePercentage >= 60
                    ? 'Fair'
                    : scorePercentage >= 40
                      ? 'Poor'
                      : 'Critical'}
              </p>
              <p className={`text-xs font-medium ${getStatusColor(report.status)}`}>
                {report.status === 'compliant'
                  ? '✓ Compliant'
                  : report.status === 'needs-review'
                    ? '⚠ Needs Review'
                    : '🚨 At Risk'}
              </p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="flex-1 space-y-3">
            {/* Risks */}
            <div className="rounded-lg bg-red-50 p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Identified Risks</p>
                  <p className="text-lg font-bold text-red-900">{riskCount}</p>
                </div>
              </div>
            </div>

            {/* Missing Docs */}
            <div className="rounded-lg bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <FileCheck className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Missing Documents</p>
                  <p className="text-lg font-bold text-amber-900">{missingDocCount}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-600">Recommendations</p>
                  <p className="text-lg font-bold text-blue-900">{recommendationCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
