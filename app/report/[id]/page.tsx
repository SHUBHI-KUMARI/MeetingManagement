'use client'

import { notFound } from 'next/navigation'
import { TopNav } from '@/components/layout/TopNav'
import { ReportSidebar } from '@/components/report/ReportSidebar'
import { ComplianceSummary } from '@/components/report/ComplianceSummary'
import { CoverPage } from '@/components/report/sections/CoverPage'
import { AttendanceTable } from '@/components/report/sections/AttendanceTable'
import { DiscussionLog } from '@/components/report/sections/DiscussionLog'
import { Decisions } from '@/components/report/sections/Decisions'
import { VotingResults } from '@/components/report/sections/VotingResults'
import { ComplianceFindings } from '@/components/report/sections/ComplianceFindings'
import { getReportById } from '@/lib/mock-data'

interface ReportPageProps {
  params: Promise<{ id: string }>
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { id } = await params
  const report = getReportById(id)

  if (!report) {
    notFound()
  }

  return (
    <>
      <TopNav />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        {/* Sidebar TOC */}
        <ReportSidebar />

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-4xl px-8 py-12">
            {/* Sections */}
            <div className="space-y-16">
              <CoverPage report={report} />
              <ComplianceSummary report={report} />
              <AttendanceTable report={report} />
              <DiscussionLog report={report} />
              <Decisions report={report} />
              <VotingResults report={report} />
              <ComplianceFindings report={report} />
            </div>

            {/* Footer spacing */}
            <div className="mt-16 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>End of report • Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
