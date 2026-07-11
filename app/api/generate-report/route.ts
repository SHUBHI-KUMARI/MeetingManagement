import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { REPORT_GENERATION_SYSTEM_PROMPT, getReportUserPrompt } from '@/lib/prompt'
import { ReportDataSchema } from '@/lib/schema'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { transcript, company, region, complianceType, meetingDate, duration, reportLanguage } = body

    if (!transcript) {
      return NextResponse.json({ error: 'Transcript is required' }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY environment variable is not set.' },
        { status: 500 }
      )
    }

    // Initialize Groq SDK
    const groq = new Groq({ apiKey })

    const systemInstruction = REPORT_GENERATION_SYSTEM_PROMPT
    const prompt = getReportUserPrompt(transcript, {
      company: company || 'Acme Corp',
      region: region || 'US',
      complianceType: complianceType || 'SOX',
      meetingDate: meetingDate || new Date().toISOString().split('T')[0],
      duration: duration || '60',
      reportLanguage: reportLanguage || 'English',
    })

    // Call Groq API with Llama-3.3-70b and JSON mode enabled
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: prompt },
      ],
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      temperature: 0.1, // low temperature for precise, compliant extraction
    })

    const text = response.choices[0]?.message?.content
    if (!text) {
      return NextResponse.json({ error: 'Failed to generate content from Groq model' }, { status: 500 })
    }

    // Parse the JSON output
    let jsonData
    try {
      jsonData = JSON.parse(text)
    } catch (parseError) {
      console.error('Failed to parse model output as JSON:', text)
      return NextResponse.json({ error: 'AI output was not valid JSON' }, { status: 500 })
    }

    // Validate against our Zod schema
    const parsedData = ReportDataSchema.safeParse(jsonData)
    if (!parsedData.success) {
      console.error('Validation errors:', parsedData.error.format())
      return NextResponse.json(
        { error: 'AI output did not match the required schema', details: parsedData.error.format() },
        { status: 500 }
      )
    }

    // Save report to the local file-based database
    const { saveReport } = require('@/lib/db')
    saveReport(parsedData.data)

    return NextResponse.json(parsedData.data)
  } catch (error: any) {
    console.error('Error in generate-report endpoint:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
