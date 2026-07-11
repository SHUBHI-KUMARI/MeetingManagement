'use client'

import Link from 'next/link'
import { Report } from '@/lib/types'
import { getStatusColor, getScoreColor } from '@/lib/mock-data'
import { ArrowRight } from 'lucide-react'

interface ReportCardProps {
  report: Report
}

export function ReportCard({ report }: ReportCardProps) {
  const scorePercentage = report.complianceScore

  return (
    <Link href={`/report/${report.id}`}>
      <div className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Header section */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {report.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{report.company}</p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>

        {/* Meta info */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Meeting Date</span>
            <span className="font-medium text-gray-900">{report.meetingDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Compliance Type</span>
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-900">
              {report.complianceType}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-900">{report.duration} min</span>
          </div>
        </div>

        {/* Bottom section: Score and Status */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          {/* Compliance score with visual ring */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${(scorePercentage / 100) * 283} 283`}
                  className={getScoreColor(scorePercentage)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-sm font-bold ${getScoreColor(scorePercentage)}`}>
                  {scorePercentage}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">Compliance Score</p>
              <p className="text-sm font-medium text-gray-900">
                {scorePercentage >= 80 ? 'Excellent' : scorePercentage >= 60 ? 'Fair' : 'At Risk'}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className={`rounded-full px-3 py-1.5 text-xs font-medium ${getStatusColor(report.status)}`}>
            {report.status === 'compliant' ? 'Compliant' : report.status === 'needs-review' ? 'Review' : 'At Risk'}
          </div>
        </div>
      </div>
    </Link>
  )
}
