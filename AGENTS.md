# AGENTS.md — feat.Consulting / SIA Angel Hub

This file provides shared context for all AI agents working on this repository.
Read it before taking any action on the codebase.

---

## Project Overview

**Name:** SIA Angel Hub (`sia-angel-hub`)
**Purpose:** Marketing/landing page for SIA (Strategic Investment Academy) — a program for angel investors.
**Branch workflow:** Feature branches → `main`. Active branch: `testing-qa`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animations | Framer Motion 12 |
| Smooth scroll | Lenis 1 |
| Linting | ESLint 9 + typescript-eslint + react-hooks plugin |

---

## Project Structure

```
src/
├── main.tsx                        # Entry point
├── App.tsx                         # Mobile layout root
├── AppDesktop.tsx                  # Desktop layout root
├── components/                     # Mobile-first components
│   ├── Hero.tsx
│   ├── BackedByPeople.tsx
│   ├── BecomeInvestor.tsx
│   ├── DarkZone.tsx
│   ├── FAQSection.tsx
│   ├── FeatureCardsGrid.tsx
│   ├── FindYourPlace.tsx
│   ├── Footer.tsx
│   ├── IntroducingSIA.tsx
│   ├── InvestorCardStack.tsx
│   ├── LearningByDoing.tsx
│   ├── PlaysOutCards.tsx
│   ├── ProgramBuiltOnExperience.tsx
│   ├── ReadyNextStep.tsx
│   ├── ReviewsCarousel.tsx
│   ├── ShiftInFocus.tsx
│   ├── SmoothScroll.tsx
│   ├── StickyCountdownFooter.tsx
│   ├── TrustedByLogos.tsx
│   └── BackgroundShapes.tsx
│   └── desktop/                    # Desktop-specific components
│       ├── HeroDesktop.tsx
│       ├── HeroScrollExpansion.tsx
│       ├── BecomeTheInvestorDesktop.tsx
│       ├── FAQDesktop.tsx
│       ├── FinalCTADesktop.tsx
│       ├── FooterDesktop.tsx
│       ├── LearningByDoingDesktop.tsx
│       ├── PlaysOutDesktop.tsx
│       ├── ProgramBuiltOnExperienceDesktop.tsx
│       └── StickyCountdownFooterDesktop.tsx
└── hooks/
    ├── use-outside-click.ts
    ├── useCountdown.ts
    ├── usePreloader.ts
    ├── useScrollDirection.ts
    └── useViewport.ts

public/
└── assets_mobile/                  # Images and SVGs (mobile + desktop assets)

skills/                             # Subagent skill definitions (see below)
```

---

## Architecture Conventions

- **Dual-layout pattern:** Mobile components live in `src/components/`, desktop variants in `src/components/desktop/`. `App.tsx` and `AppDesktop.tsx` compose each layout separately. Use `useViewport` hook to detect breakpoints when needed.
- **Styling:** Tailwind CSS v4 utility classes. Do NOT mix with CSS Modules or styled-components. Avoid inline `style={{}}` for anything that Tailwind can handle.
- **Naming:** PascalCase for components and files, camelCase for hooks and utilities.
- **Hooks:** Custom hooks belong in `src/hooks/`. Extract any reusable logic from components into hooks.
- **Animation:** Use Framer Motion. Avoid raw CSS transitions for complex sequences. Be mindful of stacking contexts (`transform`, `opacity`, `filter`) that can break z-index and pointer events.
- **No routing library:** This is a single-page landing. No React Router.
- **No global state library:** Component-local state and custom hooks only.

---

## Available Subagents

Six specialized subagents live in `skills/`. Invoke them by name using the Skill tool or by delegating tasks explicitly. Each agent produces structured output designed to compose with the others.

### 1. `frontend-auditor`

**Trigger:** Before any major refactor, when technical debt is suspected, or when the codebase health is unknown.

**Responsibilities:**
- HTML semantics and landmark structure
- CSS architecture (duplication, magic numbers, specificity)
- Responsive layout fragility
- Component structure and abstraction quality
- Accessibility signals
- Performance signals (deep DOM, missing image attributes)

**Output:** Executive summary + Issue Registry + Prioritized Roadmap + Safe Refactor Strategy.

**Delegates to:** `responsive-refactorer` for layout fixes, `accessibility-semantics-reviewer` for a11y deep-dives, `architecture-standards-guardian` for structural issues.

---

### 2. `bug-hunter-debugger`

**Trigger:** When a UI bug is reported or discovered — layout breaks, interaction failures, animation conflicts, state errors, hydration mismatches.

**Responsibilities:**
- Reproduce and isolate the bug
- Classify: layout / events / state / rendering / styling / animation / hydration
- Root cause analysis (not just symptom)
- Provide minimal, targeted fix
- Prevent regressions (lint rules, similar patterns, test suggestions)

