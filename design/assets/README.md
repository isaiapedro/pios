# Design Assets

Reusable visual files harvested from shipped products. Prefer copying into a new app rather than inventing new marks when the product shares the same family.

## Catalog

| Path | Origin | Notes |
|------|--------|-------|
| `logo.png`, `logo-site.png`, `logo-site.svg`, `banner.png` | PIOS / site brand | Pre-existing ecosystem marks |
| `cards/` | Editorial card HTML/PNG previews | Post + review card layouts |
| `chess-wrapped/` | Chess Wrapped Expo app | App icon, splash, Android adaptive layers, piece PNGs |

## Chess Wrapped (`chess-wrapped/`)

Source: `workspace/side_projects/chess/mobile/assets/`

| File | Use |
|------|-----|
| `icon.png` | 1024² Expo / iOS app icon |
| `splash-icon.png` | Splash / loading glyph |
| `favicon.png` | Web favicon |
| `adaptive-icon/android-icon-*.png` | Adaptive icon layers (`background`, `foreground`, `monochrome`) |
| `chess_set/*.png` | Marketing / illustration piece silhouettes (bishop, king, knight, pawn, queen, rook) |

Runtime board pieces in the app are **SVG Alpha paths** (`mobile/src/components/pieces/alphaPieces.ts`), not these PNGs. PNG set is for marketing, empty states, and loaders.

License for Alpha-derived assets: see `chess-wrapped/chess_set/LICENSE.md`.
