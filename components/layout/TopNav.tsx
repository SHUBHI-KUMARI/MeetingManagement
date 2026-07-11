'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { FileText, Plus } from 'lucide-react'

export function TopNav() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo and brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">Meeting Minute</span>
            <span className="text-xs text-gray-500">Compliance Reports</span>
          </Link>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/compliance"
            className={`text-sm font-medium transition-colors ${
              pathname === '/compliance' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Compliance
          </Link>

          {/* New Report button */}
          <Link href="/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Report
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
