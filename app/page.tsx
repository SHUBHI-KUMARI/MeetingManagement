import { TopNav } from '@/components/layout/TopNav'
import { ReportGrid } from '@/components/dashboard/ReportGrid'
import { EmptyState } from '@/components/dashboard/EmptyState'
import { mockReports } from '@/lib/mock-data'

export const metadata = {
  title: 'Dashboard | Meeting Minute',
  description: 'View all your meeting minutes and compliance reports',
}

export default function DashboardPage() {
  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Your Reports</h1>
            <p className="mt-2 text-gray-600">
              Access all your meeting minutes and compliance reports. Click on any report to view details.
            </p>
          </div>

          {/* Reports grid or empty state */}
          {mockReports.length > 0 ? <ReportGrid reports={mockReports} /> : <EmptyState />}
        </div>
      </main>
    </>
  )
}
