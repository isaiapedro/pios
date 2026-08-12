# Chess Wrapped — UI kit

Source: `workspace/side_projects/chess/mobile/src/components/ui.tsx`  
Tokens: `./theme.ts` (snapshot of shipping `src/theme.ts`)

## Surfaces

| Component | Recipe |
|-----------|--------|
| `EdgeCard` | `surface` fill, `radius.md`, `spacing.md` padding; `lifted` → `surfaceRaised` |
| `BareGroup` | No fill; `gap: spacing.sm` |
| `Divider` | Hairline height, `colors.border` |
| `PaperCard` / note | Same as EdgeCard; title = bold subheading, body = muted body. Replaced taped-paper skeuomorph |
| `Placeholder` | Soft white 3% fill, centered caption |

## Actions

| Component | Recipe |
|-----------|--------|
| `BrutalButton` | **Pill**, not brutal: `radius.pill`, accent fill, 14×`lg` padding, bold 15px label. `ghost` = text-only accent. Disabled → `muted` fill / `textDisabled` |
| `IconButton` | No chrome; hitSlop 12; default soft text color |
| `BackLink` | ChevronLeft 18 + muted label |

Press language: `opacity: 0.55` (`pressedSoft`).

## Chips & filters

| Component | Recipe |
|-----------|--------|
| `Pill` | Soft tint via `withAlpha(color, 0.16)`, micro medium text |
| `MetaTag` | Inactive: `mutedAlt` pill; active: solid accent (invert text to black if accent is white) |
| `SectionTabs` | Horizontal scroll; active = bold text + 22×2 underline in `text` |

## Typography atoms

| Component | Recipe |
|-----------|--------|
| `Eyebrow` | Caption medium, dim, mb 6 |
| `DisplayTitle` | Bold, default 30 / ~1.16 LH, tracking -0.8 |
| `SectionLabel` | Heading token, mb `sm` |
| `Caption` | Caption + dim |

## Data display

| Component | Recipe |
|-----------|--------|
| `StatTile` | Bare: `numberMd` value + muted label + optional dim caption |
| `Meter` | 6px track, white 8% bg, filled tone; optional 2px rim marker |

## Inputs

| Component | Recipe |
|-----------|--------|
| `SearchField` | Pill muted bar, Search/X icons dim, 46 min height |
| `SelectField` | Pill muted trigger + caret; opens bottom sheet (`surfaceRaised`, top `radius.xl`, 60% black scrim) |
| `SettingsRow` | Borderless row: optional icon, medium body label, dim value, chevron |

## Domain cards (`RecapCards.tsx`)

| Component | Recipe |
|-----------|--------|
| `MetricCard` | Surface card ≥47% width grow; muted label → numberMd → dim caption |
| `BadgeCard` | Surface card; emoji 24 → title → muted bodySmall |
| `ComparisonCard` | Centered surface card; muted icon → numberSm → centered caption |

## Board (`ChessBoard.tsx`)

| State | Visual |
|-------|--------|
| Light / dark square | `boardLight` / `boardDark` |
| Selected | 2px `sage` border |
| Engine / truth highlight | `withAlpha(sage, 0.5)` wash |
| User guess highlight | `withAlpha(blue, 0.5)` wash |
| Legal empty | 11px red 45% dot |
| Legal capture | 3px red 55% ring |
| Pieces | Alpha SVG, ~78% of square |
| Coords | 10px medium; color inverted vs square |

Board container: `radius.md`, overflow hidden.

## Charts

| Component | Recipe |
|-----------|--------|
| `StyleRadarChart` | 3 rings, white 7–16% strokes; fill `blue@28%`, stroke `blue` 2px; labels muted |
| Other analytics | `react-native-chart-kit` + theme colors (see Insights panels) |

## Implementation tips for new apps

1. Copy `theme.ts` + `ui.tsx` + `icons.tsx` as a unit.
2. Keep semantic names (`BrutalButton`, `EdgeCard`) if you want drop-in familiarity, or rename once when extracting a shared package.
3. Prefer `withAlpha(brand, a)` for tints so palette swaps stay coherent.
4. Never introduce raw square corners on interactive chrome — use `radius.*`.
