'use client'

import React from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'
import { NewReportForm } from '@/components/forms/NewReportForm'

export default function NewReportClient() {
  return (
    <div className="flex bg-[#090A0F] text-slate-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <TopNav />
        <main className="min-h-[calc(100vh-4rem)] bg-[#090A0F] py-12 text-left font-sans">
          <div className="mx-auto max-w-3xl px-6">
            
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
                Create New Report
              </h1>
              <p className="mt-2 text-xs text-slate-400 font-medium">
                Upload your meeting transcript and specify audit regulations. Our AI will compile an auditor-friendly report.
              </p>
            </div>

            {/* Form container */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md">
              <NewReportForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
