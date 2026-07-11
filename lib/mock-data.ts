import { Report, Attendee, DiscussionEntry, Decision, Vote, ComplianceFinding } from './types'

/**
 * Mock data for Meeting Minutes & Compliance Report Generator
 */

// Mock attendees for a sample meeting
const createAttendees = (): Attendee[] => [
  {
    id: 'att-001',
    name: 'Sarah Chen',
    role: 'CEO',
    arrivalTime: '09:00 AM',
    departureTime: '11:30 AM',
    status: 'present',
  },
  {
    id: 'att-002',
    name: 'Michael Torres',
    role: 'CFO',
    arrivalTime: '09:05 AM',
    departureTime: '11:30 AM',
    status: 'present',
  },
  {
    id: 'att-003',
    name: 'Jennifer Park',
    role: 'Chief Legal Officer',
    arrivalTime: '09:00 AM',
    departureTime: '11:25 AM',
    status: 'present',
  },
  {
    id: 'att-004',
    name: 'David Okonkwo',
    role: 'Compliance Officer',
    arrivalTime: '09:10 AM',
    departureTime: '11:30 AM',
    status: 'present',
  },
  {
    id: 'att-005',
    name: 'Rachel Martinez',
    role: 'Head of Operations',
    arrivalTime: '09:00 AM',
    departureTime: '10:45 AM',
    status: 'present',
  },
  {
    id: 'att-006',
    name: 'James Wilson',
    role: 'IT Director',
    arrivalTime: '09:15 AM',
    departureTime: '11:30 AM',
    status: 'late',
  },
  {
    id: 'att-007',
    name: 'Lisa Chen',
    role: 'Risk Manager',
    arrivalTime: '09:00 AM',
    departureTime: '11:30 AM',
    status: 'present',
  },
]

// Mock discussion entries
const createDiscussionLog = (): DiscussionEntry[] => [
  {
    id: 'disc-001',
    speaker: 'Sarah Chen',
    role: 'CEO',
    timestamp: '09:02 AM',
    text: 'Good morning everyone. Thanks for joining our quarterly compliance review. We have a full agenda today covering SOX requirements, data governance, and upcoming regulatory changes.',
    sentiment: 'neutral',
  },
  {
    id: 'disc-002',
    speaker: 'Jennifer Park',
    role: 'Chief Legal Officer',
    timestamp: '09:08 AM',
    text: 'I wanted to start by highlighting the recent changes to GDPR enforcement. The EU has issued new guidance on data retention that will affect our European operations.',
    sentiment: 'neutral',
  },
  {
    id: 'disc-003',
    speaker: 'David Okonkwo',
    role: 'Compliance Officer',
    timestamp: '09:15 AM',
    text: 'We\'ve already begun implementing the new data retention policies. However, we\'re still working on updating our documentation to fully align with the guidance. Expected completion: end of Q2.',
    sentiment: 'neutral',
  },
  {
    id: 'disc-004',
    speaker: 'Michael Torres',
    role: 'CFO',
    timestamp: '09:22 AM',
    text: 'What are the financial implications of this delay? Do we need to set aside additional budget for compliance remediation?',
    sentiment: 'negative',
  },
  {
    id: 'disc-005',
    speaker: 'David Okonkwo',
    role: 'Compliance Officer',
    timestamp: '09:28 AM',
    text: 'We estimate around $150K for documentation updates and $50K for staff training. This is already factored into our annual compliance budget.',
    sentiment: 'positive',
  },
  {
    id: 'disc-006',
    speaker: 'James Wilson',
    role: 'IT Director',
    timestamp: '09:35 AM',
    text: 'On the infrastructure side, we\'ve completed the security audit. All critical findings have been resolved. We have 12 medium-priority items remaining for Q3.',
    sentiment: 'positive',
  },
  {
    id: 'disc-007',
    speaker: 'Lisa Chen',
    role: 'Risk Manager',
    timestamp: '09:42 AM',
    text: 'Good work on the security front. However, I\'m concerned about our third-party vendor assessment program. We haven\'t updated vendor security evaluations in over a year.',
    sentiment: 'negative',
  },
  {
    id: 'disc-008',
    speaker: 'Rachel Martinez',
    role: 'Head of Operations',
    timestamp: '09:50 AM',
    text: 'We\'re in the process of consolidating our vendor list. Once that\'s complete, we can establish a regular reassessment schedule. Should be done by end of May.',
    sentiment: 'neutral',
  },
  {
    id: 'disc-009',
    speaker: 'Jennifer Park',
    role: 'Chief Legal Officer',
    timestamp: '09:58 AM',
    text: 'Sarah, I want to raise an item about our incident response procedures. With recent regulatory scrutiny, I think we should conduct a third-party review of our IR plan.',
    sentiment: 'neutral',
  },
  {
    id: 'disc-010',
    speaker: 'Sarah Chen',
    role: 'CEO',
    timestamp: '10:05 AM',
    text: 'That\'s a good idea. David, can you get quotes from external firms for an incident response plan audit? Budget is not a constraint for this one.',
    sentiment: 'positive',
  },
]

