# AGENTS.md

## Purpose

This file defines the operating rules for AI coding agents working on the N S H D portfolio.

Before changing code, read this file and `DESIGN.md` completely. Treat both as repository-level instructions.

- `AGENTS.md` governs engineering, architecture, quality, workflow, and safety.
- `DESIGN.md` governs visual language, interaction design, motion, layout, accessibility, and responsive behavior.

When the two files overlap, satisfy both. Do not silently ignore a rule because a task is large.

## Project identity

This is the personal portfolio of **N S H D**, positioned at the intersection of design, AI, code, creative technology, and pharmaceutical science.

The experience should feel authored, premium, experimental, cinematic, and technically polished. It must not regress into a generic developer portfolio, SaaS landing page, dashboard, template, or component-library demo.

## Current stack

- Next.js App Router
- React
- TypeScript
- Framer Motion
- Lenis smooth scrolling
- Lucide React icons
- CSS visual system in `app/globals.css`

Use the existing stack first. Do not add a dependency when the same result can be achieved cleanly with the current stack or native browser APIs.

## Repository map

Important files and directories:

- `app/page.tsx` — homepage entry
- `app/layout.tsx` — metadata and root layout
- `app/globals.css` — primary visual system and responsive CSS
- `app/work/` — project/case-study routes
- `components/` — reusable UI and portfolio sections
- `data/projects.ts` — project data and case-study content
- `data/site.ts` — site/profile/social data
- `public/` — media and static assets

Prefer data-driven changes in `data/` over hard-coding repeated content inside components.

## Required workflow

For every meaningful change:

1. Inspect the relevant existing files before editing.
2. Understand current behavior before replacing it.
3. Preserve working functionality unless the task explicitly changes it.
4. Reuse established patterns where they remain appropriate.
5. Keep edits scoped and internally consistent.
6. Check mobile behavior, not only desktop.
7. Check touch interactions, reduced motion, keyboard navigation, and focus states.
8. Run or reason through the production build after significant changes.
9. Resolve TypeScript, runtime, hydration, layout, and obvious accessibility issues introduced by the change.

Never claim something was tested if it was not actually tested.

## Mobile-first rule

The portfolio must be fully usable on a phone without requiring a hardware keyboard, hover, right-click, mouse wheel, desktop-only cursor tricks, or PC control keys.

Every primary interaction must have a clear touch equivalent.

On touch devices:

- use comfortable tap targets;
- prevent accidental activation;
- avoid interactions that depend exclusively on hover;
- avoid dense tiny controls;
- prevent horizontal overflow unless an intentional horizontal experience is clearly signposted;
- respect safe areas;
- keep overlays dismissible;
- keep critical controls reachable with one hand when practical;
- avoid scroll traps;
- maintain smooth scrolling even on mid-range Android devices.

## Performance

Visual ambition must not come at the cost of an unstable page.

Prefer:

- transform and opacity animations;
- requestAnimationFrame-compatible effects;
- lazy or deferred non-critical work;
- intersection-based activation;
- CSS where appropriate;
- memoization only when it materially helps;
- small DOM footprints;
- responsive media;
- cleanup for observers, timers, listeners, animation frames, and subscriptions.

Avoid:

- continuous React state updates on scroll when not necessary;
- forced synchronous layout loops;
- large unbounded particle counts;
- many simultaneous backdrop filters;
- expensive blur layers covering the full viewport;
- animating layout-heavy properties continuously;
- duplicated global event listeners;
- runaway timers;
- unbounded arrays or generated DOM;
- autoplay media that wastes bandwidth or battery.

A decorative feature may be reduced or disabled on weaker/mobile devices if necessary to maintain responsiveness.

## Motion engineering

Use Framer Motion when it improves clarity, choreography, or interaction quality. Use CSS for simple state transitions.

Motion should have purpose: reveal hierarchy, clarify cause/effect, provide tactile feedback, or create atmosphere.

Respect `prefers-reduced-motion`. Reduced-motion mode must remain visually complete and fully usable.

Do not stack animation systems in ways that fight each other. Coordinate Lenis, Framer Motion, native scrolling, and observers carefully.

## Interaction quality

Interactive elements must:

- communicate that they are interactive;
- provide immediate feedback;
- have stable hit areas;
- not jump unexpectedly;
- not block scrolling without a strong reason;
- support keyboard access where semantically relevant;
- restore focus sensibly after dialogs/overlays;
- preserve browser back/forward behavior.

