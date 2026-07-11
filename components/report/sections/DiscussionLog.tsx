'use client'

import { Report } from '@/lib/types'
import { SpeakerBubble } from '../SpeakerBubble'

interface DiscussionLogProps {
  report: Report
}

export function DiscussionLog({ report }: DiscussionLogProps) {
  return (
    <section id="discussion" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Discussion Log</h2>

      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
        {report.discussionLog.map((entry, index) => (
          <div key={entry.id}>
            <SpeakerBubble entry={entry} isAlternate={index % 2 === 1} />
            {index < report.discussionLog.length - 1 && <div className="my-4 border-t border-gray-200" />}
          </div>
        ))}
      </div>
    </section>
  )
}
