/**
 * TypeScript interfaces for Meeting Minutes & Compliance Report Generator
 */

export type ComplianceType = 'SOX' | 'GDPR' | 'CCPA' | 'ISO27001' | 'HIPAA' | 'PCI-DSS'
export type ReportLanguage = 'English' | 'Spanish' | 'French' | 'German' | 'Chinese' | 'Japanese'
export type MeetingMode = 'in-person' | 'hybrid' | 'virtual'
export type AttendeeStatus = 'present' | 'late' | 'absent'
export type DecisionType = 'decision' | 'unresolved' | 'tension' | 'projection'
export type ComplianceSeverity = 'critical' | 'high' | 'medium' | 'low'
export type ReportStatus = 'compliant' | 'needs-review' | 'at-risk'

export interface Attendee {
  id: string
  name: string
  role: string
  arrivalTime: string
  departureTime: string
  status: AttendeeStatus
}

export interface DiscussionEntry {
  id: string
  speaker: string
  role: string
  timestamp: string
  text: string
  sentiment: 'positive' | 'neutral' | 'negative'
}

export interface Decision {
  id: string
  type: DecisionType
  subject: string
  fact: string
  nextSteps: string
  owner?: string
  dueDate?: string
}

export interface Vote {
  id: string
  question: string
  date: string
  results: {
    option: string
    count: number
  }[]
  outcome: 'passed' | 'failed' | 'abstained'
}

export interface ComplianceFinding {
  id: string
  type: 'risk' | 'missing-doc' | 'recommendation'
  title: string
  description: string
  severity: ComplianceSeverity
  impact: number // 0-100
  confidence: number // 0-100
  relatedRegulations?: string[]
}

export interface ReportData {
  id: string
  title: string
  company: string
  region: string
  complianceType: ComplianceType
  meetingDate: string
  duration: number // minutes
  mode: MeetingMode
  location?: string
  reportLanguage: ReportLanguage
  status: ReportStatus
  complianceScore: number // 0-100
  attendees: Attendee[]
  discussionLog: DiscussionEntry[]
  decisions: Decision[]
  votes: Vote[]
  complianceFindings: ComplianceFinding[]
  createdAt: string
  summary: string
}

export interface Report extends ReportData {
  // Alias for convenience
}