// Mock decisions
const createDecisions = (): Decision[] => [
  {
    id: 'dec-001',
    type: 'decision',
    subject: 'Implement new data retention policy',
    fact: 'New GDPR enforcement guidance requires updated data handling procedures',
    nextSteps: 'David to update documentation; completion by end of Q2',
    owner: 'David Okonkwo',
    dueDate: 'June 30, 2025',
  },
  {
    id: 'dec-002',
    type: 'unresolved',
    subject: 'Medium-priority IT security items',
    fact: '12 medium-priority findings from security audit require remediation',
    nextSteps: 'James to provide detailed timeline and resource plan by April 15',
    owner: 'James Wilson',
    dueDate: 'April 15, 2025',
  },
  {
    id: 'dec-003',
    type: 'tension',
    subject: 'Third-party vendor assessment discrepancy',
    fact: 'Last vendor security evaluations were conducted over a year ago',
    nextSteps: 'Rachel to complete vendor consolidation; reassessment schedule TBD',
    owner: 'Rachel Martinez',
    dueDate: 'May 31, 2025',
  },
  {
    id: 'dec-004',
    type: 'projection',
    subject: 'Third-party incident response plan audit',
    fact: 'CEO has approved budget for external audit of IR procedures',
    nextSteps: 'David to gather RFPs from external firms; review by May 1',
    owner: 'David Okonkwo',
    dueDate: 'May 1, 2025',
  },
]

// Mock vote
const createVotes = (): Vote[] => [
  {
    id: 'vote-001',
    question: 'Approve the updated incident response procedures for Q2 implementation?',
    date: 'March 18, 2025',
    results: [
      { option: 'Yes', count: 7 },
      { option: 'No', count: 0 },
      { option: 'Abstain', count: 0 },
    ],
    outcome: 'passed',
  },
]

// Mock compliance findings
const createComplianceFindings = (): ComplianceFinding[] => [
  {
    id: 'comp-001',
    type: 'risk',
    title: 'Outdated vendor security assessments',
    description: 'Critical vendors have not been reassessed for security compliance in over 12 months.',
    severity: 'high',
    impact: 85,
    confidence: 95,
    relatedRegulations: ['SOX', 'GDPR', 'ISO27001'],
  },
  {
    id: 'comp-002',
    type: 'missing-doc',
    title: 'Incident response plan audit pending',
    description: 'External third-party review of incident response procedures not yet completed.',
    severity: 'medium',
    impact: 72,
    confidence: 100,
    relatedRegulations: ['ISO27001', 'NIST'],
  },
  {
    id: 'comp-003',
    type: 'recommendation',
    title: 'Enhance audit logging',
    description: 'Implement centralized audit logging for all critical systems to improve SOX compliance monitoring.',
    severity: 'medium',
    impact: 65,
    confidence: 80,
    relatedRegulations: ['SOX'],
  },
  {
    id: 'comp-004',
    type: 'risk',
    title: 'GDPR documentation gaps',
    description: 'Data handling procedures not fully aligned with updated EU guidance. Remediation in progress.',
    severity: 'high',
    impact: 78,
    confidence: 90,
    relatedRegulations: ['GDPR'],
  },
  {
    id: 'comp-005',
    type: 'recommendation',
    title: 'Quarterly compliance training refresh',
    description: 'Implement mandatory quarterly compliance training updates for all staff, especially those handling sensitive data.',
    severity: 'low',
    impact: 45,
    confidence: 75,
    relatedRegulations: ['GDPR', 'CCPA', 'HIPAA'],
  },
  {
    id: 'comp-006',
    type: 'missing-doc',
    title: 'Data Privacy Impact Assessment (DPIA)',
    description: 'Complete DPIA for new customer analytics platform currently in development.',
    severity: 'high',
    impact: 88,
    confidence: 95,
    relatedRegulations: ['GDPR'],
  },
]

