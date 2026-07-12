'use client'

import { useState, useEffect } from 'react'
import { TopNav } from '@/components/layout/TopNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, FileCheck, Lightbulb, BookOpen, Loader2, ShieldCheck, Calendar, Activity, Lock, Shield } from 'lucide-react'
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

  const avgScore =
    reports.length > 0
      ? Math.round(reports.reduce((sum, r) => sum + r.complianceScore, 0) / reports.length)
      : 0

  const filterBySeverity = (items: typeof allFindings) => {
    if (!selectedSeverity) return items
    return items.filter((item) => item.severity === selectedSeverity)
  }

  const getSeverityBadge = (severity: string) => {
    const isFiltered = selectedSeverity === severity
    switch (severity) {
      case 'critical':
      case 'high':
        return (
          <button 
            type="button"
            onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
            className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
              isFiltered 
                ? 'bg-rose-600 text-white border-rose-600' 
                : 'bg-rose-50 border-rose-100 text-rose-700 hover:bg-rose-100'
            }`}
          >
            {severity}
          </button>
        )
      case 'medium':
        return (
          <button 
            type="button"
            onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
            className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
              isFiltered 
                ? 'bg-amber-500 text-white border-amber-500' 
                : 'bg-amber-50 border-amber-100 text-amber-755 hover:bg-amber-100'
            }`}
          >
            {severity}
          </button>
        )
      case 'low':
      default:
        return (
          <button 
            type="button"
            onClick={() => setSelectedSeverity(selectedSeverity === severity ? null : severity)}
            className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all ${
              isFiltered 
                ? 'bg-indigo-650 text-white border-indigo-650' 
                : 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            {severity}
          </button>
        )
    }
  }

  const FindingsTable = ({ findings, icon: Icon, title }: any) => {
    const filtered = filterBySeverity(findings)

    return (
      <div className="space-y-4 text-left font-sans">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Icon className="h-4.5 w-4.5 text-[#E07E63]" />
          <span>{title} list ({filtered.length})</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
          <table className="w-full text-xs">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Impact Score</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Source Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((finding) => (
                  <tr key={finding.rowKey} className="hover:bg-slate-50/50 transition-colors text-slate-700">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-snug">{finding.title}</p>
                        <p className="text-xs text-slate-450 mt-1 leading-normal max-w-lg">{finding.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getSeverityBadge(finding.severity)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 border border-slate-200/40 rounded-full overflow-hidden shrink-0">
                          <div
                            className="h-full bg-[#E07E63]"
                            style={{ width: `${finding.impact}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-800">{finding.impact}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium max-w-xs truncate">
                      {finding.reportTitle}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-450 font-medium">
                    No findings active under current filters.
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
        <main className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#E07E63] mx-auto" />
            <p className="mt-4 text-xs text-slate-500 font-semibold font-sans animate-pulse">Loading compliance analytics...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] py-10 text-left font-sans">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl font-normal text-slate-800 flex items-center gap-2">
              Compliance Risk Audit
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-100">
                Audit Active
              </span>
            </h1>
            <p className="mt-1 text-xs text-slate-400 font-medium">
              Aggregated regulatory insights, operational risks, and documentation gap lists across your workspace.
            </p>
          </div>

          {/* Overall Stats Cards */}
          <div className="mb-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            
            {/* Compliance Rating Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] text-left flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance Index</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] border border-orange-100/50">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="flex items-center gap-3.5 pt-1">
                <div className="relative h-10 w-10 flex items-center justify-center shrink-0">
                  <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#E07E63"
                      strokeWidth="6"
                      strokeDasharray={264}
                      strokeDashoffset={264 * (1 - avgScore / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] font-extrabold text-slate-800">{avgScore}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-extrabold text-slate-800">{avgScore}%</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Avg workspace rating</p>
                </div>
              </div>
            </div>

            {/* Total Reports Scanned */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Indexed Documents</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] border border-orange-100/50">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-850">{reports.length}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">scanned</span>
              </div>
            </div>

            {/* Identified Risks count */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/20 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-700/80 uppercase tracking-wider">Active Risks</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100/50 border border-rose-200 text-rose-600">
                  <AlertTriangle className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-rose-800">{risks.length}</span>
                <span className="text-[10px] text-rose-450 font-bold uppercase">findings</span>
              </div>
            </div>

            {/* Missing Docs count */}
            <div className="rounded-2xl border border-amber-100 bg-amber-50/20 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-700/85 uppercase tracking-wider">Missing Docs</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100/50 border border-amber-200 text-amber-600">
                  <FileCheck className="h-4.5 w-4.5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-amber-800">{missingDocs.length}</span>
                <span className="text-[10px] text-amber-450 font-bold uppercase">flagged gaps</span>
              </div>
            </div>

          </div>

          {/* Findings Tabs list */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.015)] overflow-hidden">
            <Tabs defaultValue="risks" className="w-full">
              <TabsList className="border-b border-slate-200 bg-slate-50/50 w-full justify-start rounded-none px-6 h-12 gap-2">
                <TabsTrigger 
                  value="risks" 
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-md px-3.5 py-1 text-xs font-bold text-slate-500 data-[state=active]:text-slate-800 transition-all"
                >
                  Risks ({risks.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="missing-docs"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-md px-3.5 py-1 text-xs font-bold text-slate-500 data-[state=active]:text-slate-800 transition-all"
                >
                  Missing Docs ({missingDocs.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="recommendations"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-md px-3.5 py-1 text-xs font-bold text-slate-500 data-[state=active]:text-slate-800 transition-all"
                >
                  Recommendations ({recommendations.length})
                </TabsTrigger>
                <TabsTrigger 
                  value="regulations"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border-slate-200 border border-transparent rounded-md px-3.5 py-1 text-xs font-bold text-slate-500 data-[state=active]:text-slate-800 transition-all"
                >
                  Regulatory Scope
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
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <BookOpen className="h-4.5 w-4.5 text-[#E07E63]" />
                      <span>Regulatory Standards Overview</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS'].map((reg) => {
                        const relatedFindings = allFindings.filter((f) => f.relatedRegulations?.includes(reg))
                        return (
                          <div key={reg} className="rounded-2xl border border-slate-200 p-5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.02)] transition-shadow">
                            <span className="inline-flex rounded bg-blue-50 border border-blue-100 px-2.5 py-0.5 text-[9px] font-bold text-blue-700 uppercase tracking-wide">
                              {reg}
                            </span>
                            <p className="mt-4 text-2xl font-extrabold text-slate-800">
                              {relatedFindings.length} <span className="text-[10px] text-slate-400 font-bold uppercase">Findings</span>
                            </p>
                            <p className="mt-2 text-xs text-slate-450 leading-relaxed font-sans font-medium">
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

          {/* Filter prompt alert box */}
          {selectedSeverity && (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-orange-50 border border-orange-100 p-3.5 text-xs text-slate-700">
              <span className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4 text-[#E07E63] shrink-0" />
                Filtering active: showing only "{selectedSeverity}" severity findings.
              </span>
              <button 
                type="button" 
                onClick={() => setSelectedSeverity(null)}
                className="underline hover:text-slate-900 font-bold text-[10px] uppercase tracking-wider"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Severity Filter Info */}
          <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4">
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              <strong>Tip:</strong> Click on any severity badge level in the findings tables above to isolate and filter active findings by that severity level.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
