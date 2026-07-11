'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Loader2 } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
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
      setShowPreview(false) // default to hidden preview on upload
    } catch (err: any) {
      alert(err.message)
    }
  }

  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.company || !formData.meetingDate || !formData.transcript) {
      alert('Please fill in all required fields')
      return
    }

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
      
      // Redirect to the newly generated report
      router.push(`/report/${generatedReport.id}`)
    } catch (err: any) {
      console.error(err)
      alert(`Error generating report: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-50/50" />
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin" />
        </div>
        <h3 className="mt-8 text-lg font-semibold text-black animate-pulse">Generating Compliance Report...</h3>
        <p className="mt-2 text-sm text-black/70 text-center max-w-sm font-sans leading-relaxed">
          Groq AI is scanning your transcript, identifying compliance risks, allocating votes, and compiling the procès-verbal. This takes about 5-10 seconds.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Transcript Input */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          Meeting Transcript <span className="text-red-600">*</span>
        </label>
        <p className="text-sm text-gray-600">Paste the full meeting transcript or upload a file</p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt,.docx"
          className="hidden"
        />

        <div
          onClick={triggerFileSelect}
          className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors cursor-pointer"
        >
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">Drag and drop your file here</p>
          <p className="text-xs text-gray-600">or click to select (.txt, .docx format)</p>
        </div>

        {formData.transcript && (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-green-800">
                Transcript loaded ({formData.transcript.split(/\s+/).length} words)
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
          </div>
        )}

        {(!formData.transcript || showPreview) && (
          <Textarea
            name="transcript"
            placeholder="Paste your meeting transcript here..."
            value={formData.transcript}
            onChange={handleInputChange}
            rows={8}
            className="rounded-lg border border-gray-300 p-3 font-mono text-sm"
          />
        )}
      </div>

      {/* Meeting Metadata */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Company Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">
            Company Name <span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            name="company"
            placeholder="e.g., Acme Corp"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Region */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">Region</label>
          <Select value={formData.region} onValueChange={(val) => handleSelectChange('region', val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
          <label className="block text-sm font-semibold text-gray-900">Compliance Type</label>
          <Select value={formData.complianceType} onValueChange={(val) => handleSelectChange('complianceType', val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
          <label className="block text-sm font-semibold text-gray-900">
            Meeting Date <span className="text-red-600">*</span>
          </label>
          <Input
            type="date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">Duration (minutes)</label>
          <Input
            type="number"
            name="duration"
            placeholder="60"
            value={formData.duration}
            onChange={handleInputChange}
            min="1"
          />
        </div>

        {/* Report Language */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">Report Language</label>
          <Select value={formData.reportLanguage} onValueChange={(val) => handleSelectChange('reportLanguage', val)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 border-t border-gray-200 pt-6">
        <Button type="button" variant="outline" disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1 gap-2" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {isLoading ? 'Generating Report...' : 'Generate Report'}
        </Button>
      </div>
    </form>
  )
}
