'use client'

import { Report } from '@/lib/types'
import { ReportCard } from './ReportCard'

interface ReportGridProps {
  reports: Report[]
}

export function ReportGrid({ reports }: ReportGridProps) {
  if (reports.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  )
}
