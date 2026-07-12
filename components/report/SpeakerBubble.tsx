'use client'

import { DiscussionEntry } from '@/lib/types'
import { getRoleColor } from '@/lib/mock-data'

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
        return 'bg-emerald-500'
      case 'negative':
        return 'bg-rose-500'
      default:
        return 'bg-slate-400'
    }
  }

  return (
    <div className={`flex gap-4 font-sans text-xs ${isAlternate ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar with initials and sentiment badge */}
      <div className="relative flex-shrink-0">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold tracking-wider ${getRoleColor(entry.role)}`}>
          {getInitials(entry.speaker)}
        </div>
        <span className={`absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white text-[7px] ${getSentimentDotColor(entry.sentiment)} text-white font-extrabold`}>
          {entry.sentiment === 'positive' ? '✓' : entry.sentiment === 'negative' ? '!' : '•'}
        </span>
      </div>

      {/* Message bubble */}
      <div className={`flex-1 ${isAlternate ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
          <h4 className="font-bold text-slate-800 text-xs">{entry.speaker}</h4>
          <span>•</span>
          <span className="uppercase text-[9px] tracking-wide text-slate-500">{entry.role}</span>
          <span>•</span>
          <span>{entry.timestamp}</span>
        </div>

        <div className={`mt-2 rounded-2xl p-4 ${
          isAlternate 
            ? 'bg-[#E07E63]/5 border border-orange-100 text-slate-700' 
            : 'bg-slate-50 border border-slate-100 text-slate-700'
        } max-w-2xl text-left`}>
          <p className="text-xs leading-relaxed font-medium">{entry.text}</p>
        </div>
      </div>

    </div>
  )
}