Use semantic HTML before building custom interaction primitives.

## Accessibility

Maintain strong contrast and readable typography.

Required practices:

- semantic landmarks and headings;
- meaningful alt text where an image conveys content;
- empty alt text for purely decorative imagery;
- labels or accessible names for icon-only controls;
- visible focus states;
- keyboard-accessible actionable elements;
- no essential meaning conveyed by color alone;
- motion alternatives;
- adequate touch-target sizes;
- no flashing/strobing effects.

Do not sacrifice accessibility for cinematic styling.

## CSS and styling

Respect `DESIGN.md` as the visual source of truth.

Prefer reusable custom properties/tokens for repeated visual values. Avoid one-off magic numbers when a shared token makes sense.

When adding a new visual pattern:

- check whether an existing pattern can be extended;
- keep naming meaningful;
- ensure light/dark assumptions match the portfolio's intended visual system;
- add responsive behavior at the same time, not later.

Do not introduce Tailwind, a new CSS framework, or a UI kit unless explicitly requested.

## React and Next.js

Follow App Router conventions.

Keep server components as server components unless client behavior is actually required. Add `"use client"` only where necessary.

Avoid hydration differences between server and client. Browser-only APIs must be guarded or placed in client components/effects.

Use stable keys. Avoid effects that mirror derivable render state.

Do not create unnecessary global state.

Use Next.js metadata, routing, image handling, and platform conventions when appropriate.

## Content integrity

Do not invent qualifications, awards, employment history, client work, metrics, testimonials, or personal achievements.

Existing project names, descriptions, social links, images, and credits should not be silently replaced.

When improving copy, preserve factual meaning unless explicitly asked to rewrite or expand it.

## Project media

Treat media as portfolio evidence, not decoration.

- Keep project screenshots sharp.
- Preserve aspect ratio unless an intentional crop is clearly better.
- Do not stretch images.
- Avoid excessive compression.
- Lazy-load below-the-fold media when appropriate.
- Keep image interactions touch-friendly.
- Avoid visual effects that make the project itself difficult to inspect.

## External links

External links must be valid and deliberate.

For links opening a new tab, use appropriate security attributes.

Do not add tracking, analytics, ads, affiliate links, or external embeds unless explicitly requested.

## Dependency policy

Before adding a package, ask:

1. Can this be implemented with the current stack?
2. Is the package maintained and reasonably sized?
3. Does it create unnecessary client JavaScript?
4. Does it duplicate Framer Motion, Lenis, Lucide, or native functionality?

Do not upgrade major framework versions as a side effect of an unrelated task.

## Stability rules

Never knowingly leave:

- broken imports;
- invalid JSX/TSX;
- missing referenced assets;
- dead navigation;
- inaccessible overlays;
- duplicate IDs;
- console-error loops;
- obvious hydration errors;
- uncaught event-handler errors;
- scroll locking after modal close;
- layout overflow on common mobile widths.

If a requested visual experiment risks instability, implement a graceful fallback.

## Progressive enhancement

Core portfolio content and navigation should remain understandable even if advanced effects fail or are unavailable.

Effects should enhance the experience rather than become prerequisites for reading the site.

## Editing philosophy

Prefer improving the existing system over rewriting the entire application without need.

When a task asks for many features:

- group related features into coherent systems;
- avoid hundreds of disconnected gimmicks;
- reuse infrastructure;
- maintain discoverability;
- ensure each feature has a real interaction or UX purpose;
- prioritize quality, stability, and performance over raw feature count.

## Quality bar

Before considering a change complete, mentally or actually verify:

- Does it still feel like N S H D?
- Does it match `DESIGN.md`?
- Is it excellent on mobile?
- Is the interaction discoverable?
- Is the content readable?
- Is motion smooth and purposeful?
- Is there a reduced-motion path?
- Are touch targets usable?
- Does the layout avoid overflow?
- Are project visuals still the focus?
- Did the change introduce unnecessary dependencies?
- Did the change preserve working functionality?
- Would the page still feel premium with animations disabled?

## Agent communication

When reporting completed work, be precise about:

- what changed;
- which files changed;
- whether a build/test was run;
- any known limitations.

Do not claim deployment, build success, device testing, or visual verification unless it actually happened.
