# AI Video Production Assistant — Approved Project Decisions

This file is the source of truth for approved MVP decisions.

## Product Purpose
Help users plan an AI-generated video production workflow.

The product does **not** generate the final video.

## Target User
Working hypothesis: beginner or early-stage AI content creators.
Do not present this as validated research unless evidence exists.

## Approved Inputs
### Video Type
- Educational
- Marketing
- Social Media
- Storytelling

### Video Goal
- Educate
- Promote
- Engage
- Explain

### Target Platform
- YouTube
- TikTok
- Instagram
- Other

### Video Duration
- Short
- Medium
- Long

### Experience Level
- Beginner
- Intermediate

### Budget
- Free
- Low
- Flexible

### Production Needs
- Script
- Images
- Video Generation
- Voice
- Music
- Editing

## Approved Tool Set
### Script
- ChatGPT
- Claude

### Images
- Midjourney
- Leonardo AI

### Video Generation
- Veo 3.1
- Seedance 2.0
- Runway Gen-4.5
- Luma Ray 3.2

### Voice
- ElevenLabs
- CapCut Voice

### Music
- Suno
- Udio

### Editing
- CapCut
- Descript

## Verification Rule
Current pricing, access, free tiers, availability, and commercial-use conditions must be verified before being presented as current facts.

## MVP Scope
- Front-end only
- Guest access
- No login/authentication
- No accounts
- No backend
- No database
- No persistent history
- No PDF generation
- No email
- No save feature
- No payment
- No admin panel
- No video generation
- No media hosting
- Local recommendation logic only

## Approved Screens
1. Landing
2. Requirements
3. Results

## Recommendation Logic Priority
Production Needs > Budget > Video Type/Goal > Platform > Duration > Experience > Tool-specific rules

## Core Recommendation Rules
### Production Needs
Only recommend categories selected by the user.

### Budget
**Free**
- Prioritize currently usable free options.
- If no suitable free option exists, state that a paid option is required.

**Low**
- Prioritize free, freemium, and low-cost tools.

**Flexible**
- Prioritize suitability over price.

### Experience
**Beginner**
- Simpler workflow
- Fewer tools
- Lower complexity

**Intermediate**
- Advanced control can be recommended when relevant.

### Video Type / Goal
**Educational / Explain**
- Prioritize Script, Voice, and Editing when selected.

**Marketing / Promote**
- Prioritize visual quality, messaging, editing, and commercial-use suitability within selected categories.

**Social Media / Engage**
- Prefer a fast, simplified workflow.
- Use short-form and vertical guidance for TikTok and Instagram.

**Storytelling**
- Prioritize coherent Script, visual consistency, Video, Voice, and Music when selected.

### Platform
**TikTok / Instagram**
- Vertical
- Short-form
- Concise pacing

**YouTube**
- Horizontal and longer-form guidance when relevant.

**Other**
- Platform-neutral guidance.

### Duration
**Short**
- Compact workflow.

**Medium**
- Standard workflow.

**Long**
- Add guidance for scripting, scenes, consistency, and editing.
- Never assume one AI model generates the full long video in one generation.

## Tool-Specific Rules
### Veo 3.1
Use when native generated audio benefits the workflow. Verify current access/pricing.

### Seedance 2.0
Use when multi-reference, multi-shot, or combined-media workflows are relevant. Verify current access/pricing.

### Runway Gen-4.5
Use for Intermediate users needing more scene/motion/composition control when budget allows. Verify current access/pricing.

### Luma Ray 3.2
Use as an alternative for transformation, continuity, or video-to-video workflows. Do not automatically position it as Beginner or Low Budget. Verify current access/pricing.

## Approved UI
### Landing
Headline: **Plan your AI video workflow faster**

Primary CTA: **Start Planning**

Secondary CTA: **View Sample Plan**

Value cards:
- Tool Recommendations
- Workflow Guidance
- Budget-Aware Alternatives

### Requirements
Heading: **Create your plan**

Supporting line: **Tell us about your video**

CTA: **Generate Plan**

### Results
Heading: **Your production plan**

May include:
- Summary chips
- Workflow
- Recommended tools
- Alternatives
- Reasons
- Tips
- Budget guidance

Actions:
- Refine Plan
- Start Over

## Approved Working Flow
- Landing loads
- Start Planning → Requirements
- Form selections work
- Generate Plan enables when requirements are complete
- Generate Plan → personalized Results
- Refine Plan → Requirements with selections retained
- Start Over → Landing
- View Sample Plan → Sample Results

## Change Control
For every change:
1. Keep scope narrow.
2. Modify only what is necessary.
3. Test Landing → Requirements → Results.
4. Test Refine Plan.
5. Test Start Over.
6. Test Sample Plan.
7. Confirm no regression.

## Current Status
**MVP = Done**