// Create a single full report
export const createSampleReport = (overrides?: Partial<Report>): Report => ({
  id: 'report-001',
  title: 'Q1 2025 Compliance Review Meeting',
  company: 'TechCorp Industries',
  region: 'US',
  complianceType: 'SOX',
  meetingDate: 'March 18, 2025',
  duration: 150,
  mode: 'hybrid',
  location: 'San Francisco, CA - Conference Room A',
  reportLanguage: 'English',
  status: 'needs-review',
  complianceScore: 72,
  attendees: createAttendees(),
  discussionLog: createDiscussionLog(),
  decisions: createDecisions(),
  votes: createVotes(),
  complianceFindings: createComplianceFindings(),
  createdAt: '2025-03-18T14:30:00Z',
  summary:
    'Quarterly compliance review covering GDPR updates, SOX requirements, security audit results, and vendor management. Key decisions include implementing new data retention policies, auditing incident response procedures, and completing vendor security reassessments.',
  ...overrides,
})

// Mock reports for dashboard
export const mockReports: Report[] = [
  createSampleReport({
    id: 'report-001',
    title: 'Q1 2025 Compliance Review Meeting',
    meetingDate: 'March 18, 2025',
    complianceScore: 72,
    status: 'needs-review',
  }),
  createSampleReport({
    id: 'report-002',
    title: 'Q4 2024 Board Meeting - Financial Review',
    company: 'TechCorp Industries',
    complianceType: 'GDPR',
    meetingDate: 'December 15, 2024',
    complianceScore: 88,
    status: 'compliant',
  }),
  createSampleReport({
    id: 'report-003',
    title: 'Q3 2024 Data Security Audit Debrief',
    company: 'TechCorp Industries',
    complianceType: 'ISO27001',
    meetingDate: 'September 28, 2024',
    complianceScore: 81,
    status: 'compliant',
  }),
  createSampleReport({
    id: 'report-004',
    title: 'Q2 2024 GDPR Implementation Review',
    company: 'TechCorp Industries',
    complianceType: 'GDPR',
    meetingDate: 'June 10, 2024',
    complianceScore: 64,
    status: 'at-risk',
  }),
  createSampleReport({
    id: 'report-005',
    title: 'Q1 2024 Compliance Strategy Meeting',
    company: 'TechCorp Industries',
    complianceType: 'SOX',
    meetingDate: 'March 5, 2024',
    complianceScore: 75,
    status: 'compliant',
  }),
]

/**
 * Utility functions
 */

export const getReportById = (id: string): Report | undefined => {
  return mockReports.find((report) => report.id === id)
}

export const getStatusColor = (status: Report['status']): string => {
  switch (status) {
    case 'compliant':
      return 'bg-green-100 text-green-900'
    case 'needs-review':
      return 'bg-amber-100 text-amber-900'
    case 'at-risk':
      return 'bg-red-100 text-red-900'
    default:
      return 'bg-gray-100 text-gray-900'
  }
}

export const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-red-600'
}

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-100 text-red-900'
    case 'high':
      return 'bg-orange-100 text-orange-900'
    case 'medium':
      return 'bg-amber-100 text-amber-900'
    case 'low':
      return 'bg-blue-100 text-blue-900'
    default:
      return 'bg-gray-100 text-gray-900'
  }
}

export const getDecisionTypeColor = (type: string): string => {
  switch (type) {
    case 'decision':
      return 'bg-green-50 border-l-4 border-green-500'
    case 'unresolved':
      return 'bg-amber-50 border-l-4 border-amber-500'
    case 'tension':
      return 'bg-red-50 border-l-4 border-red-500'
    case 'projection':
      return 'bg-purple-50 border-l-4 border-purple-500'
    default:
      return 'bg-gray-50 border-l-4 border-gray-500'
  }
}

export const getRoleColor = (role: string): string => {
  const roles: Record<string, string> = {
    CEO: 'bg-blue-100 text-blue-900',
    CFO: 'bg-purple-100 text-purple-900',
    'Chief Legal Officer': 'bg-indigo-100 text-indigo-900',
    'Compliance Officer': 'bg-green-100 text-green-900',
    'Head of Operations': 'bg-orange-100 text-orange-900',
    'IT Director': 'bg-red-100 text-red-900',
    'Risk Manager': 'bg-pink-100 text-pink-900',
  }
  return roles[role] || 'bg-gray-100 text-gray-900'
}
