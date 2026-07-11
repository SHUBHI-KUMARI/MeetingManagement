'use client'

import { Report } from '@/lib/types'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { getRoleColor } from '@/lib/mock-data'

interface AttendanceTableProps {
  report: Report
}

export function AttendanceTable({ report }: AttendanceTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case 'late':
        return <AlertCircle className="h-4 w-4 text-amber-600" />
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <section id="attendance" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Attendance</h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Arrival
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Departure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {report.attendees.map((attendee) => (
              <tr key={attendee.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{attendee.name}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(attendee.role)}`}>
                    {attendee.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{attendee.arrivalTime}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{attendee.departureTime}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(attendee.status)}
                    <span className="text-sm capitalize text-gray-600">{attendee.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