**Output:** Bug Classification → Root Cause → Fix (with code) → Why This Works → Regression Prevention.

**Works alongside:** `architecture-standards-guardian` (to verify the fix doesn't introduce structural issues).

---

### 3. `architecture-standards-guardian`

**Trigger:** After new components or hooks are written, after a PR is opened, or when reviewing recently modified files.

**Responsibilities:**
- Folder and file placement correctness
- Component single-responsibility and size
- Naming convention compliance
- Styling consistency (Tailwind-only in this project)
- Reuse opportunities (repeated UI or logic)
- Technical debt classification (🔴 Critical / 🟡 Warning / 🟢 Suggestion)
- Import structure and circular dependencies

**Output:** Architecture Review Summary + per-dimension findings + Recommended Actions (Fix Now / Next Sprint / Backlog).

**Complements:** `frontend-auditor` (broad audit) and `bug-hunter-debugger` (post-fix review).

---

### 4. `accessibility-semantics-reviewer`

**Trigger:** After UI components are written or modified, before release, or when running WCAG compliance checks.

**Responsibilities:**
- Semantic landmark usage (`<header>`, `<main>`, `<nav>`, etc.)
- Heading hierarchy (no skipped levels)
- Semantic markup vs generic `<div>`/`<span>`
- Form accessibility (labels, `aria-describedby`, fieldsets)
- Keyboard navigation and focus order
- Image `alt` attributes and SVG accessibility
- ARIA correctness (prefer native HTML first)
- Color contrast signals

**Output:** Severity-classified issues (🔴 Critical / 🟠 Major / 🟡 Minor / 🔵 Enhancement) + Quick Wins + What Is Done Well.

**Works alongside:** `frontend-auditor` (which flags a11y signals at a higher level).

---

### 5. `responsive-refactorer`

**Trigger:** When layouts break across screen sizes, when fixed pixel values are widespread, or when a mobile-first pass is needed.

**Responsibilities:**
- Diagnose: fixed px dimensions, absolute positioning, missing breakpoints, overflow issues, unscalable typography, small touch targets
- Refactor to mobile-first with `min-width` media queries
- Replace rigid layouts with Flexbox / CSS Grid / fluid units
- Use `clamp()` for responsive typography
- Eliminate fragile positioning

**Output:** Refactored code + explanation of changes + assumptions about design intent.

**Verification:** Tests at 320px, 375px, 768px, and desktop widths before finalizing.

**Coordinates with:** `ui-ux-consistency-reviewer` to preserve visual intent after layout changes.

---

### 6. `ui-ux-consistency-reviewer`

**Trigger:** When reviewing UI polish, before design handoff, after new sections are added, or when visual inconsistencies are noticed.

**Responsibilities:**
- Visual hierarchy (dominant headlines, receding secondary elements)
- Spacing rhythm (consistent gaps, section separation, padding)
- Typography balance (font sizes, weights, line length)
- CTA placement and label clarity
- Section flow and narrative coherence
- Interaction clarity (hover/focus states, feedback states)
- Component consistency (cards, icons, borders, shadows, colors)

**Output:** Severity-classified issues (🔴 Critical / 🟡 Moderate / 🟢 Minor) + Priority Action List + Positive Observations.

**Coordinates with:** `responsive-refactorer` (layout changes must preserve visual intent).

---

## Recommended Delegation Patterns

### Full QA pass before release
```
1. frontend-auditor          → identify all categories of issues
2. accessibility-semantics-reviewer → deep a11y audit
3. ui-ux-consistency-reviewer       → visual polish check
4. responsive-refactorer            → fix layout fragility
5. architecture-standards-guardian  → review all changes made
```

### Bug reported by user
```
1. bug-hunter-debugger       → diagnose and fix
2. architecture-standards-guardian → verify fix doesn't introduce debt
```

### New component or feature added
```
1. architecture-standards-guardian  → structure and naming review
2. accessibility-semantics-reviewer → a11y compliance
3. ui-ux-consistency-reviewer       → visual consistency
```

### Responsive layout broken
```
1. responsive-refactorer     → fix layout
2. ui-ux-consistency-reviewer → confirm visual intent preserved
```

---

## Key Behavioral Rules for All Agents

- **Read before editing.** Never modify a file without reading it first.
- **Minimal changes.** Fix what is asked. Do not refactor surrounding code unless it is the root cause.
- **No over-engineering.** Do not add abstractions, utilities, or config for hypothetical future needs.
- **Tailwind only.** Do not introduce CSS Modules, styled-components, or inline style objects for styling.
- **Framer Motion for animations.** Do not use raw CSS `transition`/`animation` for complex sequences.
- **Dual-layout awareness.** If touching a mobile component, check if a desktop counterpart exists in `desktop/` and vice versa.
- **No destructive git actions** without explicit user confirmation (force-push, reset --hard, amend published commits).
- **Ask before committing.** Never commit unless the user explicitly requests it.
