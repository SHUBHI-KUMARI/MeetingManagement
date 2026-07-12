'use client'

import { Report } from '@/lib/types'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

interface CoverPageProps {
  report: Report
}

export function CoverPage({ report }: CoverPageProps) {
  return (
    <section id="cover" className="space-y-8 text-left font-sans">
      
      {/* Large title section */}
      <div className="border-b border-slate-200/60 pb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#E07E63]">
          Audit Report • {report.complianceType}
        </span>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1.5 leading-snug">
          {report.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500 font-medium">{report.company} • {report.region} Region</p>
      </div>

      {/* Key details grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {/* Date */}
        <div className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] shrink-0 border border-orange-100/50">
            <Calendar className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Meeting Date</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{report.meetingDate}</p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] shrink-0 border border-orange-100/50">
            <Clock className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Duration</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{report.duration} mins</p>
          </div>
        </div>

        {/* Location / Mode */}
        <div className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] shrink-0 border border-orange-100/50">
            <MapPin className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Mode</p>
            <p className="text-xs font-bold text-slate-800 mt-1 capitalize">{report.location || report.mode}</p>
          </div>
        </div>

        {/* Attendees count */}
        <div className="flex gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#E07E63] shrink-0 border border-orange-100/50">
            <Users className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Attendees</p>
            <p className="text-xs font-bold text-slate-800 mt-1">{report.attendees.length} Present</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Meeting Summary</h3>
        <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans font-medium">{report.summary}</p>
      </div>

    </section>
  )
}
