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
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          
          {/* SaaS Headline Section */}
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-black flex items-center gap-2">
                Workspace Overview
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                  <Sparkles className="h-3 w-3" />
                  AI Active
                </span>
              </h1>
              <p className="mt-1 text-sm text-black/70">
                Manage compliance reports, analyze work-council recordings, and track regulatory risks.
              </p>
            </div>
            {totalReports > 0 && (
              <Link href="/new">
                <Button className="gap-2 shadow-sm shadow-blue-500/10 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300">
                  <Plus className="h-4 w-4" />
                  New Report
                </Button>
              </Link>
            )}
          </div>

          {/* SaaS Overview Stats Grid */}
          <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Total Reports */}
            <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black/60">Total Analyzed Reports</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 border border-blue-100 text-blue-600">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-black">{totalReports}</span>
                <span className="ml-2 text-xs text-black/50">documents generated</span>
              </div>
            </div>

            {/* Total Minutes */}
            <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black/60">Minutes Processed</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 border border-purple-100 text-purple-600">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-black">{totalMinutes}</span>
                <span className="ml-2 text-xs text-black/50">minutes transcribed</span>
              </div>
            </div>

            {/* Avg Compliance Score */}
            <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black/60">Avg Compliance Index</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold tracking-tight text-black">{avgScore}%</span>
                <span className="ml-2 text-xs text-black/50">average audit score</span>
              </div>
            </div>
          </div>

          {/* Reports grid section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200/60 pb-4">
              <h2 className="text-lg font-semibold text-black">Compliance Documents</h2>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-black">
                {totalReports} Total
              </span>
            </div>
            {totalReports > 0 ? <ReportGrid reports={reports} /> : <EmptyState />}
          </div>
          
        </div>
      </main>
    </>
  )
}
