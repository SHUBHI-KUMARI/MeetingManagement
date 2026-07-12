'use client'

import { Report } from '@/lib/types'
import { SpeakerBubble } from '../SpeakerBubble'

interface DiscussionLogProps {
  report: Report
}

export function DiscussionLog({ report }: DiscussionLogProps) {
  return (
    <section id="discussion" className="space-y-4 text-left font-sans">
      <div className="border-b border-slate-200/60 pb-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Discussion Log</h2>
      </div>

      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.015)]">
        {report.discussionLog.map((entry, index) => (
          <div key={entry.id}>
            <SpeakerBubble entry={entry} isAlternate={index % 2 === 1} />
            {index < report.discussionLog.length - 1 && <div className="my-4 border-t border-slate-100" />}
          </div>
        ))}
      </div>
    </section>
  )
}
