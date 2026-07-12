import { TopNav } from '@/components/layout/TopNav'
import { ReportGrid } from '@/components/dashboard/ReportGrid'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { getReports } from '@/lib/db'
import { Activity, Clock, ShieldCheck, Plus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Dashboard | Meeting Minute',
  description: 'View all your meeting minutes and compliance reports',
}

export default function DashboardPage() {
  const reports = getReports()
  const totalReports = reports.length
  const totalMinutes = reports.reduce((sum, r) => sum + r.duration, 0)
  const avgScore = totalReports > 0 ? Math.round(reports.reduce((sum, r) => sum + r.complianceScore, 0) / totalReports) : 0

  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-serif text-3xl font-normal text-slate-800 flex items-center gap-2">
                Workspace Overview
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#E07E63] border border-orange-100">
                  <Sparkles className="h-3 w-3" />
                  AI Active
                </span>
              </h1>
              <p className="mt-1.5 text-xs text-slate-400 font-medium">
                Manage compliance reports, analyze recordings, and track regulatory risks.
              </p>
            </div>
            {totalReports > 0 && (
              <Link href="/new">
                <Button className="w-full sm:w-auto gap-2 rounded-full bg-[#E07E63] text-white hover:bg-[#cf6d52] transition-all font-semibold border-0 shadow-lg shadow-orange-500/10 text-xs px-5 py-4">
                  <Plus className="h-3.5 w-3.5" />
                  New Report
                </Button>
              </Link>
            )}
          </div>

          {/* SECTION 1: Compliance Documents (PRIMARY - Moved to the Top) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Compliance Documents</h2>
              <span className="rounded-full bg-slate-200/50 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
                {totalReports} Total
              </span>
            </div>
            {totalReports > 0 ? <ReportGrid reports={reports} /> : <EmptyState />}
          </div>

          {/* Divider */}
          <div className="my-14 border-t border-slate-200/60" />

          {/* SECTION 2: Workspace Analytics (SECONDARY - Moved to the Bottom) */}
          <div className="space-y-6">
            <div className="pb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Workspace Analytics Overview</h2>
            </div>
            
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Total Reports */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.025)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Reports</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] border border-orange-100/50">
                    <Activity className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-slate-800">{totalReports}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">documents</span>
                </div>
              </div>

              {/* Minutes Processed */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.025)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Minutes Processed</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] border border-orange-100/50">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-slate-800">{totalMinutes}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">minutes</span>
                </div>
              </div>

              {/* Avg Compliance Score */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.015)] transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.025)] sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance Index</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] border border-orange-100/50">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
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
                    <span className="text-lg font-extrabold text-slate-800">{avgScore}%</span>
                    <span className="ml-1.5 text-[9px] text-slate-400 font-bold uppercase">Average score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </>
  )
}
