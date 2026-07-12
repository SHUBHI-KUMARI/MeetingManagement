'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { ReportSidebar } from '@/components/report/ReportSidebar'
import { ComplianceSummary } from '@/components/report/ComplianceSummary'
import { CoverPage } from '@/components/report/sections/CoverPage'
import { AttendanceTable } from '@/components/report/sections/AttendanceTable'
import { DiscussionLog } from '@/components/report/sections/DiscussionLog'
import { Decisions } from '@/components/report/sections/Decisions'
import { VotingResults } from '@/components/report/sections/VotingResults'
import { ComplianceFindings } from '@/components/report/sections/ComplianceFindings'
import { Report } from '@/lib/types'
import { Loader2 } from 'lucide-react'

interface ReportPageProps {
  params: Promise<{ id: string }>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function ReportPage({ params }: ReportPageProps) {
  const resolvedParams = React.use(params)
  const id = resolvedParams.id

  const [report, setReport] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((r) => r.id === id)
          if (found) {
            setReport(found)
          }
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false))
  }, [id])

  if (isLoading) {
    return (
      <div className="flex bg-[#090A0F] text-slate-100 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
          <TopNav />
          <main className="min-h-[calc(100vh-4rem)] bg-[#090A0F] flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-[#818CF8] mx-auto" />
              <p className="mt-4 text-xs text-slate-500 font-bold font-sans">Loading report details...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!report) {
    notFound()
  }

  return (
    <div className="flex bg-[#090A0F] text-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <TopNav />
        <div className="flex min-h-[calc(100vh-4rem)] bg-[#090A0F]">
          {/* Sidebar TOC */}
          <ReportSidebar />

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <motion.div
              className="mx-auto max-w-4xl px-8 py-12"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Sections */}
              <div className="space-y-16">
                <motion.div variants={itemVariants}>
                  <CoverPage report={report} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ComplianceSummary report={report} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <AttendanceTable report={report} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <DiscussionLog report={report} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Decisions report={report} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <VotingResults report={report} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ComplianceFindings report={report} />
                </motion.div>
              </div>

              {/* Footer spacing */}
              <motion.div
                variants={itemVariants}
                className="mt-16 border-t border-slate-800 pt-8 text-center text-xs text-slate-500"
              >
                <p>End of report • Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
              </motion.div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}
