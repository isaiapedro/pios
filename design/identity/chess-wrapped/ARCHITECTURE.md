# Chess Wrapped — Identity architecture

## Token ownership

| Concern | Owner file (source of truth) | Design mirror |
|---------|------------------------------|---------------|
| Colors, spacing, radius, type | `mobile/src/theme.ts` | `ui/chess-wrapped/theme.ts` |
| Primitive components | `mobile/src/components/ui.tsx` | `ui/chess-wrapped/README.md` |
| Navigation chrome | `mobile/src/navigation/TabNavigator.tsx` | `mobile/chess-wrapped/README.md` |
| Editorial / analog language | `chess/visual_identity.md` | `references/chess-wrapped/visual_identity.md` |
| Figma exploration tokens | `design/mobile/chess app/*/src/index.css` | `references/chess-wrapped/INDEX.md` |

## Theme helper

```ts
withAlpha(hex, alpha) → rgba(r,g,b,a)
```

Used for chips, meters, board overlays, radar fills — prefer over hard-coded rgba when starting from a brand hex.

## Navigation theme bridge

React Navigation `DarkTheme` overrides:

| Nav key | Token |
|---------|-------|
| background | `colors.bg` |
| card | `colors.surface` |
| text | `colors.text` |
| border | `colors.border` |
| primary | `colors.accent` |

## Divergence log (keep honest)

1. **Sage meaning shifted:** heritage docs used `#A5CEC7` for focus rings; mobile uses `#34C759` for win + board selection.
2. **Typography collapsed:** packages still list Playfair / IBM Plex Mono; runtime loads Inter only.
3. **Button language:** `BrutalButton` name preserved; visual is soft pill, not neo-brutal rectangle.
4. **Figma `ui` prototype** still uses Playfair + IBM Plex + `#D32531` filter-rect shadows; treat as exploratory sibling, not production.
