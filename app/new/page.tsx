import { TopNav } from '@/components/layout/TopNav'
import { NewReportForm } from '@/components/forms/NewReportForm'

export const metadata = {
  title: 'New Report | Meeting Minute',
  description: 'Create a new meeting minutes and compliance report',
}

export default function NewReportPage() {
  return (
    <>
      <TopNav />
      <main className="min-h-[calc(100vh-4rem)] bg-gray-50">
        <div className="mx-auto max-w-4xl px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Create New Report</h1>
            <p className="mt-2 text-gray-600">
              Upload your meeting transcript and provide meeting details. Our AI will generate a comprehensive compliance report.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <NewReportForm />
          </div>
        </div>
      </main>
    </>
  )
}
