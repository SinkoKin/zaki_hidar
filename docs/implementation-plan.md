# ONLY ZEKO — Implementation Plan

Status: implementation authorized. The repository was empty at the start of this work. The site is built from a clean Next.js foundation.

---

## 1. Product job

Give Only Zeko a premium digital home that makes his calisthenics ability legible in five seconds, establishes trust without invented claims, and sends every interested visitor to his verified Instagram DM.

Primary conversion: **Enquire on Instagram**  
Secondary conversion: **Explore the training**  
No fake checkout, fake booking confirmation, fake prices, or fake testimonials.

---

## 2. Stack

- Next.js App Router + React + TypeScript
- Three.js through React Three Fiber
- `@react-three/drei` for environment lighting, sparkles, rounded geometry and performance helpers
- GSAP + ScrollTrigger + `@gsap/react` for scroll orchestration
- Lenis for optional desktop smooth scroll, disabled for reduced-motion users
- Lucide for functional icons
- Next Image for local, optimised documentary photography
- Plain CSS with design tokens and BEM-style component classes. No utility framework, no generic component library.

---

## 3. Page architecture

1. **Fixed site header** with desktop nav and accessible full-screen mobile menu.
2. **Hero** — full-viewport 3D monument, oversized `MASTER YOUR BODY.` typography, brand metadata, primary and secondary CTA, scroll cue.
3. **Signal strip** — short values and location ticker.
4. **Philosophy** — the public bio turned into a positioning statement, over the live 3D scene. Aperture-style frame, editorial annotation, athlete profile.
5. **Discipline** — interactive skill index: handstand, one-arm handstand, full planche, transitions, balance. Each row updates a documentary image and a bespoke technical SVG glyph.
6. **Method** — a four-layer training framework laid out as a ruled training log, not cards. Content is clearly proposal copy and centralised for coach approval.
7. **Coaching** — personal training, skill work and collaborations. No prices. Honest CTA to Instagram.
8. **Work** — asymmetric gallery of public training frames with parallax, credit, and outbound Instagram links.
9. **Final CTA** — the 3D monument returns with a bold invitation and the verified Instagram link.
10. **Footer** — wordmark, nav, association credit, media credit.

No invented sections. No countdown timers. No fake authority strips.

---

## 4. Design system

### Palette

- `--black: #080808`
- `--surface: #141414`
- `--surface-2: #1b1c19`
- `--bone: #f2efe6`
- `--lime: #c8ff3d`
- `--steel: #8a8f8a`
- `--olive: #3e4a2b`
- `--sand: #c99f6b` (photographic accent only)
- hairline: `rgba(242, 239, 230, 0.16)`

### Type

- Display: **Bricolage Grotesque** at 700–800, tight tracking, oversized.
- Body: **Archivo** at 400–600, generous line-height.
- Utility: **IBM Plex Mono** at 400–500 for indexes, coordinates and micro-labels.

### Layout

- 12-column grid on desktop.
- 24px gutters on mobile, fluid to 64px on desktop.
- Full-bleed imagery, hard rules, no rounded cards.
- One technical annotation system: small markers, coordinates, lengths, crosshairs and section indexes.
- Signature: the **Meridian** — a procedural steel ring/bar monument, and the lime meridian line that runs through the page.

### Motion

- Hero load: masked line reveals, staggered metadata, slow camera approach.
- Scroll: one fixed WebGL layer with camera and object state driven by section ScrollTriggers. Content sections remain opaque to protect reading and GPU time.
- Philosophy: type and annotations reveal; the live scene shifts behind the right-hand aperture.
- Discipline: user-driven active state, not auto-carousel.
- Gallery: low-amplitude parallax and clip-path reveals.
- Final CTA: scene re-centres, lime ring intensifies, CTA arrives last.
- All nonessential motion disabled for `prefers-reduced-motion`. Content never depends on animation to be visible.

---

## 5. 3D architecture

- `SceneMount` handles WebGL capability detection, lazy loading and fallback.
- One `Canvas`, one scene.
- `SceneComposition` owns camera damping, pointer parallax, group transforms and object choreography.
- `MeridianMonument` holds the procedural ring, uprights, floating bar, plinth, orbital wire and lime accent.
- `Atmosphere` handles Sparkles, grid and environment lightformers.
- `scene-state.ts` is a mutable client-only store written by ScrollTrigger and read by `useFrame`. No React re-render per frame.
- No external HDR, no model downloads, no real-time shadows, no post-processing bloom. Reflection comes from procedural Lightformers.
- Pointer interaction is damped and disabled on coarse pointers.
- Mobile: fewer sparkles, smaller DPR, reduced camera amplitude.
- If WebGL fails: a designed CSS/SVG steel ring fallback remains visible.

---

## 6. Content architecture

All coach-specific content lives in `data/site.ts`:

- identity and verified links
- hero copy
- ticker strings
- philosophy
- skills
- method
- coaching options
- gallery
- footer

Media objects include local path, alt text, source URL, Instagram post code and credit. Swapping in approved originals is a path change, not a component rewrite.

---

## 7. Accessibility and SEO

- Semantic landmarks and one `h1`.
- Skip link.
- Keyboard-tested menu with focus trap, Escape close, focus restoration, and body scroll lock.
- Visible lime focus ring on all controls.
- Interactive skill rows use buttons with `aria-pressed`; the active frame has a live but non-noisy label.
- 3D is decorative (`aria-hidden`) and never carries information.
- Contrast checked for all text, including lime on black.
- Alt text describes the visible training frame, not an unverified outcome.
- Metadata, Open Graph, Twitter card, manifest, icon, sitemap, robots route, and Person JSON-LD.
- No fabricated reviews or credentials in structured data.

---

## 8. Verification

1. Install and run `npm run typecheck`.
2. Run `npm run lint`.
3. Run `npm run build` and fix all build issues.
4. Start the production server.
5. Playwright:
   - desktop, tablet and mobile screenshots
   - check canvas presence and non-zero drawing buffer
   - scroll through every section
   - open/close mobile menu with keyboard
   - activate skill rows
   - check all links and CTAs
   - check console errors
   - emulate reduced motion and confirm content remains visible
   - simulate WebGL unavailable and confirm the fallback
6. Inspect screenshots visually and iterate before delivery.
7. Report what was actually run and any remaining media/content caveats.

---

## 9. Known content decision

The social copy and the training methodology framework are **proposals** until Zakaria approves them. The site does not quote him directly. Coaching descriptions are deliberately limited to what the public bio and public training content support. Public images are used with visible credit and source links; the audit flags the need to replace them with originals before a commercial launch.
