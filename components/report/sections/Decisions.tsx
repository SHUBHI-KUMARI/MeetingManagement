'use client'

import { Report } from '@/lib/types'
import { AlertCallout } from '../AlertCallout'

interface DecisionsProps {
  report: Report
}

export function Decisions({ report }: DecisionsProps) {
  return (
    <section id="decisions" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Decisions & Action Items</h2>

      <div className="space-y-4">
        {report.decisions.map((decision) => (
          <AlertCallout key={decision.id} decision={decision} />
        ))}
      </div>
    </section>
  )
}
