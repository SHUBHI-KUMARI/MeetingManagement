'use client'

import { Vote } from '@/lib/types'
import { CheckCircle2, XCircle } from 'lucide-react'

interface VoteBlockProps {
  vote: Vote
}

export function VoteBlock({ vote }: VoteBlockProps) {
  const totalVotes = vote.results.reduce((sum, result) => sum + result.count, 0)
  const maxVotes = Math.max(...vote.results.map((r) => r.count))

  const getOutcomeColor = () => {
    switch (vote.outcome) {
      case 'passed':
        return 'bg-green-50 border-green-200'
      case 'failed':
        return 'bg-red-50 border-red-200'
      case 'abstained':
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getOutcomeIcon = () => {
    switch (vote.outcome) {
      case 'passed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className={`rounded-lg border p-6 ${getOutcomeColor()}`}>
      <div className="mb-4">
        <h4 className="text-base font-semibold text-gray-900">{vote.question}</h4>
        <p className="mt-1 text-sm text-gray-600">Voted on {vote.date}</p>
      </div>

      {/* Vote results */}
      <div className="space-y-3">
        {vote.results.map((result, index) => (
          <div key={index}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{result.option}</span>
              <span className="text-sm text-gray-600">
                {result.count} vote{result.count !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{
                  width: maxVotes > 0 ? `${(result.count / maxVotes) * 100}%` : '0%',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Outcome */}
      <div className="mt-5 flex items-center gap-2">
        {getOutcomeIcon()}
        <span className="text-sm font-semibold text-gray-900 capitalize">{vote.outcome}</span>
      </div>
    </div>
  )
}
