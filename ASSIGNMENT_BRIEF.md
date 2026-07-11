# Assignment Brief: AI-Powered Meeting Management Platform

This document outlines the scope of your take-home assignment, details what has already been built, and guides you on what is left to implement, test, and submit.

---

## 1. Project Overview

The objective of this assignment is to build a core pipeline of the **AI-Powered Meeting Minutes & Compliance Report Platform**:
1. **Input**: A raw, messy meeting transcript (e.g., the provided French works-council meeting transcript `CSE_Rockefeller_..._raw_transcription_.docx`).
2. **AI Processing**: Send the transcript to an LLM using a structured prompt to convert it into a standardized compliance report schema.
3. **Interactive UI**: Render the generated structured data into a polished web application matching the provided design tokens and components library (`Report_Design_Template_Blue.html`) with your own creative improvements.
4. **Compliance Dashboard**: View aggregate compliance statuses, scores, risks, and missing documents across reports.

---

## 2. What Has Been Built So Far

The codebase is structured as a **Next.js (App Router) + TypeScript** application. The following parts are already implemented:

- **Dashboard Home (`app/page.tsx`)**: Displays a grid of available reports using the mock data.
- **Compliance Dashboard (`app/compliance/page.tsx`)**: Displays aggregate compliance statistics (overall score, total reports, risks, missing documents) and tabs with searchable/filterable findings.
- **Report Details Viewer (`app/report/[id]/page.tsx`)**: Page-based report viewer with a table of contents sidebar, covering details, attendee status, discussion log (speaker bubbles), decisions, votes, and findings.
- **UI Components**:
  - `components/report/`: Includes components like `AlertCallout.tsx`, `ComplianceSummary.tsx`, `ReportSidebar.tsx`, `SpeakerBubble.tsx`, and `VoteBlock.tsx`.
  - `components/report/sections/`: Contains the actual page blocks: `AttendanceTable.tsx`, `ComplianceFindings.tsx`, `CoverPage.tsx`, `Decisions.tsx`, `DiscussionLog.tsx`, and `VotingResults.tsx`.
- **Type Definitions (`lib/types.ts`)**: Defines the unified TypeScript interfaces representing a `Report`, `Attendee`, `DiscussionEntry`, `Decision`, `Vote`, and `ComplianceFinding`.
- **Mock Data (`lib/mock-data.ts`)**: Provides sample data so you can test all page renders and UI sections locally immediately.

---

## 3. What is Left to Build (Your Task List)

To complete the pipeline, you need to implement the following features:

### 1. The AI Integration Endpoint (`app/api/generate-report/route.ts`)
- **Action**: Create a server-side route that accepts the transcript text and metadata (company, date, region, compliance type).
- **LLM Call**: Use your choice of LLM API (Gemini, Claude, OpenAI) to process the raw transcript.
- **Structured JSON**: Instruct the LLM to output a JSON object adhering exactly to the `ReportData` structure defined in `lib/types.ts`.

### 2. Validation & Schema (`lib/schema.ts` & `lib/prompt.ts`)
- **Zod Schema**: Write a Zod schema in `lib/schema.ts` to validate the JSON response from the LLM.
- **Prompt Engineering**: Write a solid system prompt in `lib/prompt.ts` that handles messy transcripts (e.g. French legal terms, typos, speaker identifiers) and outputs valid JSON.

### 3. Wire Up the Form (`components/forms/NewReportForm.tsx`)
- **Action**: Replace the simulated timeout/mock data block in the `handleSubmit` function of `NewReportForm.tsx` with a real `fetch` call to `/api/generate-report`.
- **State Management**: Update the application state (e.g., storing the generated report or displaying it to the user).

### 4. Support File Upload (Optional but Recommended)
- **Action**: Add basic file-parsing capability in the upload section of `NewReportForm.tsx` (reading text from uploaded `.txt` or `.docx` files) to feed the transcript to the AI pipeline.

### 5. Creative Elevation & Styling Polish
- **Creativity**: Restyle/improve the base design of the report viewer to look exceptionally premium (e.g., adding smooth transitions using `framer-motion`, improving typography, adding a dark-mode toggle, or elevating the sidebar/navigation layout).

---

## 4. What to Submit

When submitting the assignment, ensure you include:
1. **Source Code**: The updated Next.js codebase.
2. **API configuration**: A clean `.env.example` file showing what environment variables are needed.
3. **Detailed README.md**: Complete the template README in the root with your model choice, a link to the live app/demo, and an overview of your creative choices.
4. **Brief Project Report**: Write down any architectural decisions, LLM prompt techniques used, and how you handled long transcripts or API limits.
