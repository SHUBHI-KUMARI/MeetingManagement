import { getReports } from '@/lib/db'
import DashboardClient from './DashboardClient'

export const metadata = {
  title: 'Dashboard | Meeting Minute',
  description: 'View all your meeting minutes and compliance reports',
}

export default function DashboardPage() {
  const reports = getReports()
  return <DashboardClient initialReports={reports} />
}
