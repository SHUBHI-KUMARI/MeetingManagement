'use client'

import { Report } from '@/lib/types'
import { ReportCard } from './ReportCard'
import { motion } from 'framer-motion'

interface ReportGridProps {
  reports: Report[]
}

export function ReportGrid({ reports }: ReportGridProps) {
  if (reports.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {reports.map((report) => (
        <motion.div key={report.id} variants={itemVariants}>
          <ReportCard report={report} />
        </motion.div>
      ))}
    </motion.div>
  )
}
