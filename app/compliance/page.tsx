'use client'

import { useState, useEffect } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getSeverityColor } from '@/lib/mock-data'
import { AlertTriangle, FileCheck, Lightbulb, BookOpen, Loader2 , ShieldCheck } from 'lucide-react'
import { Report } from '@/lib/types'

export default function CompliancePage() {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null)
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReports(data)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }, [])

  // Aggregate all findings from all reports
  const allFindings = reports.flatMap((report) =>
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
    reports.length > 0
      ? Math.round(reports.reduce((sum, r) => sum + r.complianceScore, 0) / reports.length)
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

  if (isLoading) {
    return (
      <>
        <TopNav />
        <main className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto" />
            <p className="mt-4 text-sm text-gray-600 font-medium font-sans">Loading compliance analytics...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight text-black flex items-center gap-2">
              Compliance Risk Audit
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
                Audit Active
              </span>
            </h1>
            <p className="mt-1 text-sm text-black/70">
              Aggregated regulatory insights, identified operational risks, and documentation gap lists across your workspace.
            </p>
          </div>

          {/* Overall Score Card Grid */}
          <div className="mb-10 grid gap-5 md:grid-cols-4">
            
            {/* Overall Score */}
            <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black/60">Compliance Rating</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-blue-600">{avgScore}%</span>
                <span className="ml-2 text-xs text-black/50">average audit score</span>
              </div>
            </div>

            {/* Total Reports */}
            <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black/60">Indexed Audits</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 border border-gray-200 text-black">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-black">{reports.length}</span>
                <span className="ml-2 text-xs text-black/50">documents scanned</span>
              </div>
            </div>

            {/* Identified Risks */}
            <div className="rounded-xl border border-red-100 bg-red-50/30 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700/80">Identified Risks</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100/50 border border-red-200 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-red-600">{risks.length}</span>
                <span className="ml-2 text-xs text-red-700/60 font-medium">findings active</span>
              </div>
            </div>

            {/* Missing Docs */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/30 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-amber-700/80">Missing Docs</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100/50 border border-amber-200 text-amber-600">
                  <FileCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-amber-600">{missingDocs.length}</span>
                <span className="ml-2 text-xs text-amber-700/60 font-medium font-sans">gaps flagged</span>
              </div>
            </div>

          </div>

          {/* Tabs Container */}
          <div className="rounded-xl border border-gray-200/60 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
            <Tabs defaultValue="risks" className="w-full">
              <TabsList className="border-b border-gray-200/60 bg-gray-50/50 w-full justify-start rounded-none px-6 h-12 gap-2">
                <TabsTrigger 
                  value="risks" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-gray-200 border border-transparent rounded-md px-3 py-1.5 text-xs font-semibold"
                >
                  Identified Risks ({risks.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="missing-docs"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-gray-200 border border-transparent rounded-md px-3 py-1.5 text-xs font-semibold"
                >
                  Missing Docs ({missingDocs.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="recommendations"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-gray-200 border border-transparent rounded-md px-3 py-1.5 text-xs font-semibold"
                >
                  Recommendations ({recommendations.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="regulations"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-gray-200 border border-transparent rounded-md px-3 py-1.5 text-xs font-semibold"
                >
                  Regulatory Coverage
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="risks" className="outline-none">
                  <FindingsTable findings={risks} icon={AlertTriangle} title="Identified Risks" />
                </TabsContent>

                <TabsContent value="missing-docs" className="outline-none">
                  <FindingsTable findings={missingDocs} icon={FileCheck} title="Missing Documents" />
                </TabsContent>

                <TabsContent value="recommendations" className="outline-none">
                  <FindingsTable findings={recommendations} icon={Lightbulb} title="Recommendations" />
                </TabsContent>

                <TabsContent value="regulations" className="outline-none">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-base font-semibold text-black">
                      <BookOpen className="h-5 w-5 text-gray-500" />
                      Regulatory Compliance Standards
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS'].map((reg) => {
                        const relatedFindings = allFindings.filter((f) => f.relatedRegulations?.includes(reg))
                        return (
                          <div key={reg} className="rounded-xl border border-gray-200/60 p-5 bg-white hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)] transition-all duration-300">
                            <span className="inline-flex rounded-full bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                              {reg}
                            </span>
                            <p className="mt-3 text-2xl font-bold tracking-tight text-black">
                              {relatedFindings.length} <span className="text-xs font-medium text-black/55">findings</span>
                            </p>
                            <p className="mt-1 text-xs text-black/60 font-sans leading-relaxed">
                              {reg === 'SOX' && 'Sarbanes-Oxley auditing for public corporate minutes.'}
                              {reg === 'GDPR' && 'EU General Data Protection regulatory coverage.'}
                              {reg === 'CCPA' && 'California Consumer Privacy rights enforcement.'}
                              {reg === 'ISO27001' && 'ISO Information Security control implementations.'}
                              {reg === 'HIPAA' && 'Healthcare privacy & security compliance standards.'}
                              {reg === 'PCI-DSS' && 'Payment Card Industry transactional governance.'}
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
          <div className="mt-6 rounded-lg bg-blue-50/50 border border-blue-100 p-4">
            <p className="text-xs text-blue-900 leading-relaxed font-sans">
              <strong>Tip:</strong> Click on a severity badge in the tables above to filter findings by severity level.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
