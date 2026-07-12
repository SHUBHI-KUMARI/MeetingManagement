'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Loader2, CheckCircle2, ChevronRight, ArrowLeft, Calendar, Building, Globe, Shield, Clock, Languages } from 'lucide-react'
import { ComplianceType, ReportLanguage } from '@/lib/types'
import { parseFileToText } from '@/lib/parseTranscript'

const complianceTypes: ComplianceType[] = ['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS']
const regions = ['US', 'EU', 'APAC', 'UK', 'Canada', 'Australia']
const languages: ReportLanguage[] = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese']

interface FormData {
  company: string
  region: string
  complianceType: ComplianceType
  meetingDate: string
  duration: string
  reportLanguage: ReportLanguage
  transcript: string
}

export function NewReportForm() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Genie vanishing states
  const [isGenieVanish, setIsGenieVanish] = useState(false)
  const [isLoadingAfterGenie, setIsLoadingAfterGenie] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [activeStep, setActiveStep] = useState(0) // 0 = Transcript, 1 = Metadata
  const [showPreview, setShowPreview] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    company: '',
    region: 'US',
    complianceType: 'SOX',
    meetingDate: '',
    duration: '60',
    reportLanguage: 'English',
    transcript: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await parseFileToText(file)
      setFormData((prev) => ({ ...prev, transcript: text }))
      setShowPreview(false)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleNextStep = () => {
    if (!formData.transcript.trim()) {
      alert('Please upload or paste a transcript before continuing.')
      return
    }
    setActiveStep(1)
  }

  const handlePrevStep = () => {
    setActiveStep(0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.company || !formData.meetingDate || !formData.transcript) {
      alert('Please fill in all required fields')
      return
    }

    // Play genie vanishing animation
    setIsGenieVanish(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoadingAfterGenie(true)
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: formData.transcript,
          company: formData.company,
          region: formData.region,
          complianceType: formData.complianceType,
          meetingDate: formData.meetingDate,
          duration: parseInt(formData.duration) || 60,
          reportLanguage: formData.reportLanguage,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate report')
      }

      const generatedReport = await response.json()
      router.push(`/report/${generatedReport.id}`)
    } catch (err: any) {
      console.error(err)
      alert(`Error generating report: ${err.message}`)
      setIsLoadingAfterGenie(false)
      setIsGenieVanish(false)
      setIsLoading(false)
    }
  }

  // Loading state with premium spinner
  if (isLoadingAfterGenie) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4 text-center"
      >
        <div className="relative h-20 w-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#818CF8] animate-spin" />
        </div>
        <h3 className="mt-8 text-2xl font-extrabold text-white animate-pulse">
          Generating Compliance Report...
        </h3>
        <p className="mt-3 text-xs text-slate-400 text-center max-w-sm font-sans leading-relaxed">
          Our AI engine is scanning your transcript, identifying governance risks, mapping compliance standards, and compiling the audit report. This takes about 5 seconds.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* 1. STEPPER HEADERS (Indigo/Violet accent) */}
      <div className="flex items-center justify-center gap-2 md:gap-4 border-b border-slate-800/80 pb-6">
        <div 
          onClick={() => formData.transcript.trim() && !isGenieVanish && setActiveStep(0)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            !isGenieVanish && formData.transcript.trim() ? 'cursor-pointer' : 'cursor-default'
          } ${
            activeStep === 0 
              ? 'bg-indigo-500/10 border border-indigo-500/25 text-[#818CF8]' 
              : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-[10px] font-bold">1</span>
          <span>Transcript Source</span>
        </div>

        <ChevronRight className="h-4 w-4 text-slate-700" />

        <div 
          onClick={() => formData.transcript.trim() && !isGenieVanish && setActiveStep(1)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            !isGenieVanish && formData.transcript.trim() ? 'cursor-pointer' : 'cursor-default'
          } ${
            activeStep === 1 
              ? 'bg-indigo-500/10 border border-indigo-500/25 text-[#818CF8]' 
              : 'text-slate-500 hover:text-slate-350'
          }`}
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-current/10 text-[10px] font-bold">2</span>
          <span>Metadata Settings</span>
        </div>
      </div>

      {/* 2. FORM STEP WORKFLOW (Wrapped with Genie Vanishing animation) */}
      <form onSubmit={handleSubmit}>
        <motion.div
          animate={isGenieVanish ? {
            scaleY: [1, 0.7, 0.1, 0.01],
            scaleX: [1, 0.9, 0.3, 0.01],
            y: [0, 80, 200, 320],
            skewX: [0, -10, -25, -45],
            filter: ["blur(0px)", "blur(1px)", "blur(3px)", "blur(8px)"],
            opacity: [1, 0.9, 0.4, 0],
          } : {
            scaleY: 1,
            scaleX: 1,
            y: 0,
            skewX: 0,
            filter: "blur(0px)",
            opacity: 1,
          }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="space-y-8"
        >
          <AnimatePresence mode="wait">
            {activeStep === 0 ? (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                {/* Step 1 Content: Upload transcript */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Transcript File <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs text-slate-500">Provide Zoom transcript notes, chat records, or legal audio transcripts.</p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".txt,.docx"
                    className="hidden"
                  />

                  <div
                    onClick={triggerFileSelect}
                    className="rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/20 p-8 text-center hover:border-indigo-500/50 transition-colors cursor-pointer"
                  >
                    <div className="mx-auto h-12 w-12 rounded-xl bg-indigo-500/10 text-[#818CF8] border border-indigo-500/20 flex items-center justify-center shadow-sm mb-3">
                      <Upload className="h-5 w-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-350">Drag & drop raw transcript files here</p>
                    <p className="text-[10px] text-slate-500 mt-1">Supports TXT, DOCX files (Click to browse)</p>
                  </div>
                </div>

                {formData.transcript && (
                  <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 transition-all">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-400 font-sans">
                        Transcript loaded successfully ({formData.transcript.split(/\s+/).length} words)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs font-semibold border-emerald-500/30 text-emerald-400 bg-slate-900/60 hover:bg-slate-800"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? 'Hide Text' : 'View Preview'}
                    </Button>
                  </div>
                )}

                {(!formData.transcript || showPreview) && (
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                      Or Paste Text Transcript
                    </label>
                    <Textarea
                      name="transcript"
                      placeholder="Paste raw conversation logs or council minutes text directly here..."
                      value={formData.transcript}
                      onChange={handleInputChange}
                      rows={8}
                      className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 font-sans text-xs text-slate-100 outline-none focus:border-indigo-500/50"
                    />
                  </div>
                )}

                {/* Action button row step 1 */}
                <div className="flex justify-between items-center border-t border-slate-800/80 pt-6">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="rounded-full text-xs font-semibold text-slate-500 hover:text-slate-350"
                    onClick={() => router.push('/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white text-xs px-5 py-4 border-0 font-semibold shadow-md shadow-indigo-500/10 gap-1"
                    onClick={handleNextStep}
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                {/* Step 2 Content: Metadata Fields */}
                <div className="grid gap-5 sm:grid-cols-2">
                  
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Building className="h-3.5 w-3.5 text-slate-400" />
                      Company / Organization <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      name="company"
                      placeholder="e.g., Acme Corp"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="rounded-xl border border-slate-850 bg-slate-950/60 p-3 text-xs text-slate-100 focus:border-indigo-500/50 focus:ring-0"
                    />
                  </div>

                  {/* Region */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      Audit Region
                    </label>
                    <Select value={formData.region} onValueChange={(val) => handleSelectChange('region', val)}>
                      <SelectTrigger className="rounded-xl border border-slate-850 bg-slate-950/60 text-xs text-slate-200 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-slate-800 text-slate-250">
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Compliance Type */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Shield className="h-3.5 w-3.5 text-slate-400" />
                      Regulation Framework
                    </label>
                    <Select value={formData.complianceType} onValueChange={(val) => handleSelectChange('complianceType', val)}>
                      <SelectTrigger className="rounded-xl border border-slate-850 bg-slate-950/60 text-xs text-slate-200 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-slate-800 text-slate-250">
                        {complianceTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Meeting Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      Meeting Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      name="meetingDate"
                      value={formData.meetingDate}
                      onChange={handleInputChange}
                      required
                      className="rounded-xl border border-slate-850 bg-slate-950/60 p-3 text-xs text-slate-100 focus:border-indigo-500/50 focus:ring-0 [color-scheme:dark]"
                    />
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      name="duration"
                      placeholder="60"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="1"
                      className="rounded-xl border border-slate-850 bg-slate-950/60 p-3 text-xs text-slate-100 focus:border-indigo-500/50 focus:ring-0"
                    />
                  </div>

                  {/* Report Language */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <Languages className="h-3.5 w-3.5 text-slate-400" />
                      Report Language
                    </label>
                    <Select value={formData.reportLanguage} onValueChange={(val) => handleSelectChange('reportLanguage', val)}>
                      <SelectTrigger className="rounded-xl border border-slate-850 bg-slate-950/60 text-xs text-slate-200 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border border-slate-800 text-slate-250">
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                </div>

                {/* Action buttons row step 2 */}
                <div className="flex justify-between items-center border-t border-slate-800/80 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="rounded-xl border-slate-800 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white gap-1.5"
                    onClick={handlePrevStep}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:opacity-95 text-white text-xs px-6 py-4 border-0 font-semibold shadow-lg shadow-indigo-500/20 gap-1.5"
                  >
                    Generate Report
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </form>
    </div>
  )
}
