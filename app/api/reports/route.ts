import { NextResponse } from 'next/server'
import { getReports } from '@/lib/db'

export async function GET() {
  try {
    const reports = getReports()
    return NextResponse.json(reports)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch reports' }, { status: 500 })
  }
}
