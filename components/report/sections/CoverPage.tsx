'use client'

import { Report } from '@/lib/types'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

interface CoverPageProps {
  report: Report
}

export function CoverPage({ report }: CoverPageProps) {
  return (
    <section id="cover" className="space-y-8">
      {/* Large title section */}
      <div className="border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold text-gray-900">{report.title}</h1>
        <p className="mt-3 text-xl text-gray-600">{report.company}</p>
        <p className="mt-1 text-sm text-gray-500">{report.region} • {report.complianceType}</p>
      </div>

      {/* Key details grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex gap-4 rounded-lg bg-gray-50 p-4">
          <Calendar className="h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-xs font-medium text-gray-600">Meeting Date</p>
            <p className="text-base font-semibold text-gray-900">{report.meetingDate}</p>
          </div>
        </div>

        <div className="flex gap-4 rounded-lg bg-gray-50 p-4">
          <Clock className="h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-xs font-medium text-gray-600">Duration</p>
            <p className="text-base font-semibold text-gray-900">{report.duration} minutes</p>
          </div>
        </div>

        <div className="flex gap-4 rounded-lg bg-gray-50 p-4">
          <MapPin className="h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-xs font-medium text-gray-600">Location / Mode</p>
            <p className="text-base font-semibold text-gray-900 capitalize">
              {report.location || report.mode}
            </p>
          </div>
        </div>

        <div className="flex gap-4 rounded-lg bg-gray-50 p-4">
          <Users className="h-5 w-5 flex-shrink-0 text-blue-600" />
          <div>
            <p className="text-xs font-medium text-gray-600">Attendees</p>
            <p className="text-base font-semibold text-gray-900">{report.attendees.length} present</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-lg bg-blue-50 p-6">
        <h3 className="text-sm font-semibold text-blue-900">Meeting Summary</h3>
        <p className="mt-2 text-gray-900">{report.summary}</p>
      </div>
    </section>
  )
}
