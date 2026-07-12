'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertTriangle, FileCheck, Lightbulb, BookOpen, Loader2, ShieldCheck, Activity } from 'lucide-react'
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
            className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider transition-all ${
              isFiltered 
                ? 'bg-rose-600 text-white border-rose-600' 
                : 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
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
            className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider transition-all ${
              isFiltered 
                ? 'bg-amber-500 text-white border-amber-500' 
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
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
            className={`inline-flex rounded border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider transition-all ${
              isFiltered 
                ? 'bg-indigo-600 text-white border-indigo-600' 
                : 'bg-indigo-500/10 border-indigo-500/20 text-[#818CF8] hover:bg-indigo-500/20'
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
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500">
          <Icon className="h-4.5 w-4.5 text-[#818CF8]" />
          <span>{title} list ({filtered.length})</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
          <table className="w-full text-xs">
            <thead className="border-b border-slate-800 bg-slate-950/40">
              <tr>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">Impact Score</th>
                <th className="px-6 py-3.5 text-left font-bold text-slate-500 uppercase tracking-wider">Source Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
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
                            className="h-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED]"
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
      <div className="flex bg-[#090A0F] text-slate-100 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          <TopNav />
          <main className="min-h-[calc(100vh-4rem)] bg-[#090A0F] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#818CF8] mx-auto" />
              <p className="mt-4 text-xs text-slate-500 font-bold font-sans animate-pulse">Loading compliance analytics...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex bg-[#090A0F] text-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <TopNav />
        <main className="min-h-[calc(100vh-4rem)] bg-[#090A0F] py-10 text-left font-sans">
          <div className="mx-auto max-w-7xl px-6">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2 font-sans">
                Compliance Risk Audit
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Audit Active
                </span>
              </h1>
              <p className="mt-1.5 text-xs text-slate-400 font-medium">
                Aggregated regulatory insights, operational risks, and documentation gap lists across your workspace.
              </p>
            </div>

            {/* Overall Stats Cards */}
            <div className="mb-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              
              {/* Compliance Rating Card */}
              <div className="rounded-2xl border border-slate-850 bg-slate-900/40 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] text-left flex flex-col justify-between backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Compliance Index</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-[#818CF8] border border-indigo-500/25">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="flex items-center gap-3.5 pt-1">
                  <div className="relative h-10 w-10 flex items-center justify-center shrink-0">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#1E293B" strokeWidth="6" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="6"
                        strokeDasharray={264}
                        strokeDashoffset={264 * (1 - avgScore / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-extrabold text-cyan-400">{avgScore}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-white">{avgScore}%</p>
                    <p className="text-[9px] text-slate-500 font-extrabold uppercase">Avg workspace rating</p>
                  </div>
                </div>
              </div>

              {/* Total Reports Scanned */}
              <div className="rounded-2xl border border-slate-850 bg-slate-900/40 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indexed Documents</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-[#A78BFA] border border-purple-500/25">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-slate-200">{reports.length}</span>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase">scanned</span>
                </div>
              </div>

              {/* Identified Risks count */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Active Risks</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    <AlertTriangle className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-rose-450">{risks.length}</span>
                  <span className="text-[10px] text-rose-500 font-extrabold uppercase">findings</span>
                </div>
              </div>

              {/* Missing Docs count */}
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col justify-between backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Missing Docs</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <FileCheck className="h-4.5 w-4.5" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-2xl font-extrabold text-amber-450">{missingDocs.length}</span>
                  <span className="text-[10px] text-amber-500 font-extrabold uppercase">flagged gaps</span>
                </div>
              </div>

            </div>

            {/* Findings Tabs list */}
            <div className="rounded-2xl border border-slate-850 bg-slate-900/40 shadow-[0_8px_32px_rgba(0,0,0,0.15)] overflow-hidden backdrop-blur-md">
              <Tabs defaultValue="risks" className="w-full">
                <TabsList className="border-b border-slate-800 bg-slate-950/40 w-full justify-start rounded-none px-6 h-12 gap-2">
                  <TabsTrigger 
                    value="risks" 
                    className="data-[state=active]:bg-slate-900 data-[state=active]:border-slate-800 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-500 data-[state=active]:text-[#818CF8] transition-all"
                  >
                    Risks ({risks.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="missing-docs"
                    className="data-[state=active]:bg-slate-900 data-[state=active]:border-slate-800 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-500 data-[state=active]:text-[#818CF8] transition-all"
                  >
                    Missing Docs ({missingDocs.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recommendations"
                    className="data-[state=active]:bg-slate-900 data-[state=active]:border-slate-800 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-500 data-[state=active]:text-[#818CF8] transition-all"
                  >
                    Recommendations ({recommendations.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="regulations"
                    className="data-[state=active]:bg-slate-900 data-[state=active]:border-slate-800 border border-transparent rounded-md px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-500 data-[state=active]:text-[#818CF8] transition-all"
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
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                        <BookOpen className="h-4.5 w-4.5 text-[#818CF8]" />
                        <span>Regulatory Standards Overview</span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS'].map((reg) => {
                          const relatedFindings = allFindings.filter((f) => f.relatedRegulations?.includes(reg))
                          return (
                            <div key={reg} className="rounded-2xl border border-slate-800 p-5 bg-slate-900/30 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:border-slate-700 transition-colors text-left">
                              <span className="inline-flex rounded bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[9px] font-bold text-[#818CF8] uppercase tracking-wide">
                                {reg}
                              </span>
                              <p className="mt-4 text-2xl font-black text-white">
                                {relatedFindings.length} <span className="text-[10px] text-slate-500 font-extrabold uppercase">Findings</span>
                              </p>
                              <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans font-medium">
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
              <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-500/5 border border-indigo-500/15 p-3.5 text-xs text-slate-350">
                <span className="font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-[#818CF8] shrink-0" />
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
            <div className="mt-6 rounded-2xl bg-slate-900/30 border border-slate-850 p-4">
              <p className="text-xs text-slate-450 leading-relaxed font-medium">
                <strong>Tip:</strong> Click on any severity badge level in the findings tables above to isolate and filter active findings by that severity level.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
