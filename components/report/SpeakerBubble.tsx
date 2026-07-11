'use client'

import { DiscussionEntry } from '@/lib/types'
import { getRoleColor } from '@/lib/mock-data'
import { ThumbsUp, AlertCircle } from 'lucide-react'

interface SpeakerBubbleProps {
  entry: DiscussionEntry
  isAlternate?: boolean
}

export function SpeakerBubble({ entry, isAlternate = false }: SpeakerBubbleProps) {
  const sentimentIcon = entry.sentiment === 'positive' ? '😊' : entry.sentiment === 'negative' ? '😟' : '😐'

  return (
    <div className={`flex gap-4 ${isAlternate ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${getRoleColor(entry.role)}`}>
        <span className="text-lg">{sentimentIcon}</span>
      </div>

      {/* Message bubble */}
      <div className={`flex-1 ${isAlternate ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900">{entry.speaker}</h4>
          <span className="text-xs text-gray-500">{entry.role}</span>
          <span className="text-xs text-gray-400">{entry.timestamp}</span>
        </div>

        <div className={`mt-2 rounded-lg p-4 ${isAlternate ? 'bg-blue-50' : 'bg-gray-50'} max-w-2xl`}>
          <p className="text-sm text-gray-800">{entry.text}</p>
        </div>
      </div>
    </div>
  )
}
