# DESIGN.md

## N S H D Portfolio Design System

### Design thesis

The portfolio should feel like a fusion of:

**luxury editorial × Apple-level restraint × cinematic creative studio × technical/scientific precision × Awwwards-grade interaction**

The visual experience is premium because of composition, typography, pacing, material treatment, motion, and detail — not because every element glows or moves.

The site must feel intentionally designed for N S H D rather than generated from a common portfolio template.

---

## Core personality

The interface should communicate:

- creative intelligence;
- quiet confidence;
- experimentation;
- precision;
- technical curiosity;
- cinematic atmosphere;
- premium craft;
- cross-disciplinary identity.

It should not communicate:

- generic startup/SaaS;
- gaming HUD;
- crypto dashboard;
- neon cyberpunk;
- cheap glassmorphism;
- template portfolio;
- maximalist clutter.

---

## Visual hierarchy

Use contrast in scale, space, weight, depth, and motion.

The preferred hierarchy is:

1. one dominant idea;
2. a supporting message;
3. primary visual/project;
4. contextual metadata;
5. secondary actions/details.

Do not make every card, headline, badge, and button equally loud.

Whitespace is an active design element.

---

## Color system

The default environment is near-black, warm and deep rather than blue-black.

Recommended semantic palette:

```css
:root {
  --ink-0: #050505;
  --ink-1: #0a0a09;
  --ink-2: #11110f;
  --ink-3: #191815;

  --ivory-0: #f5f1e8;
  --ivory-1: #ded8cb;
  --ivory-2: #a9a296;
  --ivory-3: #746f67;

  --champagne-0: #f1dfb3;
  --champagne-1: #d4b978;
  --champagne-2: #a88b50;
  --champagne-3: #6f5a35;

  --line-soft: rgba(245, 241, 232, 0.10);
  --line-strong: rgba(245, 241, 232, 0.20);
  --surface-soft: rgba(255, 255, 255, 0.035);
  --surface-raised: rgba(255, 255, 255, 0.06);
}
```

These values are directional, not a mandate to replace good existing tokens blindly.

Champagne/gold is an accent, not the base color of every interactive element.

Avoid pure white over large surfaces. Avoid oversaturated neon accents.

---

## Material language

Preferred materials:

- dark matte surfaces;
- warm metallic accents;
- faint translucent layers;
- controlled glass only where it creates meaningful depth;
- thin technical lines;
- soft edge illumination;
- subtle grain/noise;
- occasional reflective highlights.

Glass should remain legible and restrained.

Never stack multiple high-blur glass layers across the entire viewport.

---

## Typography

Typography should feel editorial and deliberate.

Use:

- large display type for major statements;
- compact supporting copy;
- disciplined line lengths;
- strong contrast between display and metadata;
- uppercase/small-label treatments sparingly;
- tabular/technical typography only for metadata where appropriate.

Avoid filling the page with many unrelated font sizes.

### Responsive type

Prefer fluid sizing with `clamp()`.

Headlines may become dramatic on large screens, but mobile headlines must not overflow or produce awkward one-word lines unnecessarily.

Body text should remain comfortable to read on a phone.

Recommended body line length: roughly 45–75 characters where layout allows.

---

## Spacing

Use a coherent spacing rhythm rather than isolated arbitrary values.

