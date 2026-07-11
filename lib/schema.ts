import { z } from 'zod'

export const ComplianceTypeSchema = z.enum(['SOX', 'GDPR', 'CCPA', 'ISO27001', 'HIPAA', 'PCI-DSS'])
export const ReportLanguageSchema = z.enum(['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'])
export const MeetingModeSchema = z.enum(['in-person', 'hybrid', 'virtual'])
export const AttendeeStatusSchema = z.enum(['present', 'late', 'absent'])
export const DecisionTypeSchema = z.enum(['decision', 'unresolved', 'tension', 'projection'])
export const ComplianceSeveritySchema = z.enum(['critical', 'high', 'medium', 'low'])
export const ReportStatusSchema = z.enum(['compliant', 'needs-review', 'at-risk'])

export const AttendeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  arrivalTime: z.string(),
  departureTime: z.string(),
  status: AttendeeStatusSchema,
})

export const DiscussionEntrySchema = z.object({
  id: z.string(),
  speaker: z.string(),
  role: z.string(),
  timestamp: z.string(),
  text: z.string(),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
})

export const DecisionSchema = z.object({
  id: z.string(),
  type: DecisionTypeSchema,
  subject: z.string(),
  fact: z.string(),
  nextSteps: z.string(),
  owner: z.string().optional(),
  dueDate: z.string().optional(),
})

export const VoteSchema = z.object({
  id: z.string(),
  question: z.string(),
  date: z.string(),
  results: z.array(
    z.object({
      option: z.string(),
      count: z.number(),
    })
  ),
  outcome: z.enum(['passed', 'failed', 'abstained']),
})

export const ComplianceFindingSchema = z.object({
  id: z.string(),
  type: z.enum(['risk', 'missing-doc', 'recommendation']),
  title: z.string(),
  description: z.string(),
  severity: ComplianceSeveritySchema,
  impact: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  relatedRegulations: z.array(z.string()).optional(),
})

export const ReportDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  region: z.string(),
  complianceType: ComplianceTypeSchema,
  meetingDate: z.string(),
  duration: z.number(),
  mode: MeetingModeSchema,
  location: z.string().optional(),
  reportLanguage: ReportLanguageSchema,
  status: ReportStatusSchema,
  complianceScore: z.number().min(0).max(100),
  attendees: z.array(AttendeeSchema),
  discussionLog: z.array(DiscussionEntrySchema),
  decisions: z.array(DecisionSchema),
  votes: z.array(VoteSchema),
  complianceFindings: z.array(ComplianceFindingSchema),
  createdAt: z.string(),
  summary: z.string(),
})

export type ReportDataJSON = z.infer<typeof ReportDataSchema>
