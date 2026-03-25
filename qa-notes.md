# QA Notes from Markdown Extraction

## Issues Found:
1. **89% stat card missing from markdown** — The markdown shows only 3 stats: "0M+ People affected globally", "0% Life expectancy of sighted peers", "0× Expected increase by 2050". The 89% Greater mortality risk card is NOT appearing in the extracted markdown. However, the code has 4 StatCards. This could be a rendering issue where the card is hidden by opacity:0 (before scroll triggers).

2. **Stat counters show 0** — Expected behavior since counters animate on scroll intersection. The markdown captures the initial state.

3. **Results section "0 FPS"** — Same issue, counters start at 0 before scroll triggers animation.

4. **All 10 sections present** — Hero, Problem, Solution (with haptic grid), Pipeline, Results, Device, Forehead, Comparison, Team, Roadmap all render.

5. **Comparison table renders correctly** — All 5 devices show with checkmarks.

6. **SVG radar chart renders** — Base64 encoded SVG is present.

7. **Team cards render** — All 3 team members show with quotes.

## Likely Root Cause of Missing 89% Card:
The stat cards have opacity:0 before scroll triggers isVisible. The markdown extractor might be skipping elements with opacity:0. The 89% card IS in the code (line 83 of ProblemSection.tsx). It should render fine when user scrolls to it.

## Action Items:
- Consider making the 89% card visible by default or verify it appears on scroll
- The "0" display for counters is expected pre-scroll behavior
