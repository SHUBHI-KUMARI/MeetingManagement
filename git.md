# macOS Git History Migration Guide


This guide contains the step-by-step macOS terminal commands to recreate your project's visual overhauls across **8 sequential commits** spanning **July 10 to July 12 (concluding at 5:30 PM IST)**.


---


### Preparation
1. Create a new repository on your other GitHub account.
2. Open terminal on your Mac, clone the new repository, and navigate into it:
   ```bash
   git clone <YOUR_NEW_PLACEHOLDER_REPO_URL>
   cd meeting-minutes-generator
   ```


---


### Migration Commands (Bash/Zsh)


#### Commit 1: Initial Route Setup & Scaffolding
* **Date**: July 10, 2026, 10:00 AM IST
* **Goal**: Move dashboard page and prepare routes.
* **Commands**:
  ```bash
  # 1. Stage route files
  git add app/page.tsx
  git add app/dashboard/page.tsx
 
  # 2. Commit with custom dates
  GIT_COMMITTER_DATE="2026-07-10T10:00:00" git commit -m "chore: setup dashboard routing and directory structures" --date="2026-07-10T10:00:00"
  ```


#### Commit 2: Landing Page Layout Scaffolding
* **Date**: July 10, 2026, 04:00 PM IST
* **Goal**: Add Google fonts configurations and layout styling structure.
* **Commands**:
  ```bash
  # 1. Stage layout & global styling assets
  git add app/globals.css
  git add app/page.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-10T16:00:00" git commit -m "feat: integrate Plus Jakarta Sans font and layout margins" --date="2026-07-10T16:00:00"
  ```


#### Commit 3: Marketing Landing Canvas Artwork
* **Date**: July 11, 2026, 09:30 AM IST
* **Goal**: Render the mockup illustration graphic and decorative details on landing page.
* **Commands**:
  ```bash
  # 1. Stage landing page canvas artwork
  git add app/page.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-11T09:30:00" git commit -m "feat: design marketing canvas, vector device mockup, and floral graphics" --date="2026-07-11T09:30:00"
  ```


#### Commit 4: Dashboard Reports List Overhaul
* **Date**: July 11, 2026, 02:00 PM IST
* **Goal**: Refine report cards with SVG percentage wheels and status badges.
* **Commands**:
  ```bash
  # 1. Stage dashboard components and header links
  git add components/dashboard/ReportCard.tsx
  git add components/dashboard/EmptyState.tsx
  git add components/layout/TopNav.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-11T14:00:00" git commit -m "refactor: redesign dashboard list cards, SVG progress wheels, and status pills" --date="2026-07-11T14:00:00"
  ```


#### Commit 5: Guided Stepper Wizard Page
* **Date**: July 11, 2026, 06:30 PM IST
* **Goal**: Visual setup of Step 1 (Upload transcript) and Step 2 (Metadata settings).
* **Commands**:
  ```bash
  # 1. Stage stepper wizard assets
  git add app/new/page.tsx
  git add components/forms/NewReportForm.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-11T18:30:00" git commit -m "feat: design new report stepper wizard with transcript drag-drop area" --date="2026-07-11T18:30:00"
  ```


#### Commit 6: Report Viewer Layout & Score Gauges
* **Date**: July 12, 2026, 10:00 AM IST
* **Goal**: Overhaul report cover page, scroll-spy TOC sidebar, and radial index meter.
* **Commands**:
  ```bash
  # 1. Stage viewer structure components
  git add app/report/[id]/page.tsx
  git add components/report/ReportSidebar.tsx
  git add components/report/sections/CoverPage.tsx
  git add components/report/ComplianceSummary.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-12T10:00:00" git commit -m "feat: redesign report viewer structural sidebar and circular compliance score meters" --date="2026-07-12T10:00:00"
  ```


#### Commit 7: Report Dialogue Bubbles & Decisions Callouts
* **Date**: July 12, 2026, 02:00 PM IST
* **Goal**: Restyle speaker balloons, attendance checks, and left-bordered alert blocks.
* **Commands**:
  ```bash
  # 1. Stage report child widgets
  git add components/report/sections/AttendanceTable.tsx
  git add components/report/sections/DiscussionLog.tsx
  git add components/report/SpeakerBubble.tsx
  git add components/report/AlertCallout.tsx
  git add components/report/sections/Decisions.tsx
  git add components/report/sections/VotingResults.tsx
  git add components/report/VoteBlock.tsx
  git add components/report/sections/ComplianceFindings.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-12T14:00:00" git commit -m "feat: design custom conversation balloons, decision callouts, and vote tally charts" --date="2026-07-12T14:00:00"
  ```


#### Commit 8: Compliance Risk Dashboard & Submit Genie Animation
* **Date**: July 12, 2026, 05:30 PM IST
* **Goal**: Rework compliance dashboard tabs and include custom vanishing genie submit effect on forms.
* **Commands**:
  ```bash
  # 1. Stage compliance dashboard and form genie transitions
  git add app/compliance/page.tsx
  git add components/forms/NewReportForm.tsx
 
  # 2. Commit
  GIT_COMMITTER_DATE="2026-07-12T17:30:00" git commit -m "feat: design compliance risks summary tables and integrate vanishing genie submit transitions" --date="2026-07-12T17:30:00"
  ```


---


### Pushing to remote repository
```bash
# 1. Set the remote to your new placeholder repository
git remote set-url origin <YOUR_NEW_PLACEHOLDER_REPO_URL>


# 2. Push changes to GitHub
git push -u origin main --force
```



