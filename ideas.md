# OptoHaptic AI — Design Brainstorm

## Context
The PRD mandates: "MIT Media Lab meets Apple product page meets science museum exhibit." Deep navy (#03045E) base, electric cyan (#00B4D8) accents, Orbitron + Inter typography. The site is a single long-scroll narrative journey for a head-mounted assistive wearable that translates depth data into forehead haptic feedback.

---

<response>
## Idea 1: "Neural Cartography" — Data-Topographic Aesthetic

<text>
**Design Movement:** Topographic / Cartographic Futurism — inspired by USGS elevation maps, neural pathway diagrams, and satellite terrain imaging.

**Core Principles:**
1. Every surface carries information — backgrounds use subtle contour-line patterns that shift with scroll
2. Depth is literal — the site's visual layers mirror the device's depth-sensing capability
3. Organic precision — curves and contour lines feel scientific yet alive

**Color Philosophy:** The deep navy (#03045E) becomes an ocean floor. Cyan (#00B4D8) traces contour lines like sonar returns. Ocean blue (#0077B6) fills elevation bands. The palette evokes depth-sensing technology itself — you're looking at the world through the device's eyes.

**Layout Paradigm:** Asymmetric split-panel layouts where content occupies 60% and data visualizations/3D elements occupy 40%, shifting sides per section. Contour-line dividers replace traditional section breaks. Content flows like a topographic descent.

**Signature Elements:**
1. Animated contour-line section dividers that draw themselves on scroll
2. "Sonar pulse" radial gradient that follows cursor position subtly
3. Depth-layer parallax where foreground text sits above mid-ground data and background terrain

**Interaction Philosophy:** Hovering reveals hidden depth layers — like adjusting a depth sensor's range. Clicks send ripple pulses outward from the point of contact.

**Animation:** Contour lines animate with a slow drawing effect (stroke-dashoffset). Section transitions use a "depth scan" wipe — a horizontal line sweeps down revealing content like a LiDAR scan. Easing: cubic-bezier(0.16, 1, 0.3, 1). Particle systems use small dots that drift along contour paths.

**Typography System:** Orbitron for headlines (weight 700, letter-spacing +2px) — its geometric forms echo topographic grid coordinates. Inter for body (weight 400/500). JetBrains Mono for data readouts styled as elevation markers.
</text>
<probability>0.07</probability>
</response>

---

<response>
## Idea 2: "Synaptic Dark" — Neuroscience-Noir Aesthetic

<text>
**Design Movement:** Bioluminescent Noir — inspired by deep-sea organisms, neural firing patterns, and medical imaging dark rooms. Think: the inside of a brain rendered by Apple's design team.

**Core Principles:**
1. Light emerges from darkness — every glowing element feels like a neuron firing
2. Connection is visible — thin luminous lines connect related elements across the page
3. Silence speaks — vast dark negative space creates reverence and focus

**Color Philosophy:** #03045E is not just a background — it's the void before sensation. Cyan (#00B4D8) is the electrical impulse, the moment a haptic motor fires. It appears sparingly and always means "active" or "alive." Sky (#90E0EF) is the afterglow, the residual trace of a signal passed. The palette mirrors the journey from darkness (blindness) to structured light (haptic awareness).

**Layout Paradigm:** Full-bleed dark sections with content emerging from center-weighted compositions. No traditional grid — elements float in space with generous margins (minimum 120px between major blocks). Content clusters form "neural nodes" connected by faint glowing lines. Sections breathe.

**Signature Elements:**
1. Thin glowing connection lines (1px, #00B4D8 at 30% opacity) that link related data points across sections
2. "Firing" micro-animations — small cyan dots that pulse outward from interactive elements on hover
3. Frosted-glass data panels with backdrop-blur and subtle cyan border-glow

**Interaction Philosophy:** The page is dormant until the user engages. Scroll triggers awakening — elements illuminate as if the user's attention is the electrical signal. Hover states cause elements to "fire" with a brief bright pulse then settle to a warm glow.

**Animation:** Elements fade-up from 30px below with 0.6s duration. 3D scenes use slow orbital drift (0.002 rad/frame). Stat counters use a typewriter-digit effect. The pipeline diagram's particles are bioluminescent — they leave a brief trailing glow. All motion respects prefers-reduced-motion. Easing: cubic-bezier(0.16, 1, 0.3, 1).

**Typography System:** Orbitron (weight 600-900) for all headlines — tracked wide (+3px) for hero, tight for section heads. Inter (weight 300 for body, 500 for emphasis) — the lightness of the body text against dark backgrounds creates an ethereal reading experience. JetBrains Mono for all technical data, styled with a subtle text-shadow glow.
</text>
<probability>0.08</probability>
</response>

---

<response>
## Idea 3: "Precision Instrument" — Technical-Luxe Aesthetic

<text>
**Design Movement:** Swiss Technical Illustration meets Apple Industrial Design — inspired by Braun product manuals, Dieter Rams principles, and high-end medical device marketing.

**Core Principles:**
1. Every pixel is intentional — ruthless alignment, mathematical spacing, zero decorative noise
2. The device IS the design — all visual language derives from the product's physical form
3. Contrast creates hierarchy — stark light/dark alternation between sections

**Color Philosophy:** Deep navy (#03045E) for immersive "device showcase" sections. Alice Blue (#F0F8FF) for data/evidence sections — the alternation creates a rhythm of emotion and intellect. Cyan (#00B4D8) is used exclusively for interactive affordances and data highlights — never decoratively. This restraint makes every cyan element feel important.

**Layout Paradigm:** Strict 12-column grid with content locked to columns 2-11. Hero and device sections break the grid to full-bleed. Data sections use a newspaper-style multi-column layout. Generous vertical rhythm (section padding: 160px top/bottom). Horizontal rules and thin borders create structure without boxes.

**Signature Elements:**
1. Hairline annotation lines — thin 1px lines with small circles at endpoints, connecting labels to device features (like a technical drawing)
2. Alternating dark/light section rhythm — every other section flips the palette
3. Monospaced data callouts in small caps with letter-spacing, styled like instrument readouts

**Interaction Philosophy:** Interactions feel precise and mechanical — like adjusting a scientific instrument. Buttons have firm, snappy hover states (scale 1.02, no bounce). The haptic grid simulator feels like a real control panel. Tooltips appear with clinical precision.

**Animation:** Minimal but impactful. Elements slide in from their natural reading direction (left for LTR content, up for vertical lists). Charts draw their data paths with a single clean stroke. The 3D hero rotates with dampened inertia — it feels heavy and real. No particle effects outside the hero. Duration: 0.4-0.8s. Easing: cubic-bezier(0.16, 1, 0.3, 1).

**Typography System:** Orbitron (weight 700) ONLY for the hero headline and section numbers — used sparingly for maximum impact. Space Grotesk (weight 500-700) for section titles — technical but warmer than Orbitron. Inter (weight 400/500) for body. JetBrains Mono for specs and data, always at 13px with generous line-height.
</text>
<probability>0.06</probability>
</response>

---

## Selected Approach: Idea 2 — "Synaptic Dark"

This approach best matches the PRD's mandate for a site that feels like "MIT Media Lab meets Apple meets science museum." The bioluminescent noir aesthetic:
- Creates the immersive, awe-inspiring first impression the PRD demands
- Naturally supports the Three.js 3D hero with its dark-space composition
- Makes the haptic grid simulator feel like a living neural interface
- The "light from darkness" metaphor perfectly mirrors the device's mission (bringing spatial awareness to those without sight)
- The generous dark negative space creates the premium Apple-like feel
- Connection lines between elements reinforce the "data flow" narrative
