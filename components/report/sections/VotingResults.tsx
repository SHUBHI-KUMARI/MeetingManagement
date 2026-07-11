'use client'

import { Report } from '@/lib/types'
import { VoteBlock } from '../VoteBlock'

interface VotingResultsProps {
  report: Report
}

export function VotingResults({ report }: VotingResultsProps) {
  if (report.votes.length === 0) {
    return null
  }

  return (
    <section id="votes" className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Voting Results</h2>

      <div className="space-y-4">
        {report.votes.map((vote) => (
          <VoteBlock key={vote.id} vote={vote} />
        ))}
      </div>
    </section>
  )
}
