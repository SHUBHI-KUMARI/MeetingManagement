'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <FileText className="h-8 w-8 text-blue-600" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">No reports yet</h3>
      <p className="mt-2 text-center text-gray-600">
        Get started by creating your first meeting minutes report. Our AI will help you generate a comprehensive compliance report from your meeting transcript.
      </p>

      <Link href="/new" className="mt-6">
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Your First Report
        </Button>
      </Link>
    </div>
  )
}
