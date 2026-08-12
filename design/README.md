# PIOS Design System & UI Assets

## Purpose

Visual definitions, identity parameters, and reusable UI/mobile patterns for PIOS frontends. First extracted product: **Chess Wrapped**.

## Directory layout

| Path | Contents |
|------|----------|
| `assets/` | Logos, banners, card previews, product icon packs |
| `identity/` | Brand philosophy, color/type contracts per product |
| `references/` | Source maps, licenses, captured manuals |
| `ui/` | Component kits + token snapshots |
| `mobile/` | Mobile shell patterns + Figma Make prototypes |

## How to start a new app from this collection

1. Read `identity/<product>/` for palette + type + motion.
2. Copy `ui/<product>/theme.ts` (and primitives notes) into the new codebase.
3. Mirror shell patterns from `mobile/<product>/` if the surface is native.
4. Grab raster/SVG from `assets/<product>/` as needed.
5. Check `references/<product>/INDEX.md` before changing licenses or inventing parallel tokens.

## Chess Wrapped entry points

- Identity: `identity/chess-wrapped/README.md`
- UI kit: `ui/chess-wrapped/README.md`
- Mobile shell: `mobile/chess-wrapped/README.md`
- Assets: `assets/chess-wrapped/`
- Sources: `references/chess-wrapped/INDEX.md`
