'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Report } from '@/lib/types'
import { theme } from '@/lib/theme'

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
            className={`inline-flex rounded-full px-3 text-[9px] font-extrabold uppercase tracking-wider transition-all h-5 items-center justify-center ${
              isFiltered 
                ? 'bg-rose-650 text-white' 
                : 'bg-rose-500/15 text-white border-t border-l border-b border-r border-t-rose-500/35 border-l-rose-500/35 border-b-rose-500/5 border-r-rose-500/5 shadow-inner'
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
            className={`inline-flex rounded-full px-3 text-[9px] font-extrabold uppercase tracking-wider transition-all h-5 items-center justify-center ${
              isFiltered 
                ? 'bg-amber-600 text-white' 
                : 'bg-amber-500/15 text-white border-t border-l border-b border-r border-t-amber-500/35 border-l-amber-500/35 border-b-amber-500/5 border-r-amber-500/5 shadow-inner'
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
            className={`inline-flex rounded-full px-3 text-[9px] font-extrabold uppercase tracking-wider transition-all h-5 items-center justify-center ${
              isFiltered 
                ? 'bg-indigo-650 text-white' 
                : 'bg-indigo-500/15 text-white border-t border-l border-b border-r border-t-indigo-500/35 border-l-indigo-500/35 border-b-indigo-500/5 border-r-indigo-500/5 shadow-inner'
            }`}
          >
            {severity}
          </button>
        )
    }
  }

  const FindingsTable = ({ findings, title }: any) => {
    const filtered = filterBySeverity(findings)

    return (
      <div className="space-y-4 text-left font-sans">
        <div className="flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
          <span>{title} list ({filtered.length})</span>
        </div>

        <div className={`overflow-hidden border border-white/5 bg-[#0F1117]/40 backdrop-blur-md shadow-md ${theme.radius.card}`}>
          <table className="w-full text-xs">
            <thead className="border-b border-white/5 bg-slate-950/40">
              <tr>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider text-[9px]">Title</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider text-[9px]">Severity</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider text-[9px]">Impact Score</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider text-[9px]">Source Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length > 0 ? (
                filtered.map((finding) => (
                  <tr key={finding.rowKey} className="hover:bg-slate-900/30 transition-colors text-slate-300">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-white text-sm leading-snug">{finding.title}</p>
                        <p className="text-xs text-slate-400 mt-1 leading-normal max-w-lg">{finding.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getSeverityBadge(finding.severity)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-950 border border-slate-850 rounded-full overflow-hidden shrink-0">
                          <div
                            className="h-full bg-indigo-650"
                            style={{ width: `${finding.impact}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-200">{finding.impact}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-semibold max-w-xs truncate">
                      {finding.reportTitle}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500 font-semibold">
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
      <div className="flex bg-[#090611] text-slate-100 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          <TopNav />
          <main className="min-h-[calc(100vh-4rem)] bg-[#090611] flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs text-slate-500 font-bold font-sans animate-pulse">Loading compliance analytics...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex bg-[#090611] text-slate-100 min-h-screen font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <TopNav />
        <main className="min-h-[calc(100vh-4rem)] bg-[#090611] py-10 text-left font-sans">
          <div className="mx-auto max-w-7xl px-6">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 font-sans uppercase leading-none">
                Compliance Risk Audit
                <span className="inline-flex rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-emerald-450">
                  Audit Active
                </span>
              </h1>
              <p className="mt-2 text-xs text-slate-400 font-medium">
                Aggregated regulatory insights, operational risks, and documentation gap lists across your workspace.
              </p>
            </div>

            {/* Overall Stats Cards */}
            <div className="mb-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              
              {/* Compliance Rating Card */}
              <div className={`border ${theme.colors.border} bg-[#0F1117]/40 p-5 shadow text-left flex flex-col justify-between backdrop-blur-md ${theme.radius.card}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Index</span>
                </div>
                <div className="flex items-center gap-3.5 pt-1">
                  <div className="relative h-10 w-10 flex items-center justify-center shrink-0">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#161821" strokeWidth="6" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#4F46E5"
                        strokeWidth="6"
                        strokeDasharray={264}
                        strokeDashoffset={264 * (1 - avgScore / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-extrabold text-indigo-400">{avgScore}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-white">{avgScore}%</p>
                    <p className="text-[9px] text-slate-500 font-extrabold uppercase">Avg workspace rating</p>
                  </div>
                </div>
              </div>

              {/* Total Reports Scanned */}
              <div className={`border ${theme.colors.border} bg-[#0F1117]/40 p-5 shadow flex flex-col justify-between backdrop-blur-md ${theme.radius.card}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Documents</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-slate-200">{reports.length}</span>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase">scanned</span>
                </div>
              </div>

              {/* Identified Risks count */}
              <div className={`border ${theme.colors.border} bg-[#0F1117]/40 p-5 shadow flex flex-col justify-between backdrop-blur-md ${theme.radius.card}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Risks</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-slate-200">{risks.length}</span>
                  <span className="text-[10px] text-slate-550 font-extrabold uppercase">findings</span>
                </div>
              </div>

              {/* Missing Docs count */}
              <div className={`border ${theme.colors.border} bg-[#0F1117]/40 p-5 shadow flex flex-col justify-between backdrop-blur-md ${theme.radius.card}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Missing Docs</span>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-slate-200">{missingDocs.length}</span>
                  <span className="text-[10px] text-slate-550 font-extrabold uppercase">flagged gaps</span>
                </div>
              </div>

            </div>

            {/* Findings Tabs list */}
            <div className={`border ${theme.colors.border} bg-[#0F1117]/40 shadow overflow-hidden backdrop-blur-md ${theme.radius.card}`}>
              <Tabs defaultValue="risks" className="w-full">
                <TabsList className="border-b border-white/5 bg-slate-950/40 w-full justify-start rounded-none px-6 h-12 gap-2">
                  <TabsTrigger 
                    value="risks" 
                    className="data-[state=active]:bg-[#0F1117] data-[state=active]:border-white/5 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-550 data-[state=active]:text-white transition-all animate-none"
                  >
                    Risks ({risks.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="missing-docs"
                    className="data-[state=active]:bg-[#0F1117] data-[state=active]:border-white/5 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-550 data-[state=active]:text-white transition-all animate-none"
                  >
                    Missing Docs ({missingDocs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recommendations"
                    className="data-[state=active]:bg-[#0F1117] data-[state=active]:border-white/5 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-550 data-[state=active]:text-white transition-all animate-none"
                  >
                    Recommendations ({recommendations.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="regulations"
                    className="data-[state=active]:bg-[#0F1117] data-[state=active]:border-white/5 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-550 data-[state=active]:text-white transition-all animate-none"
                  >
                    Regulatory Scope
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  <TabsContent value="risks" className="outline-none">
                    <FindingsTable findings={risks} title="Identified Risks" />
                  </TabsContent>

                  <TabsContent value="missing-docs" className="outline-none">
                    <FindingsTable findings={missingDocs} title="Missing Documents" />
                  </TabsContent>

                  <TabsContent value="recommendations" className="outline-none">
                    <FindingsTable findings={recommendations} title="Recommendations" />
                  </TabsContent>

                  <TabsContent value="regulations" className="outline-none">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <span>Regulatory Standards Overview</span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS'].map((reg) => {
                          const relatedFindings = allFindings.filter((f) => f.relatedRegulations?.includes(reg))
                          return (
                            <div key={reg} className="rounded-2xl border border-white/5 p-5 bg-[#0F1117]/30 shadow hover:border-slate-800 transition-colors text-left">
                              <span className="inline-flex rounded bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-wide">
                                {reg}
                              </span>
                              <p className="mt-4 text-2xl font-black text-white">
                                {relatedFindings.length} <span className="text-[10px] text-slate-500 font-extrabold uppercase">Findings</span>
                              </p>
                              <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans font-medium">
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
              <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-500/5 border border-indigo-500/15 p-3.5 text-xs text-slate-400">
                <span className="font-semibold flex items-center gap-1.5">
                  Filtering active: showing only "{selectedSeverity}" severity findings.
                </span>
                <button 
                  type="button" 
                  onClick={() => setSelectedSeverity(null)}
                  className="underline hover:text-white font-bold text-[10px] uppercase tracking-wider"
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Severity Filter Info */}
            <div className="mt-6 rounded-2xl bg-slate-900/30 border border-slate-900 p-4 text-left">
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                <strong>Tip:</strong> Click on any severity badge level in the findings tables above to isolate and filter active findings by that severity level.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
