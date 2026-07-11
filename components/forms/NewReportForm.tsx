'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload, Loader2 } from 'lucide-react'
import { ComplianceType, ReportLanguage } from '@/lib/types'
import { mockReports } from '@/lib/mock-data'

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
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.company || !formData.meetingDate || !formData.transcript) {
      alert('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Create a new mock report based on the form data
    const newReportId = `report-${Date.now()}`
    const newReport = mockReports[0]
    newReport.id = newReportId
    newReport.company = formData.company
    newReport.region = formData.region as any
    newReport.complianceType = formData.complianceType
    newReport.meetingDate = formData.meetingDate
    newReport.duration = parseInt(formData.duration)
    newReport.reportLanguage = formData.reportLanguage
    newReport.createdAt = new Date().toISOString()

    // Redirect to the new report
    setIsLoading(false)
    router.push(`/report/${newReportId}`)
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-8">
      {/* Transcript Input */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-900">
          Meeting Transcript <span className="text-red-600">*</span>
        </label>
        <p className="text-sm text-gray-600">Paste the full meeting transcript or upload a file</p>

        <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 transition-colors">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm font-medium text-gray-900">Drag and drop your file here</p>
          <p className="text-xs text-gray-600">or click to select (PDF, TXT, DOCX)</p>
        </div>

        <Textarea
          name="transcript"
          placeholder="Paste your meeting transcript here..."
          value={formData.transcript}
          onChange={handleInputChange}
          rows={8}
          className="rounded-lg border border-gray-300 p-3 font-mono text-sm"
          required
        />
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
