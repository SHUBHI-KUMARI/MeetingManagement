'use client'

import { DiscussionEntry } from '@/lib/types'
import { getRoleColor } from '@/lib/mock-data'
import { ThumbsUp, AlertCircle } from 'lucide-react'

interface SpeakerBubbleProps {
  entry: DiscussionEntry
  isAlternate?: boolean
}

export function SpeakerBubble({ entry, isAlternate = false }: SpeakerBubbleProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const getSentimentDotColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-500'
      case 'negative':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className={`flex gap-4 ${isAlternate ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar with initials and sentiment badge */}
      <div className="relative flex-shrink-0">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold tracking-wider ${getRoleColor(entry.role)}`}>
          {getInitials(entry.speaker)}
        </div>
        <span className={`absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white text-[8px] ${getSentimentDotColor(entry.sentiment)} text-white`}>
          {entry.sentiment === 'positive' ? '✓' : entry.sentiment === 'negative' ? '!' : '•'}
        </span>
      </div>

      {/* Message bubble */}
      <div className={`flex-1 ${isAlternate ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900">{entry.speaker}</h4>
          <span className="text-xs text-gray-500 font-medium">{entry.role}</span>
          <span className="text-xs text-gray-400">{entry.timestamp}</span>
        </div>

        <div className={`mt-2 rounded-lg p-4 ${isAlternate ? 'bg-blue-50/50 border border-blue-100' : 'bg-gray-50 border border-gray-100'} max-w-2xl`}>
          <p className="text-sm text-gray-800 leading-relaxed">{entry.text}</p>
        </div>
      </div>
    </div>
  )
}
