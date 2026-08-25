# AI Video Production Assistant

## Overview
AI Video Production Assistant is a front-end MVP that helps users plan an AI video production workflow based on their selected requirements.

The platform does not generate videos. It produces a personalized production plan with recommended tools, workflow guidance, alternatives, reasons, tips, and budget-aware considerations.

## MVP Status
**Done**

## Main User Flow
Landing → Requirements → Results

## Core Inputs
- Video Type
- Video Goal
- Target Platform
- Video Duration
- Experience Level
- Budget
- Production Needs

## Tech Structure
- `index.html`
- `styles.css`
- `app.js`

## Run Locally
```bash
python -m http.server 8000
```

Then open:
`http://localhost:8000`

If needed on Windows:
```bash
py -m http.server 8000
```

## Development Principle
Protect the current working MVP. Make one scoped change at a time, test the full flow, then save/commit the change.

## Privacy
Do not publish API keys, credentials, private data, or confidential implementation details.
