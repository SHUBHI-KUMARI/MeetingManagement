'use client'

import { useState } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockReports, getSeverityColor } from '@/lib/mock-data'
import { AlertTriangle, FileCheck, Lightbulb, BookOpen } from 'lucide-react'

export default function CompliancePage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)

  // Aggregate all findings from all reports
  const allFindings = mockReports.flatMap((report) =>
    report.complianceFindings.map((finding, index) => ({
      ...finding,
      reportId: report.id,
      reportTitle: report.title,
      rowKey: `${report.id}-${finding.id}-${index}`,
    }))
  )

  const risks = allFindings.filter((f) => f.type === 'risk')
  const missingDocs = allFindings.filter((f) => f.type === 'missing-doc')
  const recommendations = allFindings.filter((f) => f.type === 'recommendation')

  // Calculate overall compliance score
  const avgScore =
    mockReports.length > 0
      ? Math.round(mockReports.reduce((sum, r) => sum + r.complianceScore, 0) / mockReports.length)
      : 0

  const filterBySeverity = (items: typeof allFindings) => {
    if (!selectedSeverity) return items
    return items.filter((item) => item.severity === selectedSeverity)
  }

  const FindingsTable = ({ findings, icon: Icon, title }: any) => {
    const filtered = filterBySeverity(findings)

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <Icon className="h-5 w-5" />
          {title}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Report
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.map((finding) => (
                  <tr key={finding.rowKey} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{finding.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{finding.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getSeverityColor(finding.severity)} capitalize`}>
                        {finding.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600"
                            style={{ width: `${finding.impact}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{finding.impact}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {finding.reportTitle}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-600">
                    No findings
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Compliance Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Aggregate view of all compliance findings, risks, and recommendations across your reports.
            </p>
          </div>

          {/* Overall Score Card */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Overall Score</p>
              <p className="mt-2 text-3xl font-bold text-blue-600">{avgScore}</p>
              <p className="mt-1 text-xs text-gray-500">Average across all reports</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">Total Reports</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{mockReports.length}</p>
              <p className="mt-1 text-xs text-gray-500">Meeting minutes generated</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 bg-red-50">
              <p className="text-sm text-red-600 uppercase tracking-wide font-medium">Identified Risks</p>
              <p className="mt-2 text-3xl font-bold text-red-600">{risks.length}</p>
              <p className="mt-1 text-xs text-gray-600">Require attention</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 bg-amber-50">
              <p className="text-sm text-amber-600 uppercase tracking-wide font-medium">Missing Docs</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">{missingDocs.length}</p>
              <p className="mt-1 text-xs text-gray-600">Need to be addressed</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <Tabs defaultValue="risks" className="w-full">
              <TabsList className="border-b border-gray-200 bg-gray-50 w-full justify-start rounded-none px-6">
                <TabsTrigger value="risks">Risks ({risks.length})</TabsTrigger>
                <TabsTrigger value="missing-docs">Missing Docs ({missingDocs.length})</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations ({recommendations.length})</TabsTrigger>
                <TabsTrigger value="regulations">Regulations</TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="risks">
                  <FindingsTable findings={risks} icon={AlertTriangle} title="Identified Risks" />
                </TabsContent>

                <TabsContent value="missing-docs">
                  <FindingsTable findings={missingDocs} icon={FileCheck} title="Missing Documents" />
                </TabsContent>

                <TabsContent value="recommendations">
                  <FindingsTable findings={recommendations} icon={Lightbulb} title="Recommendations" />
                </TabsContent>

                <TabsContent value="regulations">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                      <BookOpen className="h-5 w-5" />
                      Compliance References
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS'].map((reg) => {
                        const relatedFindings = allFindings.filter((f) => f.relatedRegulations?.includes(reg))
                        return (
                          <div key={reg} className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                            <p className="font-semibold text-gray-900">{reg}</p>
                            <p className="mt-2 text-sm text-gray-600">
                              {relatedFindings.length} finding{relatedFindings.length !== 1 ? 's' : ''} related
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {reg === 'SOX' && 'Sarbanes-Oxley (US public companies)'}
                              {reg === 'GDPR' && 'General Data Protection Regulation (EU)'}
                              {reg === 'CCPA' && 'California Consumer Privacy Act'}
                              {reg === 'ISO27001' && 'International Information Security Standard'}
                              {reg === 'HIPAA' && 'Health Insurance Portability & Accountability'}
                              {reg === 'PCI-DSS' && 'Payment Card Industry Data Security'}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Severity Filter Info */}
          <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-4">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Click on a severity badge in the tables above to filter findings by severity level.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
