'use client'

import { Decision } from '@/lib/types'
import { getDecisionTypeColor } from '@/lib/mock-data'
import { CheckCircle2, AlertCircle, AlertTriangle, Zap } from 'lucide-react'

interface AlertCalloutProps {
  decision: Decision
}

export function AlertCallout({ decision }: AlertCalloutProps) {
  const getIcon = () => {
    switch (decision.type) {
      case 'decision':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case 'unresolved':
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case 'tension':
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'projection':
        return <Zap className="h-5 w-5 text-purple-600" />
      default:
        return null
    }
  }

  const getTypeLabel = () => {
    switch (decision.type) {
      case 'decision':
        return 'Decision'
      case 'unresolved':
        return 'Unresolved'
      case 'tension':
        return 'Tension'
      case 'projection':
        return 'Projection'
      default:
        return 'Item'
    }
  }

  return (
    <div className={`rounded-lg p-5 ${getDecisionTypeColor(decision.type)}`}>
      <div className="flex gap-3">
        {getIcon()}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-gray-600">
              {getTypeLabel()}
            </span>
          </div>

          <h4 className="mt-1 text-base font-semibold text-gray-900">{decision.subject}</h4>

          <p className="mt-2 text-sm text-gray-700">{decision.fact}</p>

          <div className="mt-3 space-y-1">
            <p className="text-xs font-medium text-gray-600">Next Steps</p>
            <p className="text-sm text-gray-900">{decision.nextSteps}</p>
          </div>

          {decision.owner && (
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
              <div>
                <span className="font-medium">Owner:</span> {decision.owner}
              </div>
              {decision.dueDate && (
                <div>
                  <span className="font-medium">Due:</span> {decision.dueDate}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
