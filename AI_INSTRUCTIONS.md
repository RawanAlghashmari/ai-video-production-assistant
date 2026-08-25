# AI Development Instructions

Use these instructions when asking Claude Code, Copilot, or another coding assistant to modify the AI Video Production Assistant.

## Core Rule
Protect the existing working MVP.

## Before Editing
Read:
1. `README.md`
2. `PROJECT_DECISIONS.md`
3. Relevant source files

Treat `PROJECT_DECISIONS.md` as the source of truth.

## Modification Rules
- Make only the requested change.
- Do not redesign unrelated sections.
- Do not expand scope.
- Do not add backend, database, authentication, accounts, payments, storage, or new features unless explicitly requested.
- Do not replace working recommendation logic unless explicitly requested.
- Do not rename files unnecessarily.
- Do not change approved wording unless the task requires it.
- Do not introduce unnecessary libraries or frameworks.
- Prefer the simplest implementation that preserves current behavior.

## Privacy & Security
Never expose or commit:
- API keys
- Tokens
- Passwords
- Credentials
- Private data
- Confidential project information

## Testing Requirement
After every meaningful change, verify:
1. Landing page loads.
2. Start Planning opens Requirements.
3. Form selections work.
4. Generate Plan activates correctly.
5. Generate Plan produces Results.
6. Refine Plan retains selections.
7. Start Over returns to Landing.
8. View Sample Plan works.
9. Existing styling is not unintentionally broken.
10. No new browser-console errors are introduced.

## Preferred Task Format
### Task
Describe one specific change.

### Context
Explain only the relevant existing behavior.

### Approved Decisions
List constraints that matter.

### Required Output
State exactly what should change.

### Constraints
- Preserve existing working logic.
- Modify only necessary files.
- No scope expansion.
- No unnecessary dependencies.

### Definition of Done
State the exact behavior that must work after the change.

## Example
### Task
Improve the Results screen spacing on mobile.

### Context
The MVP is already working across Landing, Requirements, and Results.

### Approved Decisions
Do not change recommendation logic or content structure.

### Required Output
Improve mobile spacing and readability only on the Results screen.

### Constraints
- Do not redesign the page.
- Do not modify `app.js` unless required.
- Preserve desktop layout.
- Do not add dependencies.

### Definition of Done
- Results content is readable on mobile.
- No horizontal overflow.
- Recommendation logic is unchanged.
- Landing, Requirements, Refine Plan, Start Over, and Sample Plan still work.
