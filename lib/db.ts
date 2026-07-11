import fs from 'fs'
import path from 'path'
import { Report } from './types'

const DB_FILE = path.join(process.cwd(), 'lib', 'reports.json')

// Helper to ensure the DB file exists
function ensureDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8')
  }
}

export function getReports(): Report[] {
  ensureDb()
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(data) as Report[]
  } catch (error) {
    console.error('Error reading reports from file-db:', error)
    return []
  }
}

export function saveReport(report: Report): void {
  ensureDb()
  try {
    const reports = getReports()
    // Prepend the new report
    reports.unshift(report)
    fs.writeFileSync(DB_FILE, JSON.stringify(reports, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing report to file-db:', error)
  }
}

export function getReportById(id: string): Report | undefined {
  const reports = getReports()
  return reports.find((r) => r.id === id)
}
