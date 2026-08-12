# Chess Wrapped — Identity

**Product:** Chess Wrapped (`com.chesswrapped.app`)  
**Stack:** Expo 54 · React Native 0.81 · dark-only (`userInterfaceStyle: dark`)  
**Canonical source:** `workspace/side_projects/chess/mobile/src/theme.ts`

## Philosophy (evolution)

Three layers coexist in the archive. For new apps, use **Layer C** unless the brief asks for editorial web.

| Layer | Where | Character |
|-------|-------|-----------|
| **A — Editorial heritage** | `visual_identity.md`, early web thinking | Dark editorial + neo-brutal buttons + analog paper/tape/polaroid |
| **B — Figma Make prototypes** | `design/mobile/chess app/` | Playfair/Fraunces display, indigo/amber accents, panel stack `#0a0a0f` |
| **C — Shipping mobile** | Expo `theme.ts` + `components/ui.tsx` | Soft dark, Inter-only, pill controls, no hard neo-brutal shadows |

Shipping direction: **high-contrast dark editorial base, softened brutalism** — rounded surfaces (`radius.md`+), opacity press feedback, blur tab bar, brand red as primary accent, sage for success/legal moves, blue for data/charts.

## Color system (canonical mobile)

### Surfaces

| Token | Hex / value | Role |
|-------|-------------|------|
| `bg` | `#000000` | App canvas, StatusBar light-content |
| `charcoal` | `#0d0d0d` | Deep gradient / secondary canvas |
| `surface` | `#121212` | Cards, panels |
| `surfaceRaised` | `#181818` | Lifted cards, sheets |
| `muted` | `#1c1c1c` | Inputs, disabled pill fill |
| `mutedAlt` | `#242424` | Inactive chips |
| `border` | `rgba(255,255,255,0.07)` | Hairline dividers |
| `rim` | `rgba(255,255,255,0.14)` | Tab bar / chrome edge |
| `borderSoft` | `rgba(255,255,255,0.05)` | Soft separators |

### Brand & semantic

| Token | Hex | Role |
|-------|-----|------|
| `red` / `accent` / `danger` | `#D32531` | Primary CTA, loss, brand |
| `redHover` / `accentDim` | `#a0000f` | Pressed / deeper red |
| `heart` | `#FF5A5A` | Like / soft alert |
| `sage` | `#34C759` | Win, selected square border, legal-move highlight fill |
| `blue` / `info` / `result.data` | `#0084d2` | Charts, radar, guess highlights |
| `cream` / `warning` | `#ede7d3` | Soft highlight / warning wash |
| `creamShadow` | `#d8d0b8` | Paper curl heritage (rarely used on mobile) |
| `shadowGray` | `#6D7876` | Neo-brutal shadow tint (heritage / Figma) |

### Text

| Token | Hex | Role |
|-------|-----|------|
| `text` | `#ffffff` | Primary |
| `textSoft` | `#e6e6e6` | Soft primary |
| `textMuted` | `#a1a1a1` | Labels, secondary |
| `textDim` | `#7a7a7a` | Captions, inactive tabs |
| `textDisabled` | `#4a4a4a` | Disabled |

### Board

| Token | Hex | Role |
|-------|-----|------|
| `boardLight` | `#C7C7C7` | Light squares |
| `boardDark` | `#71828F` | Dark squares |

### Result mapping

```
win  → sage (#34C759)
draw → textDim
loss → red
highlight → cream
data → blue
```

## Typography (canonical mobile)

**Family:** Inter only (Expo Google Fonts). Legacy token names `display` / `mono` still exist but resolve to Inter weights.

| Token | Font file | Weight |
|-------|-----------|--------|
| `sans` / `mono` | `Inter_400Regular` | 400 |
| `sansMedium` / `monoMedium` | `Inter_500Medium` | 500 |
| `displayMedium` / `monoBold` | `Inter_600SemiBold` | 600 |
| `sansBold` / `display` | `Inter_700Bold` | 700 |
| `displayLight` | `Inter_300Light` | 300 |

### Type scale

| Role | Size / LH | Tracking | Notes |
|------|-----------|----------|-------|
| `hero` | 34 / 40 | -0.8 | Page hero |
| `title` | 26 / 32 | -0.5 | Screen title |
| `heading` | 20 / 26 | -0.3 | Section |
| `subheading` | 16 / 22 | -0.1 | Medium weight |
| `body` | 15 / 22 | — | Default copy |
| `bodySmall` | 13 / 19 | — | Dense copy |
| `label` | 13 / 18 | — | Medium |
| `caption` | 12 / 17 | — | Meta |
| `micro` | 11 / 15 | — | Pills |
| `numberLg` | 44 / 50 | -1.5 | Tabular nums |
| `numberMd` | 28 / 34 | -0.8 | Stats |
| `numberSm` | 20 / 26 | -0.4 | Compact stats |

### Heritage fonts (do not mix into shipping RN unless brief changes)

- Display: Playfair Display, Fraunces
- Mono: IBM Plex Mono, JetBrains Mono
- Skeuomorphic: Special Elite, Shadows Into Light, Dancing Script, Homemade Apple, La Belle Aurore

## Spacing & radius

```
spacing: xs4 sm8 md16 lg24 xl32 xxl44
radius:  xs8 sm12 md18 lg24 xl32 pill999
```

Rule from source: *everything visible uses a radius token — no square edges* on shipping mobile.

## Iconography

- Library: `lucide-react-native`
- Wrapper: `AppIcon` with `STROKE_LIGHT = 1.5`, `STROKE_BOLD = 2.5`
- Active tab icons use `bold`

## Motion language (identity-level)

| Pattern | Spec |
|---------|------|
| Soft press | `opacity: 0.55` |
| Tab page fade | 240ms, `Easing.out(cubic)` |
| Tab active pill | 40ms, `Easing.out(quad)`, native driver translateX |
| Skeleton pulse | opacity 0.35 ↔ 0.85, 700ms each way, loop |
| Long loader gate | blank 3s → loader ≥4s before reveal (`LoadingSkeletons`) |

## Dual heritage note

Editorial manual still documents light theme `#f5f5f0` and neo-brutal multi-shadow CTAs. Shipping Expo is **dark-only** and replaces neo-brutal CTAs with **filled pills**. Keep heritage in `references/`; do not reintroduce hard white/gray offset shadows unless targeting a web editorial surface.