Suggested base scale:

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.5rem;
--space-6: 2rem;
--space-7: 3rem;
--space-8: 4rem;
--space-9: 6rem;
--space-10: 8rem;
```

Large sections should breathe. Mobile spacing should tighten intelligently rather than simply shrinking everything.

---

## Layout

The site may use asymmetry, editorial cropping, overlapping layers, and immersive full-bleed sections, but the reading path must remain obvious.

Preferred layout behaviors:

- strong vertical rhythm;
- carefully controlled max-widths;
- occasional intentional edge-to-edge media;
- asymmetrical grids with a clear anchor;
- generous negative space;
- section transitions that feel composed rather than stacked.

Avoid generic repeated 3-column card grids as the dominant structure.

---

## Mobile design

Mobile is not a reduced desktop layout. It is a primary experience.

Design first for touch and vertical flow.

### Mobile rules

- No interaction may require hover.
- Primary tap targets should generally be at least ~44px in practical hit area.
- Keep critical text away from display cutouts and safe-area edges.
- Use `env(safe-area-inset-*)` where useful.
- Avoid tiny horizontal carousels that are hard to control.
- Horizontal interactions must clearly signal that horizontal movement is possible.
- Prevent accidental swipe conflicts with vertical scrolling.
- Keep overlays within the viewport and easy to dismiss.
- Place important controls within comfortable thumb reach when feasible.
- Avoid sticky UI consuming too much vertical space.
- Respect browser chrome and dynamic viewport behavior.
- Use `dvh/svh` where more appropriate than legacy `vh`.

A polished Android experience is as important as iPhone styling.

---

## Navigation

Navigation should feel light and precise.

The primary navigation may be minimal, but users must always be able to understand:

- where they are;
- how to reach work/projects;
- how to return home;
- how to contact/follow the creator where those actions exist.

Mobile menus should have a clear open/close state and never trap scrolling or focus.

---

## Buttons and interactive controls

Buttons should feel tactile without becoming cartoonish.

Use combinations of:

- subtle scale;
- surface lift;
- underline/line movement;
- icon translation;
- light sweep;
- controlled border changes;
- short spring response.

Avoid oversized pills everywhere.

Icon-only controls require accessible labels.

Interactive text links should not be visually indistinguishable from static text.

---

## Cards and project surfaces

Projects are the core evidence of the portfolio.

Project presentations should prioritize:

1. imagery or product view;
2. project name;
3. concise role/category/context;
4. meaningful interaction to enter the case study.

Cards may use depth, crop, parallax, tilt, or reveal effects, but these effects must not obscure the project.

Avoid excessive border-radius uniformity. Use radii based on hierarchy and material.

---

## Imagery

Project imagery should feel curated and high-resolution.

Preferred treatments:

- intentional crops;
- cinematic framing;
- contained device/product imagery when useful;
- subtle depth;
- soft masks or gradients;
- context-aware overlays.

Do not blur screenshots simply to look premium.

Do not bury meaningful images beneath heavy overlays.

---

## Technical/scientific motif

The portfolio may reference N S H D's technical and pharmaceutical interests through subtle motifs:

- fine measurement ticks;
- molecular/geometric hints;
- specimen-like labels;
- coordinate or index marks;
- controlled grid fragments;
- diagrammatic lines;
- small technical annotations.

These should function as identity details, not become a fake sci-fi HUD.

---

## Motion philosophy

Motion should feel cinematic, physical, and precise.

Use motion for:

- sequencing;
- spatial continuity;
- focus;
- feedback;
- storytelling;
- section transitions;
- project reveals.

Do not animate simply because an element exists.

### Timing character

Micro-interactions:
- approximately 120–260ms

Standard transitions:
- approximately 250–600ms

Editorial/cinematic reveals:
- approximately 500–1200ms when justified

Prefer natural easing or spring motion over constant linear movement.

Long ambient animation must remain subtle and inexpensive.

---

## Scroll behavior

Lenis may provide smooth scrolling, but native expectations must still be respected.

Scroll-linked effects should:

- be reversible;
- avoid jank;
- avoid breaking browser navigation;
- degrade gracefully;
- not make reading difficult.

Do not hijack the wheel/touch gesture into forced slide navigation unless explicitly required.

Avoid mandatory scroll-jacking.

---

## Entrance animations

Initial load should establish atmosphere quickly.

Prioritize a small number of meaningful reveals rather than delaying the entire page.

Avoid long splash screens that block content.

Above-the-fold content should become usable quickly even when motion is enabled.

---

## Micro-interactions

Good candidates:

- magnetic-but-subtle buttons on pointer devices;
- tactile press states;
- image focus/reveal;
- contextual labels;
- progress cues;
- section index changes;
- project hover previews on desktop with touch alternatives;
- soft cursor-reactive light only on capable pointer devices;
- wordmark/easter-egg responses;
- controlled haptic-like visual feedback.

All desktop micro-interactions need sensible mobile behavior.

---

## Cursor effects

Custom cursor effects are optional enhancement only.

They must:

- run only for fine pointers;
- never hide the native cursor if reliability is uncertain;
- never be required to discover controls;
- be disabled for touch;
- remain lightweight.

---

## Depth and 3D

Use perspective carefully.

Subtle transforms can add premium depth to media and feature surfaces.

Avoid exaggerated card tilt, constant 3D spinning, or effects that make text hard to read.

---

## Glassmorphism

Glass is allowed as one material among several.

Good glass:

- readable;
- thin;
- restrained;
- localized;
- backed by sufficient contrast.

Bad glass:

- heavy blur everywhere;
- many nested translucent cards;
- low-contrast text;
- large performance-heavy backdrop-filter surfaces;
- generic "AI dashboard" appearance.

---

## Lighting

Lighting should feel environmental rather than neon.

Use soft gradients, edge highlights, local glows, reflections, and vignette-like atmosphere.

Gold/champagne light should feel metallic and warm, not fluorescent yellow.

---

## Borders

Borders should be quiet.

Use low-opacity lines and emphasis changes on interaction.

Avoid outlining every container.

---

## Icons

Use Lucide icons where appropriate and keep icon language consistent.

Icons should be optically balanced and usually secondary to text.

Avoid mixing many icon families.

Do not use emojis as core interface icons unless intentionally part of a concept.

---

## Section transitions

Sections should feel connected through one or more of:

- shared alignment;
- changing background tone;
- moving index/label;
- visual motif continuation;
- controlled parallax;
- typographic handoff;
- media transition.

Avoid making every section a standalone floating card.

---

## Case studies

Case-study pages should prioritize comprehension.

Recommended sequence:

1. project identity/hero;
2. role/context;
3. problem or intent;
4. selected visual/process evidence;
5. implementation/features;
6. outcome or current state;
7. next-project transition.

Do not invent outcomes or metrics.

Use motion to guide reading rather than distract from the work.

---

## Responsive behavior

Recommended design checkpoints:

- compact mobile: ~320–374px
- standard mobile: ~375–479px
- large mobile/small tablet: ~480–767px
- tablet: ~768–1023px
- desktop: ~1024–1439px
- wide: 1440px+

Do not target only these exact values. Layout should remain fluid between them.

Test especially around narrow widths where long words, project titles, and navigation can break.

---

## Accessibility design

Accessibility is part of the visual system.

Ensure:

- sufficient contrast;
- focus styles that match the premium aesthetic;
- readable type at 200% zoom where practical;
- no critical information hidden only in hover;
- controls that remain understandable without animation;
- reduced-motion treatment;
- predictable modal/overlay behavior;
- comfortable touch targets.

---

## Reduced motion

When `prefers-reduced-motion: reduce` is active:

- remove large parallax;
- remove unnecessary looping motion;
- avoid dramatic transforms;
- make transitions short or immediate;
- preserve hierarchy through opacity/static composition;
- keep all content accessible.

Reduced motion must look intentional, not broken.

---

## Performance design limits

A visual effect is not premium if it causes lag.

On mobile:

- limit simultaneous blur/backdrop-filter regions;
- avoid huge animated shadows;
- avoid excessive particles;
- prefer composited transforms;
- pause off-screen ambient animations;
- avoid continuous heavy canvas work unless optimized;
- use lower complexity for coarse pointers or constrained devices when necessary.

Aim for smooth interaction first, then visual excess.

---

## Copy tone

Copy should be concise, self-aware, precise, and creative.

Avoid:

- inflated buzzwords;
- fake metrics;
- generic "passionate developer" language;
- repeated AI clichés;
- long blocks of self-praise.

Let the work establish credibility.

---

## Anti-pattern blacklist

Do not default to:

- generic hero + CTA + three cards;
- bright cyan/purple AI gradients;
- dozens of pill badges;
- glass cards everywhere;
- Bento grids solely because they are fashionable;
- huge floating blobs with no meaning;
- constant mouse-follow effects;
- excessive typing animations;
- fake terminal windows;
- generic code rain;
- overused orbiting tech logos;
- infinite marquees in every section;
- inaccessible horizontal scroll;
- animation that delays reading;
- desktop-only keyboard shortcuts as required controls;
- novelty features that reduce performance or clarity.

---

## Signature details

The site may include memorable details, but they should feel authored.

Good signature details might include:

- the existing NSHD wordmark interaction/easter egg;
- subtle scientific annotation;
- a cinematic project reveal;
- a refined project-media inspection mode;
- responsive micro-typography;
- a contextual section index;
- a distinctive transition between portfolio and case study;
- tactile mobile feedback expressed visually;
- dynamic accents that respond to content rather than random effects.

Prefer a few exceptional signature moments over dozens of weak gimmicks.

---

## Design decision test

Before adding any new visual element, ask:

1. Does it reinforce N S H D's identity?
2. Does it improve hierarchy, comprehension, atmosphere, or interaction?
3. Does it work on mobile and touch?
4. Is it accessible?
5. Is it performant?
6. Does it remain coherent with the rest of the system?
7. Would the page still look intentional if this effect were removed?

If the answer is no, simplify or remove it.

---

## Final standard

The finished portfolio should feel:

**rare, restrained, cinematic, tactile, intelligent, mobile-native, technically precise, and unmistakably N S H D.**

Premium design comes from restraint plus detail. Do not confuse complexity with quality.
