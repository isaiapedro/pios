# Chess Wrapped — UI decisions

## Why soft dark over neo-brutal on mobile

Neo-brutal multi-layer shadows and hard rectangles read as web/editorial. On a phone thumb zone they fight blur chrome and dense analytics. Shipping UI kept the **brand red**, cream heritage tokens, and naming, but executed controls as **pills + opacity press**.

## Why Inter-only

Playfair + Plex packages remain in `package.json` from the editorial plan. Runtime `useFonts` loads Inter weights only — one family for numbers, labels, and titles reduces layout shift and matches dense metric screens.

## Why `EdgeCard` lost its edge

Earlier “edge” cards implied hard outlines. Current cards are fill-only soft plates. Name retained for call-site stability.

## Empty and loading states

- Short waits: blank page fade (no spinner flash).
- Long waits: skeleton bones or pawn loader keyed by period (`year`/`all` → skeleton; else pawn).
- Missing metrics: `Placeholder` soft wash, never a hard empty box with borders.
