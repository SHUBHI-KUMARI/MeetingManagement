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
      <main className="min-h-[calc(100vh-4rem)] bg-[#FAF9F6] py-12">
        <div className="mx-auto max-w-3xl px-6">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-serif text-3xl md:text-4xl font-normal text-slate-800">
              Create New Report
            </h1>
            <p className="mt-2 text-xs text-slate-400 font-medium">
              Upload your meeting transcript and specify audit regulations. Our AI will compile an auditor-friendly report.
            </p>
          </div>

          {/* Form container */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
            <NewReportForm />
          </div>
        </div>
      </main>
    </>
  )
}
