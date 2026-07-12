'use client'

import { Report } from '@/lib/types'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { getRoleColor } from '@/lib/mock-data'

interface AttendanceTableProps {
  report: Report
}

export function AttendanceTable({ report }: AttendanceTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-100/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            <CheckCircle2 className="h-3 w-3 shrink-0" />
            Present
          </span>
        )
      case 'late':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-100/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700">
            <AlertCircle className="h-3 w-3 shrink-0" />
            Late
          </span>
        )
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-rose-50 border border-rose-100/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
            <XCircle className="h-3 w-3 shrink-0" />
            Absent
          </span>
        )
      default:
        return null
    }
  }

  return (
    <section id="attendance" className="space-y-4 text-left font-sans">
      
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Attendance Roll Call</h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500">
          {report.attendees.length} members
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
        <table className="w-full text-xs">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Arrival</th>
              <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Departure</th>
              <th className="px-6 py-3.5 text-left font-bold text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {report.attendees.map((attendee) => (
              <tr key={attendee.id} className="hover:bg-slate-50/50 transition-colors text-slate-700">
                <td className="px-6 py-4 font-bold text-slate-800">{attendee.name}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-md bg-slate-100 border border-slate-200/40 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                    {attendee.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 font-medium">{attendee.arrivalTime}</td>
                <td className="px-6 py-4 text-slate-400 font-medium">{attendee.departureTime}</td>
                <td className="px-6 py-4">
                  {getStatusBadge(attendee.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  )
}
